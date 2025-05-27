import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await generateChatResponse(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating chat response:", error);
    return NextResponse.json(
      { error: "Failed to generate chat response. Please try again later." },
      { status: 500 }
    );
  }
}
