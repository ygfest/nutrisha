import React from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookingSuccessContentProps {
  clientName: string;
  bookingId: string;
  appointmentType: string;
  date: string;
  time: string;
  duration: number;
  isEmailVersion?: boolean;
}

export const BookingSuccessContent: React.FC<BookingSuccessContentProps> = ({
  clientName,
  bookingId,
  appointmentType,
  date,
  time,
  duration,
  isEmailVersion = false,
}) => {
  const containerClasses = isEmailVersion
    ? ""
    : "min-h-screen bg-gradient-to-br from-sage-50/30 to-white";

  const wrapperClasses = isEmailVersion ? "" : "container mx-auto px-4 py-16";

  const maxWidthClasses = isEmailVersion
    ? "max-w-2xl mx-auto"
    : "max-w-2xl mx-auto text-center";

  return (
    <div className={containerClasses}>
      <div className={wrapperClasses}>
        <div className={maxWidthClasses}>
          <div className="mb-8">
            <div className="h-20 w-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you,{" "}
              <span className="font-semibold text-sage-600">{clientName}</span>,
              for booking your appointment with Krisha. You'll receive a
              confirmation email shortly with all the details.
            </p>
          </div>

          <Card className="border-sage-100 mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Appointment Details
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">#{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{appointmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{duration} minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isEmailVersion && (
            <div className="space-y-4">
              <Button
                className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-8 py-3"
                onClick={() => (window.location.href = "/")}
              >
                Return to Home
              </Button>
              <p className="text-sm text-gray-500">
                Need to make changes? Contact us at{" "}
                <a
                  href="mailto:missnutrition.krisha@gmail.com"
                  className="text-sage-600 hover:underline"
                >
                  missnutrition.krisha@gmail.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
