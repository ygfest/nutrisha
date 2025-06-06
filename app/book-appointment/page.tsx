"use client";

import { useState, useEffect } from "react";
import { AppointmentTypes } from "@/components/appointment-types";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingForm } from "@/components/booking-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Calendar,
  User,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Nutrition Consultation - Krisha Nobora, RND",
  description:
    "Schedule your personalized nutrition consultation with Krisha Nobora, Registered Nutritionist-Dietitian. Expert guidance for weight management, therapeutic diets, and healthy lifestyle changes.",
  keywords: [
    "book nutrition consultation",
    "schedule dietitian appointment",
    "nutrition appointment Philippines",
    "registered nutritionist booking",
    "meal planning consultation",
    "weight management appointment",
    "therapeutic diet consultation",
  ],
  openGraph: {
    title: "Book Nutrition Consultation - Krisha Nobora, RND",
    description:
      "Schedule your personalized nutrition consultation with expert guidance for weight management, therapeutic diets, and healthy lifestyle changes.",
    url: "https://nutrisha.vercel.app/book-appointment",
    type: "website",
  },
  alternates: {
    canonical: "/book-appointment",
  },
};

type BookingStep = "type" | "datetime" | "form" | "confirmation";

export default function BookAppointmentPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("type");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const steps = [
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
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const canProceedToDateTime = selectedType !== null;
  const canProceedToForm = selectedDate && selectedTime;
  const canProceedToConfirmation = true; // Form validation handled in BookingForm

  const handleNext = () => {
    if (currentStep === "type" && canProceedToDateTime) {
      setCurrentStep("datetime");
    } else if (currentStep === "datetime" && canProceedToForm) {
      setCurrentStep("form");
    }
  };

  const handleBack = () => {
    if (currentStep === "datetime") {
      setCurrentStep("type");
    } else if (currentStep === "form") {
      setCurrentStep("datetime");
    } else if (currentStep === "confirmation") {
      setCurrentStep("form");
    }
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setBookingConfirmed(true);
    setCurrentStep("confirmation");
  };

  if (bookingConfirmed && currentStep === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50/30 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="h-20 w-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for booking your appointment with Krisha. You'll
                receive a confirmation email shortly with all the details.
              </p>
            </div>

            <Card className="border-sage-100 mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Appointment Details
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">Initial Consultation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">90 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button
                className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-8 py-3"
                onClick={() => (window.location.href = "/")}
              >
                Return to Home
              </Button>
              <p className="text-sm text-gray-500">
                Need to make changes? Contact us at{" "}
                <a
                  href="mailto:hello@missnutrition.krisha"
                  className="text-sage-600 hover:underline"
                >
                  hello@missnutrition.krisha
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/30 to-white">
      {/* Header */}
      <header className="bg-white border-b border-sage-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Book Your Appointment
              </h1>
              <p className="text-gray-600">
                Schedule your personalized nutrition consultation
              </p>
            </div>
            <Badge className="bg-sage-100 text-sage-800 px-4 py-2">
              Step {currentStepIndex + 1} of {steps.length}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <Progress value={progress} className="h-2 bg-sage-100" />
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = index < currentStepIndex;
                const IconComponent = step.icon;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-sage-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <IconComponent className="h-5 w-5" />
                      )}
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-sm font-medium ${
                          isActive ? "text-sage-600" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400 hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === "type" && (
          <AppointmentTypes
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        )}

        {currentStep === "datetime" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Date & Time
              </h2>
              <p className="text-gray-600">
                Choose your preferred appointment slot
              </p>
            </div>
            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
            />
          </div>
        )}

        {currentStep === "form" &&
          selectedType &&
          selectedDate &&
          selectedTime && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Complete Your Information
                </h2>
                <p className="text-gray-600">
                  Help us prepare for your consultation
                </p>
              </div>
              <BookingForm
                appointmentType={selectedType}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

        {/* Navigation Buttons */}
        {currentStep !== "confirmation" && (
          <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === "type"}
              className="border-sage-200 text-sage-700 hover:bg-sage-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep !== "form" && (
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === "type" && !canProceedToDateTime) ||
                  (currentStep === "datetime" && !canProceedToForm)
                }
                className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
