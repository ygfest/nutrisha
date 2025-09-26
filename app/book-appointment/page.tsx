import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BookingPageClient } from "./booking-page-client";
import { BookingPageSkeleton } from "@/components/shared/booking-page-skeleton";
import { getAppointmentTypes } from "@/actions/booking-data";

// This is now a Server Component
export default async function BookAppointmentPage() {
  // Create a new QueryClient for this request
  const queryClient = new QueryClient();

  // Prefetch static data that doesn't change often
  await queryClient.prefetchQuery({
    queryKey: ["appointment-types"],
    queryFn: getAppointmentTypes,
    staleTime: 1000 * 60 * 60, // 1 hour - this data rarely changes
  });

  // Note: Time slots are now fetched dynamically based on selected date
  // using the useAvailabilityQuery hook in BookingCalendar component

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/30 to-white">
      <Suspense fallback={<BookingPageSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BookingPageClient />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}

