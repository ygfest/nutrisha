"use client";

import { useMutation } from "@tanstack/react-query";

/**
 * Custom TanStack Query mutation hook for booking appointments.
 *
 * Features:
 * - Automatic retry logic for network errors (up to 2 retries)
 * - Exponential backoff retry delay
 * - Proper error handling for different error types
 * - Type-safe request/response interfaces
 *
 * @example
 * ```tsx
 * const bookingMutation = useBookingMutation();
 *
 * const handleSubmit = (formData) => {
 *   bookingMutation.mutate(formData, {
 *     onSuccess: (data) => console.log('Booking successful:', data),
 *     onError: (error) => console.error('Booking failed:', error)
 *   });
 * };
 *
 * // Access loading state: bookingMutation.isPending
 * // Access error state: bookingMutation.error
 * ```
 */

interface BookingFormData {
  clientName: string;
  email: string;
  phone: string;
  appointmentType: string;
  selectedDate: string;
  selectedTime: string;
  paymentMethod: string;
  specialRequests?: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  medicalConditions: string;
  allergies: string;
  currentMedications: string;
  dietaryRestrictions: string;
  activityLevel: string;
  healthGoals: string;
}

interface BookingResponse {
  success: boolean;
  clientName: string;
  bookingId: string;
  meetLink: string;
  googleCalendarUrl: string;
  outlookCalendarUrl: string;
  message: string;
}

async function createBooking(
  bookingData: BookingFormData
): Promise<BookingResponse> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to book appointment");
  }

  return response.json();
}

export function useBookingMutation() {
  return useMutation({
    mutationFn: createBooking,
    retry: (failureCount, error) => {
      // Retry up to 2 times for network errors, but not for client errors (4xx)
      if (failureCount >= 2) return false;
      if (error.message.includes("4")) return false; // Don't retry 4xx errors
      return true;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    onSuccess: (data) => {
      console.log("Booking created successfully:", data);
    },
    onError: (error) => {
      console.error("Booking failed:", error);
    },
  });
}
