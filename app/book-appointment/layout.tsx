import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Nutrition Consultation - Krisha Nobora, RND",
  description:
    "Schedule your personalized nutrition consultation with Krisha Nobora, Registered Nutritionist-Dietitian. Expert guidance for weight management, therapeutic diets, and healthy lifestyle changes.",
  keywords: [
    "book nutrition consultation",
    "schedule dietitian appointment",
    "nutrition appointment Philippines",
    "registered nutritionist booking",
    "meal planning consultation",
    "weight management appointment",
    "therapeutic diet consultation",
  ],
  openGraph: {
    title: "Book Nutrition Consultation - Krisha Nobora, RND",
    description:
      "Schedule your personalized nutrition consultation with expert guidance for weight management, therapeutic diets, and healthy lifestyle changes.",
    url: "https://nutrisha.vercel.app/book-appointment",
    type: "website",
  },
  alternates: {
    canonical: "/book-appointment",
  },
};

export default function BookAppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
