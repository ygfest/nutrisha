import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import BookingButton from "@/components/shared/BookingButton";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-sage-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sage-100/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-8 bg-white/60 backdrop-blur-md text-slate-700 border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/60 shadow-lg shadow-slate-500/10 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.5px] transition-all duration-300">
            Get Started
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Ready to Start Your <span className="font-medium">Wellness Journey?</span>
          </h2>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Take the first step towards a healthier, happier you. Connect
            with evidence-based nutrition guidance tailored to your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <BookingButton
              size="lg"
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Book Free Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </BookingButton>
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
              <h3 className="font-medium text-slate-900 mb-2 tracking-tight">Phone</h3>
              <p className="text-slate-600 font-light">Available upon booking</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-sage-100">
              <Mail className="h-8 w-8 text-sage-500 mb-4" />
              <h3 className="font-medium text-slate-900 mb-2 tracking-tight">Email</h3>
              <p className="text-slate-600 font-light">
                missnutrition.krisha@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-sage-100">
              <MapPin className="h-8 w-8 text-sage-500 mb-4" />
              <h3 className="font-medium text-slate-900 mb-2 tracking-tight">
                Location
              </h3>
              <p className="text-slate-600 font-light">
                Taguig, Metro Manila, Philippines
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}