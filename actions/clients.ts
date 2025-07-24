"use server";

import { supabase } from "@/lib/supabase";

export async function getClients() {
  const { data, error } = await supabase.from("clients").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteClient(id: string) {
  const { data, error } = await supabase.from("clients").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
