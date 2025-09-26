"use client";

import { AppointmentTypes } from "@/components/appointment-types";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingForm } from "@/components/booking-form";
import { BookingSuccessContent } from "@/components/booking-success-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PHILIPPINES_TIMEZONE } from "@/lib/timezone-utils";
import { APPOINTMENT_TYPE_NAMES, APPOINTMENT_TYPE_DURATIONS } from "@/lib/booking-constants";
import { useBookingSteps } from "@/hooks/use-booking-steps";
import { useBookingMutation } from "@/hooks/use-booking-mutation";
import { BookingFormData, BookingRequest } from "@/types/booking";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Calendar,
  User,
} from "lucide-react";

export function BookingPageClient() {
  const {
    bookingState,
    steps,
    currentStepIndex,
    progress,
    setCurrentStep,
    setSelectedType,
    setSelectedDate,
    setSelectedTime,
    setBookingConfirmed,
    setBookingData,
    handleNext,
    handleBack,
    canGoNext,
    canGoBack,
  } = useBookingSteps();

  const bookingMutation = useBookingMutation({
    onSuccess: (result) => {
      const formattedBookingData = {
        clientName: result.clientName,
        bookingId: result.bookingId,
        appointmentType: APPOINTMENT_TYPE_NAMES[bookingState.selectedType!],
        selectedDate: bookingState.selectedDate,
        selectedTime: bookingState.selectedTime,
        duration: APPOINTMENT_TYPE_DURATIONS[bookingState.selectedType!],
        meetLink: result.meetLink,
        googleCalendarUrl: result.googleCalendarUrl,
        outlookCalendarUrl: result.outlookCalendarUrl,
      };
      setBookingData(formattedBookingData);
      setBookingConfirmed(true);
      setCurrentStep("confirmation");
    },
  });

  const handleFormSubmit = async (formData: BookingFormData) => {
    // Format date in Manila timezone to avoid UTC conversion issues
    const manilaDate = bookingState.selectedDate
      ? bookingState.selectedDate.toLocaleDateString("en-CA", {
          timeZone: PHILIPPINES_TIMEZONE,
        })
      : undefined;

    const bookingRequest: BookingRequest = {
      ...formData,
      appointmentType: bookingState.selectedType!,
      date: bookingState.selectedDate!,
      time: bookingState.selectedTime!,
      timezone: PHILIPPINES_TIMEZONE,
    };

    bookingMutation.mutate(bookingRequest);
  };

  // Show success page when booking is confirmed
  if (bookingState.bookingConfirmed && bookingState.currentStep === "confirmation" && bookingState.bookingData) {
    return <BookingSuccessContent bookingData={bookingState.bookingData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/30 to-white">
      <BookingHeader
        steps={steps}
        currentStepIndex={currentStepIndex}
        progress={progress}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BookingStepContent
            currentStep={bookingState.currentStep}
            bookingState={bookingState}
            onTypeSelect={setSelectedType}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            onFormSubmit={handleFormSubmit}
            isSubmitting={bookingMutation.isPending}
          />

          <BookingNavigation
            currentStep={bookingState.currentStep}
            canGoNext={canGoNext()}
            canGoBack={canGoBack()}
            onNext={handleNext}
            onBack={handleBack}
            isSubmitting={bookingMutation.isPending}
          />
        </div>
      </main>
    </div>
  );
}

interface BookingHeaderProps {
  steps: any[];
  currentStepIndex: number;
  progress: number;
}

function BookingHeader({ steps, currentStepIndex, progress }: BookingHeaderProps) {
  return (
    <header className="bg-white border-b border-sage-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Book Your Nutrition Consultation
            </h1>
            <p className="text-gray-600 mt-1">
              Schedule your personalized session with Krisha Nobora, RND
            </p>
          </div>
          <Badge variant="outline" className="text-sage-600 border-sage-200">
            Step {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />

          <div className="flex items-center justify-between text-sm">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    isActive
                      ? "text-sage-600 font-semibold"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive
                        ? "bg-sage-100 text-sage-600"
                        : isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

interface BookingStepContentProps {
  currentStep: string;
  bookingState: any;
  onTypeSelect: (type: string) => void;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onFormSubmit: (formData: BookingFormData) => void;
  isSubmitting: boolean;
}

function BookingStepContent({
  currentStep,
  bookingState,
  onTypeSelect,
  onDateSelect,
  onTimeSelect,
  onFormSubmit,
  isSubmitting,
}: BookingStepContentProps) {
  if (currentStep === "type") {
    return (
      <AppointmentTypes
        selectedType={bookingState.selectedType}
        onTypeSelect={onTypeSelect}
      />
    );
  }

  if (currentStep === "datetime") {
    return (
      <BookingCalendar
        selectedType={bookingState.selectedType}
        selectedDate={bookingState.selectedDate}
        selectedTime={bookingState.selectedTime}
        onDateSelect={onDateSelect}
        onTimeSelect={onTimeSelect}
      />
    );
  }

  if (currentStep === "form") {
    return (
      <BookingForm
        selectedType={bookingState.selectedType}
        selectedDate={bookingState.selectedDate}
        selectedTime={bookingState.selectedTime}
        onSubmit={onFormSubmit}
        isSubmitting={isSubmitting}
      />
    );
  }

  return null;
}

interface BookingNavigationProps {
  currentStep: string;
  canGoNext: boolean;
  canGoBack: boolean;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

function BookingNavigation({
  currentStep,
  canGoNext,
  canGoBack,
  onNext,
  onBack,
  isSubmitting,
}: BookingNavigationProps) {
  if (currentStep === "form" || currentStep === "confirmation") {
    return null; // Form has its own submit button
  }

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={!canGoBack || isSubmitting}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>

      <Button
        onClick={onNext}
        disabled={!canGoNext || isSubmitting}
        className="flex items-center space-x-2"
      >
        <span>Next</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}