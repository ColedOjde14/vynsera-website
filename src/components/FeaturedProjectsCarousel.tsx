// src/components/FeaturedProjectsCarousel.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: "Pulse Dashboard",
    tagline: "Real-Time SaaS Analytics Platform",
    accent: "indigo",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    mockUI: (
      <div className="relative w-full h-64 bg-gradient-to-br from-gray-900 to-black rounded-t-2xl overflow-hidden border-b border-indigo-500/30">
        <div className="absolute left-0 top-0 bottom-0 w-14 bg-black/60 backdrop-blur-sm border-r border-indigo-500/20 flex flex-col items-center py-6 gap-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
          <div className="w-6 h-6 rounded bg-indigo-500/30" />
          <div className="w-6 h-6 rounded bg-indigo-500/20" />
        </div>
        <div className="absolute top-0 left-14 right-0 h-12 bg-black/40 backdrop-blur-md flex items-center px-6 justify-between">
          <div className="w-32 h-6 bg-indigo-500/20 rounded" />
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/30" />
            <div className="w-6 h-6 rounded-full bg-pink-500/30" />
          </div>
        </div>
        <div className="absolute inset-0 top-12 left-14 p-6 flex flex-col gap-4">
          <div className="flex-1 bg-gradient-to-br from-indigo-950/50 to-purple-950/30 rounded-xl border border-indigo-500/20 flex items-center justify-center">
            <svg className="w-5/6 h-4/5" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 80 Q25 60 50 70 T100 40" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.6" />
              <path d="M0 90 Q30 70 60 80 T100 50" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.6" />
            </svg>
          </div>
          <div className="h-20 bg-black/30 rounded-xl border border-purple-500/20 flex items-center justify-around">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl animate-pulse">
              87%
            </div>
            <div className="text-center">
              <div className="text-purple-300 text-sm">Users</div>
              <div className="text-2xl font-bold text-white">12.4k</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Nova Storefront",
    tagline: "Ultra-Fast E-Commerce Experience",
    accent: "pink",
    gradient: "from-pink-600 via-rose-600 to-purple-600",
    mockUI: (
      <div className="relative w-full h-64 bg-gradient-to-br from-rose-950 to-black rounded-t-2xl overflow-hidden border-b border-pink-500/30">
        <div className="absolute top-0 left-0 right-0 h-12 bg-black/60 backdrop-blur-md flex items-center justify-between px-6">
          <div className="w-24 h-6 bg-pink-500/20 rounded" />
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded bg-pink-500/30" />
            <div className="w-6 h-6 rounded bg-white/10" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600" />
          </div>
        </div>
        <div className="absolute inset-0 top-12 p-6 flex items-center justify-center">
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-white font-black text-4xl relative overflow-hidden">
            NOVA
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
          <div className="text-3xl font-black text-white">$249</div>
          <button className="px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/20 transition-all">
            Buy Now
          </button>
        </div>
      </div>
    ),
  },
  // ... (the other two projects remain the same, no changes needed)
  // Copy the rest from your previous version if you have them
];

export default function FeaturedProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 sm:py-32 px-6 bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl border-t border-purple-500/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent"
        >
          Featured Creations
        </motion.h2>

        <div className="relative">
          <div className="flex justify-center items-center gap-6 sm:gap-12 overflow-hidden px-4">
            <AnimatePresence mode="wait">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                const isPrev = index === (activeIndex - 1 + projects.length) % projects.length;
                const isNext = index === (activeIndex + 1) % projects.length;

                if (!isActive && !isPrev && !isNext) return null;

                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.85, x: isNext ? 200 : isPrev ? -200 : 0 }}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1.08 : 0.92,
                      x: isActive ? 0 : isPrev ? -140 : 140,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.85, x: isPrev ? -200 : 200 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`relative w-[90%] sm:w-[45%] lg:w-[32%] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group ${
                      isActive ? 'ring-4 ring-offset-4 ring-offset-black ring-purple-500/60' : 'ring-1 ring-purple-500/20'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {/* Gradient Top Bar */}
                    <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

                    {/* Card Body */}
                    <div className="p-6 sm:p-8 bg-black/70 backdrop-blur-xl">
                      <h3 className={`text-2xl sm:text-3xl font-black mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform`}>
                        {project.title}
                      </h3>

                      {/* FIXED: use tagline instead of description */}
                      <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                        {project.tagline}
                      </p>

                      {/* Mock UI Preview */}
                      <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                        {project.mockUI}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium text-${project.accent}-300 group-hover:text-${project.accent}-200 transition-colors`}>
                          View Project →
                        </span>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${project.gradient} opacity-30 blur-md group-hover:opacity-60 transition-opacity`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-4 mt-12">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-125 shadow-lg shadow-purple-500/50'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}