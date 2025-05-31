import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from("Admin")
      .select("*")
      .eq("email", email)
      .single();

    if (existingAdmin) {
      return NextResponse.json({
        error: "Admin already exists",
        status: 400,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const { data: admin, error } = await supabase
      .from("Admin")
      .insert({
        email,
        password: hashedPassword,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        error: "Failed to create admin",
        status: 500,
      });
    }

    return NextResponse.json({
      message: "Admin created successfully",
      admin: { id: admin.id, email: admin.email },
      status: 201,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}
