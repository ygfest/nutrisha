"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { PHILIPPINES_TIMEZONE } from "@/lib/timezone-utils";
import { createBooking } from "@/lib/booking-mutations";
import {
  appointmentTypeNames,
  appointmentTypeDurations,
  bookingSteps,
  type BookingStep,
} from "@/lib/booking-constants";
import BookingHeaderSection from "./components/BookingHeaderSection";
import AppointmentTypeSection from "./components/AppointmentTypeSection";
import DateTimeSection from "./components/DateTimeSection";
import BookingFormSection from "./components/BookingFormSection";
import BookingConfirmationSection from "./components/BookingConfirmationSection";
import BookingNavigationSection from "./components/BookingNavigationSection";

export function BookingPageClient() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("type");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  // React Query mutation directly in component
  const bookingMutation = useMutation({
    mutationFn: createBooking,
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
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description:
          error.message || "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const currentStepIndex = bookingSteps.findIndex((step) => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / bookingSteps.length) * 100;

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

    bookingMutation.mutate({
      ...formData,
      appointmentType: selectedType!,
      selectedDate: manilaDate!,
      selectedTime: selectedTime!,
    });
  };

  if (bookingConfirmed && currentStep === "confirmation" && bookingData) {
    return <BookingConfirmationSection bookingData={bookingData} />;
  }

  return (
    <>
      <BookingHeaderSection
        steps={bookingSteps}
        currentStep={currentStep}
        progress={progress}
      />

      <main className="container mx-auto px-4 py-8">
        {currentStep === "type" && (
          <AppointmentTypeSection
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        )}

        {currentStep === "datetime" && (
          <DateTimeSection
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />
        )}

        {currentStep === "form" &&
          selectedType &&
          selectedDate &&
          selectedTime && (
            <BookingFormSection
              selectedType={selectedType}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleFormSubmit}
              isSubmitting={bookingMutation.isPending}
              error={bookingMutation.error}
            />
          )}

        <BookingNavigationSection
          currentStep={currentStep}
          onBack={handleBack}
          onNext={handleNext}
          canProceedToDateTime={canProceedToDateTime}
          canProceedToForm={canProceedToForm}
        />
      </main>
    </>
  );
}
