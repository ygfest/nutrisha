// import { google } from "googleapis";

// interface MeetingDetails {
//   clientName: string;
//   clientEmail: string;
//   appointmentType: string;
//   date: string; // Format: "Monday, December 16, 2024"
//   time: string; // Format: "10:00 AM"
//   duration: number; // in minutes
//   bookingId: string;
// }

// // Initialize Google Calendar client
// function getCalendarClient() {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       type: "service_account",
//       project_id: process.env.GOOGLE_PROJECT_ID,
//       private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
//       private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//       client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       auth_uri: "https://accounts.google.com/o/oauth2/auth",
//       token_uri: "https://oauth2.googleapis.com/token",
//       auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//       client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
//     },
//     scopes: ["https://www.googleapis.com/auth/calendar"],
//   });

//   return google.calendar({ version: "v3", auth });
// }

// // Convert date and time to proper format for Google Calendar
// function parseDateTime(dateStr: string, timeStr: string): Date {
//   // Parse "Monday, December 16, 2024" and "10:00 AM"
//   const cleanDateStr = dateStr.replace(/,/g, "");
//   const dateTime = new Date(`${cleanDateStr} ${timeStr}`);
//   return dateTime;
// }

// // Create Google Meet event
// export async function createGoogleMeetEvent(details: MeetingDetails): Promise<{
//   meetLink: string;
//   eventId: string;
//   googleCalendarUrl: string;
// }> {
//   try {
//     const calendar = getCalendarClient();

//     const startDate = parseDateTime(details.date, details.time);
//     const endDate = new Date(startDate.getTime() + details.duration * 60000);

//     const event = {
//       summary: `${details.appointmentType} - Krisha Nobora, RND`,
//       description: `
// Nutrition Consultation with Krisha Nobora, RND

// Client: ${details.clientName}
// Service: ${details.appointmentType}
// Duration: ${details.duration} minutes
// Booking ID: #${details.bookingId}

// Preparation:
// - Please have your health goals and questions ready
// - Bring any relevant medical records
// - Ensure stable internet connection for video call

// Contact: missnutrition.krisha@gmail.com
//       `.trim(),
//       start: {
//         dateTime: startDate.toISOString(),
//         timeZone: "Asia/Manila", // Adjust timezone as needed
//       },
//       end: {
//         dateTime: endDate.toISOString(),
//         timeZone: "Asia/Manila",
//       },
//       attendees: [
//         { email: details.clientEmail, displayName: details.clientName },
//         {
//           email: process.env.GMAIL_EMAIL || "missnutrition.krisha@gmail.com",
//           displayName: "Krisha Nobora, RND",
//         },
//       ],
//       conferenceData: {
//         createRequest: {
//           requestId: `booking-${details.bookingId}-${Date.now()}`,
//           conferenceSolutionKey: {
//             type: "hangoutsMeet",
//           },
//         },
//       },
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: "email", minutes: 1440 }, // 24 hours before
//           { method: "popup", minutes: 60 }, // 1 hour before
//         ],
//       },
//     };

//     const response = await calendar.events.insert({
//       calendarId: "primary",
//       resource: event,
//       conferenceDataVersion: 1,
//       sendUpdates: "all", // Send invites to attendees
//     });

//     const createdEvent = response.data;
//     const meetLink =
//       createdEvent.conferenceData?.entryPoints?.find(
//         (entry) => entry.entryPointType === "video"
//       )?.uri || "";

//     const googleCalendarUrl = `https://calendar.google.com/calendar/event?eid=${Buffer.from(createdEvent.id || "").toString("base64")}`;

//     return {
//       meetLink,
//       eventId: createdEvent.id || "",
//       googleCalendarUrl,
//     };
//   } catch (error) {
//     console.error("Error creating Google Meet event:", error);

//     // Fallback to manual meet link if API fails
//     const fallbackMeetId = `${details.bookingId}-${Date.now().toString().slice(-6)}`;
//     return {
//       meetLink: `https://meet.google.com/${fallbackMeetId}`,
//       eventId: "",
//       googleCalendarUrl: "",
//     };
//   }
// }

// // Generate Outlook Calendar URL (fallback)
// export function generateOutlookCalendarUrl(
//   details: MeetingDetails,
//   meetLink: string
// ): string {
//   const startDate = parseDateTime(details.date, details.time);
//   const endDate = new Date(startDate.getTime() + details.duration * 60000);

//   const title = encodeURIComponent(
//     `${details.appointmentType} - Krisha Nobora, RND`
//   );
//   const body = encodeURIComponent(
//     `
// Nutrition Consultation with Krisha Nobora, RND

// Client: ${details.clientName}
// Service: ${details.appointmentType}
// Booking ID: #${details.bookingId}

// Join the virtual consultation: ${meetLink}
//   `.trim()
//   );

//   const location = encodeURIComponent(`Virtual Consultation - ${meetLink}`);
//   const startTime = startDate.toISOString();
//   const endTime = endDate.toISOString();

//   return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&location=${location}&startdt=${startTime}&enddt=${endTime}`;
// }
