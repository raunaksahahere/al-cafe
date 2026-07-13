"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/menu/SearchBar";
import type { PublicMenuItem } from "@/lib/menu-data";

type Props = {
  items: PublicMenuItem[];
  children: (items: PublicMenuItem[]) => React.ReactNode;
};

export default function SearchableHookahHeader({ items, children }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query));
  }, [items, searchQuery]);

  return (
    <>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.2)_0%,#000000_70%)] z-0" />
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2021/08/25/11/48/smoke-6573215_1280.jpg')] bg-cover opacity-20 mix-blend-screen z-0 blur-sm" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Hookah <span className="text-[#FF7A00]">Lounge</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-lg max-w-2xl mx-auto mb-10 font-light">
            Immerse yourself in our premium Shisha experience, featuring exotic flavours and luxury Russian bases.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search hookah flavours..." />
          </motion.div>
        </div>
      </section>
      {children(filteredItems)}
    </>
  );
}
