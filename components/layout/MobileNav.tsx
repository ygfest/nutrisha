"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import BookingButton from "@/components/shared/BookingButton";

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-6 border-t border-sage-100 animate-slide-up bg-white/95 backdrop-blur-md">
          <nav className="flex flex-col space-y-4">
            <a
              href="#home"
              className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
            >
              Contact
            </a>
            <BookingButton
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white w-full"
            >
              Book Consultation
            </BookingButton>
          </nav>
        </div>
      )}
    </>
  );
}