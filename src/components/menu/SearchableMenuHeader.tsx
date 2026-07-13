"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/menu/SearchBar";
import type { PublicMenuItem } from "@/lib/menu-data";

type Props = {
  items: PublicMenuItem[];
  children: (items: PublicMenuItem[]) => React.ReactNode;
};

export default function SearchableMenuHeader({ items, children }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) => `${item.name} ${item.category} ${item.type}`.toLowerCase().includes(query));
  }, [items, searchQuery]);

  return (
    <>
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.15)_0%,transparent_70%)] z-0" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Culinary <span className="text-[#FF7A00]">Journey</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-lg max-w-2xl mx-auto mb-10 font-light">
            Explore our curated selection of signature dishes, crafted with premium ingredients and authentic spices.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </motion.div>
        </div>
      </section>
      {children(filteredItems)}
    </>
  );
}
