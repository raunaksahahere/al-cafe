"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Navigation, Car, Map, Clock } from "lucide-react";
import siteConfig from "@/data/site-config.json";

export default function LocationContact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050505]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            Visit Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Location & <span className="text-[#FF7A00]">Contact</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[500px] lg:h-auto rounded-3xl overflow-hidden border border-white/10 relative"
          >
            {/* Embedded Google Map (Placeholder iframe) */}
            <iframe 
              src={siteConfig.contact.mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(150%) contrast(90%) grayscale(40%)" }}
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0"
            />
            <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 lg:p-12 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/5 text-[#FF7A00]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Address</h4>
                    <p className="text-white/60 font-light text-sm leading-relaxed">
                      {siteConfig.contact.address.display}
                    </p>
                    <p className="text-[#FF7A00]/80 text-xs mt-2 flex items-center gap-1">
                      <Map size={14} /> {siteConfig.contact.address.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/5 text-[#FF7A00]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone & WhatsApp</h4>
                    <p className="text-white/60 font-light text-sm mb-1">{siteConfig.contact.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/5 text-[#FF7A00]">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Hours</h4>
                    {siteConfig.hours.map((hours, index) => (
                      <p key={hours.label} className={`text-white/60 font-light text-sm${index === 0 ? " mb-1" : ""}`}>
                        {hours.label}: {hours.display}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/5 text-[#FF7A00]">
                    <Car size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Parking</h4>
                    <p className="text-white/60 font-light text-sm">Valet parking available at entrance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1 gap-2 rounded-full py-6">
                <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation size={18} />
                  Get Directions
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1 gap-2 rounded-full py-6 border-white/20 text-white hover:bg-white/10">
                <a href={`mailto:${siteConfig.contact.emails.primary}`}>
                  <Mail size={18} />
                  Email Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
