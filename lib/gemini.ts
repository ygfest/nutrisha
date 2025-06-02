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
 * Sleep function for retry delays
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry function with exponential backoff
 */
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Check if this is a retryable error
      const isRetryable =
        error?.status === 503 || // Service Unavailable
        error?.status === 429 || // Too Many Requests
        error?.status === 500 || // Internal Server Error
        error?.message?.includes("overloaded") ||
        error?.message?.includes("try again later");

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.log(
        `Gemini API error (attempt ${attempt + 1}/${
          maxRetries + 1
        }), retrying in ${Math.round(delay)}ms...`
      );
      await sleep(delay);
    }
  }

  throw lastError;
};

/**
 * Generates an AI chat response using Google's Gemini model with retry logic
 * @param message - The user's input message
 * @param currentClientName - The current known client name
 * @param isFirstMessage - Whether this is the first user message
 * @param conversationHistory - Recent conversation messages for context
 * @returns Promise<ChatResponse> - The AI generated response with optional detected name
 */
export const generateChatResponse = async (
  message: string,
  currentClientName: string = "Anonymous User",
  isFirstMessage: boolean = false,
  conversationHistory: Array<{ text: string; isUser: boolean }> = []
): Promise<ChatResponse> => {
  try {
    const result = await retryWithBackoff(
      async () => {
        const model = geminiAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: NUTRITION_ASSISTANT_PROMPT,
        });

        const generationConfig = {
          ...DEFAULT_GENERATION_CONFIG,
        };

        const chatSession = model.startChat({ generationConfig });

        // Build conversation context with recent history
        let contextualMessage = "";

        if (isFirstMessage) {
          contextualMessage = `User message: "${message}". This is their first message - if they're introducing themselves with a name, greet them warmly using their name.`;
        } else {
          // Include recent conversation history to maintain context
          const recentHistory = conversationHistory
            .slice(-4) // Last 4 messages for context
            .map((msg) => `${msg.isUser ? "User" : "Assistant"}: ${msg.text}`)
            .join("\n");

          contextualMessage = `Recent conversation:
${recentHistory}

Current user message from ${currentClientName}: "${message}"

Please respond naturally without repeating greetings. Continue the conversation based on the context above.`;
        }

        return await chatSession.sendMessage(contextualMessage);
      },
      3,
      1000
    ); // 3 retries with 1 second base delay

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
  } catch (error: any) {
    console.error("Error generating chat response after retries:", error);

    // Provide more specific error messages based on the error type
    if (error?.status === 503 || error?.message?.includes("overloaded")) {
      throw new Error(
        "I'm experiencing high demand right now. Please try sending your message again in a moment."
      );
    } else if (error?.status === 429) {
      throw new Error(
        "I'm receiving too many requests. Please wait a moment before trying again."
      );
    } else if (error?.status === 401 || error?.message?.includes("API key")) {
      throw new Error(
        "There's an issue with the AI service configuration. Please contact support."
      );
    } else {
      throw new Error(
        "I'm having trouble responding right now. Please try again in a moment."
      );
    }
  }
};
