"use client";

import { motion } from "framer-motion";
import { Star, Flame, Heart, ChefHat } from "lucide-react";
import { useState } from "react";
import type { PublicMenuItem } from "@/lib/menu-data";

type MenuCardProps = {
  item: PublicMenuItem;
  index: number;
};

export default function MenuCard({ item, index }: MenuCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group glass-card rounded-2xl p-6 border border-white/5 hover:border-[#FF7A00]/50 transition-all duration-300 relative overflow-hidden bg-[#111]"
    >
      <div className="absolute top-0 right-0 p-4 z-10 flex gap-2">
        {item.isBestseller && (
          <span className="bg-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 border border-[#FF7A00]/30 backdrop-blur-sm">
            <Star size={10} className="fill-[#FF7A00]" /> Bestseller
          </span>
        )}
        {item.isChefSpecial && (
          <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 border border-yellow-500/30 backdrop-blur-sm">
            <ChefHat size={12} /> Chef&apos;s Special
          </span>
        )}
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                item.type === "veg" ? "border-green-500" : "border-red-500"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  item.type === "veg" ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#FF7A00] transition-colors pr-16">
              {item.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {item.spiceLevel &&
              Array.from({ length: item.spiceLevel }).map((_, i) => (
                <Flame key={i} size={14} className="text-red-500 fill-red-500/20" />
              ))}
          </div>
        </div>
      </div>

      <div className="text-sm text-white/50 font-light mb-6 line-clamp-2 pr-8 min-h-[40px]">
        {item.description || "A delicious signature preparation crafted with premium ingredients and authentic spices."}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-light text-white tracking-wide">
          {item.price}
        </span>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF7A00]/20 hover:border-[#FF7A00]/50 transition-all text-white/70 hover:text-[#FF7A00]"
        >
          {isFavorite ? (
            <Heart size={18} className="fill-[#FF7A00] text-[#FF7A00]" />
          ) : (
            <Heart size={18} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
