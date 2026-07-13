"use client";

import { motion } from "framer-motion";
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import lgZoom from 'lightgallery/plugins/zoom';
import { Maximize2 } from "lucide-react";

const galleryImages = [
  { src: "/image/img5.jpg", title: "Outdoor Seating", aspect: "aspect-[3/4]" },
  { src: "/image/img8.jpg", title: "Shisha Area", aspect: "aspect-square" },
  { src: "/image/img7.jpg", title: "Family Area", aspect: "aspect-[4/3]" },
  { src: "/image/img13.jpg", title: "Private Dining", aspect: "aspect-square" },
  { src: "/image/img9.jpg", title: "Live Music", aspect: "aspect-[4/3]" },
  { src: "/image/img10.jpg", title: "Café Counter", aspect: "aspect-[3/4]" },

];

export default function AmbienceGallery() {
  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            The Vibe
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Our <span className="text-[#FF7A00]">Ambience</span>
          </motion.h2>
        </div>

        <LightGallery
          speed={500}
          plugins={[lgZoom]}
          elementClassNames="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-6 space-y-3 sm:space-y-6"
          mode="lg-fade"
        >
          {galleryImages.map((img, index) => (
            <motion.a
              key={index}
              href={img.src}
              className={`group relative rounded-3xl overflow-hidden block cursor-pointer break-inside-avoid border border-transparent hover:border-[#FF7A00]/80 transition-all duration-500 bg-[#1a1a1a] shadow-[0_0_15px_rgba(0,0,0,0.5)] ${img.aspect}`}
              data-src={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.15 }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-lg font-semibold text-white mb-1">{img.title}</h3>
                <div className="flex items-center gap-2 text-[#FF7A00]">
                  <Maximize2 size={16} />
                  <span className="text-xs uppercase tracking-wider">Zoom</span>
                </div>
              </div>
            </motion.a>
          ))}
        </LightGallery>
      </div>
    </section>
  );
}
