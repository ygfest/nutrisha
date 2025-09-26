export type BookingStep = "type" | "datetime" | "form" | "confirmation";

export interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  description?: string;
}

export interface BookingStepConfig {
  id: BookingStep;
  title: string;
  icon: any;
  description: string;
}

export interface BookingFormData {
  clientName: string;
  email: string;
  phone: string;
  message?: string;
}

export interface BookingRequest {
  appointmentType: string;
  date: Date;
  time: string;
  clientName: string;
  email: string;
  phone: string;
  message?: string;
  timezone: string;
}

export interface BookingResponse {
  bookingId: string;
  clientName: string;
  appointmentType: string;
  date: Date;
  time: string;
  duration: number;
  meetLink: string;
  googleCalendarUrl: string;
  outlookCalendarUrl: string;
}

export interface BookingState {
  currentStep: BookingStep;
  selectedType: string | null;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  bookingConfirmed: boolean;
  bookingData: BookingResponse | null;
}