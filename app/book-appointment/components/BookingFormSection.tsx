import { BookingForm } from "@/components/booking-form";

interface BookingFormSectionProps {
  selectedType: string;
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
  error?: Error | null;
}

export default function BookingFormSection({
  selectedType,
  selectedDate,
  selectedTime,
  onSubmit,
  isSubmitting,
  error,
}: BookingFormSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Complete Your Information
        </h2>
        <p className="text-gray-600">
          Help us prepare for your consultation
        </p>
      </div>

      {/* Display mutation error if any */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            {error.message || "An error occurred while booking your appointment."}
          </p>
        </div>
      )}

      <BookingForm
        appointmentType={selectedType}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}