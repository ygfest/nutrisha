import React from "react";

interface BookingConfirmationEmailProps {
  clientName: string;
  appointmentType: string;
  appointmentPrice: string;
  date: string;
  time: string;
  duration: number;
  paymentMethod: string;
  bookingId: string;
  specialRequests?: string | null;
}

export const BookingConfirmationEmail: React.FC<
  BookingConfirmationEmailProps
> = ({
  clientName,
  appointmentType,
  appointmentPrice,
  date,
  time,
  duration,
  paymentMethod,
  bookingId,
  specialRequests,
}) => {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        lineHeight: "1.6",
        color: "#374151",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            background: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
            color: "white",
            padding: "30px",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "24px",
            }}
          >
            ✓
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Booking Confirmed!
          </h1>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: "16px",
              opacity: 0.9,
            }}
          >
            Your appointment has been successfully scheduled
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Dear {clientName},
          </div>

          <p>
            Thank you for booking your nutrition consultation with Krisha
            Nobora, RND. Your appointment has been confirmed and we're excited
            to help you on your wellness journey!
          </p>

          {/* Appointment Details */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "20px",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "15px",
              }}
            >
              📅 Appointment Details
            </div>
            <div style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: "500", color: "#6b7280" }}>
                  Service:
                </span>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  {appointmentType}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: "500", color: "#6b7280" }}>
                  Date:
                </span>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  {date}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: "500", color: "#6b7280" }}>
                  Time:
                </span>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  {time}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: "500", color: "#6b7280" }}>
                  Duration:
                </span>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  {duration} minutes
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: "500", color: "#6b7280" }}>
                  Investment:
                </span>
                <span
                  style={{
                    fontWeight: "600",
                    color: "#84cc16",
                    fontSize: "18px",
                  }}
                >
                  {appointmentPrice}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: "500", color: "#6b7280" }}>
                  Payment Method:
                </span>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  {paymentMethod}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                }}
              >
                <span style={{ fontWeight: "500", color: "#6b7280" }}>
                  Booking ID:
                </span>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  #{bookingId}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {specialRequests && (
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "20px",
                margin: "20px 0",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "15px",
                }}
              >
                📝 Special Requests
              </div>
              <p style={{ margin: 0, color: "#374151" }}>{specialRequests}</p>
            </div>
          )}

          {/* Contact Section */}
          <div
            style={{
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              borderRadius: "8px",
              padding: "20px",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: "#92400e",
                marginBottom: "10px",
              }}
            >
              Need to make changes?
            </div>
            <div
              style={{
                color: "#92400e",
                fontSize: "14px",
              }}
            >
              Contact us at <strong>missnutrition.krisha@gmail.com</strong>
              <br />
              or call us after booking confirmation
            </div>
          </div>

          <h3 style={{ color: "#111827", marginBottom: "15px" }}>
            What to expect:
          </h3>
          <ul style={{ color: "#374151", paddingLeft: "20px" }}>
            <li>
              You'll receive a call from our team 24 hours before your
              appointment
            </li>
            <li>Please arrive 10 minutes early for your consultation</li>
            <li>
              Bring any relevant medical records or previous nutrition plans
            </li>
            <li>Come prepared to discuss your health goals and lifestyle</li>
          </ul>

          <div style={{ textAlign: "center" }}>
            <a
              href="https://missnutrition-krisha.vercel.app"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
                color: "white",
                padding: "12px 24px",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "600",
                margin: "20px 0",
              }}
            >
              Visit Our Website
            </a>
          </div>

          <p
            style={{
              marginTop: "30px",
              color: "#6b7280",
              fontStyle: "italic",
            }}
          >
            We're looking forward to meeting you and helping you achieve your
            nutrition and wellness goals!
          </p>

          <p style={{ fontWeight: "600", color: "#111827" }}>
            Best regards,
            <br />
            Krisha Nobora, RND
            <br />
            <span style={{ color: "#84cc16" }}>
              Registered Nutritionist-Dietitian
            </span>
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          <p>© 2024 Krisha Nobora Nutrition Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
