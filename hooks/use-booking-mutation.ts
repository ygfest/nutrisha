import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { BookingRequest, BookingResponse } from "@/types/booking";

const createBooking = async (bookingData: BookingRequest): Promise<BookingResponse> => {
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
};

interface UseBookingMutationOptions {
  onSuccess?: (result: BookingResponse) => void;
  onError?: (error: Error) => void;
}

export function useBookingMutation(options: UseBookingMutationOptions = {}) {
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (result) => {
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully booked.",
      });
      options.onSuccess?.(result);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description:
          error.message || "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
      options.onError?.(error);
    },
  });
}