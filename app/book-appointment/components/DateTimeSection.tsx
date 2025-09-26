import { BookingCalendar } from "@/components/booking-calendar";

interface DateTimeSectionProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export default function DateTimeSection({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
}: DateTimeSectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Date & Time
        </h2>
        <p className="text-gray-600">
          Choose your preferred appointment slot
        </p>
      </div>
      <BookingCalendar
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        selectedTime={selectedTime}
        onTimeSelect={onTimeSelect}
      />
    </div>
  );
}