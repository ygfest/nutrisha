import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BookingPageClient } from "./booking-page-client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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

// Loading skeleton component
function BookingPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/30 to-white">
      <header className="bg-white border-b border-sage-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="mt-6">
            <div className="h-2 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </main>
    </div>
  );
}
