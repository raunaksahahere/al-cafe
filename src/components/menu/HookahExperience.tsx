"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import CategoryNav from "@/components/menu/CategoryNav";
import MenuCard from "@/components/menu/MenuCard";
import SearchBar from "@/components/menu/SearchBar";
import { hookahAddons } from "@/data/hookah-addons";
import type { PublicMenuItem } from "@/lib/menu-data";

export default function HookahExperience({ items }: { items: PublicMenuItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(items[0]?.category ?? "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const groupedMenu = useMemo(() => {
    const visibleItems = searchQuery
      ? items.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(searchQuery.toLowerCase()))
      : items;
    return visibleItems.reduce<Record<string, PublicMenuItem[]>>((groups, item) => {
      (groups[item.category] ??= []).push(item);
      return groups;
    }, {});
  }, [items, searchQuery]);

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = sectionRefs.current[category];
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 150, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observers = Object.entries(sectionRefs.current).flatMap(([category, element]) => {
      if (!element) return [];
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveCategory(category)),
        { rootMargin: "-20% 0px -70% 0px" },
      );
      observer.observe(element);
      return [observer];
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [groupedMenu]);

  return (
    <>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.2)_0%,#000000_70%)] z-0" />
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2021/08/25/11/48/smoke-6573215_1280.jpg')] bg-cover opacity-20 mix-blend-screen z-0 blur-sm" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Hookah <span className="text-[#FF7A00]">Lounge</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-lg max-w-2xl mx-auto mb-10 font-light">Immerse yourself in our premium Shisha experience, featuring exotic flavours and luxury Russian bases.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search hookah flavours..." /></motion.div>
        </div>
      </section>
      <section className="pb-24">
      <div className="container mx-auto px-4 max-w-7xl relative">
        {Object.keys(groupedMenu).length > 0 && !searchQuery && (
          <CategoryNav categories={Object.keys(groupedMenu)} activeCategory={activeCategory} onSelect={scrollToCategory} />
        )}
        <div className="space-y-20 mt-8">
          <AnimatePresence>
            {Object.entries(groupedMenu).length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20">
                <p className="text-white/40 text-xl">No flavours found matching your search.</p>
              </motion.div>
            ) : (
              Object.entries(groupedMenu).map(([category, categoryItems]) => (
                <motion.div
                  key={category}
                  id={`category-${category}`}
                  ref={(element) => { sectionRefs.current[category] = element; }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-4">
                    {category}
                    <span className="text-sm font-light text-[#FF7A00] bg-[#FF7A00]/10 px-3 py-1 rounded-full border border-[#FF7A00]/20">{categoryItems.length} flavours</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryItems.map((item, index) => <MenuCard key={item.id} item={item} index={index} />)}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          {!searchQuery && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24 pt-16 border-t border-white/10">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Base <span className="text-[#FF7A00]">Add-ons</span></h2>
                <p className="text-white/50">Elevate your experience with our premium base enhancements.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {hookahAddons.map((addon, index) => (
                  <motion.div key={addon.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-[#FF7A00]/50 transition-colors bg-white/5">
                    <span className="text-white font-medium flex items-center gap-2"><Plus size={16} className="text-[#FF7A00]" />{addon.name}</span>
                    <span className="text-[#FF7A00] font-bold">{addon.price}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      </section>
    </>
  );
}
