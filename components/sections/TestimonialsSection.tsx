import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
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
    <section
      className="py-24 bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-8 bg-white/60 backdrop-blur-md text-slate-700 border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/60 shadow-lg shadow-slate-500/10 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.5px] transition-all duration-300">
            Testimonials
          </Badge>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6 leading-[1.1] tracking-tight"
          >
            What Our <span className="font-medium">Clients Say</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
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
                <p className="text-slate-600 mb-6 leading-relaxed italic font-light">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-medium text-slate-900 tracking-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600 font-light">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}