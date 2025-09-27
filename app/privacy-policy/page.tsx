import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { PageSection } from "@/components/shared/PageSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Krisha Nobora Nutrition Services collects, uses, and safeguards your personal information across consultations, digital tools, and online services.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pb-24">
      <PageHero
        eyebrow="Privacy Policy"
        title="Protecting Your Personal Information"
        description="Your trust is essential. This policy explains how we collect, use, and safeguard the data you share while working with Krisha Nobora Nutrition Services."
      >
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
          Last updated: September 26, 2025
        </span>
      </PageHero>

      <PageSection title="Overview">
        <p>
          Krisha Nobora Nutrition Services ("we", "us") provides professional
          nutrition and dietetic support. This policy describes the personal
          information we collect, why we collect it, how it is processed, and the
          options you have to control your information. It applies to our
          website, virtual consultations, in-person sessions, and any related
          services.
        </p>
        <p>
          By accessing our services, you agree to the practices outlined here.
          We may revise this policy to reflect regulatory changes or new
          services. We encourage you to review it periodically.
        </p>
      </PageSection>

      <PageSection
        title="Information We Collect"
        description="We only capture information that enables us to deliver safe, personalized nutrition care."
      >
        <ul className="space-y-3 pl-6 text-slate-600 marker:text-sage-500">
          <li>
            <span className="font-medium text-slate-800">Identity details.</span> Full name, preferred pronouns, and date of birth.
          </li>
          <li>
            <span className="font-medium text-slate-800">Contact information.</span> Email address, phone number, and emergency contacts.
          </li>
          <li>
            <span className="font-medium text-slate-800">Lifestyle and medical history.</span> Voluntarily shared during consultations or intake forms.
          </li>
          <li>
            <span className="font-medium text-slate-800">Appointment records.</span> Session notes, treatment plans, and follow-up actions.
          </li>
          <li>
            <span className="font-medium text-slate-800">Website usage data.</span> Page visits and interaction metrics collected via analytics tools to improve user experience.
          </li>
        </ul>
      </PageSection>

      <PageSection
        title="How We Use Your Information"
        description="We process data responsibly and only for legitimate care, operational, or legal purposes."
      >
        <ul className="space-y-3 pl-6 text-slate-600 marker:text-sage-500">
          <li>Delivering personalized nutrition assessments and care plans.</li>
          <li>Coordinating appointment logistics, reminders, and follow-ups.</li>
          <li>Maintaining accurate health records to ensure continuity of care.</li>
          <li>Enhancing our digital tools, educational resources, and service quality.</li>
          <li>Complying with regulatory, professional, and ethical obligations.</li>
        </ul>
      </PageSection>

      <PageSection title="Data Security & Retention">
        <p>
          We maintain administrative, technical, and physical safeguards aligned
          with professional standards for health information. Access to client
          records is restricted to authorized personnel directly involved in your
          care. We regularly review our security practices to address emerging
          risks.
        </p>
        <p>
          Records are retained only for as long as professional regulations or
          contractual requirements demand. When no longer needed, data is securely
          deleted or anonymized.
        </p>
      </PageSection>

      <PageSection
        title="Your Choices"
        description="You remain in control of the personal information you share with us."
      >
        <ul className="space-y-3 pl-6 text-slate-600 marker:text-sage-500">
          <li>Request access to or copies of the records we maintain.</li>
          <li>Correct inaccurate personal details or update your contact information.</li>
          <li>Withdraw consent for marketing communications at any time.</li>
          <li>Ask us to delete data that is no longer required by law.</li>
        </ul>
        <p>
          To exercise these rights, contact us using the details provided below.
          We respond to verified requests within a reasonable timeframe.
        </p>
      </PageSection>

      <PageSection title="Questions & Contact">
        <p>
          If you have questions about this policy or how your information is
          processed, reach out to:
        </p>
        <div className="rounded-2xl border border-sage-100/70 bg-white/80 p-6 shadow-md backdrop-blur">
          <p className="font-medium text-slate-800">Krisha Nobora Nutrition Services</p>
          <p>St. Luke&apos;s Medical Center, Bonifacio Global City</p>
          <p>Taguig City, Metro Manila, Philippines</p>
          <p className="mt-4">Email: hello@krishanobora.com</p>
          <p>Phone: +63 900 000 0000</p>
        </div>
      </PageSection>
    </main>
  );
}
