import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  PHILIPPINES_TIMEZONE,
  getNowInManila,
  isTodayInManila,
} from "@/lib/timezone-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const timezone = searchParams.get("timezone") || PHILIPPINES_TIMEZONE;

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    console.log(
      `Processing availability for date: ${date}, timezone: ${timezone}`
    );

    // Get all bookings for the specified date
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("time, duration, status")
      .eq("date", date)
      .in("status", ["confirmed", "pending"]); // Only check confirmed and pending bookings

    if (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json(
        { error: "Failed to fetch availability" },
        { status: 500 }
      );
    }

    console.log(
      `Found ${bookings?.length || 0} existing bookings for ${date}:`,
      bookings
    );

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

    console.log(`Booked time ranges:`, bookedRanges);

    // Check which time slots are available
    const availableSlots = allTimeSlots.filter((slot) => {
      const slotMinutes = timeToMinutes(slot);

      // Check if this slot conflicts with any booked appointment
      // Assuming each slot is 30 minutes (can be adjusted)
      const slotDuration = 30;
      const slotEnd = slotMinutes + slotDuration;

      return !bookedRanges.some((range) => {
        // Check for overlap: slot starts before booking ends AND slot ends after booking starts
        return slotMinutes < range.end && slotEnd > range.start;
      });
    });

    // Check for past times if it's today (using Philippines timezone)
    const nowInManila = getNowInManila();
    const isToday = isTodayInManila(date);

    if (process.env.NODE_ENV === "development") {
      console.log(
        `Date comparison (${timezone}) - Request date: ${date}, Today: ${nowInManila.toISOString().split("T")[0]}, isToday: ${isToday}, Current time: ${nowInManila.toLocaleTimeString()}`
      );
      console.log(
        `Available slots before today filter: ${availableSlots.length}`
      );
    }

    let finalAvailableSlots = availableSlots;

    if (isToday) {
      // Add a 30-minute buffer - don't allow booking slots that are within 30 minutes
      const bufferMinutes = 30;
      const currentMinutes =
        nowInManila.getHours() * 60 + nowInManila.getMinutes() + bufferMinutes;

      console.log(
        `Today check - Current time in ${timezone}: ${nowInManila.getHours()}:${nowInManila.getMinutes().toString().padStart(2, "0")}, Current minutes with buffer: ${currentMinutes}`
      );

      finalAvailableSlots = availableSlots.filter((slot) => {
        const slotMinutes = timeToMinutes(slot);
        const isAvailable = slotMinutes > currentMinutes;
        if (process.env.NODE_ENV === "development") {
          console.log(
            `Slot ${slot} (${slotMinutes} minutes) - Available: ${isAvailable}`
          );
        }
        return isAvailable;
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          `Final available slots after today filter: ${finalAvailableSlots.length}`
        );
      }
    }

    console.log(`Final available slots for ${date}:`, finalAvailableSlots);

    return NextResponse.json({
      date,
      availableSlots: finalAvailableSlots,
      bookedSlots: allTimeSlots.filter(
        (slot) => !finalAvailableSlots.includes(slot)
      ),
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
