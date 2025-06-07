import nodemailer from "nodemailer";
import {
  generateGoogleMeetLink,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
} from "./calendar-service";

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

interface BookingDetails {
  bookingId: string;
  clientName: string;
  email: string;
  phone: string;
  appointmentType: string;
  appointmentPrice: string;
  date: string;
  time: string;
  duration: number;
  paymentMethod: string;
  specialRequests?: string | null;
  meetLink?: string;
  googleCalendarUrl?: string;
  outlookCalendarUrl?: string;
}

function generateBookingConfirmationHTML(details: BookingDetails): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Krisha Nobora, RND</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #374151;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
          color: white;
          padding: 30px;
          border-radius: 12px 12px 0 0;
        }
        .success-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: block;
          text-align: center;
          line-height: 60px;
          margin: 0 auto 20px;
          font-size: 24px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 20px;
        }
        .details-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .details-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }
        .details-grid {
          display: grid;
          gap: 12px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 500;
          color: #6b7280;
        }
        .detail-value {
          font-weight: 600;
          color: #111827;
        }
        .price-highlight {
          color: #84cc16;
          font-size: 18px;
        }
        .contact-section {
          background: #fef3c7;
          border: 1px solid #fcd34d;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .contact-title {
          font-weight: 600;
          color: #92400e;
          margin-bottom: 10px;
        }
        .contact-info {
          color: #92400e;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #6b7280;
          font-size: 14px;
        }
        .meet-link-card {
          background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
          color: white;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .meet-link-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .meet-link {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          margin: 10px 0;
        }
        .meet-link:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .calendar-section {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .calendar-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 15px;
        }
        .calendar-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin: 0 auto;
        }
        .calendar-btn {
          background: #84cc16;
          color: white;
          padding: 10px 16px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          font-size: 14px;
          display: inline-block;
        }
        .calendar-btn:hover {
          background: #65a30d;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
        }
        @media (max-width: 600px) {
          .container {
            padding: 10px;
          }
          .header, .content {
            padding: 20px;
          }
          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .calendar-buttons {
            flex-direction: column;
            gap: 12px;
          }
          .calendar-btn {
            width: 100%;
            max-width: 250px;
            margin: 0 auto;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your appointment has been successfully scheduled</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Dear ${details.clientName},
          </div>
          
          <p>Thank you for booking your nutrition consultation with Krisha Nobora, RND. Your appointment has been confirmed and we're excited to help you on your wellness journey!</p>
          
          <div class="details-card">
            <div class="details-title">
              Appointment Details
            </div>
            <div class="details-grid">
              <div class="detail-row">
                <span class="detail-label">Service: </span>
                <span class="detail-value">${details.appointmentType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date: </span>
                <span class="detail-value">${details.date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time: </span>
                <span class="detail-value">${details.time}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Duration: </span>
                <span class="detail-value">${details.duration} minutes</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Fee: </span>
                <span class="detail-value price-highlight">${
                  details.appointmentPrice
                }</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Method: </span>
                <span class="detail-value">${details.paymentMethod}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Booking ID: </span>
                <span class="detail-value">#${details.bookingId}</span>
              </div>
            </div>
          </div>
          
          ${
            details.meetLink
              ? `
          <div class="meet-link-card">
            <div class="meet-link-title">
              Virtual Consultation
            </div>
            <p style="margin: 0 0 15px; opacity: 0.9;">Join your appointment using Google Meet</p>
            <a href="${details.meetLink}" class="meet-link" target="_blank">
              Join Google Meet
            </a>
            <p style="margin: 15px 0 0; font-size: 14px; opacity: 0.8;">
              Click the link above or copy: ${details.meetLink}
            </p>
          </div>
          `
              : ""
          }
          
          ${
            details.googleCalendarUrl || details.outlookCalendarUrl
              ? `
          <div class="calendar-section">
            <div class="calendar-title">Add to Your Calendar</div>
            <p style="margin: 0 0 15px; color: #6b7280; font-size: 14px;">
              Never miss your appointment - add it to your calendar now!
            </p>
            <div class="calendar-buttons">
              ${
                details.googleCalendarUrl
                  ? `<a href="${details.googleCalendarUrl}" class="calendar-btn" target="_blank">+ Google Calendar</a>`
                  : ""
              }
              ${
                details.outlookCalendarUrl
                  ? `<a href="${details.outlookCalendarUrl}" class="calendar-btn" target="_blank">+ Outlook Calendar</a>`
                  : ""
              }
            </div>
          </div>
          `
              : ""
          }
          
          ${
            details.specialRequests
              ? `
          <div class="details-card">
            <div class="details-title">
              Special Requests
            </div>
            <p style="margin: 0; color: #374151;">${details.specialRequests}</p>
          </div>
          `
              : ""
          }
          
          <div class="contact-section">
            <div class="contact-title">Need to make changes?</div>
            <div class="contact-info">
              Contact us at <strong>hello@missnutrition.krisha</strong><br>
              or call us after booking confirmation
            </div>
          </div>
          
          <h3 style="color: #111827; margin-bottom: 15px;">What to expect:</h3>
          <ul style="color: #374151; padding-left: 20px;">
            <li>You'll receive a reminder email 24 hours before your appointment</li>
            <li>Please join the Google Meet 5-10 minutes before your scheduled time</li>
            <li>Ensure you have a stable internet connection and a quiet environment</li>
            <li>Have any relevant medical records or previous nutrition plans ready to share on screen</li>
            <li>Come prepared to discuss your health goals and lifestyle</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="https://nutrisha.vercel.app" class="button">Visit Our Website</a>
          </div>
          
          <p style="margin-top: 30px; color: #6b7280; font-style: italic;">
            We're looking forward to connecting with you virtually and helping you achieve your nutrition and wellness goals!
          </p>
          
          <p style="font-weight: 600; color: #111827;">
            Best regards,<br>
            Krisha Nobora, RND<br>
            <span style="color: #84cc16;">Registered Nutritionist-Dietitian</span>
          </p>
        </div>
        
        <div class="footer">
          <p>This email was sent to ${details.email}</p>
          <p>© 2025 Krisha Nobora Nutrition Services. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendBookingConfirmationEmail(
  details: BookingDetails
): Promise<void> {
  try {
    const htmlContent = generateBookingConfirmationHTML(details);

    const mailOptions = {
      from: `"Krisha Nobora, RND" <${process.env.GMAIL_EMAIL}>`,
      to: details.email,
      subject: `Booking Confirmed - ${details.appointmentType} on ${details.date}`,
      html: htmlContent,
      text: `
        Dear ${details.clientName},

        Your appointment has been confirmed!

        Appointment Details:
        - Service: ${details.appointmentType}
        - Date: ${details.date}
        - Time: ${details.time}
        - Duration: ${details.duration} minutes
        - Fee: ${details.appointmentPrice}
        - Payment Method: ${details.paymentMethod}
        - Booking ID: #${details.bookingId}

        ${
          details.specialRequests
            ? `Special Requests: ${details.specialRequests}`
            : ""
        }

        Need to make changes? Contact us at hello@missnutrition.krisha

        Best regards,
        Krisha Nobora, RND
        Registered Nutritionist-Dietitian
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(
      "Booking confirmation email sent successfully to:",
      details.email
    );
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
    throw error;
  }
}
