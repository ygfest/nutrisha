import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/gemini";
import { ChatService } from "@/lib/chat-service";

// Simple name detection for server-side processing
function extractNameFromMessage(message: string): string | null {
  const msg = message.toLowerCase().trim();
  const namePatterns = [
    /^(?:my name is|i'm|i am|call me|it's|this is)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)/i,
    /^([a-zA-Z]{2,}(?:\s+[a-zA-Z]+)?)$/i,
    /^(?:hi|hello|hey),?\s*(?:my name is|i'm|i am)?\s*([a-zA-Z]+(?:\s+[a-zA-Z]+)?)/i,
  ];

  for (const pattern of namePatterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      const potentialName = match[1].trim();
      const nonNames = [
        "anonymous",
        "user",
        "nothing",
        "none",
        "no",
        "nope",
        "skip",
        "pass",
        "prefer",
        "stay",
      ];
      if (
        !nonNames.includes(potentialName.toLowerCase()) &&
        potentialName.length >= 2
      ) {
        // Properly format the name
        return potentialName
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      }
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const {
      message,
      clientName = "Anonymous User",
      isFirstMessage = false,
    } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Extract name if this might be a name introduction
    let detectedName = null;
    let actualClientName = clientName;

    if (isFirstMessage || clientName === "Anonymous User") {
      detectedName = extractNameFromMessage(message);
      if (detectedName) {
        actualClientName = detectedName;
      }
    }

    // Generate AI response
    const response = await generateChatResponse(message);

    // Save the conversation to database with the actual client name
    try {
      await ChatService.saveChatConversation(
        message,
        response,
        actualClientName
      );
    } catch (dbError) {
      // Log the error but don't fail the request
      console.error("Failed to save chat conversation to database:", dbError);
    }

    return NextResponse.json({
      response,
      detectedName: detectedName,
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
