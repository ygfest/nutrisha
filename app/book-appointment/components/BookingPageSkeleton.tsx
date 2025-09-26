import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function BookingPageSkeleton() {
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