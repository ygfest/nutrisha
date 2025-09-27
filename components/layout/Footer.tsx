import { Apple } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-12 w-12 bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Apple className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-light tracking-tight">Krisha Nobora, <span className="font-medium">RND</span></span>
              <p className="text-sm text-slate-400 font-light tracking-wide">
                Registered Nutritionist-Dietitian
              </p>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
            Empowering healthier lives through evidence-based nutrition,
            personalized guidance, and compassionate care.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm sm:text-base">
            <Link
              href="/privacy-policy"
              className="relative group text-slate-400 hover:text-white font-light tracking-tight transition-all duration-300"
            >
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/terms-of-service"
              className="relative group text-slate-400 hover:text-white font-light tracking-tight transition-all duration-300"
            >
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="relative group text-slate-400 hover:text-white font-light tracking-tight transition-all duration-300"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>
          <p className="text-slate-500 text-sm font-light tracking-wide">
            &copy; 2025 Krisha Nobora, RND. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
