"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Utensils, Flame } from "lucide-react";

export default function Menu() {
  return (
    <section id="menu" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.1)_0%,transparent_70%)] z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            Digital Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Explore Our <span className="text-[#FF7A00]">Menus</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto">

          {/* Food Menu CTA */}
          <Link href="/menu" className="block group">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left gap-4 sm:gap-8 p-4 sm:p-8 rounded-2xl sm:rounded-3xl glass-card border border-white/10 group-hover:border-[#FF7A00]/50 group-hover:-translate-y-1 transition-all duration-500 bg-white/5 h-full"
            >
              <div className="w-12 h-12 sm:w-20 sm:h-20 shrink-0 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00] transition-colors duration-500">
                <Utensils className="text-white w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg sm:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#FF7A00] transition-colors">Food</h3>
                  <p className="text-white/60 mb-4 sm:mb-6 font-light leading-relaxed text-xs sm:text-base line-clamp-3 xl:line-clamp-none">Explore our exquisite food menu featuring authentic Indian, Chinese, and Tandoor delicacies.</p>
                </div>
                <div className="flex items-center justify-center xl:justify-start text-[#FF7A00] font-semibold uppercase tracking-wider text-[10px] sm:text-sm group-hover:gap-4 transition-all gap-1 sm:gap-2">
                  View Menu <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Hookah Lounge CTA */}
          <Link href="/hookah-lounge" className="block group">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left gap-4 sm:gap-8 p-4 sm:p-8 rounded-2xl sm:rounded-3xl glass-card border border-white/10 group-hover:border-[#FF7A00]/50 group-hover:-translate-y-1 transition-all duration-500 bg-white/5 h-full"
            >
              <div className="w-12 h-12 sm:w-20 sm:h-20 shrink-0 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00] transition-colors duration-500">
                <Flame className="text-white w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg sm:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#FF7A00] transition-colors">Hookah</h3>
                  <p className="text-white/60 mb-4 sm:mb-6 font-light leading-relaxed text-xs sm:text-base line-clamp-3 xl:line-clamp-none">Immerse yourself in our premium Shisha experience with exotic flavours and Russian bases.</p>
                </div>
                <div className="flex items-center justify-center xl:justify-start text-[#FF7A00] font-semibold uppercase tracking-wider text-[10px] sm:text-sm group-hover:gap-4 transition-all gap-1 sm:gap-2">
                  View Menu <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>
    </section>
  );
}
