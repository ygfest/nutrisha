import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Star, CheckCircle, Calendar } from "lucide-react";
import BookingButton from "@/components/shared/BookingButton";

export default function AboutSection() {
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

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-sage-50/50 to-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sage-50/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-8 bg-white/60 backdrop-blur-md text-slate-700 border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/60 shadow-lg shadow-slate-500/10 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.5px] transition-all duration-300">
                About Krisha
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Meet Your <span className="font-medium">Nutrition Expert</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed font-light">
                As a newly licensed Registered Nutritionist-Dietitian from
                the University of Santo Tomas, I bring fresh enthusiasm
                and evidence-based approaches to nutrition and wellness.
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
                Currently working as a Therapeutic Dietitian at St. Luke's Medical Center,
                I'm passionate about helping individuals achieve their health goals through
                personalized, science-backed nutrition strategies.
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
                      <h4 className="font-medium text-slate-900 mb-1 tracking-tight">
                        {achievement.text}
                      </h4>
                      <p className="text-sm text-slate-600 font-light">
                        {achievement.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <BookingButton
                className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Schedule a Consultation
                <Calendar className="ml-2 h-5 w-5" />
              </BookingButton>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sage-200/40 to-sage-400/40 rounded-3xl transform rotate-6 scale-105" />
                <Avatar className="h-96 w-96 border-8 border-white shadow-2xl relative z-10 rounded-3xl">
                  <AvatarImage
                    src="/images/nutritionist-avatar.png"
                    alt="Krisha Nobora - Registered Nutritionist-Dietitian from University of Santo Tomas"
                    className="object-cover rounded-3xl"
                    loading="eager"
                  />
                  <AvatarFallback className="bg-sage-200 text-sage-800 text-8xl font-bold rounded-3xl">
                    K
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}