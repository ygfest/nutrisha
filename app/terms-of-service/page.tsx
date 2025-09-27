import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { PageSection } from "@/components/shared/PageSection";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the engagement terms, booking policies, and professional boundaries that guide every consultation with Krisha Nobora Nutrition Services.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="pb-24">
      <PageHero
        eyebrow="Terms of Service"
        title="Professional Standards for Every Consultation"
        description="These terms outline how we work together, from booking sessions to upholding professional responsibilities throughout your nutrition program."
      >
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
          Effective date: September 26, 2025
        </span>
      </PageHero>

      <PageSection title="Agreement Overview">
        <p>
          By booking an appointment, creating an account, or using any service of
          Krisha Nobora Nutrition Services, you agree to these Terms of Service.
          They ensure clarity around responsibilities, expectations, and
          professional boundaries. If you disagree with any provision, please
          refrain from using our services.
        </p>
      </PageSection>

      <PageSection
        title="Eligibility & Client Responsibilities"
        description="We collaborate best when both parties commit to transparency, respect, and proactive communication."
      >
        <ul className="space-y-3 pl-6 text-slate-600 marker:text-sage-500">
          <li>You must be at least 18 years old or have consent from a legal guardian.</li>
          <li>
            Provide accurate personal, health, and lifestyle information so that recommendations remain safe and effective.
          </li>
          <li>
            Inform us promptly of any changes in medical status, medications, or circumstances that may influence your nutrition plan.
          </li>
          <li>
            Follow medical advice from your primary healthcare providers; our guidance does not replace medical diagnosis or treatment.
          </li>
        </ul>
      </PageSection>

      <PageSection
        title="Bookings, Payments & Cancellations"
        description="Transparent policies help us allocate appointment slots efficiently and respect everyone&apos;s time."
      >
        <ul className="space-y-3 pl-6 text-slate-600 marker:text-sage-500">
          <li>Session fees must be settled through approved payment channels before or immediately after each consultation.</li>
          <li>Rescheduling is allowed up to 24 hours before your appointment. Late cancellations may incur a fee.</li>
          <li>No-shows or repeated last-minute changes may result in future bookings being declined.</li>
          <li>We reserve the right to modify pricing with prior notice; confirmed bookings retain their quoted rate.</li>
        </ul>
      </PageSection>

      <PageSection title="Scope of Nutrition Services">
        <p>
          Nutrition consultations include assessments, personalized meal plans,
          lifestyle coaching, and ongoing support. Recommendations are grounded
          in evidence-based practice and tailored to the details you share. We do
          not provide medical diagnoses, prescribe medication, or offer services
          outside the scope of a Registered Nutritionist-Dietitian.
        </p>
      </PageSection>

      <PageSection title="Intellectual Property">
        <p>
          Content provided during sessions, including meal plans, resource
          materials, and digital downloads, remains the intellectual property of
          Krisha Nobora Nutrition Services. You may use these materials for
          personal health purposes only. Reproduction, distribution, or
          commercial use without written permission is prohibited.
        </p>
      </PageSection>

      <PageSection title="Limitation of Liability">
        <p>
          We strive to deliver accurate, professional recommendations. However,
          results depend on individual adherence and external variables beyond
          our control. To the fullest extent permitted by law, Krisha Nobora
          Nutrition Services is not liable for indirect or consequential damages
          arising from the use of our guidance. This does not limit liability for
          gross negligence or misconduct.
        </p>
      </PageSection>

      <PageSection title="Governing Law">
        <p>
          These terms are governed by the laws of the Republic of the
          Philippines. Any dispute shall be resolved through good-faith
          negotiation. If unresolved, the competent courts of Metro Manila will
          have exclusive jurisdiction.
        </p>
      </PageSection>

      <PageSection title="Contact">
        <p>
          Questions about these terms or requests for clarifications may be sent to
          hello@krishanobora.com or addressed to Krisha Nobora Nutrition Services,
          St. Luke&apos;s Medical Center, Bonifacio Global City, Taguig.
        </p>
      </PageSection>
    </main>
  );
}
