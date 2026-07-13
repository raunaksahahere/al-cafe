"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Search the menu..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative w-full max-w-xl mx-auto transition-all duration-300 ${
        isFocused ? "scale-105" : "scale-100"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-orange-400 blur transition-opacity duration-300 opacity-0 ${
          isFocused ? "opacity-20" : ""
        }`}
      />
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center px-4 py-3 group hover:border-[#FF7A00]/50 transition-colors">
        <Search
          size={20}
          className={`transition-colors ${isFocused ? "text-[#FF7A00]" : "text-white/40 group-hover:text-white/70"}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-white w-full px-4 font-light placeholder:text-white/30"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
