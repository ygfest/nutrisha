import type { Metadata } from "next";
import { Mail, MapPin, Phone, CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { PageSection } from "@/components/shared/PageSection";
import BookingButton from "@/components/shared/BookingButton";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Krisha Nobora Nutrition Services for consultations, partnerships, or media requests. Explore clinic hours, direct contact details, and booking support.",
  alternates: {
    canonical: "/contact",
  },
};

const contactChannels = [
  {
    icon: Mail,
    title: "Email",
    detail: "hello@krishanobora.com",
    helper: "Expect a response within one business day.",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+63 900 000 0000",
    helper: "Available Monday to Saturday, 9:00 AM – 6:00 PM PHT.",
  },
  {
    icon: CalendarDays,
    title: "Appointments",
    detail: "Virtual and in-clinic consultations",
    helper: "Secure your slot online or request a bespoke schedule.",
  },
];

export default function ContactPage() {
  return (
    <main className="pb-24">
      <PageHero
        eyebrow="Connect"
        title="Let’s Build Your Nutrition Roadmap"
        description="Whether you’re ready to begin a consultation or exploring partnerships, our team is here to support you with clarity and warmth."
      >
        <BookingButton className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition duration-300">
          Book a Consultation
        </BookingButton>
        <Button
          variant="outline"
          className="border-2 border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-3"
          asChild
        >
          <a href="mailto:hello@krishanobora.com">Email Our Team</a>
        </Button>
      </PageHero>

      <PageSection
        title="Direct Support"
        description="Prefer a personal touch? Choose the channel that fits your schedule."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {contactChannels.map(({ icon: Icon, title, detail, helper }) => (
            <div
              key={title}
              className="rounded-2xl border border-sage-100/70 bg-white/80 p-6 shadow-md shadow-sage-500/5 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-sage-100/80 p-3 text-sage-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-medium text-slate-900">{title}</h3>
              </div>
              <p className="mt-4 text-base font-medium text-sage-600">{detail}</p>
              <p className="mt-2 text-sm text-slate-500">{helper}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="Clinic Hours">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-sage-100/70 bg-white/80 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-sage-600">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-[0.2em]">Schedule</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <strong className="text-slate-800">Virtual consultations:</strong> Monday – Saturday, 9:00 AM – 8:00 PM PHT
              </li>
              <li>
                <strong className="text-slate-800">In-clinic sessions:</strong> Tuesday & Thursday, 10:00 AM – 6:00 PM PHT
              </li>
              <li>
                <strong className="text-slate-800">Community programs:</strong> By reservation and invitation
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-sage-100/70 bg-white/80 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-sage-600">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-[0.2em]">Visit Us</span>
            </div>
            <p className="mt-4 text-base text-slate-600">
              St. Luke&apos;s Medical Center – Bonifacio Global City
              <br /> 32nd Street, Taguig City, Metro Manila, Philippines
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Kindly coordinate your visit in advance so we can prepare the necessary consultation rooms and materials.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Partnerships & Media"
        description="Collaborate with Krisha on corporate wellness, speaking engagements, or nutrition content development."
      >
        <p>
          Share your project brief and timeline via hello@krishanobora.com and our
          team will arrange a discovery call. We love crafting evidence-based
          programs for organizations, schools, and media outlets seeking credible
          nutrition expertise.
        </p>
      </PageSection>
    </main>
  );
}
