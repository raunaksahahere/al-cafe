"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Users, MessageSquare, User, Phone, Coins } from "lucide-react";
import { useState } from "react";
import siteConfig from "@/data/site-config.json";

export default function BookingForm() {
  const [bookingType, setBookingType] = useState<"table" | "occasion">("table");

  return (
    <section id="bookings" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,122,0,0.05)_0%,transparent_50%)] z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            Reservations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Reserve Your <span className="text-[#FF7A00]">Experience</span>
          </motion.h2>
        </div>

        <div className="flex justify-center mb-10 z-20 relative">
          <div className="glass-card rounded-full p-1 inline-flex">
            <button
              onClick={() => setBookingType("table")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${bookingType === "table" ? "bg-[#FF7A00] text-white" : "text-white/60 hover:text-white"
                }`}
            >
              Book a Table
            </button>
            <button
              onClick={() => setBookingType("occasion")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${bookingType === "occasion" ? "bg-[#FF7A00] text-white" : "text-white/60 hover:text-white"
                }`}
            >
              Book an Occasion
            </button>
          </div>
        </div>

        <motion.div
          key={bookingType}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
        >
          {/* Subtle glow effect behind the form */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none" />

          <form className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50 focus:ring-1 focus:ring-[#FF7A00]/50 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input type="tel" placeholder={siteConfig.contact.phoneDisplay} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50 focus:ring-1 focus:ring-[#FF7A00]/50 transition-all" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium ml-1">Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#FF7A00]/50 transition-all [color-scheme:dark]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium ml-1">Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#FF7A00]/50 transition-all [color-scheme:dark]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium ml-1">{bookingType === "table" ? "Guests" : "Expected Guests"}</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input type="number" min="1" placeholder="2" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50 transition-all" />
                </div>
              </div>
            </div>

            {bookingType === "occasion" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium ml-1">Event Type</label>
                  <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FF7A00]/50 transition-all appearance-none">
                    <option>Birthday Party</option>
                    <option>Anniversary</option>
                    <option>Corporate Event</option>
                    <option>Kitty Party</option>
                    <option>Private Event</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium ml-1">Budget</label>
                  <div className="relative">
                    <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="text" placeholder="Approx budget" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col justify-end space-y-4 pb-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-[#FF7A00] focus:ring-[#FF7A00] focus:ring-offset-black accent-[#FF7A00]" />
                    <span className="text-white/80 text-sm group-hover:text-white transition-colors">Decoration Required</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-[#FF7A00] focus:ring-[#FF7A00] focus:ring-offset-black accent-[#FF7A00]" />
                    <span className="text-white/80 text-sm group-hover:text-white transition-colors">Cake Required</span>
                  </label>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-8">
              <label className="text-white/80 text-sm font-medium ml-1">Special Requests</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                <textarea rows={4} placeholder="Any specific requirements or allergies?" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50 focus:ring-1 focus:ring-[#FF7A00]/50 transition-all resize-none"></textarea>
              </div>
            </div>

            <Button size="lg" className="w-full py-6 text-lg rounded-xl">
              {bookingType === "table" ? "Confirm Reservation" : "Request Occasion Booking"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
