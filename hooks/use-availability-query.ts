"use client";

import { useQuery } from "@tanstack/react-query";
import { PHILIPPINES_TIMEZONE } from "@/lib/timezone-utils";

interface AvailabilityData {
  date: string;
  availableSlots: string[];
  bookedSlots: string[];
}

async function fetchAvailability(
  date: string,
  timezone: string
): Promise<AvailabilityData> {
  const url = `/api/availability?date=${date}&timezone=${encodeURIComponent(timezone)}`;

  if (process.env.NODE_ENV === "development") {
    console.log(`Fetching availability: ${url}`);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch availability");
  }

  return response.json();
}

export function useAvailabilityQuery(date?: string, enabled: boolean = true) {
  // Use Philippines timezone
  const timezone = PHILIPPINES_TIMEZONE;

  return useQuery({
    queryKey: ["availability", date, timezone],
    queryFn: () => fetchAvailability(date!, timezone),
    enabled: enabled && !!date, // Only run query if date is provided and enabled
    staleTime: 1000 * 60 * 5, // 5 minutes - availability can change frequently
    refetchOnWindowFocus: true, // Refetch when user comes back to tab
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes to keep data fresh
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
