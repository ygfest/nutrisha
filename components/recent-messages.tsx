"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ArrowRight } from "lucide-react";
import { getRecentMessages } from "@/actions/dashboard";
import { useQuery } from "@tanstack/react-query";

const getTypeColor = (type: string) => {
  switch (type) {
    case "ai_chat":
      return "bg-blue-100 text-blue-800";
    case "follow_up":
      return "bg-green-100 text-green-800";
    case "booking":
      return "bg-purple-100 text-purple-800";
    case "general":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatTypeDisplay = (type: string) => {
  switch (type) {
    case "ai_chat":
      return "AI Chat";
    case "follow_up":
      return "Follow-up";
    case "booking":
      return "Booking";
    case "general":
      return "General";
    default:
      return "Message";
  }
};

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const messageTime = new Date(dateString);
  const diffInMinutes = Math.floor(
    (now.getTime() - messageTime.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;

  return messageTime.toLocaleDateString();
};

export function RecentMessages() {
  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recent-messages"],
    queryFn: () => getRecentMessages(5),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  if (isLoading) {
    return (
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-sage-600" />
            <span>Recent Messages</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-gray-200 h-8 w-8"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

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
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No messages yet</p>
            <p className="text-gray-400 text-sm">
              Messages from clients and AI chat interactions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
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
                      src={message.client?.avatar_url || "/placeholder.svg"}
                      alt={message.client_name}
                    />
                    <AvatarFallback>
                      {message.client_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {message.client_name}
                        </span>
                        <Badge
                          className={getTypeColor(message.type)}
                          variant="secondary"
                        >
                          {formatTypeDisplay(message.type)}
                        </Badge>
                        {message.status === "unread" && (
                          <div className="h-2 w-2 bg-sage-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimeAgo(message.created_at)}
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
                      {message.type === "ai_chat" && (
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
        )}
      </CardContent>
    </Card>
  );
}
