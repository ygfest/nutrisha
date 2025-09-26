import { useState, useEffect } from "react";
import { BookingStep, BookingState } from "@/types/booking";
import { BOOKING_STEPS } from "@/lib/booking-constants";

export function useBookingSteps() {
  const [bookingState, setBookingState] = useState<BookingState>({
    currentStep: "type",
    selectedType: null,
    selectedDate: undefined,
    selectedTime: null,
    bookingConfirmed: false,
    bookingData: null,
  });

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [bookingState.currentStep]);

  const currentStepIndex = BOOKING_STEPS.findIndex(
    (step) => step.id === bookingState.currentStep
  );
  const progress = ((currentStepIndex + 1) / BOOKING_STEPS.length) * 100;

  const canProceedToDateTime = bookingState.selectedType !== null;
  const canProceedToForm = bookingState.selectedDate && bookingState.selectedTime;

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const setCurrentStep = (step: BookingStep) => {
    updateBookingState({ currentStep: step });
  };

  const setSelectedType = (type: string | null) => {
    updateBookingState({ selectedType: type });
  };

  const setSelectedDate = (date: Date | undefined) => {
    updateBookingState({ selectedDate: date });
  };

  const setSelectedTime = (time: string | null) => {
    updateBookingState({ selectedTime: time });
  };

  const setBookingConfirmed = (confirmed: boolean) => {
    updateBookingState({ bookingConfirmed: confirmed });
  };

  const setBookingData = (data: any) => {
    updateBookingState({ bookingData: data });
  };

  const handleNext = () => {
    if (bookingState.currentStep === "type" && canProceedToDateTime) {
      setCurrentStep("datetime");
    } else if (bookingState.currentStep === "datetime" && canProceedToForm) {
      setCurrentStep("form");
    }
  };

  const handleBack = () => {
    if (bookingState.currentStep === "datetime") {
      setCurrentStep("type");
    } else if (bookingState.currentStep === "form") {
      setCurrentStep("datetime");
    }
  };

  const canGoNext = () => {
    if (bookingState.currentStep === "type") return canProceedToDateTime;
    if (bookingState.currentStep === "datetime") return canProceedToForm;
    return false;
  };

  const canGoBack = () => {
    return bookingState.currentStep !== "type" && bookingState.currentStep !== "confirmation";
  };

  return {
    bookingState,
    steps: BOOKING_STEPS,
    currentStepIndex,
    progress,
    canProceedToDateTime,
    canProceedToForm,
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
  };
}