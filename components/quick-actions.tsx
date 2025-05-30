"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  BookOpen,
  MessageSquare,
  FileText,
  Send,
} from "lucide-react";

const quickActions = [
  {
    title: "New Booking",
    description: "Schedule a new client appointment",
    icon: Calendar,
    action: "create-booking",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Add Client",
    description: "Register a new client profile",
    icon: Users,
    action: "add-client",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Create Meal Plan",
    description: "Design a custom nutrition plan",
    icon: BookOpen,
    action: "create-meal-plan",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Send Newsletter",
    description: "Send updates to all clients",
    icon: Send,
    action: "send-newsletter",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Generate Report",
    description: "Create monthly analytics report",
    icon: FileText,
    action: "generate-report",
    color: "from-pink-500 to-pink-600",
  },
  {
    title: "AI Chat Review",
    description: "Review recent AI conversations",
    icon: MessageSquare,
    action: "review-chats",
    color: "from-sage-500 to-sage-600",
  },
];

export function QuickActions() {
  return (
    <Card className="border-sage-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 border-sage-200 hover:bg-sage-50 hover:border-sage-300 transition-all duration-200"
            >
              <div
                className={`h-10 w-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-2`}
              >
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
