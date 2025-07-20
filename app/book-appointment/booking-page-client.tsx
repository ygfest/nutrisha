"use client";

import { useState, useEffect } from "react";
import { AppointmentTypes } from "@/components/appointment-types";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingForm } from "@/components/booking-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useBookingMutation } from "@/hooks/use-booking-mutation";
import { toast } from "@/hooks/use-toast";
import { PHILIPPINES_TIMEZONE } from "@/lib/timezone-utils";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Calendar,
  User,
} from "lucide-react";

type BookingStep = "type" | "datetime" | "form" | "confirmation";

const appointmentTypeNames: Record<string, string> = {
  "initial-consultation": "Initial Consultation",
  "follow-up": "Follow-up Session",
  "meal-planning": "Meal Planning Session",
  "group-session": "Group Workshop",
  "sports-nutrition": "Sports Nutrition",
  "educational-session": "Nutrition Education",
};

const appointmentTypeDurations: Record<string, number> = {
  "initial-consultation": 90,
  "follow-up": 60,
  "meal-planning": 75,
  "group-session": 120,
  "sports-nutrition": 90,
  "educational-session": 60,
};

export function BookingPageClient() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("type");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  // TanStack Query mutation for booking
  const bookingMutation = useBookingMutation();

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
    // Format date in Manila timezone to avoid UTC conversion issues
    const manilaDate = selectedDate
      ? selectedDate.toLocaleDateString("en-CA", {
          timeZone: PHILIPPINES_TIMEZONE,
        })
      : undefined;

    bookingMutation.mutate(
      {
        ...formData,
        appointmentType: selectedType!,
        selectedDate: manilaDate!,
        selectedTime: selectedTime!,
      },
      {
        onSuccess: (result) => {
          setBookingData({
            clientName: result.clientName,
            bookingId: result.bookingId,
            appointmentType: appointmentTypeNames[selectedType!],
            selectedDate,
            selectedTime,
            duration: appointmentTypeDurations[selectedType!],
            meetLink: result.meetLink,
            googleCalendarUrl: result.googleCalendarUrl,
            outlookCalendarUrl: result.outlookCalendarUrl,
          });
          setBookingConfirmed(true);
          setCurrentStep("confirmation");
          toast({
            title: "Booking Confirmed!",
            description: "Your appointment has been successfully booked.",
          });
        },
        onError: (error) => {
          toast({
            title: "Booking Failed",
            description:
              error.message || "Failed to book appointment. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (bookingConfirmed && currentStep === "confirmation" && bookingData) {
    return (
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
              Thank you,{" "}
              <span className="font-semibold text-sage-600">
                {bookingData.clientName}
              </span>
              , for booking your appointment with Krisha. You'll receive a
              confirmation email shortly with all the details.
            </p>
          </div>

          <Card className="border-sage-100 mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Appointment Details
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">#{bookingData.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{bookingData.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">
                    {bookingData.appointmentType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {bookingData.selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">
                    {bookingData.selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {bookingData.duration} minutes
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Virtual Consultation Section */}
          {bookingData.meetLink && (
            <Card className="border-sage-200 bg-gradient-to-r from-sage-50 to-sage-100 mb-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-sage-900 mb-2 text-lg">
                    Virtual Consultation
                  </h3>
                  <p className="text-sage-700 mb-4">
                    Join your appointment using Google Meet
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white mb-4"
                  >
                    <a
                      href={bookingData.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Google Meet
                    </a>
                  </Button>
                  <p className="text-sm text-sage-600">
                    Meeting link: <br />
                    <span className="font-mono text-xs break-all bg-white px-2 py-1 rounded border">
                      {bookingData.meetLink}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Calendar Section */}
          {(bookingData.googleCalendarUrl ||
            bookingData.outlookCalendarUrl) && (
            <Card className="border-sage-200 bg-gradient-to-r from-sage-50 to-sage-100 mb-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-sage-900 mb-2 text-lg">
                    Add to Your Calendar
                  </h3>
                  <p className="text-sage-700 mb-4">
                    Never miss your appointment - add it to your calendar now!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {bookingData.googleCalendarUrl && (
                      <Button
                        asChild
                        className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white border-0"
                      >
                        <a
                          href={bookingData.googleCalendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Calendar
                        </a>
                      </Button>
                    )}
                    {bookingData.outlookCalendarUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="border-sage-400 text-sage-700 hover:bg-sage-100"
                      >
                        <a
                          href={bookingData.outlookCalendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Outlook Calendar
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
                href="mailto:missnutrition.krisha@gmail.com"
                className="text-sage-600 hover:underline"
              >
                missnutrition.krisha@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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

              {/* Display mutation error if any */}
              {bookingMutation.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    {bookingMutation.error.message ||
                      "An error occurred while booking your appointment."}
                  </p>
                </div>
              )}
              <BookingForm
                appointmentType={selectedType}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handleFormSubmit}
                isSubmitting={bookingMutation.isPending}
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
    </>
  );
}
