import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import BookingButton from "@/components/shared/BookingButton";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-white to-sage-100/30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-sage-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-300/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <Badge className="mb-8 bg-white/60 backdrop-blur-md text-sage-700 border border-sage-200/50 hover:bg-white/80 hover:border-sage-300/60 shadow-lg shadow-sage-500/10 px-8 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sage-500/20">
            Professional Nutritionist & Dietitian
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Transform Your Health with
            <span className="block font-medium bg-gradient-to-r from-sage-600 via-sage-500 to-sage-700 bg-clip-text text-transparent">
              Evidence-Based Nutrition
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Expert nutritional guidance combining clinical expertise with
            personalized care to help you achieve sustainable wellness goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <BookingButton
              size="lg"
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </BookingButton>
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
              <div className="text-3xl font-bold text-sage-600">
                Fresh
              </div>
              <div className="text-gray-600 font-medium">
                Graduate Perspective
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">2025</div>
              <div className="text-gray-600 font-medium">
                Licensed RND
              </div>
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
  );
}