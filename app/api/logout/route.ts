import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
  try {
    await destroySession();

    return NextResponse.json({
      message: "Logged out successfully",
      status: 200,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}
