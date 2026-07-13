"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { foodMenu } from "@/data/menu";
import { hookahMenu } from "@/data/hookah";

import Link from "next/link";

const featuredImageById = {
  invg1: "/image/Chicken%20Butter%20Masala.png",
  h51: "/image/Russian%20Base%20hookha.png",
  nvk1: "/image/Spicy%20Chicken%20Tikka%20Kebab.png",
  h14: "/image/Habibi%20Special.png",
  ivg1: "/image/Paneer%20Butter%20Masala.png",
  h13: "/image/Pink%20Guava%20hookha.png",
  r3: "/image/Chicken%20Fried%20Rice.png",
  h42: "/image/Blueberry%20Mint%20hookha.png",
  nvk3: "/image/Malai%20Chicken%20Tikka%20Kebab.png",
  h37: "/image/Five%20Paan%20hookha.png",
} as const;

const featuredFoodIds = ["invg1", "nvk1", "ivg1", "r3", "nvk3"] as const;
const featuredHookahIds = ["h51", "h14", "h13", "h42", "h37"] as const;

const featuredFoods = featuredFoodIds.flatMap((id) => {
  const item = foodMenu.find((entry) => entry.id === id);
  if (!item) return [];
  return {
    name: item.name,
    category: item.category,
    price: item.price,
    badge: item.isChefSpecial ? "Chef Special" : item.isBestseller ? "Best Seller" : "Menu Pick",
    href: "/menu",
    image: featuredImageById[id],
  };
});

const featuredHookahs = featuredHookahIds.flatMap((id) => {
  const item = hookahMenu.find((entry) => entry.id === id);
  if (!item) return [];
  return {
    name: item.name,
    category: item.series,
    price: item.price,
    badge: item.isChefSpecial ? "Chef Special" : item.isBestseller ? "Best Seller" : "Menu Pick",
    href: "/hookah-lounge",
    image: featuredImageById[id],
  };
});

const featuredItems = featuredFoods.flatMap((item, index) => [item, featuredHookahs[index]].filter(Boolean));

export default function FeaturedMenu() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollCarousel = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 344 : -344,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let interval: NodeJS.Timeout;
    
    const startScroll = () => {
      interval = setInterval(() => {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }, 2000);
    };
    
    startScroll();
    
    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => startScroll();
    
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchstart', handleMouseEnter, { passive: true });
    el.addEventListener('touchend', handleMouseLeave);
    
    return () => {
      clearInterval(interval);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchstart', handleMouseEnter);
      el.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = document.querySelectorAll('.carousel-card');
    
    elements.forEach((el, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveIndex(index);
            }
          });
        },
        { root: scrollRef.current, threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.025] border-y border-white/[0.06] backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 gap-6">
          <div className="flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FF7A00] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
            >
              Chef&apos;s Recommendations
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white"
            >
              Featured <span className="text-[#FF7A00]">Delights</span>
            </motion.h2>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {featuredItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={item.name + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className={`carousel-card shrink-0 w-[280px] md:w-[320px] snap-center group glass-card rounded-2xl overflow-hidden border transition-all duration-500 ${
                  isActive ? 'border-[#FF7A00] shadow-[0_0_20px_rgba(255,122,0,0.3)] scale-[1.02]' : 'border-white/5 hover:border-[#FF7A00]/50 scale-100'
                }`}
              >
                <div className="h-48 overflow-hidden relative">
                  <div className={`absolute inset-0 transition-colors z-10 ${isActive ? 'bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`} />
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
                    <span className="text-[#FF7A00] text-sm font-semibold">{item.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-white/60 text-sm">{item.badge} · {item.price}</span>
                    <Button asChild variant="link" className="text-[#FF7A00] p-0 h-auto">
                      <Link href={item.href}>Order Now</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>

          <div className="hidden md:flex items-center justify-end gap-3 -mt-1">
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              className="h-11 w-11 rounded-full border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur-md transition-colors hover:border-[#FF7A00]/60 hover:bg-[#FF7A00] hover:text-white"
              aria-label="Show previous featured delights"
              title="Previous"
            >
              <ChevronLeft className="mx-auto" size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              className="h-11 w-11 rounded-full border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur-md transition-colors hover:border-[#FF7A00]/60 hover:bg-[#FF7A00] hover:text-white"
              aria-label="Show next featured delights"
              title="Next"
            >
              <ChevronRight className="mx-auto" size={20} />
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="rounded-full px-8 w-full sm:w-auto">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
