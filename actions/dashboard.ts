"use server";

import { supabase } from "@/lib/supabase";
import type { DashboardStats, Booking, Message, Client } from "@/lib/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    // Get total clients
    const { count: totalClients } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true });

    // Get previous month's clients count
    const { count: previousClients } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .lt(
        "created_at",
        `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
      );

    // Get current month's bookings
    const { count: monthlyBookings } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte(
        "created_at",
        `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
      )
      .lt(
        "created_at",
        `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`
      );

    // Get previous month's bookings
    const { count: previousBookings } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte(
        "created_at",
        `${previousYear}-${previousMonth.toString().padStart(2, "0")}-01`
      )
      .lt(
        "created_at",
        `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
      );

    // Get current month's AI chat messages
    const { count: aiChatMessages } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("type", "ai_chat")
      .gte(
        "created_at",
        `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
      )
      .lt(
        "created_at",
        `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`
      );

    // Get previous month's AI chat messages
    const { count: previousAiMessages } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("type", "ai_chat")
      .gte(
        "created_at",
        `${previousYear}-${previousMonth.toString().padStart(2, "0")}-01`
      )
      .lt(
        "created_at",
        `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
      );

    // Calculate success rate (confirmed bookings / total bookings)
    const { count: confirmedBookings } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed")
      .gte(
        "created_at",
        `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
      )
      .lt(
        "created_at",
        `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01`
      );

    const { count: previousConfirmedBookings } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed")
      .gte(
        "created_at",
        `${previousYear}-${previousMonth.toString().padStart(2, "0")}-01`
      )
      .lt(
        "created_at",
        `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
      );

    const successRate = monthlyBookings
      ? Math.round(((confirmedBookings || 0) / monthlyBookings) * 100)
      : 0;
    const previousSuccessRate = previousBookings
      ? Math.round(((previousConfirmedBookings || 0) / previousBookings) * 100)
      : 0;

    // Mock revenue calculation (in a real app, you'd have a payments table)
    const mockRevenue = (confirmedBookings || 0) * 2500; // ₱2,500 per confirmed booking
    const previousRevenue = (previousConfirmedBookings || 0) * 2500;

    return {
      total_clients: totalClients || 0,
      monthly_bookings: monthlyBookings || 0,
      monthly_revenue: mockRevenue,
      ai_chat_messages: aiChatMessages || 0,
      success_rate: successRate,
      avg_session_time: 52, // Mock data - would require session tracking
      previous_total_clients: previousClients || 0,
      previous_monthly_bookings: previousBookings || 0,
      previous_monthly_revenue: previousRevenue,
      previous_ai_chat_messages: previousAiMessages || 0,
      previous_success_rate: previousSuccessRate,
      previous_avg_session_time: 47, // Mock data
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}

export async function getRecentBookings(
  limit: number = 10
): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        client:clients(*)
      `
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    return [];
  }
}

export async function getRecentMessages(limit: number = 5): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        *,
        client:clients(*)
      `
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching recent messages:", error);
    return [];
  }
}

export async function getTodaysBookings(): Promise<Booking[]> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        client:clients(*)
      `
      )
      .eq("date", today)
      .order("time", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching today's bookings:", error);
    return [];
  }
}

export async function getWeeklyStats() {
  try {
    // Current week timeframe (startOfWeek inclusive, endOfWeek exclusive)
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // Previous week timeframe
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfWeek);

    // --- Consultations --- //
    const { count: consultations } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfWeek.toISOString())
      .lt("created_at", endOfWeek.toISOString());

    const { count: consultationsLastWeek } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfLastWeek.toISOString())
      .lt("created_at", endOfLastWeek.toISOString());

    // Calculate percentage change, guarding against division by zero.
    let consultationsChangePercent = 0;
    if (consultationsLastWeek && consultationsLastWeek > 0) {
      consultationsChangePercent =
        (((consultations || 0) - consultationsLastWeek) /
          consultationsLastWeek) *
        100;
    } else if (consultations && consultations > 0) {
      // Treat any consultations this week when none last week as 100% increase
      consultationsChangePercent = 100;
    }

    // --- New clients --- //
    const { count: newClients } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfWeek.toISOString())
      .lt("created_at", endOfWeek.toISOString());

    // --- AI interactions --- //
    const { count: aiInteractions } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("type", "ai_chat")
      .gte("created_at", startOfWeek.toISOString())
      .lt("created_at", endOfWeek.toISOString());

    // --- Cancellations --- //
    const { count: cancellations } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "cancelled")
      .gte("created_at", startOfWeek.toISOString())
      .lt("created_at", endOfWeek.toISOString());

    return {
      consultations: consultations || 0,
      consultationsLastWeek: consultationsLastWeek || 0,
      consultationsChangePercent,
      newClients: newClients || 0,
      aiInteractions: aiInteractions || 0,
      cancellations: cancellations || 0,
    };
  } catch (error) {
    console.error("Error fetching weekly stats:", error);
    return {
      consultations: 0,
      consultationsLastWeek: 0,
      consultationsChangePercent: 0,
      newClients: 0,
      aiInteractions: 0,
      cancellations: 0,
    };
  }
}
