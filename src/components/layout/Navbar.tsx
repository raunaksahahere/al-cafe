"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Food Menu", href: "/menu" },
  { name: "Hookah Lounge", href: "/hookah-lounge" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Bookings", href: "/#bookings" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "absolute top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-transparent py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 z-50">
          <div className="relative p-1 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF7A00]/60 shadow-[0_0_15px_rgba(255,122,0,0.15)] group-hover:shadow-[0_0_25px_rgba(255,122,0,0.5)] transition-all duration-500 overflow-hidden">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-black">
              <img
                src="/image/img23.webp"
                alt="Al Cafe Logo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-white/80 hover:text-[#FF7A00] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF7A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <Button asChild className="hidden md:flex rounded-full tracking-wide">
            <Link href="/#bookings">Book Dining & Events</Link>
          </Button>

          <button
            className="lg:hidden text-white focus:outline-none p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={28} className="text-[#FF7A00]" />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen"
            >
              <nav className="flex flex-col items-center gap-8 text-center">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-light tracking-wider text-white hover:text-[#FF7A00] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="mt-8"
                >
                  <Button asChild size="lg" className="rounded-full w-full max-w-[250px] text-lg bg-[#FF7A00] hover:bg-[#E85D04] text-white border-none shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                    <Link href="/#bookings" onClick={() => setIsMobileMenuOpen(false)}>Reserve Experience ⭐</Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
