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
    color: "text-sage-600",
  },
  {
    title: "Add Client",
    description: "Register a new client profile",
    icon: Users,
    action: "add-client",
    color: "text-sage-600",
  },
  {
    title: "Create Meal Plan",
    description: "Design a custom nutrition plan",
    icon: BookOpen,
    action: "create-meal-plan",
    color: "text-sage-600",
  },
  {
    title: "Send Newsletter",
    description: "Send updates to all clients",
    icon: Send,
    action: "send-newsletter",
    color: "text-sage-600",
  },
  {
    title: "Generate Report",
    description: "Create monthly analytics report",
    icon: FileText,
    action: "generate-report",
    color: "text-sage-600",
  },
  {
    title: "AI Chat Review",
    description: "Review recent AI conversations",
    icon: MessageSquare,
    action: "review-chats",
    color: "text-sage-600",
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
              <div className="flex items-center space-x-3 w-full">
                <div className="h-10 w-10 rounded-lg bg-white border border-sage-200 flex items-center justify-center">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sage-700">
                    {action.title}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {action.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
