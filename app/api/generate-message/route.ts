import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/gemini";
//import { generateChatResponse } from "@/lib/openai";
import { saveChatConversation } from "@/actions/chat";

export async function POST(req: Request) {
  try {
    const {
      message,
      clientName = "Anonymous User",
      isFirstMessage = false,
      conversationHistory = [],
    } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Generate AI response with smart name detection and conversation history
    const aiResponse = await generateChatResponse(
      message,
      clientName,
      isFirstMessage,
      conversationHistory
    );

    // Determine the actual client name to use
    let actualClientName = clientName;
    if (aiResponse.detectedName) {
      actualClientName = aiResponse.detectedName;
    }

    // Save the conversation to database with the actual client name
    try {
      await saveChatConversation(
        message,
        aiResponse.response,
        actualClientName
      );
    } catch (dbError) {
      // Log the error but don't fail the request
      console.error("Failed to save chat conversation to database:", dbError);
    }

    return NextResponse.json({
      response: aiResponse.response,
      detectedName: aiResponse.detectedName,
      clientName: actualClientName,
    });
  } catch (error) {
    console.error("Error generating chat response:", error);
    return NextResponse.json(
      { error: "Failed to generate chat response. Please try again later." },
      { status: 500 }
    );
  }
}
