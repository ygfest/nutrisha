"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Heart,
  Target,
  BookOpen,
  Utensils,
  CheckCircle,
} from "lucide-react";

interface AppointmentType {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
}

const appointmentTypes: AppointmentType[] = [
  {
    id: "initial-consultation",
    title: "Initial Consultation",
    duration: "90 minutes",
    price: "₱2,500",
    description:
      "Comprehensive health assessment and personalized nutrition plan development",
    features: [
      "Complete health history review",
      "Dietary assessment and analysis",
      "Personalized nutrition plan",
      "Goal setting and action steps",
      "Resource materials included",
    ],
    icon: Heart,
    popular: true,
  },
  {
    id: "follow-up",
    title: "Follow-up Session",
    duration: "45 minutes",
    price: "₱1,500",
    description: "Progress review and plan adjustments for existing clients",
    features: [
      "Progress evaluation",
      "Plan modifications",
      "Q&A and troubleshooting",
      "Continued support",
      "Updated resources",
    ],
    icon: Target,
  },
  {
    id: "meal-planning",
    title: "Meal Planning Session",
    duration: "60 minutes",
    price: "₱2,000",
    description:
      "Detailed meal planning and recipe guidance for your lifestyle",
    features: [
      "Custom meal plans",
      "Grocery shopping lists",
      "Recipe recommendations",
      "Prep strategies",
      "Budget considerations",
    ],
    icon: Utensils,
  },
  {
    id: "group-session",
    title: "Group Workshop",
    duration: "120 minutes",
    price: "₱1,200",
    description:
      "Interactive nutrition education in a supportive group setting",
    features: [
      "Group learning environment",
      "Interactive activities",
      "Peer support",
      "Educational materials",
      "Q&A session",
    ],
    icon: Users,
  },
  {
    id: "sports-nutrition",
    title: "Sports Nutrition",
    duration: "75 minutes",
    price: "₱2,200",
    description:
      "Specialized nutrition planning for athletes and active individuals",
    features: [
      "Performance optimization",
      "Training nutrition",
      "Recovery strategies",
      "Supplement guidance",
      "Competition planning",
    ],
    icon: Target,
  },
  {
    id: "educational-session",
    title: "Nutrition Education",
    duration: "60 minutes",
    price: "₱1,800",
    description:
      "Learn about specific nutrition topics and healthy eating principles",
    features: [
      "Topic-focused learning",
      "Evidence-based information",
      "Practical applications",
      "Take-home resources",
      "Ongoing support",
    ],
    icon: BookOpen,
  },
];

interface AppointmentTypesProps {
  selectedType: string | null;
  onTypeSelect: (typeId: string) => void;
}

export function AppointmentTypes({
  selectedType,
  onTypeSelect,
}: AppointmentTypesProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Appointment Type
        </h2>
        <p className="text-gray-600">
          Select the service that best fits your nutrition and wellness needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointmentTypes.map((type) => {
          const isSelected = selectedType === type.id;
          const IconComponent = type.icon;

          return (
            <Card
              key={type.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? "ring-2 ring-sage-500 border-sage-200 shadow-lg"
                  : "border-sage-100 hover:border-sage-200"
              }`}
              onClick={() => onTypeSelect(type.id)}
            >
              {type.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-sage-500 to-sage-600 text-white">
                  Most Popular
                </Badge>
              )}

              {isSelected && (
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-sage-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`mx-auto mb-4 h-16 w-16 rounded-2xl flex items-center justify-center ${
                    isSelected
                      ? "bg-gradient-to-br from-sage-500 to-sage-600"
                      : "bg-gradient-to-br from-sage-400 to-sage-500"
                  } shadow-lg`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {type.title}
                </CardTitle>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{type.duration}</span>
                  </div>
                  <div className="text-lg font-bold text-sage-600">
                    {type.price}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {type.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">
                    What's included:
                  </h4>
                  <ul className="space-y-1">
                    {type.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-xs text-gray-600"
                      >
                        <CheckCircle className="h-3 w-3 text-sage-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`w-full mt-4 transition-all duration-200 ${
                    isSelected
                      ? "bg-sage-500 hover:bg-sage-600 text-white"
                      : "bg-sage-50 hover:bg-sage-100 text-sage-700 border border-sage-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTypeSelect(type.id);
                  }}
                >
                  {isSelected ? "Selected" : "Select This Service"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
