"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,122,0,0.05)_0%,transparent_50%)] z-0" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#FF7A00]/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
            <img 
              src="/image/img13.jpg" 
              alt="AL Cafe Interior"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Floating accent card */}
            <div className="absolute bottom-8 left-8 glass-card p-6 rounded-2xl max-w-xs z-20">
              <p className="text-[#FF7A00] font-bold text-xl mb-1">Premium Hospitality</p>
              <p className="text-white/80 text-sm">Delivering the ultimate luxury lounge experience</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white">
              A Symphony of <span className="text-[#FF7A00]">Flavors</span> <br/> 
              in a Luxury Setting
            </h2>
            
            <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
              <p>
                Welcome to AL Cafe & Lounge, a sanctuary built purely on a passion for exceptional food and unparalleled hospitality. 
                Our space is meticulously designed to bridge the gap between contemporary luxury and timeless warmth.
              </p>
              <p>
                Every element—from our premium ingredients to our flawless service—is dedicated to your ultimate comfort. 
                Whether you&apos;re joining us for an intimate dinner or a vibrant lounge evening, we ensure every moment is memorable.
              </p>
              <p>
                Indulge in our exquisite multi-cuisine offerings, handcrafted beverages, 
                and the finest imported shisha flavors, curated specifically for connoisseurs who demand the best.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="glass-card p-4 rounded-xl border border-white/5 text-center hover:border-[#FF7A00]/50 transition-colors">
                <h4 className="text-white font-semibold mb-1">Premium Ambience</h4>
                <p className="text-sm text-white/50">Designed for comfort & luxury</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/5 text-center hover:border-[#FF7A00]/50 transition-colors">
                <h4 className="text-white font-semibold mb-1">Finest Shisha</h4>
                <p className="text-sm text-white/50">Exclusive imported flavors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
