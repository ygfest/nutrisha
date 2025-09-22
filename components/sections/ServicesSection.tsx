import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Apple,
  Heart,
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  Target,
} from "lucide-react";

export default function ServicesSection() {
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

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-8 bg-white/60 backdrop-blur-md text-slate-700 border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/60 shadow-lg shadow-slate-500/10 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.5px] transition-all duration-300">
            Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6 leading-[1.1] tracking-tight">
            <span className="font-medium">Comprehensive</span> Nutrition Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Expert solutions designed to meet your unique wellness needs with evidence-based approaches
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
                <CardTitle className="text-lg font-medium text-slate-900 group-hover:text-sage-600 transition-colors mb-3 tracking-tight">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed mb-4 font-light">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-slate-600 font-light"
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
  );
}