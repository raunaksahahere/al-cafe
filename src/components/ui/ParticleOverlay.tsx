"use client";

import { motion } from "framer-motion";
type Ember = { id: number; x: number; targetX: number; size: number; delay: number; duration: number };

const embers: Ember[] = Array.from({ length: 40 }, (_, id) => {
  const x = (id * 37) % 100;
  return {
    id,
    x,
    targetX: Math.max(0, Math.min(100, x + ((id * 13) % 15 - 7.5))),
    size: (id % 4) + 1,
    delay: (id * 3) % 10,
    duration: 15 + ((id * 7) % 15),
  };
});

export default function ParticleOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      
      {/* 1. Cinematic Haze Background */}
      <div className="absolute inset-0 bg-[#0a0500]/30 backdrop-blur-[2px] mix-blend-multiply" />
      
      {/* 2. Soft Warm Orange Light Rays / Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[30%] -left-[20%] w-[140%] h-[150%] bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,122,0,0.15)_0%,transparent_70%)] mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] -right-[20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_70%_40%,rgba(255,80,0,0.1)_0%,transparent_60%)] mix-blend-screen"
      />

      {/* 3. GPU-Accelerated Drifting Smoke Layers (Using large blurred blobs) */}
      <motion.div
        animate={{ 
          x: ["-5%", "10%", "-5%"], 
          y: ["-10%", "5%", "-10%"],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[20%] w-[140vw] h-[140vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] blur-[100px] mix-blend-screen"
      />
      
      <motion.div
        animate={{ 
          x: ["10%", "-5%", "10%"], 
          y: ["5%", "-10%", "5%"],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(255,150,50,0.02)_0%,transparent_55%)] blur-[80px] mix-blend-screen"
      />

      <motion.div
        animate={{ 
          x: ["-15%", "15%", "-15%"], 
          y: ["15%", "-15%", "15%"]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] -right-[20%] w-[150vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] blur-[120px] mix-blend-screen"
      />

      {/* 4. Floating Glowing Embers and Fire Sparks */}
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{ 
            opacity: 0, 
            y: "110vh", 
            x: `${ember.x}vw` 
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: "-10vh", 
            x: [`${ember.x}vw`, `${ember.targetX}vw`] 
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full bg-[#FF7A00] mix-blend-screen shadow-[0_0_12px_rgba(255,122,0,0.9)]"
          style={{
            width: ember.size,
            height: ember.size,
            top: 0,
            left: 0,
          }}
        />
      ))}
    </div>
  );
}
