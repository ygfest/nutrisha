"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import BookingButton from "@/components/shared/BookingButton";

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const handleClose = () => setIsMobileMenuOpen(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        className="relative z-40"
        onClick={handleToggle}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-x-0 top-20 bottom-0 z-20 bg-slate-900/10"
            onClick={handleClose}
            aria-hidden="true"
          ></div>

          <div className="fixed inset-x-0 top-20 z-30 bg-white/95 backdrop-blur-md border-t border-sage-100/70 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
                  onClick={handleClose}
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
                  onClick={handleClose}
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
                  onClick={handleClose}
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-slate-700 hover:text-sage-600 transition-colors font-light py-2 tracking-tight"
                  onClick={handleClose}
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
          </div>
        </>
      )}
    </div>
  );
}
