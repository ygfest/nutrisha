import AIChatbot from "@/components/ai-chatbot";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import SchemaMarkup from "@/components/shared/SchemaMarkup";

export default function HomePage() {

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gradient-to-br from-white via-sage-50/30 to-sage-100/20">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </>
  );
}
