"use server";

import { supabase } from "@/lib/supabase";

export async function getNotifications() {
  const { data, error } = await supabase.from("notifications").select("*");
  if (error) throw error;
  return data;
}
