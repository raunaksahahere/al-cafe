"use client";

import { motion } from "framer-motion";
import { Coffee, Utensils, Flame, Wind, PartyPopper, Salad, Beef, Users, UtensilsCrossed } from "lucide-react";

const experiences = [
  { name: "Premium Coffee", icon: Coffee },
  { name: "Multi Cuisine", icon: Utensils },
  { name: "Indian Food", icon: Flame },
  { name: "Chinese Food", icon: UtensilsCrossed },
  { name: "Veg & Non-Veg", icon: Salad },
  { name: "BBQ & Kebabs", icon: Beef },
  { name: "Premium Hookah", icon: Wind },
  { name: "Luxury Shisha", icon: Wind },
  { name: "Family Dining", icon: Users },
  { name: "Birthday & Anniversary Events", icon: PartyPopper },
];

export default function SignatureExperience() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            The AL Cafe Standard
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Signature <span className="font-light italic text-white/90">Experience</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group glass-card p-4 sm:p-5 rounded-xl border border-white/5 hover:border-[#FF7A00]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,122,0,0.15)] cursor-pointer flex flex-col items-center text-center bg-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-3 group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00] transition-colors duration-300">
                  <Icon className="text-white w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-[#FF7A00] transition-colors leading-tight">
                  {exp.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
