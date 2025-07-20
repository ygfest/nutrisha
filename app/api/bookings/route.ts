import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendBookingConfirmationEmail } from "@/actions/email";
import {
  generateGoogleMeetLink,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
} from "@/actions/calendar";

const appointmentTypeNames: Record<string, string> = {
  "initial-consultation": "Initial Consultation",
  "follow-up": "Follow-up Session",
  "meal-planning": "Meal Planning Session",
  "group-session": "Group Workshop",
  "sports-nutrition": "Sports Nutrition",
  "educational-session": "Nutrition Education",
};

const appointmentTypePrices: Record<string, string> = {
  "initial-consultation": "₱2,500",
  "follow-up": "₱1,500",
  "meal-planning": "₱2,000",
  "group-session": "₱1,200",
  "sports-nutrition": "₱2,200",
  "educational-session": "₱1,800",
};

const appointmentTypeDurations: Record<string, number> = {
  "initial-consultation": 90,
  "follow-up": 60,
  "meal-planning": 75,
  "group-session": 120,
  "sports-nutrition": 90,
  "educational-session": 60,
};

const paymentMethodNames: Record<string, string> = {
  card: "Credit/Debit Card",
  gcash: "GCash",
  cash: "Pay at Appointment",
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Extract booking data
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      emergencyContact,
      emergencyPhone,
      healthGoals,
      dietaryRestrictions,
      allergies,
      medications,
      medicalConditions,
      activityLevel,
      previousNutrition,
      referralSource,
      specialRequests,
      paymentMethod,
      appointmentType,
      selectedDate,
      selectedTime,
    } = formData;

    const clientName = `${firstName} ${lastName}`;

    // Check if client already exists
    let clientId = null;
    const { data: existingClient } = await supabase
      .from("clients")
      .select("id")
      .eq("email", email)
      .single();

    if (existingClient) {
      clientId = existingClient.id;

      // Update existing client with new information
      await supabase
        .from("clients")
        .update({
          name: clientName,
          phone,
          date_of_birth: dateOfBirth
            ? new Date(dateOfBirth).toISOString().split("T")[0]
            : null,
          gender: gender || null,
          emergency_contact: emergencyContact || null,
          emergency_phone: emergencyPhone || null,
          health_goals: healthGoals,
          dietary_restrictions: dietaryRestrictions || null,
          allergies: allergies || null,
          medications: medications || null,
          medical_conditions: medicalConditions || null,
          activity_level: activityLevel || null,
          previous_nutrition: previousNutrition || null,
          referral_source: referralSource || null,
        })
        .eq("id", clientId);
    } else {
      // Create new client
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert({
          name: clientName,
          email,
          phone,
          date_of_birth: dateOfBirth
            ? new Date(dateOfBirth).toISOString().split("T")[0]
            : null,
          gender: gender || null,
          emergency_contact: emergencyContact || null,
          emergency_phone: emergencyPhone || null,
          health_goals: healthGoals,
          dietary_restrictions: dietaryRestrictions || null,
          allergies: allergies || null,
          medications: medications || null,
          medical_conditions: medicalConditions || null,
          activity_level: activityLevel || null,
          previous_nutrition: previousNutrition || null,
          referral_source: referralSource || null,
        })
        .select("id")
        .single();

      if (clientError) {
        console.error("Error creating client:", clientError);
        return NextResponse.json(
          { error: "Failed to create client record" },
          { status: 500 }
        );
      }

      clientId = newClient.id;
    }

    // Check for existing booking at the same time (prevent double booking)
    const bookingDate = selectedDate.includes("T")
      ? selectedDate.split("T")[0]
      : selectedDate;
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Checking for existing booking: date=${bookingDate}, time=${selectedTime}`
      );
    }

    const { data: existingBooking, error: existingBookingError } =
      await supabase
        .from("bookings")
        .select("id")
        .eq("date", bookingDate)
        .eq("time", selectedTime)
        .in("status", ["confirmed", "pending"])
        .single();

    if (process.env.NODE_ENV === "development") {
      console.log(
        `Existing booking check: found=${!!existingBooking}, error=${existingBookingError?.message || "none"}`
      );
    }

    if (existingBooking) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Found existing booking: ID=${existingBooking.id}`);
      }
      return NextResponse.json(
        {
          error:
            "This time slot is no longer available. Please select a different time.",
        },
        { status: 409 }
      );
    }

    // Create booking record
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Creating booking: date=${bookingDate}, time=${selectedTime}`
      );
    }
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        client_id: clientId,
        date: bookingDate, // Use the same date format
        time: selectedTime,
        type: appointmentTypeNames[appointmentType],
        status: "confirmed",
        duration: appointmentTypeDurations[appointmentType],
        notes: specialRequests || null,
      })
      .select("id")
      .single();

    if (bookingError) {
      console.error("Error creating booking:", bookingError);
      return NextResponse.json(
        { error: "Failed to create booking record" },
        { status: 500 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        `Booking created successfully: ID=${booking.id}, date=${bookingDate}, time=${selectedTime}`
      );
    }

    // Generate Google Meet link and calendar URLs
    const meetLink = await generateGoogleMeetLink();

    const appointmentDetails = {
      clientName,
      appointmentType: appointmentTypeNames[appointmentType],
      date: new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: selectedTime,
      duration: appointmentTypeDurations[appointmentType],
      bookingId: booking.id.toString(),
      clientEmail: email,
    };

    const googleCalendarUrl = await generateGoogleCalendarUrl(
      appointmentDetails,
      meetLink
    );
    const outlookCalendarUrl = await generateOutlookCalendarUrl(
      appointmentDetails,
      meetLink
    );

    // Prepare booking details for email
    const bookingDetails = {
      bookingId: booking.id,
      clientName,
      email,
      phone,
      appointmentType: appointmentTypeNames[appointmentType],
      appointmentPrice: appointmentTypePrices[appointmentType],
      date: appointmentDetails.date,
      time: selectedTime,
      duration: appointmentTypeDurations[appointmentType],
      paymentMethod: paymentMethodNames[paymentMethod] || paymentMethod,
      specialRequests: specialRequests || null,
      meetLink,
      googleCalendarUrl,
      outlookCalendarUrl,
    };

    // Send confirmation email
    try {
      await sendBookingConfirmationEmail(bookingDetails);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      clientName,
      meetLink,
      googleCalendarUrl,
      outlookCalendarUrl,
      message: "Booking confirmed successfully",
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}
