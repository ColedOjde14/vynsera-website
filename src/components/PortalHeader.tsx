// src/components/PortalHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import { UserButton } from "@clerk/nextjs";

interface PortalHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PortalHeader({ title, subtitle }: PortalHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Shrink after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-4 sm:p-6 sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-2 shadow-lg' : 'py-6 sm:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 sm:mt-2 text-indigo-300 text-base sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}