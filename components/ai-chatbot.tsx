"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  X,
  Minimize2,
  Maximize2,
  Camera,
  Calendar,
  MessageCircle,
  Phone,
  ChefHat,
  Scale,
  HelpCircle,
  Sparkles,
  Info,
  AlertCircle,
  Shield,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickAction {
  id: string;
  text: string;
  icon: React.ReactNode;
  category: "general" | "tracking" | "planning" | "support";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [clientName, setClientName] = useState("Anonymous User");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Krisha, your nutritionist. What's your name? (This helps me personalize our conversation, but feel free to stay anonymous if you prefer!)",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [hasShownQuickActions, setHasShownQuickActions] = useState(false);
  const [showDisclaimerToast, setShowDisclaimerToast] = useState(false);
  const [hasShownDisclaimer, setHasShownDisclaimer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or typing starts
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, showQuickActions]);

  // Show quick actions after a brief delay when conversation gets started
  useEffect(() => {
    if (messages.length >= 3 && !hasShownQuickActions && !isTyping) {
      const timer = setTimeout(() => {
        setShowQuickActions(true);
        setHasShownQuickActions(true);
      }, 1500); // Show after 1.5 seconds when there are 3+ messages
      return () => clearTimeout(timer);
    }
  }, [messages.length, hasShownQuickActions, isTyping]);

  // Show disclaimer toast once after first user interaction (2nd AI response)
  useEffect(() => {
    const aiMessages = messages.filter((msg) => !msg.isUser);
    // Show after user has had their first conversation (initial greeting + 1 response = 2 AI messages)
    if (aiMessages.length >= 2 && !hasShownDisclaimer) {
      const timer = setTimeout(() => {
        setShowDisclaimerToast(true);
        setHasShownDisclaimer(true);
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowDisclaimerToast(false);
        }, 5000);
      }, 2000); // Show after 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [messages, hasShownDisclaimer]);

  // Add pulse hint for sparkles button when user hasn't discovered it yet
  const shouldShowPulseHint =
    messages.length >= 2 && !hasShownQuickActions && !showQuickActions;

  const quickActions: QuickAction[] = [
    {
      id: "photo-tracking",
      text: "Photo tracking",
      icon: <Camera className="h-4 w-4" />,
      category: "tracking",
    },
    {
      id: "meal-planning",
      text: "Meal planning",
      icon: <ChefHat className="h-4 w-4" />,
      category: "planning",
    },
    {
      id: "book-consultation",
      text: "Book consultation",
      icon: <Calendar className="h-4 w-4" />,
      category: "support",
    },
    {
      id: "weight-tips",
      text: "Weight tips",
      icon: <Scale className="h-4 w-4" />,
      category: "general",
    },
    {
      id: "ask-question",
      text: "Ask anything",
      icon: <MessageCircle className="h-4 w-4" />,
      category: "general",
    },
  ];

  const sendMessageToAPI = async (
    messageText: string,
    currentClientName: string = clientName,
    isFirstMessage: boolean = false
  ) => {
    try {
      // Prepare conversation history (excluding the greeting message)
      const conversationHistory = messages
        .slice(1) // Skip the initial greeting
        .map((msg) => ({
          text: msg.text,
          isUser: msg.isUser,
        }));

      const response = await fetch("/api/generate-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          clientName: currentClientName,
          isFirstMessage: isFirstMessage,
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  const handleQuickAction = async (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowQuickActions(false);
    setIsTyping(true);

    try {
      const apiResponse = await sendMessageToAPI(action);

      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: apiResponse.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setIsTyping(false);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    const messageText = inputValue;
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Check if this is the first user message
    const isFirstUserMessage = messages.length === 1;

    // Special response for "labyu"
    if (messageText.toLowerCase().trim() === "labyu" || "labyuu") {
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "👍",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 500);
      return;
    }

    try {
      // Send message to API with name detection
      const apiResponse = await sendMessageToAPI(
        messageText,
        clientName,
        isFirstUserMessage
      );

      // Update client name if detected
      if (apiResponse.detectedName) {
        setClientName(apiResponse.detectedName);
      }

      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: apiResponse.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setIsTyping(false);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Floating chat button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => {
              console.log("Chat button clicked - opening chat");
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="h-16 w-16 rounded-full bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 hover:from-sage-600 hover:via-sage-700 hover:to-sage-800 shadow-2xl transition-all duration-300 hover:scale-110 p-0 overflow-hidden border-4 border-white/20 backdrop-blur-sm relative z-10"
            aria-label="Open AI nutrition assistant chat"
          >
            <div className="relative h-full w-full">
              <img
                src="/images/nutritionist-avatar.png"
                alt="Krisha - AI Nutrition Assistant"
                className="h-full w-full object-cover rounded-full"
                style={{ pointerEvents: "none" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-sage-800/30 to-transparent rounded-full"
                style={{ pointerEvents: "none" }}
              />
            </div>
          </Button>

          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-sage-400/30 animate-ping -z-10" />
        </div>
      </div>
    );
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 shadow-2xl transition-all duration-500 ease-in-out z-50 border-0 overflow-hidden ${
        isMinimized ? "w-80 h-18" : "w-80 h-[600px]"
      }`}
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)",
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(143, 188, 143, 0.1)",
      }}
    >
      {/* Enhanced Header */}
      <CardHeader className="bg-gradient-to-r from-sage-400 to-sage-600 text-white p-0 rounded-t-lg relative overflow-hidden">
        <div className="flex items-start justify-between p-4 relative z-10">
          <div className="flex flex-col items-start ml-12">
            <h3 className="font-semibold text-sm">Krisha</h3>
            <p className="text-xs opacity-90">Nutrition Assistant</p>
            {clientName !== "Anonymous User" && (
              <p className="text-xs opacity-75">Chatting with {clientName}</p>
            )}
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              {isMinimized ? (
                <Maximize2 className="h-3 w-3" />
              ) : (
                <Minimize2 className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-20 w-20">
          <img
            src="/images/nutritionist-avatar.png"
            alt="Krisha - AI Nutrition Assistant"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </CardHeader>

      {/* Chat Content - Only show when not minimized */}
      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[520px] bg-gradient-to-b from-gray-50 to-white">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm transition-all duration-200 hover:shadow-md ${
                      message.isUser
                        ? "bg-gradient-to-br from-sage-500 to-sage-600 text-white ml-4"
                        : "bg-white text-gray-800 border border-gray-100 mr-4"
                    }`}
                  >
                    {message.isUser ? (
                      message.text
                    ) : (
                      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h2]:text-base [&>h2]:font-semibold [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-medium [&>h3]:mb-1 [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2 [&>li]:ml-4 [&>strong]:font-semibold [&>em]:italic [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>blockquote]:border-l-4 [&>blockquote]:border-sage-300 [&>blockquote]:pl-3 [&>blockquote]:italic [&>blockquote]:text-gray-600">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white text-gray-800 border border-gray-100 p-4 rounded-2xl shadow-sm mr-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions - Modern pill-style horizontal layout */}
              {showQuickActions && !isTyping && (
                <div className="mt-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-500 font-medium">
                      Quick suggestions:
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowQuickActions(false)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                      aria-label="Hide suggestions"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs border-sage-200 hover:bg-sage-50 hover:border-sage-300 transition-all duration-200 rounded-full flex items-center gap-1.5 whitespace-nowrap"
                        onClick={() => handleQuickAction(action.text)}
                      >
                        {action.icon}
                        <span>{action.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Auto-scroll target */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Enhanced Input Area */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    messages.length === 1
                      ? "Type your name or ask a question..."
                      : "Ask about nutrition..."
                  }
                  className="text-sm border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all duration-200 pr-12"
                  aria-label="Type your nutrition question"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 transition-all duration-200 rounded-full ${
                    showQuickActions
                      ? "text-sage-600 bg-sage-50 hover:bg-sage-100"
                      : "text-gray-400 hover:text-sage-600 hover:bg-gray-50"
                  } ${shouldShowPulseHint ? "animate-pulse" : ""}`}
                  aria-label={
                    showQuickActions
                      ? "Hide quick suggestions"
                      : "Show quick suggestions"
                  }
                >
                  <Sparkles
                    className={`h-4 w-4 transition-transform duration-200 ${
                      showQuickActions ? "scale-110" : ""
                    }`}
                  />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}

      {/* Compact Toast Notification for Disclaimer */}
      {showDisclaimerToast && (
        <div className="fixed bottom-6 left-6 z-40 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-2.5 max-w-64">
            <div className="flex items-center gap-2">
              <Info className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-600">
                  AI can make mistakes.{" "}
                  <button
                    onClick={() => {
                      handleQuickAction("Book consultation");
                      setShowDisclaimerToast(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  >
                    Consult Krisha
                  </button>
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDisclaimerToast(false)}
                className="h-3.5 w-3.5 p-0 text-gray-400 hover:text-gray-600"
                aria-label="Dismiss"
              >
                <X className="h-2.5 w-2.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
