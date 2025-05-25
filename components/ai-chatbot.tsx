"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X, Minimize2, Maximize2, MessageCircle } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Krisha, your AI nutrition assistant. How can I help you with your health and wellness goals today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)

  const quickActions = [
    "Ask a Nutrition Question",
    "Getting Started with Meal Planning",
    "Book a Consultation",
    "Healthy Recipe Ideas",
    "Weight Management Tips",
    "Contact Support",
  ]

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setShowQuickActions(false)
    setIsTyping(true)

    // Simulate AI response based on action
    setTimeout(() => {
      let responseText = "Thank you for your question! I'd be happy to help you with personalized nutrition advice."

      if (action.includes("Book")) {
        responseText =
          "I'd love to help you book a consultation! Please visit our booking page or call us directly to schedule your personalized nutrition session with me."
      } else if (action.includes("Recipe")) {
        responseText =
          "Here are some healthy recipe ideas! I can suggest recipes based on your dietary preferences and health goals. What type of cuisine do you prefer?"
      } else if (action.includes("Weight")) {
        responseText =
          "Weight management is a journey! I can help you create a sustainable plan. What are your current goals - weight loss, maintenance, or healthy weight gain?"
      } else if (action.includes("Getting Started")) {
        responseText =
          "Great choice! Meal planning is key to success. I'll help you create a personalized plan that fits your lifestyle and nutritional needs."
      }

      setIsTyping(false)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your question! I'd be happy to help you with personalized nutrition advice. For detailed consultations, please book a session with me.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Floating chat button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 hover:from-sage-600 hover:via-sage-700 hover:to-sage-800 shadow-2xl transition-all duration-300 hover:scale-110 p-0 overflow-hidden border-4 border-white/20 backdrop-blur-sm"
          aria-label="Open AI nutrition assistant chat"
        >
          <div className="relative h-full w-full">
            <img
              src="/images/nutritionist-avatar.png"
              alt="Krisha - AI Nutrition Assistant"
              className="h-full w-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-800/30 to-transparent rounded-full" />
            <MessageCircle className="absolute bottom-1 right-1 h-4 w-4 text-white drop-shadow-lg" />
          </div>
        </Button>

        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-sage-400/30 animate-ping" />
      </div>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 shadow-2xl transition-all duration-500 ease-in-out z-50 border-0 overflow-hidden ${
        isMinimized ? "w-80 h-20" : "w-80 h-[600px]"
      }`}
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(143, 188, 143, 0.1)",
      }}
    >
      {/* Enhanced Header */}
      <CardHeader
        className={`bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 text-white p-0 relative overflow-hidden transition-all duration-500 ${
          isMinimized ? "rounded-lg" : "rounded-t-lg"
        }`}
        style={{
          background: "linear-gradient(135deg, #8FBC8F 0%, #7BA87B 50%, #6B9A6B 100%)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
        </div>

        <div className="flex items-center justify-between p-4 relative z-10">
          <div className="flex items-center space-x-3">
            {!isMinimized && (
              <div className="relative">
                <img
                  src="/images/nutritionist-avatar.png"
                  alt="Krisha - AI Nutrition Assistant"
                  className="h-12 w-12 object-cover rounded-xl border-2 border-white/30 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse" />
              </div>
            )}
            <div className={`transition-all duration-300 ${isMinimized ? "ml-0" : ""}`}>
              <h3 className="font-bold text-base tracking-wide">Krisha AI</h3>
              <p className="text-xs opacity-90 font-medium">Nutrition Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Chat Content - Only show when not minimized */}
      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[536px] bg-gradient-to-b from-gray-50 to-white">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm transition-all duration-200 hover:shadow-md ${
                      message.isUser
                        ? "bg-gradient-to-br from-sage-500 to-sage-600 text-white ml-4"
                        : "bg-white text-gray-800 border border-gray-100 mr-4"
                    }`}
                  >
                    {message.text}
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

              {/* Quick Actions */}
              {showQuickActions && !isTyping && (
                <div className="space-y-3 mt-6 animate-fade-in">
                  <p className="text-sm font-medium text-gray-600 px-2">Quick Actions:</p>
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 text-sm border-sage-200 hover:bg-gradient-to-r hover:from-sage-50 hover:to-sage-100 hover:border-sage-300 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
                      onClick={() => handleQuickAction(action)}
                    >
                      <span className="font-medium">{action}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Enhanced Input Area */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about nutrition..."
                className="flex-1 text-sm border-sage-200 focus:border-sage-400 focus:ring-sage-400 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all duration-200"
                aria-label="Type your nutrition question"
              />
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
    </Card>
  )
}
