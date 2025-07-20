import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { date, time } = await request.json();

    console.log(`Testing booking insertion: date=${date}, time=${time}`);

    // First, let's check if we have any clients
    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select("id")
      .limit(1);

    if (clientsError) {
      return NextResponse.json(
        { error: `Client query failed: ${clientsError.message}` },
        { status: 500 }
      );
    }

    if (!clients || clients.length === 0) {
      return NextResponse.json(
        { error: "No clients found in database" },
        { status: 500 }
      );
    }

    const clientId = clients[0].id;

    // Try to insert a test booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        client_id: clientId,
        date: date,
        time: time,
        type: "Test Booking",
        status: "confirmed",
        duration: 60,
        notes: "Test booking for debugging",
      })
      .select("*")
      .single();

    if (bookingError) {
      return NextResponse.json(
        {
          error: `Booking insertion failed: ${bookingError.message}`,
          details: bookingError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: booking,
      message: "Test booking created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
