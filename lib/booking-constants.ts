import { Calendar, CheckCircle, User } from "lucide-react";

export const appointmentTypeNames: Record<string, string> = {
  "initial-consultation": "Initial Consultation",
  "follow-up": "Follow-up Session",
  "meal-planning": "Meal Planning Session",
  "group-session": "Group Workshop",
  "sports-nutrition": "Sports Nutrition",
  "educational-session": "Nutrition Education",
};

export const appointmentTypeDurations: Record<string, number> = {
  "initial-consultation": 90,
  "follow-up": 60,
  "meal-planning": 75,
  "group-session": 120,
  "sports-nutrition": 90,
  "educational-session": 60,
};

export const bookingSteps = [
  {
    id: "type",
    title: "Service",
    icon: User,
    description: "Choose appointment type",
  },
  {
    id: "datetime",
    title: "Date & Time",
    icon: Calendar,
    description: "Select date and time",
  },
  {
    id: "form",
    title: "Information",
    icon: User,
    description: "Personal details",
  },
  {
    id: "confirmation",
    title: "Confirmation",
    icon: CheckCircle,
    description: "Review and confirm",
  },
] as const;

export type BookingStep = typeof bookingSteps[number]["id"];