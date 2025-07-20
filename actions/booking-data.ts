"use server";

import { PHILIPPINES_TIMEZONE } from "@/lib/timezone-utils";

// Server actions for prefetching booking-related data
// These can be called from Server Components

export async function getAppointmentTypes() {
  // This could fetch from database or return static data
  return [
    {
      id: "initial-consultation",
      name: "Initial Consultation",
      duration: 90,
      price: "₱2,500",
      description: "Comprehensive nutrition assessment and personalized plan",
    },
    {
      id: "follow-up",
      name: "Follow-up Session",
      duration: 60,
      price: "₱1,500",
      description: "Progress review and plan adjustments",
    },
    {
      id: "meal-planning",
      name: "Meal Planning Session",
      duration: 75,
      price: "₱2,000",
      description: "Detailed meal planning and recipes",
    },
    {
      id: "group-session",
      name: "Group Workshop",
      duration: 120,
      price: "₱1,200",
      description: "Educational workshop for groups",
    },
    {
      id: "sports-nutrition",
      name: "Sports Nutrition",
      duration: 90,
      price: "₱2,200",
      description: "Specialized nutrition for athletes",
    },
    {
      id: "educational-session",
      name: "Nutrition Education",
      duration: 60,
      price: "₱1,800",
      description: "Learn the fundamentals of nutrition",
    },
  ];
}

export async function getAvailableTimeSlots(
  date?: string,
  timezone: string = PHILIPPINES_TIMEZONE
) {
  // If no date provided, return all possible time slots (for static prefetching)
  if (!date) {
    return [
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
    ];
  }

  // Fetch real availability from database for specific date
  return await getAvailabilityForDate(date, timezone);
}

async function getAvailabilityForDate(date: string, timezone: string) {
  const { supabase } = await import("@/lib/supabase");
  const { getNowInManila, isTodayInManila } = await import(
    "@/lib/timezone-utils"
  );

  try {
    // Get all bookings for the specified date
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("time, duration, status")
      .eq("date", date)
      .in("status", ["confirmed", "pending"]);

    if (error) {
      console.error("Error fetching bookings:", error);
      // Return empty array on error to prevent breaking the UI
      return [];
    }

    // Define all possible time slots
    const allTimeSlots = [
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
    ];

    // Convert time to minutes for easier calculation
    const timeToMinutes = (timeStr: string): number => {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      let totalMinutes = hours * 60 + minutes;

      if (period === "PM" && hours !== 12) {
        totalMinutes += 12 * 60;
      } else if (period === "AM" && hours === 12) {
        totalMinutes = minutes;
      }

      return totalMinutes;
    };

    // Get booked time ranges
    const bookedRanges = bookings.map((booking) => {
      const startMinutes = timeToMinutes(booking.time);
      const endMinutes = startMinutes + booking.duration;
      return { start: startMinutes, end: endMinutes };
    });

    // Check which time slots are available
    const availableSlots = allTimeSlots.filter((slot) => {
      const slotMinutes = timeToMinutes(slot);
      const slotDuration = 30; // Assuming each slot is 30 minutes
      const slotEnd = slotMinutes + slotDuration;

      return !bookedRanges.some((range) => {
        // Check for overlap
        return slotMinutes < range.end && slotEnd > range.start;
      });
    });

    // Check for past times if it's today (using Manila time)
    const nowInManila = getNowInManila();
    const isToday = isTodayInManila(date);

    let finalAvailableSlots = availableSlots;

    if (isToday) {
      // Add a 30-minute buffer
      const bufferMinutes = 30;
      const currentMinutes =
        nowInManila.getHours() * 60 + nowInManila.getMinutes() + bufferMinutes;

      finalAvailableSlots = availableSlots.filter((slot) => {
        const slotMinutes = timeToMinutes(slot);
        return slotMinutes > currentMinutes;
      });
    }

    return finalAvailableSlots;
  } catch (error) {
    console.error("Error checking availability:", error);
    return []; // Return empty array on error
  }
}
