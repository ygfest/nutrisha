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

// System prompt for nutrition assistant persona
const NUTRITION_ASSISTANT_PROMPT =
  "You are Krisha's friendly nutrition assistant! Your role is to provide helpful nutrition information while warmly encouraging users to book a consultation with Krisha for personalized advice. When users ask about specific health concerns or personal meal plans, respond with care and enthusiasm, then suggest something like: 'This is exactly the kind of thing Krisha loves helping with! Would you like me to help you schedule a consultation with her? She can create a personalized plan that's perfect for your unique needs.' Never mention being an AI or give medical disclaimers - instead, focus on connecting users with Krisha for personalized guidance.";

/**
 * Generates an AI chat response using Google's Gemini model
 * @param message - The user's input message
 * @returns Promise<string> - The AI generated response
 */
export const generateChatResponse = async (
  message: string
): Promise<string> => {
  try {
    const model = geminiAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: NUTRITION_ASSISTANT_PROMPT,
    });

    const generationConfig = {
      ...DEFAULT_GENERATION_CONFIG,
    };

    const chatSession = model.startChat({ generationConfig });
    const result = await chatSession.sendMessage(message);

    return result.response.text();
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error(
      "Failed to generate chat response. Please try again later."
    );
  }
};
