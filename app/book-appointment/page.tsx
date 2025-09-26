import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BookingFlow } from "@/components/features/booking/booking-flow";
import { BookingPageSkeleton } from "@/components/shared/booking-page-skeleton";
import { getAppointmentTypes } from "@/actions/booking-data";

export default async function BookAppointmentPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["appointment-types"],
    queryFn: getAppointmentTypes,
    staleTime: 1000 * 60 * 60, // 1 hour - this data rarely changes
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/30 to-white">
      <Suspense fallback={<BookingPageSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BookingFlow />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}