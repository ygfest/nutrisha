"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getTodaysBookings } from "@/actions/dashboard";
import type { Booking } from "@/lib/types";

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const getBookingColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "initial consultation":
      return "bg-sage-50 border-sage-200";
    case "follow-up":
      return "bg-yellow-50 border-yellow-200";
    case "meal planning":
      return "bg-blue-50 border-blue-200";
    case "sports nutrition":
      return "bg-green-50 border-green-200";
    case "health assessment":
      return "bg-purple-50 border-purple-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

const getBookingTextColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "initial consultation":
      return "text-sage-600";
    case "follow-up":
      return "text-yellow-600";
    case "meal planning":
      return "text-blue-600";
    case "sports nutrition":
      return "text-green-600";
    case "health assessment":
      return "text-purple-600";
    default:
      return "text-gray-600";
  }
};

export function TodaysSchedule() {
  const { data: todaysBookings, isLoading } = useQuery({
    queryKey: ["todays-bookings"],
    queryFn: getTodaysBookings,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return (
    <Card className="border-sage-100">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-sage-600" />
          <span>Today's Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : todaysBookings?.length === 0 ? (
          <div className="text-center py-6">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No appointments today</p>
            <p className="text-gray-400 text-sm">Enjoy your free day!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysBookings?.map((booking) => (
              <div
                key={booking.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${getBookingColor(
                  booking.type
                )}`}
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {booking.client?.name || "Unknown Client"}
                  </div>
                  <div className="text-sm text-gray-600">{booking.type}</div>
                </div>
                <div
                  className={`text-sm font-medium ${getBookingTextColor(
                    booking.type
                  )}`}
                >
                  {formatTime(booking.time)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
