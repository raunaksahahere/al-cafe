"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ChevronDown, Utensils, Flame } from "lucide-react";
import Link from "next/link";
import ParticleOverlay from "@/components/ui/ParticleOverlay";
import siteConfig from "@/data/site-config.json";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#000000] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.15)_0%,transparent_60%)] z-10" />
        {/* Placeholder for Cafe background image */}
        <img
          src="/image/img12.jpg"
          alt="Luxury Cafe Ambience"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Particle and Smoke Overlay */}
        <ParticleOverlay />
      </div>

      <div className="container relative z-20 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-4 block">
            Welcome To
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-2 text-white">
            Al Café <br />
            <span className="text-3xl md:text-4xl font-light italic text-white/80">Savor Food, Enjoy Hookah</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light tracking-wide">
            Premium Café • Shisha • Fine Dining
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
        >
          <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full">
            <Link href="/#bookings">Book Dining & Events</Link>
          </Button>
          <Button
            asChild
            variant="glass"
            size="lg"
            className="w-full sm:w-auto text-lg px-8 py-6 rounded-full"
          >
            <Link href="/#menu">Explore Our Menus</Link>
          </Button>
        </motion.div>

        {/* Info bar at the bottom of hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-xs md:text-sm text-white/70 max-w-5xl mx-auto glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <Clock className="text-[#FF7A00] w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-white">Hours</p>
              <p>{siteConfig.hours[1].display}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <MapPin className="text-[#FF7A00] w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-white">Location</p>
              <p>{siteConfig.contact.address.streetAddress}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Utensils className="text-[#FF7A00] w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-white">Food</p>
              <p>Multi-Cuisine</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Flame className="text-[#FF7A00] w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-white">Hookah</p>
              <p>Signature Blends</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="text-white/50 w-8 h-8" />
      </motion.div>
    </section>
  );
}
