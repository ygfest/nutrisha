"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle } from "lucide-react";
import { useAvailabilityQuery } from "@/hooks/use-availability-query";
import { getNowInManila, isTodayInManila } from "@/lib/timezone-utils";

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

// All possible time slots - used for display order
const allTimeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
}: BookingCalendarProps) {
  // Get availability data using TanStack Query
  // Note: All times are handled in Philippines timezone (Asia/Manila)
  // Format date as YYYY-MM-DD for API consistency
  const dateStr = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : undefined;
  const {
    data: availabilityData,
    isLoading: loading,
    error,
  } = useAvailabilityQuery(dateStr, !!selectedDate);

  const availableSlots = availabilityData?.availableSlots || [];

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates and Sundays
    return date < today || date.getDay() === 0;
  };

  const isTimeAvailable = (time: string) => {
    if (!selectedDate) return false;
    // The backend already handles all availability logic including timezone
    // We just need to check if the slot is in the available list
    return availableSlots.includes(time);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={isDateDisabled}
            className="rounded-md border border-sage-200"
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-sage-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-sage-50 rounded-md",
              day_selected:
                "bg-sage-500 text-white hover:bg-sage-600 focus:bg-sage-600",
              day_today: "bg-sage-100 text-sage-900",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled:
                "text-muted-foreground opacity-50 cursor-not-allowed",
              day_range_middle:
                "aria-selected:bg-sage-100 aria-selected:text-sage-900",
              day_hidden: "invisible",
            }}
          />
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-sage-500 rounded-full"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-sage-100 rounded-full"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card className="border-sage-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-sage-600" />
            <span>Available Times</span>
          </CardTitle>
          {selectedDate && (
            <p className="text-sm text-gray-600">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {!selectedDate ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Please select a date to view available times
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading available times...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {allTimeSlots.map((time: string) => {
                const isAvailable = isTimeAvailable(time);
                const isSelected = selectedTime === time;

                return (
                  <Button
                    key={time}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-12 text-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-sage-500 hover:bg-sage-600 text-white"
                        : isAvailable
                          ? "border-sage-200 hover:bg-sage-50 hover:border-sage-300"
                          : "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
                    }`}
                    onClick={() => isAvailable && onTimeSelect(time)}
                    disabled={!isAvailable}
                  >
                    {isSelected && <CheckCircle className="h-4 w-4 mr-2" />}
                    {time}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Error state */}
          {selectedDate && error && (
            <div className="text-center py-6 bg-red-50 rounded-lg mt-4">
              <p className="text-red-600 font-medium">
                Failed to load availability
              </p>
              <p className="text-red-500 text-sm">
                Please try selecting the date again
              </p>
            </div>
          )}

          {/* No available times */}
          {selectedDate &&
            !loading &&
            !error &&
            availableSlots.length === 0 && (
              <div className="text-center py-6 bg-red-50 rounded-lg mt-4">
                <p className="text-red-600 font-medium">No available times</p>
                <p className="text-red-500 text-sm">
                  Please select a different date
                </p>
              </div>
            )}

          {selectedDate && (
            <div className="mt-6 p-4 bg-sage-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Time Zone</h4>
              <p className="text-sm text-gray-600">
                All times shown in Philippines time (Asia/Manila)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
