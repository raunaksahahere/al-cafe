"use client";

import { CalendarDays, Clock, MessageCircle, Phone, User, Users } from "lucide-react";
import { FormEvent, useState } from "react";
import siteConfig from "@/data/site-config.json";

type BookingType = "table" | "occasion";

const inputClassName =
  "w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50 focus:ring-1 focus:ring-[#FF7A00]/50 transition-all";

export default function BookingForm() {
  const [bookingType, setBookingType] = useState<BookingType>("table");

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Not provided");
    const phone = String(form.get("phone") || "Not provided");
    const date = String(form.get("date") || "Not provided");
    const time = String(form.get("time") || "Not provided");
    const guests = String(form.get("guests") || "Not provided");
    const occasion = String(form.get("occasion") || "Not specified");
    const budget = String(form.get("budget") || "Not specified");
    const decorations = form.get("decorations") ? "Yes" : "No";
    const cake = form.get("cake") ? "Yes" : "No";
    const notes = String(form.get("notes") || "None");
    const requestType = bookingType === "table" ? "Table Reservation" : "Occasion Booking";

    const message = [
      `*${requestType} Request*`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Guests: ${guests}`,
      ...(bookingType === "occasion"
        ? [
            `Occasion: ${occasion}`,
            `Approx. budget: ${budget}`,
            `Decorations: ${decorations}`,
            `Cake: ${cake}`,
          ]
        : []),
      `Requirements / allergies: ${notes}`,
      "",
      "Please confirm my booking.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="bookings" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,122,0,0.12),transparent_42%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[#FF7A00] uppercase tracking-[0.3em] text-xs mb-4">Make a reservation</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white">Book Dining & Events</h2>
          <p className="text-white/60 mt-5">Share your details and review the ready-made WhatsApp message before sending it to confirm your booking.</p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          <button type="button" onClick={() => setBookingType("table")} className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${bookingType === "table" ? "bg-[#FF7A00] text-white" : "text-white/60 hover:text-white bg-white/5"}`}>Table Reservation</button>
          <button type="button" onClick={() => setBookingType("occasion")} className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${bookingType === "occasion" ? "bg-[#FF7A00] text-white" : "text-white/60 hover:text-white bg-white/5"}`}>Occasion Booking</button>
        </div>

        <form key={bookingType} onSubmit={placeOrder} className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <label className="block text-white/80 text-sm font-medium ml-1">Full Name
              <span className="relative block mt-2"><User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF7A00]" /><input name="name" type="text" required placeholder="John Doe" className={inputClassName} /></span>
            </label>
            <label className="block text-white/80 text-sm font-medium ml-1">Phone Number
              <span className="relative block mt-2"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF7A00]" /><input name="phone" type="tel" required placeholder={siteConfig.contact.phoneDisplay} className={inputClassName} /></span>
            </label>
            <label className="block text-white/80 text-sm font-medium ml-1">Preferred Date
              <span className="relative block mt-2"><CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF7A00]" /><input name="date" type="date" required className={`${inputClassName} [color-scheme:dark]`} /></span>
            </label>
            <label className="block text-white/80 text-sm font-medium ml-1">Preferred Time
              <span className="relative block mt-2"><Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF7A00]" /><input name="time" type="time" required className={`${inputClassName} [color-scheme:dark]`} /></span>
            </label>
            <label className="block text-white/80 text-sm font-medium ml-1">{bookingType === "table" ? "Guests" : "Expected Guests"}
              <span className="relative block mt-2"><Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF7A00]" /><input name="guests" type="number" required min="1" placeholder="2" className={inputClassName} /></span>
            </label>
          </div>

          {bookingType === "occasion" && (
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <label className="block text-white/80 text-sm font-medium ml-1">Occasion<select name="occasion" className="mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FF7A00]/50"><option>Birthday</option><option>Anniversary</option><option>Corporate Event</option><option>Other</option></select></label>
              <label className="block text-white/80 text-sm font-medium ml-1">Approx. Budget<input name="budget" type="text" placeholder="Approx budget" className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50" /></label>
              <label className="flex items-center gap-3 text-white/80 text-sm"><input name="decorations" type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent accent-[#FF7A00]" /> Need decorations</label>
              <label className="flex items-center gap-3 text-white/80 text-sm"><input name="cake" type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent accent-[#FF7A00]" /> Need a cake</label>
            </div>
          )}

          <label className="block text-white/80 text-sm font-medium ml-1 mt-6">Special Requirements or Allergies
            <textarea name="notes" rows={4} placeholder="Any specific requirements or allergies?" className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00]/50 resize-none" />
          </label>

          <button type="submit" className="mt-8 w-full rounded-full bg-[#FF7A00] hover:bg-[#E85D04] text-white py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="h-5 w-5" /> {bookingType === "table" ? "Continue to WhatsApp" : "Request on WhatsApp"}
          </button>
          <p className="text-center text-xs text-white/45 mt-4">WhatsApp opens with your details filled in. Your booking is sent only after you press Send.</p>
        </form>
      </div>
    </section>
  );
}
