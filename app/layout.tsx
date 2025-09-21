import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { SEOAnalytics } from "@/components/seo-analytics";

export const metadata: Metadata = {
  title: {
    default:
      "Krisha Nobora, RND - Expert Nutritionist & Dietitian in Philippines",
    template: "%s | Krisha Nobora, RND",
  },
  description:
    "Expert nutrition consultation with Krisha Nobora, Registered Nutritionist-Dietitian (RND). Personalized meal plans, weight management, therapeutic diet counseling, and evidence-based nutrition guidance. Book your consultation today.",
  keywords: [
    "nutritionist Philippines",
    "dietitian Manila",
    "registered nutritionist dietitian",
    "meal planning",
    "weight management",
    "therapeutic diet",
    "nutrition consultation",
    "personalized nutrition",
    "RND Philippines",
    "St. Luke's nutritionist",
    "UST nutrition graduate",
    "evidence-based nutrition",
    "clinical nutrition",
    "nutrition counseling",
  ],
  authors: [{ name: "Krisha Nobora", url: "https://nutrisha.vercel.app" }],
  creator: "Krisha Nobora, RND",
  publisher: "Krisha Nobora Nutrition Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://missnutrition-krisha.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/svg+xml" }],
    apple: [{ url: "/logo.png", type: "image/svg+xml" }],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://nutrisha.vercel.app",
    title: "Krisha Nobora, RND - Expert Nutritionist & Dietitian",
    description:
      "Get expert nutrition guidance from Krisha Nobora, Registered Nutritionist-Dietitian. Personalized meal plans, therapeutic diets, and evidence-based nutrition counseling.",
    siteName: "Krisha Nobora Nutrition",
    images: [
      {
        url: "/images/nutritionist-avatar.png",
        width: 1200,
        height: 630,
        alt: "Krisha Nobora, Registered Nutritionist-Dietitian",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krisha Nobora, RND - Expert Nutritionist & Dietitian",
    description:
      "Get expert nutrition guidance from Krisha Nobora, Registered Nutritionist-Dietitian. Personalized meal plans and evidence-based nutrition counseling.",
    images: ["/images/nutritionist-avatar.png"],
    creator: "@KrishaNobora",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  category: "Health & Nutrition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Krisha Nobora Nutrition Services",
    url: "https://nutrisha.vercel.app",
    logo: "https://nutrisha.vercel.app/images/nutritionist-avatar.png",
    description:
      "Professional nutrition consultation and personalized meal planning services by Krisha Nobora, Registered Nutritionist-Dietitian",
    founder: {
      "@type": "Person",
      "@id": "https://nutrisha.vercel.app#krisha-nobora",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+63-XXX-XXX-XXXX", // Replace with actual phone
      contactType: "customer service",
      availableLanguage: ["English", "Filipino"],
    },
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://nutrisha.vercel.app#krisha-nobora",
    name: "Krisha Nobora",
    jobTitle: "Registered Nutritionist-Dietitian",
    description:
      "Registered Nutritionist-Dietitian specializing in therapeutic nutrition, personalized meal planning, and evidence-based nutrition counseling",
    url: "https://nutrisha.vercel.app",
    image: "https://nutrisha.vercel.app/images/nutritionist-avatar.png",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Santo Tomas",
      department: "College of Education - Nutrition and Dietetics",
    },
    worksFor: {
      "@type": "Organization",
      name: "St. Luke's Medical Center",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional License",
        recognizedBy: {
          "@type": "Organization",
          name: "Professional Regulation Commission - Philippines",
        },
        about: "Registered Nutritionist-Dietitian License",
      },
    ],
    knowsAbout: [
      "Clinical Nutrition",
      "Therapeutic Diet Planning",
      "Weight Management",
      "Nutritional Counseling",
      "Meal Planning",
      "Evidence-Based Nutrition",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Krisha Nobora Nutrition",
    url: "https://nutrisha.vercel.app",
    description:
      "Professional nutrition consultation and personalized meal planning services",
    publisher: {
      "@type": "Organization",
      name: "Krisha Nobora Nutrition Services",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nutrisha.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://nutrisha.vercel.app" />
        <meta name="theme-color" content="#8FBC8F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Krisha Nobora RND" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Favicon and Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <SEOAnalytics
          googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
          googleTagManagerId={process.env.NEXT_PUBLIC_GTM_ID}
        />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
