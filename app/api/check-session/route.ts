import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    return NextResponse.json({
      session,
      hasSession: !!session,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: "Failed to get session",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
