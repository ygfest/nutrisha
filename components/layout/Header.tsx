import { Apple } from "lucide-react";
import BookingButton from "@/components/shared/BookingButton";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sage-100/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Apple className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-light bg-gradient-to-r from-sage-700 to-sage-500 bg-clip-text text-transparent tracking-tight">
                Krisha Nobora, <span className="font-medium">RND</span>
              </span>
              <p className="text-xs text-slate-600 font-light tracking-wide">
                Registered Nutritionist-Dietitian
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-slate-700 hover:text-sage-600 transition-all duration-200 font-light relative group tracking-tight"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#services"
              className="text-slate-700 hover:text-sage-600 transition-all duration-200 font-light relative group tracking-tight"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="text-slate-700 hover:text-sage-600 transition-all duration-200 font-light relative group tracking-tight"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className="text-slate-700 hover:text-sage-600 transition-all duration-200 font-light relative group tracking-tight"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <BookingButton
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Book Consultation
            </BookingButton>
          </nav>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}