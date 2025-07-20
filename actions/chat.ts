"use server";

import { supabase } from "@/lib/supabase";

export interface ChatMessage {
  id?: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  client_name?: string;
}

export async function saveMessage({
  message,
  clientName = "Anonymous User",
  type = "ai_chat",
  status = "read",
}: {
  message: string;
  clientName?: string;
  type?: "ai_chat" | "follow_up" | "booking" | "general";
  status?: "read" | "unread";
}) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        client_id: null, // For anonymous users
        client_name: clientName,
        message: message,
        type: type,
        status: status,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving message:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error saving message:", error);
    return null;
  }
}

export async function saveChatConversation(
  userMessage: string,
  aiResponse: string,
  clientName: string = "Anonymous User"
) {
  try {
    // Save both user message and AI response
    const results = await Promise.allSettled([
      saveMessage({
        message: userMessage,
        clientName,
        type: "ai_chat",
        status: "read",
      }),
      saveMessage({
        message: `AI Response: ${aiResponse}`,
        clientName: "AI Assistant (Krisha)",
        type: "ai_chat",
        status: "read",
      }),
    ]);

    return results;
  } catch (error) {
    console.error("Error saving chat conversation:", error);
    return null;
  }
}

export async function getRecentChats(limit: number = 50) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("type", "ai_chat")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching recent chats:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching recent chats:", error);
    return [];
  }
}

export async function getChatsByClient(clientName: string) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("client_name", clientName)
      .eq("type", "ai_chat")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching chats by client:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching chats by client:", error);
    return [];
  }
}

// Generate a session ID for tracking conversations
export async function generateSessionId(): Promise<string> {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get chat statistics
export async function getChatStats() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());

    const [
      { count: totalChats },
      { count: todayChats },
      { count: weeklyChats },
      { count: uniqueUsers },
    ] = await Promise.all([
      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("type", "ai_chat"),

      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("type", "ai_chat")
        .gte("created_at", `${today}T00:00:00`),

      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("type", "ai_chat")
        .gte("created_at", thisWeekStart.toISOString()),

      supabase
        .from("messages")
        .select("client_name", { count: "exact", head: true })
        .eq("type", "ai_chat")
        .not("client_name", "like", "AI Assistant%"),
    ]);

    return {
      totalChats: totalChats || 0,
      todayChats: todayChats || 0,
      weeklyChats: weeklyChats || 0,
      uniqueUsers: uniqueUsers || 0,
    };
  } catch (error) {
    console.error("Error fetching chat stats:", error);
    return {
      totalChats: 0,
      todayChats: 0,
      weeklyChats: 0,
      uniqueUsers: 0,
    };
  }
}
