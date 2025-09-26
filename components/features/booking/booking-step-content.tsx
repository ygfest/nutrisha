import { AppointmentTypes } from "@/components/appointment-types";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingForm } from "@/components/booking-form";
import { BookingState, BookingStep, BookingFormData } from "@/types/booking";

interface BookingStepContentProps {
  currentStep: BookingStep;
  bookingState: BookingState;
  onTypeSelect: (type: string) => void;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onFormSubmit: (formData: BookingFormData) => void;
  isSubmitting: boolean;
}

export function BookingStepContent({
  currentStep,
  bookingState,
  onTypeSelect,
  onDateSelect,
  onTimeSelect,
  onFormSubmit,
  isSubmitting,
}: BookingStepContentProps) {
  switch (currentStep) {
    case "type":
      return (
        <AppointmentTypes
          selectedType={bookingState.selectedType}
          onTypeSelect={onTypeSelect}
        />
      );

    case "datetime":
      return (
        <BookingCalendar
          selectedType={bookingState.selectedType}
          selectedDate={bookingState.selectedDate}
          selectedTime={bookingState.selectedTime}
          onDateSelect={onDateSelect}
          onTimeSelect={onTimeSelect}
        />
      );

    case "form":
      return (
        <BookingForm
          selectedType={bookingState.selectedType}
          selectedDate={bookingState.selectedDate}
          selectedTime={bookingState.selectedTime}
          onSubmit={onFormSubmit}
          isSubmitting={isSubmitting}
        />
      );

    case "confirmation":
      return null; // Handled separately in main component

    default:
      return null;
  }
}