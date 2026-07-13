"use client";

import { motion } from "framer-motion";

type CategoryNavProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryNav({ categories, activeCategory, onSelect }: CategoryNavProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4 -mx-4 px-4 sticky top-[80px] z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 mb-8">
      <div className="flex gap-3 md:justify-center min-w-max">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                isActive ? "text-white" : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[#FF7A00] rounded-full z-0 shadow-[0_0_15px_rgba(255,122,0,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
