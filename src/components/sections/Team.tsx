"use client";

import { motion } from "framer-motion";

const teamMembers = [
  { name: "AL Cafe Crew", role: "Our Dedicated Team", img: "/image/img3.jpg" },
];

export default function Team() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            Meet the Masters
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Behind the <span className="text-[#FF7A00]">Experience</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full max-w-[300px] aspect-square mb-6">
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#FF7A00] transition-colors duration-500 z-20 scale-105" />
                <div className="w-full h-full rounded-xl overflow-hidden border-4 border-[#1a1a1a] relative z-10">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#FF7A00] transition-colors">{member.name}</h3>
              <p className="text-[#FF7A00]/80 text-sm font-medium uppercase tracking-wider">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
