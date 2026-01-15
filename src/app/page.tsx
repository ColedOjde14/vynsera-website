// src/app/page.tsx
'use client'; // Needed for client-side animation

import { useState, useEffect } from 'react';

export default function Home() {
  const services = [
    "SaaS Solutions",
    "Commercial Design",
    "Premium Hosting Services",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Hero Section - Mobile-optimized */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-16 sm:py-24 md:py-32 lg:px-8 overflow-hidden">
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Logo - Smaller on mobile */}
          <div className="mb-12 sm:mb-16 md:mb-20 animate-fade-in">
            <img
              src="/logo.png"
              alt="Vynsera"
              className="mx-auto h-40 sm:h-48 md:h-64 w-auto drop-shadow-2xl transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Animated Tagline - Smaller on mobile */}
          <div className="min-h-[100px] sm:min-h-[120px] flex items-center justify-center">
            <p
              className={`text-2xl sm:text-3xl md:text-5xl font-light leading-tight text-indigo-100/95 transition-opacity duration-500 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {services[currentIndex]}
            </p>
          </div>

          {/* CTA Buttons - Stack on mobile */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 animate-slide-up animation-delay-500">
            <a
              href="/services"
              className="group relative rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-5 sm:px-12 sm:py-6 text-lg sm:text-xl font-semibold text-white shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 transform hover:scale-105 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">Explore Services</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            <a
              href="/portal/login"
              className="rounded-full border-2 border-indigo-400/60 px-10 py-5 sm:px-12 sm:py-6 text-lg sm:text-xl font-semibold text-indigo-300 hover:text-white hover:border-indigo-300 transition-all duration-300 w-full sm:w-auto"
            >
              Client Portal →
            </a>
          </div>

          {/* Trusted by - Smaller & centered */}
          <div className="mt-16 sm:mt-24 animate-fade-in animation-delay-700">
            <p className="text-base sm:text-lg text-indigo-300/60 tracking-widest uppercase font-light">
              Trusted By Innovators Across New York State
            </p>
          </div>
        </div>

        {/* Background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_60%)]" />
      </section>

      {/* Services Teaser Section - Mobile-optimized */}
      <section className="py-20 sm:py-24 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-indigo-300 animate-fade-in">
            Our Core Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* SaaS Solutions Card */}
            <div className="group bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 sm:p-8 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                {/* Clean SaaS cloud SVG */}
                <svg className="mx-auto h-14 sm:h-16 w-14 sm:w-16 text-indigo-400 group-hover:text-indigo-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-indigo-200 mb-4 text-center">
                SaaS Solutions
              </h3>
              <p className="text-indigo-200/80 text-sm sm:text-base text-center">
                Custom software as a service platforms built for scalability, security, and seamless user experiences.
              </p>
            </div>

            {/* Commercial Design Card */}
            <div className="group bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 sm:p-8 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <svg className="mx-auto h-14 sm:h-16 w-14 sm:w-16 text-indigo-400 group-hover:text-indigo-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  <path d="m15 5 3 3" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-indigo-200 mb-4 text-center">
                Commercial Design
              </h3>
              <p className="text-indigo-200/80 text-sm sm:text-base text-center">
                Professional branding, UI/UX, and visual identity for businesses that need to stand out.
              </p>
            </div>

            {/* Premium Hosting Card */}
            <div className="group bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 sm:p-8 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <svg className="mx-auto h-14 sm:h-16 w-14 sm:w-16 text-indigo-400 group-hover:text-indigo-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                  <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                  <line x1="6" x2="6.01" y1="6" y2="6" />
                  <line x1="6" x2="6.01" y1="18" y2="18" />
                  <path d="M17 6h.01" />
                  <path d="M17 18h.01" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-indigo-200 mb-4 text-center">
                Premium Hosting
              </h3>
              <p className="text-indigo-200/80 text-sm sm:text-base text-center">
                Reliable, high-performance hosting with 99.99% uptime, security, and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}