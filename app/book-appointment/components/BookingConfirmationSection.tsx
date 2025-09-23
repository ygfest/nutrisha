import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface BookingData {
  clientName: string;
  bookingId: string;
  appointmentType: string;
  selectedDate: Date;
  selectedTime: string;
  duration: number;
  meetLink?: string;
  googleCalendarUrl?: string;
  outlookCalendarUrl?: string;
}

interface BookingConfirmationSectionProps {
  bookingData: BookingData;
}

export default function BookingConfirmationSection({
  bookingData,
}: BookingConfirmationSectionProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="h-20 w-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you,{" "}
            <span className="font-semibold text-sage-600">
              {bookingData.clientName}
            </span>
            , for booking your appointment with Krisha. You'll receive a
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
                <span className="font-medium">#{bookingData.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="font-medium">{bookingData.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">
                  {bookingData.appointmentType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {bookingData.selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{bookingData.selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{bookingData.duration} minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Virtual Consultation Section */}
        {bookingData.meetLink && (
          <Card className="border-sage-200 bg-gradient-to-r from-sage-50 to-sage-100 mb-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-sage-900 mb-2 text-lg">
                  Virtual Consultation
                </h3>
                <p className="text-sage-700 mb-4">
                  Join your appointment using Google Meet
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white mb-4"
                >
                  <a
                    href={bookingData.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Google Meet
                  </a>
                </Button>
                <p className="text-sm text-sage-600">
                  Meeting link: <br />
                  <span className="font-mono text-xs break-all bg-white px-2 py-1 rounded border">
                    {bookingData.meetLink}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calendar Section */}
        {(bookingData.googleCalendarUrl || bookingData.outlookCalendarUrl) && (
          <Card className="border-sage-200 bg-gradient-to-r from-sage-50 to-sage-100 mb-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-sage-900 mb-2 text-lg">
                  Add to Your Calendar
                </h3>
                <p className="text-sage-700 mb-4">
                  Never miss your appointment - add it to your calendar now!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {bookingData.googleCalendarUrl && (
                    <Button
                      asChild
                      className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white border-0"
                    >
                      <a
                        href={bookingData.googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Calendar
                      </a>
                    </Button>
                  )}
                  {bookingData.outlookCalendarUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-sage-400 text-sage-700 hover:bg-sage-100"
                    >
                      <a
                        href={bookingData.outlookCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Outlook Calendar
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
      </div>
    </div>
  );
}