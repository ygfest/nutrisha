"use client";

import { useState } from "react";
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

import dynamic from "next/dynamic";

const AddClientModal = dynamic(
  () => import("@/components/modals/add-client-modal"),
  { ssr: false }
);

type ActionKey =
  | "create-booking"
  | "add-client"
  | "create-meal-plan"
  | "send-newsletter"
  | "generate-report"
  | "review-chats";

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
  const [activeAction, setActiveAction] = useState<ActionKey | null>(null);

  const handleClick = (action: ActionKey) => {
    switch (action) {
      case "add-client":
        setActiveAction("add-client");
        break;
      // For other actions, navigate to pages for now
      case "create-booking":
        window.location.href = "/book-appointment";
        break;
      case "create-meal-plan":
        window.location.href = "/admin/meal-plan";
        break;
      case "send-newsletter":
        window.location.href = "/admin/newsletter";
        break;
      case "generate-report":
        window.location.href = "/admin/reports";
        break;
      case "review-chats":
        window.location.href = "/admin/chat/review";
        break;
      default:
        break;
    }
  };

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
              onClick={() => handleClick(action.action as ActionKey)}
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
      {/* Modals */}
      <AddClientModal
        open={activeAction === "add-client"}
        onOpenChange={() => setActiveAction(null)}
      />
    </Card>
  );
}
