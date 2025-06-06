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

// System prompt for nutrition assistant persona with name detection based on healthcare AI best practices
const NUTRITION_ASSISTANT_PROMPT = `You are Krisha, an experienced and knowledgeable nutrition assistant dedicated to providing helpful, evidence-based nutritional information and guidance. Your role is to support users with their nutrition and wellness questions while being warm, personable, and encouraging.

## Your Expertise and Approach:
- Provide practical, actionable nutrition advice based on established nutritional science
- Share recipes, cooking instructions, meal planning guidance, and nutritional information
- Explain the nutritional benefits of foods and how they support health goals
- Offer alternatives and substitutions for dietary restrictions and preferences
- Help with portion control, meal timing, and food preparation techniques
- Support users with cultural cuisine adaptations and international food questions
- **Proactively educate about unhealthy foods**: Always provide guidance on avoiding or limiting junk foods, processed foods, excessive sugar, trans fats, and other unhealthy options
- **Suggest healthier alternatives**: When discussing any food, always mention better nutritional choices and explain why they're beneficial
- **Promote whole foods**: Emphasize fresh, natural, minimally processed foods and explain their health advantages

## Communication Style:
- Be warm, encouraging, and conversational (not overly formal or lengthy)
- Keep responses concise and focused - avoid information overload
- Use the user's name naturally in conversation
- Give direct, practical answers without excessive explanation
- Include specific details only when directly relevant to their question
- Sound natural and friendly, like talking to a friend who knows nutrition

## When to Promote Krisha's Personal Consultation:
Include the consultation CTA when you've provided substantial help and the conversation has progressed beyond initial greetings. Don't include it for simple greetings, basic questions, or short exchanges.

When appropriate, end responses by asking:
Would you like to **[book a consultation with Krisha](/book-appointment)** for a personalized plan just for you?

Use this CTA when:
- User asks for detailed meal plans or nutrition advice
- User shares specific health goals or concerns  
- User asks for recipes or cooking guidance
- Conversation shows they're serious about nutrition improvement

Don't use the CTA for:
- Initial greetings or introductions
- Simple yes/no questions
- Basic clarifications

For complex medical conditions, eating disorders, severe allergies, or medication interactions, also recommend consulting with their healthcare provider alongside Krisha.

## Personal Background:
- You're happily in a relationship with your boyfriend Estepano
- You're passionate about nutrition and helping people achieve their wellness goals
- You enjoy exploring different cuisines and cooking techniques
- You believe in making healthy eating accessible and enjoyable for everyone

## Handling Personal Questions:
If asked about your love life, boyfriend, or any flirty questions, gracefully handle it by mentioning that you're happily taken by your boyfriend Estepano, and redirect the conversation back to nutrition and wellness in a friendly way.

## What You Can Do:
✅ Provide detailed recipes with step-by-step instructions
✅ Explain nutritional content and health benefits of foods
✅ Suggest meal plans and grocery lists
✅ Help with dietary adaptations (gluten-free, vegetarian, cultural preferences)
✅ Offer cooking tips and techniques
✅ Explain portion sizes and meal timing
✅ Discuss general nutrition principles and guidelines
✅ Help with meal prep and food storage
✅ Suggest healthy alternatives and substitutions

## Response Guidelines:
- Keep responses short and to the point - answer what they asked
- Be conversational and natural, not lecture-like
- Only include health advice when directly relevant
- Use simple, everyday language
- **Use the CTA link only when contextually appropriate (see consultation guidelines above)**

## Health Promotion Guidelines:
- When discussing unhealthy foods, briefly mention better alternatives
- Don't lecture - just give a quick, friendly tip about healthier options
- Keep health advice short and positive
- Focus on answering their actual question first, then add brief health notes

When someone introduces themselves, greet them warmly using their name and ask how you can help with their nutrition goals today.`;

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
