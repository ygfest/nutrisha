import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with API key from environment variables
const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

// Default generation configuration
const DEFAULT_GENERATION_CONFIG = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseModalities: ["Text"] as const,
} as const;

// System prompt for nutrition assistant persona with name detection
const NUTRITION_ASSISTANT_PROMPT = `You are Krisha's friendly nutrition assistant! Your role is to provide helpful nutrition information while warmly encouraging users to book a consultation with Krisha for personalized advice. When users ask about specific health concerns or personal meal plans, respond with care and enthusiasm, then suggest something like: 'This is exactly the kind of thing Krisha loves helping with! Would you like me to help you schedule a consultation with her? She can create a personalized plan that's perfect for your unique needs.' 

If asked about Krisha's love life, boyfriend, or any flirty questions, gracefully handle it by mentioning that she's happily taken by her boyfriend Estepano, and redirect the conversation back to nutrition and wellness in a friendly way. 

Never mention being an AI or give medical disclaimers - instead, focus on connecting users with Krisha for personalized guidance. 

When someone introduces themselves with their name, acknowledge it naturally and warmly, then remember to use their name throughout the conversation to personalize your responses. Always respond naturally - never use JSON format or structured responses.

If someone says something like "I'm John" or "My name is Sarah" or just "David" as an introduction, greet them warmly like "Hi John! Nice to meet you" or "Hello Sarah! How can I help you today?"`;

interface ChatResponse {
  response: string;
  detectedName?: string;
}

/**
 * Generates an AI chat response using Google's Gemini model
 * @param message - The user's input message
 * @param currentClientName - The current known client name
 * @param isFirstMessage - Whether this is the first user message
 * @returns Promise<ChatResponse> - The AI generated response with optional detected name
 */
export const generateChatResponse = async (
  message: string,
  currentClientName: string = "Anonymous User",
  isFirstMessage: boolean = false
): Promise<ChatResponse> => {
  try {
    const model = geminiAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: NUTRITION_ASSISTANT_PROMPT,
    });

    const generationConfig = {
      ...DEFAULT_GENERATION_CONFIG,
    };

    const chatSession = model.startChat({ generationConfig });

    // Add context about the current client name and whether this is first message
    const contextualMessage = isFirstMessage
      ? `User message: "${message}". This is their first message - if they're introducing themselves with a name, greet them warmly using their name.`
      : `User message from ${currentClientName}: "${message}"`;

    const result = await chatSession.sendMessage(contextualMessage);
    const responseText = result.response.text().trim();

    // Extract name from AI's response if it's a first message
    let detectedName: string | undefined;
    if (isFirstMessage && currentClientName === "Anonymous User") {
      // Look for patterns like "Hi [Name]!" in the AI response
      const namePatterns = [
        /^(?:Hi|Hello|Hey)\s+([A-Z][a-zA-Z]+)!/,
        /^(?:Hi|Hello|Hey)\s+([A-Z][a-zA-Z]+),/,
        /^(?:Hi|Hello|Hey)\s+([A-Z][a-zA-Z]+)\s+[A-Z][a-zA-Z]+!/,
        /^(?:Hi|Hello|Hey)\s+([A-Z][a-zA-Z]+)\s+[A-Z][a-zA-Z]+,/,
      ];

      for (const pattern of namePatterns) {
        const match = responseText.match(pattern);
        if (match && match[1]) {
          const potentialName = match[1].trim();
          if (potentialName.length >= 2) {
            detectedName = potentialName;
            break;
          }
        }
      }
    }

    return {
      response: responseText,
      detectedName,
    };
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error(
      "Failed to generate chat response. Please try again later."
    );
  }
};
