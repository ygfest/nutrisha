"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ArrowRight } from "lucide-react";

const recentMessages = [
  {
    id: "1",
    client: {
      name: "Anonymous User",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    message:
      "Hi! I'm looking for help with meal planning for weight loss. Can you help me create a sustainable plan?",
    timestamp: "2 minutes ago",
    type: "AI Chat",
    status: "unread",
  },
  {
    id: "2",
    client: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    message:
      "Thank you for the meal plan! I have a question about the portion sizes for dinner.",
    timestamp: "15 minutes ago",
    type: "Follow-up",
    status: "unread",
  },
  {
    id: "3",
    client: {
      name: "Anonymous User",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    message: "What are some healthy recipe ideas for someone with diabetes?",
    timestamp: "1 hour ago",
    type: "AI Chat",
    status: "read",
  },
  {
    id: "4",
    client: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    message:
      "Can we reschedule my appointment for next week? Something came up.",
    timestamp: "2 hours ago",
    type: "Booking",
    status: "read",
  },
  {
    id: "5",
    client: {
      name: "Anonymous User",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    message:
      "I'm interested in booking a consultation. What's your availability?",
    timestamp: "3 hours ago",
    type: "AI Chat",
    status: "read",
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "AI Chat":
      return "bg-blue-100 text-blue-800";
    case "Follow-up":
      return "bg-green-100 text-green-800";
    case "Booking":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function RecentMessages() {
  return (
    <Card className="border-sage-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-sage-600" />
            <span>Recent Messages</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border-sage-200 text-sage-700 hover:bg-sage-50"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg border transition-colors hover:bg-sage-50/50 ${
                message.status === "unread"
                  ? "bg-sage-50/30 border-sage-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.client.avatar || "/placeholder.svg"}
                    alt={message.client.name}
                  />
                  <AvatarFallback>
                    {message.client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {message.client.name}
                      </span>
                      <Badge
                        className={getTypeColor(message.type)}
                        variant="secondary"
                      >
                        {message.type}
                      </Badge>
                      {message.status === "unread" && (
                        <div className="h-2 w-2 bg-sage-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {message.timestamp}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {message.message}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-sage-200 text-sage-700 hover:bg-sage-50"
                    >
                      Reply
                    </Button>
                    {message.type === "AI Chat" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-sage-200 text-sage-700 hover:bg-sage-50"
                      >
                        Convert to Booking
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
