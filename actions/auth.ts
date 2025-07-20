"use server";

import { signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function authenticate(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: "Invalid credentials" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Authentication failed" };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}
