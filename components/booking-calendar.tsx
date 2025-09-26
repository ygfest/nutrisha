"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { useAvailabilityQuery } from "@/hooks/use-availability-query";
import { getNowInManila, isTodayInManila } from "@/lib/timezone-utils";

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

// Time slots organized by time periods
const timeSlots = {
  morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
};

const allTimeSlots = [...timeSlots.morning, ...timeSlots.afternoon];

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
}: BookingCalendarProps) {
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
    return date < today || date.getDay() === 0;
  };

  const isTimeAvailable = (time: string) => {
    if (!selectedDate) return false;
    return availableSlots.includes(time);
  };

  const getAvailableSlotsForPeriod = (period: 'morning' | 'afternoon') => {
    return timeSlots[period].filter(time => isTimeAvailable(time));
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center px-4 py-2 bg-sage-50 rounded-full">
          <CalendarIcon className="h-4 w-4 text-sage-600 mr-2" />
          <span className="text-sage-700 font-medium text-sm">Step 2 of 4</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Date & Time</h2>
        <p className="text-gray-600">Select your preferred appointment date and time slot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Calendar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-sage-25">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center mr-3">
                  <CalendarIcon className="h-5 w-5 text-sage-600" />
                </div>
                Select Date
              </CardTitle>
              <p className="text-gray-600 ml-13">Choose from available dates</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onDateSelect}
                  disabled={isDateDisabled}
                  className="w-full"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                    month: "space-y-4 w-full flex flex-col",
                    caption: "flex justify-center pt-1 relative items-center mb-4",
                    caption_label: "text-lg font-semibold text-gray-900",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-9 w-9 bg-sage-50 hover:bg-sage-100 rounded-xl p-0 transition-colors duration-200 flex items-center justify-center",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse",
                    head_row: "flex w-full",
                    head_cell: "text-sage-600 rounded-md w-12 h-12 font-medium text-sm flex items-center justify-center",
                    row: "flex w-full mt-1",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-12 h-12",
                    day: "h-12 w-12 p-0 font-medium rounded-xl transition-all duration-200 hover:bg-sage-50 flex items-center justify-center",
                    day_selected: "bg-gradient-to-br from-sage-500 to-sage-600 text-white hover:from-sage-600 hover:to-sage-700 shadow-md transform scale-105",
                    day_today: "bg-sage-100 text-sage-900 font-bold",
                    day_outside: "text-gray-300 opacity-50",
                    day_disabled: "text-gray-300 opacity-50 cursor-not-allowed hover:bg-transparent",
                    day_range_middle: "aria-selected:bg-sage-100 aria-selected:text-sage-900",
                    day_hidden: "invisible",
                  }}
                />
              </div>

              {/* Enhanced Legend */}
              <div className="bg-gradient-to-r from-sage-50 to-emerald-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Legend</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-sage-500 to-sage-600 rounded-lg shadow-sm"></div>
                    <span className="text-gray-700 font-medium">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-sage-100 rounded-lg"></div>
                    <span className="text-gray-700">Today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-lg"></div>
                    <span className="text-gray-500">Unavailable</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Time Slots */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-sage-25">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-sage-600" />
                </div>
                Time Slots
              </CardTitle>
              {selectedDate && (
                <div className="ml-13 bg-white rounded-xl p-3 border border-sage-100">
                  <p className="text-sm font-medium text-gray-900">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    Philippines Time (GMT+8)
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-sage-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Select a date first</p>
                  <p className="text-gray-400 text-sm mt-1">Available times will appear here</p>
                </div>
              ) : loading ? (
                <div className="text-center py-12">
                  <div className="relative w-12 h-12 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-sage-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-sage-500 border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-gray-600 font-medium">Loading times...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Morning Slots */}
                  {getAvailableSlotsForPeriod('morning').length > 0 && (
                    <TimeSlotGroup
                      title="Morning"
                      subtitle="9:00 AM - 12:00 PM"
                      slots={timeSlots.morning}
                      availableSlots={availableSlots}
                      selectedTime={selectedTime}
                      onTimeSelect={onTimeSelect}
                      isTimeAvailable={isTimeAvailable}
                    />
                  )}

                  {/* Afternoon Slots */}
                  {getAvailableSlotsForPeriod('afternoon').length > 0 && (
                    <TimeSlotGroup
                      title="Afternoon"
                      subtitle="1:00 PM - 5:00 PM"
                      slots={timeSlots.afternoon}
                      availableSlots={availableSlots}
                      selectedTime={selectedTime}
                      onTimeSelect={onTimeSelect}
                      isTimeAvailable={isTimeAvailable}
                    />
                  )}

                  {/* No Available Times */}
                  {availableSlots.length === 0 && !error && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 text-red-400" />
                      </div>
                      <p className="text-red-600 font-medium">No available times</p>
                      <p className="text-red-500 text-sm mt-1">Please try another date</p>
                    </div>
                  )}

                  {/* Error State */}
                  {error && (
                    <div className="text-center py-8 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-red-600 font-medium">Unable to load times</p>
                      <p className="text-red-500 text-sm mt-1">Please try again</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface TimeSlotGroupProps {
  title: string;
  subtitle: string;
  slots: string[];
  availableSlots: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  isTimeAvailable: (time: string) => boolean;
}

function TimeSlotGroup({
  title,
  subtitle,
  slots,
  selectedTime,
  onTimeSelect,
  isTimeAvailable,
}: TimeSlotGroupProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {slots.map((time: string) => {
          const isAvailable = isTimeAvailable(time);
          const isSelected = selectedTime === time;

          if (!isAvailable) return null;

          return (
            <Button
              key={time}
              variant={isSelected ? "default" : "outline"}
              className={`h-11 text-sm font-medium transition-all duration-200 justify-between ${
                isSelected
                  ? "bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white shadow-md border-0"
                  : "border-sage-200 hover:bg-sage-50 hover:border-sage-300 hover:shadow-sm bg-white"
              }`}
              onClick={() => onTimeSelect(time)}
            >
              <span>{time}</span>
              {isSelected && <CheckCircle className="h-4 w-4" />}
            </Button>
          );
        })}
      </div>
    </div>
  );
}