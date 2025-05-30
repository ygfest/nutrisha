"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AIChatbot from "@/components/ai-chatbot";
import {
  Apple,
  Heart,
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  Menu,
  X,
  Star,
  Award,
  Target,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: Apple,
      title: "Personalized Meal Plans",
      description:
        "Custom nutrition plans tailored to your specific health goals, dietary preferences, and lifestyle.",
      features: ["Custom macros", "Grocery lists", "Recipe suggestions"],
    },
    {
      icon: Heart,
      title: "Health Consultations",
      description:
        "One-on-one consultations to address your unique nutritional needs and health concerns.",
      features: ["60-min sessions", "Health assessments", "Follow-up support"],
    },

    {
      icon: BookOpen,
      title: "Nutrition Education",
      description:
        "Comprehensive educational resources to help you make informed dietary choices.",
      features: ["Evidence-based", "Easy to understand", "Practical tips"],
    },

    {
      icon: Users,
      title: "Group Workshops",
      description:
        "Interactive workshops covering various nutrition topics for groups and organizations.",
      features: [
        "Team sessions",
        "Corporate wellness",
        "Educational materials",
      ],
    },
    {
      icon: Calendar,
      title: "Ongoing Support",
      description:
        "Continuous guidance and support throughout your wellness journey.",
      features: ["Weekly check-ins", "Progress tracking", "Adjustments"],
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description:
        "Strategic planning and monitoring to help you reach your health and fitness goals.",
      features: ["SMART goals", "Progress metrics", "Accountability"],
    },
  ];

  const achievements = [
    {
      icon: Award,
      text: "Registered Nutritionist-Dietitian (2025)",
      detail: "Licensed by Professional Regulation Commission",
    },
    {
      icon: Star,
      text: "Bachelor of Science in Nutrition and Dietetics",
      detail: "University of Santo Tomas Graduate",
    },
    {
      icon: CheckCircle,
      text: "Therapeutic Dietitian",
      detail: "St. Luke's Medical Center",
    },
  ];

  const testimonials = [
    {
      name: "Clinical Supervisor",
      role: "St. Luke's Medical Center",
      content:
        "Krisha demonstrates exceptional dedication and applies evidence-based approaches effectively. Her fresh perspective and enthusiasm make her a valuable addition to our nutrition team.",
      rating: 5,
    },
    {
      name: "Internship Preceptor",
      role: "University of Santo Tomas Hospital",
      content:
        "During her clinical internship, Krisha showed strong analytical skills and genuine care for patients. Her academic foundation is solid and she's eager to learn.",
      rating: 5,
    },
    {
      name: "Academic Mentor",
      role: "University of Santo Tomas",
      content:
        "Krisha was an outstanding student who consistently demonstrated passion for nutrition science and commitment to evidence-based practice. Very promising career ahead.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sage-50/30 to-sage-100/20">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sage-100/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo - Removed online status indicator */}
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Apple className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-sage-700 to-sage-500 bg-clip-text text-transparent">
                  Krisha Nobora, RND
                </span>
                <p className="text-xs text-sage-600 font-medium">
                  Registered Nutritionist-Dietitian
                </p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation - Removed AI Assistant button */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-sage-600 transition-all duration-200 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-sage-600 transition-all duration-200 font-medium relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-sage-600 transition-all duration-200 font-medium relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-sage-600 transition-all duration-200 font-medium relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Book Consultation
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Enhanced Mobile Navigation - Removed AI Assistant button */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-sage-100 animate-slide-up bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-sage-600 transition-colors font-medium py-2"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="text-gray-700 hover:text-sage-600 transition-colors font-medium py-2"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-sage-600 transition-colors font-medium py-2"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-sage-600 transition-colors font-medium py-2"
                >
                  Contact
                </a>
                <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white w-full">
                  Book Consultation
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Enhanced Hero Section */}
        <section id="home" className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-white to-sage-100/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-sage-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-300/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-5xl mx-auto text-center animate-fade-in">
              <Badge className="mb-8 bg-gradient-to-r from-sage-100 to-sage-200 text-sage-800 hover:from-sage-200 hover:to-sage-300 border-sage-300 px-6 py-2 text-sm font-medium">
                {/* <Sparkles className="h-4 w-4 mr-2" /> */}
                Professional Nutritionist & Dietitian
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Transform Your Health with
                <span className="block bg-gradient-to-r from-sage-600 via-sage-500 to-sage-700 bg-clip-text text-transparent">
                  Evidence-Based Nutrition
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Fresh perspective from a newly licensed Registered
                Nutritionist-Dietitian, combining cutting-edge nutritional
                science with personalized care to help you achieve your wellness
                goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-sage-400 text-sage-700 hover:bg-sage-50 px-10 py-4 text-lg transition-all duration-300 hover:scale-105"
                >
                  Download Nutrition Guide
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-600">Fresh</div>
                  <div className="text-gray-600 font-medium">
                    Graduate Perspective
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-600">2025</div>
                  <div className="text-gray-600 font-medium">Licensed RND</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-600">100%</div>
                  <div className="text-gray-600 font-medium">
                    Evidence-Based
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section id="services" className="py-24 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-sage-100 text-sage-800 px-4 py-2">
                Services
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Comprehensive Nutrition Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Tailored solutions designed to meet your unique health and
                wellness needs with evidence-based approaches
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-sage-100 hover:border-sage-200 bg-gradient-to-br from-white to-sage-50/30 hover:scale-105"
                >
                  <CardHeader className="text-center pb-6">
                    <div className="mx-auto mb-6 h-20 w-20 bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-sage-600 transition-colors mb-3">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-sage-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section
          id="about"
          className="py-24 bg-gradient-to-br from-sage-50/50 to-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sage-50/30 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="text-center lg:text-left">
                  <Badge className="mb-6 bg-sage-100 text-sage-800 px-4 py-2">
                    About Krisha
                  </Badge>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
                    Meet Your Nutrition Expert
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    As a newly licensed Registered Nutritionist-Dietitian from
                    the University of Santo Tomas, I bring fresh enthusiasm and
                    the latest evidence-based approaches to nutrition and
                    wellness. Currently working as a Therapeutic Dietitian at
                    St. Luke's Medical Center, I'm passionate about helping
                    individuals achieve their health goals through personalized,
                    science-backed nutrition strategies.
                  </p>
                  <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                    My educational background and clinical training have
                    equipped me with a solid foundation in nutrition science,
                    and I'm committed to continuous learning to provide the most
                    current and effective nutrition guidance to my clients.
                  </p>

                  <div className="space-y-6 mb-10">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-sage-100"
                      >
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-gradient-to-br from-sage-400 to-sage-600 rounded-xl flex items-center justify-center">
                            <achievement.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {achievement.text}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {achievement.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                    Schedule a Consultation
                    <Calendar className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sage-200/40 to-sage-400/40 rounded-3xl transform rotate-6 scale-105" />
                    <Avatar className="h-96 w-96 border-8 border-white shadow-2xl relative z-10 rounded-3xl">
                      <AvatarImage
                        src="/placeholder.svg?height=384&width=384"
                        alt="Krisha - Professional Nutritionist"
                        className="object-cover rounded-3xl"
                      />
                      <AvatarFallback className="bg-sage-200 text-sage-800 text-8xl font-bold rounded-3xl">
                        K
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-sage-500 to-sage-600 text-white p-4 rounded-2xl shadow-xl">
                      <Heart className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-sage-100">
                      <Sparkles className="h-8 w-8 text-sage-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-sage-100 text-sage-800 px-4 py-2">
                Testimonials
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from real people who transformed their lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-sage-100 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-sage-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Contact/CTA Section */}
        <section
          id="contact"
          className="py-24 bg-gradient-to-br from-sage-50 to-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sage-100/20 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-8 bg-sage-100 text-sage-800 px-4 py-2">
                Get Started
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
                Ready to Start Your Wellness Journey?
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Take the first step towards a healthier, happier you. Connect
                with a fresh, evidence-based approach to nutrition. Let's work
                together to achieve your wellness goals with personalized,
                science-backed strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Book Free Consultation
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-sage-400 text-sage-700 hover:bg-sage-50 px-10 py-4 text-lg transition-all duration-300 hover:scale-105"
                >
                  Download Nutrition Guide
                </Button>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-sage-100">
                  <Phone className="h-8 w-8 text-sage-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">Available upon booking</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-sage-100">
                  <Mail className="h-8 w-8 text-sage-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">krisha.nobora@nutrition.ph</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-sage-100">
                  <MapPin className="h-8 w-8 text-sage-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">
                    Taguig, Metro Manila, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Apple className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">Krisha Nobora, RND</span>
                <p className="text-sm text-gray-400">
                  Registered Nutritionist-Dietitian
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Empowering healthier lives through evidence-based nutrition,
              personalized guidance, and compassionate care.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <Link
                href="/privacy-policy"
                className="relative group text-gray-400 hover:text-white"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/terms-of-service"
                className="relative group text-gray-400 hover:text-white"
              >
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="relative group text-gray-400 hover:text-white"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 Krisha Nobora, RND. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget - Now standalone with floating avatar */}
      <AIChatbot />
    </div>
  );
}
