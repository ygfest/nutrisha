export default function SchemaMarkup() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Nutrition Consultation Services",
    description:
      "Professional nutrition consultation and personalized meal planning services",
    provider: {
      "@type": "Person",
      "@id": "https://missnutrition-krisha.vercel.app#krisha-nobora",
    },
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nutrition Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Personalized Meal Plans",
            description:
              "Custom nutrition plans tailored to your specific health goals",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Health Consultations",
            description:
              "One-on-one consultations to address your unique nutritional needs",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema),
      }}
    />
  );
}