"use server";

import { createEvent } from "ics";
import { v4 as uuidv4 } from "uuid";

interface AppointmentDetails {
  clientName: string;
  appointmentType: string;
  date: string; // Format: "Monday, December 16, 2024"
  time: string; // Format: "10:00 AM"
  duration: number; // in minutes
  bookingId: string;
  clientEmail: string;
}

// Generate a Google Meet link (using predefined meeting code)
export async function generateGoogleMeetLink(): Promise<string> {
  return `https://meet.google.com/hdw-jxot-dma`;
}

// Convert date and time to proper format for calendar
function parseDateTime(dateStr: string, timeStr: string): Date {
  // Parse "Monday, December 16, 2024" and "10:00 AM"
  const cleanDateStr = dateStr.replace(/,/g, "");
  const dateTime = new Date(`${cleanDateStr} ${timeStr}`);
  return dateTime;
}

// Generate calendar event data
export async function generateCalendarEvent(
  details: AppointmentDetails,
  meetLink: string
) {
  const startDate = parseDateTime(details.date, details.time);
  const endDate = new Date(startDate.getTime() + details.duration * 60000);

  const event = {
    start: [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
    ] as [number, number, number, number, number],
    end: [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
    ] as [number, number, number, number, number],
    title: `${details.appointmentType} - Krisha Nobora, RND`,
    description: `
Nutrition Consultation with Krisha Nobora, RND

Client: ${details.clientName}
Service: ${details.appointmentType}
Duration: ${details.duration} minutes
Booking ID: #${details.bookingId}

Join the virtual consultation:
${meetLink}

Preparation:
- Please have your health goals and questions ready
- Bring any relevant medical records
- Ensure stable internet connection for video call

Contact: missnutrition.krisha@gmail.com
    `.trim(),
    location: `Virtual Consultation - ${meetLink}`,
    attendees: [
      { name: details.clientName, email: details.clientEmail },
      {
        name: "Krisha Nobora, RND",
        email: process.env.GMAIL_EMAIL || "missnutrition.krisha@gmail.com",
      },
    ],
    organizer: {
      name: "Krisha Nobora, RND",
      email: process.env.GMAIL_EMAIL || "missnutrition.krisha@gmail.com",
    },
    uid: `booking-${details.bookingId}@nutrisha.com`,
    productId: "Nutrisha Booking System",
  };

  return event;
}

// Generate ICS file content
export async function generateICSFile(
  details: AppointmentDetails,
  meetLink: string
): Promise<string> {
  const event = await generateCalendarEvent(details, meetLink);

  return new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value || "");
      }
    });
  });
}

// Generate Google Calendar quick-add URL
export async function generateGoogleCalendarUrl(
  details: AppointmentDetails,
  meetLink: string
): Promise<string> {
  const startDate = parseDateTime(details.date, details.time);
  const endDate = new Date(startDate.getTime() + details.duration * 60000);

  // Format dates for Google Calendar URL (YYYYMMDDTHHMMSSZ)
  const formatDateForGoogle = (date: Date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const title = encodeURIComponent(
    `${details.appointmentType} - Krisha Nobora, RND`
  );
  const description = encodeURIComponent(
    `
Nutrition Consultation with Krisha Nobora, RND

Client: ${details.clientName}
Service: ${details.appointmentType}
Booking ID: #${details.bookingId}

Join the virtual consultation: ${meetLink}

Preparation:
- Please have your health goals and questions ready
- Bring any relevant medical records
- Ensure stable internet connection for video call
  `.trim()
  );

  const location = encodeURIComponent(`Virtual Consultation - ${meetLink}`);
  const dates = `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${description}&location=${location}`;
}

// Generate Outlook Calendar URL
export async function generateOutlookCalendarUrl(
  details: AppointmentDetails,
  meetLink: string
): Promise<string> {
  const startDate = parseDateTime(details.date, details.time);
  const endDate = new Date(startDate.getTime() + details.duration * 60000);

  const title = encodeURIComponent(
    `${details.appointmentType} - Krisha Nobora, RND`
  );
  const body = encodeURIComponent(
    `
Nutrition Consultation with Krisha Nobora, RND

Client: ${details.clientName}
Service: ${details.appointmentType}
Booking ID: #${details.bookingId}

Join the virtual consultation: ${meetLink}
  `.trim()
  );

  const location = encodeURIComponent(`Virtual Consultation - ${meetLink}`);
  const startTime = startDate.toISOString();
  const endTime = endDate.toISOString();

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&location=${location}&startdt=${startTime}&enddt=${endTime}`;
}
