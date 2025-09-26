"use client";

import { BookingSuccessContent } from "@/components/booking-success-content";
import { BookingHeader } from "@/components/features/booking/booking-header";
import { BookingStepContent } from "@/components/features/booking/booking-step-content";
import { BookingNavigation } from "@/components/features/booking/booking-navigation";
import { PHILIPPINES_TIMEZONE } from "@/lib/timezone-utils";
import { APPOINTMENT_TYPE_NAMES, APPOINTMENT_TYPE_DURATIONS } from "@/lib/booking-constants";
import { useBookingSteps } from "@/hooks/use-booking-steps";
import { useBookingMutation } from "@/hooks/use-booking-mutation";
import { BookingFormData, BookingRequest } from "@/types/booking";

export function BookingFlow() {
  const {
    bookingState
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
    const bookingRequest: BookingRequest = {
      ...formData,
      appointmentType: bookingState.selectedType!,
      date: bookingState.selectedDate!,
      time: bookingState.selectedTime!,
      timezone: PHILIPPINES_TIMEZONE,
    };

    bookingMutation.mutate(bookingRequest);
  };

  if (bookingState.bookingConfirmed && bookingState.currentStep === "confirmation" && bookingState.bookingData) {
    return <BookingSuccessContent bookingData={bookingState.bookingData} />;
  }

  return (
    <>
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
    </>
  );
}