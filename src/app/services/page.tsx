// src/app/services/page.tsx
import Link from "next/link";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950 text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.12),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(236,72,153,0.12),transparent_50%)] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.08),transparent_60%)] animate-pulse-slow delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 bg-black/40 backdrop-blur-xl border-b border-indigo-500/20 p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] leading-tight">
              Vynsera Services
            </h1>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl lg:text-2xl text-indigo-200/90 font-light tracking-wide">
              Premium. Fast. Unbeatable value.
            </p>
          </div>

          <Link
            href="/"
            className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 transition-all duration-500 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 text-base sm:text-lg font-medium"
          >
            <span className="relative z-10 text-white">
              ← Back to Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6 sm:p-8 lg:p-12">
        {/* Core Services */}
        <section className="mb-20 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
            {/* Branding */}
            <div className="group relative bg-gradient-to-br from-black/70 via-indigo-950/50 to-purple-950/40 border border-indigo-500/40 rounded-3xl p-8 sm:p-10 hover:border-indigo-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-500/40 transform hover:-translate-y-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <span className="text-6xl sm:text-7xl animate-pulse">🎨</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                    Branding & Identity
                  </h2>
                </div>
                <p className="text-indigo-200 text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed">
                  Full visual identity that turns your brand into an icon — logo system, colors, typography, social assets, guidelines.
                </p>
                <ul className="text-indigo-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-8 sm:mb-10">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    5–8 premium logo concepts + unlimited revisions
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Full brand style guide (PDF + editable files)
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Complete social media kit (profiles, stories, posts)
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Business card, letterhead, email signature, favicon
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    10–16 day delivery
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-purple-300 animate-pulse">
                    Starting at $299
                  </p>
                  <Link
                    href="/services/branding"
                    className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-500 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                  >
                    <span className="relative z-10 text-white">
                      Get Started →
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Website Development */}
            <div className="group relative bg-gradient-to-br from-black/70 via-purple-950/50 to-pink-950/40 border border-purple-500/40 rounded-3xl p-8 sm:p-10 hover:border-purple-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <span className="text-6xl sm:text-7xl animate-pulse">🌐</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Website Development
                  </h2>
                </div>
                <p className="text-purple-200 text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed">
                  Lightning-fast, modern websites — custom, responsive, SEO-ready, with domain & hosting included.
                </p>
                <ul className="text-purple-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-8 sm:mb-10">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-pink-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    1–8 page custom site (landing, portfolio, e-commerce ready)
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-pink-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Free domain registration (1 year)
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-pink-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Premium hosting, SSL, CDN & performance optimization
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-pink-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Mobile-first + basic SEO & analytics setup
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-pink-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    10–18 day delivery
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-pink-300 animate-pulse">
                    Starting at $249
                  </p>
                  <Link
                    href="/services/website"
                    className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-500 shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                  >
                    <span className="relative z-10 text-white">
                      Get Started →
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Digital Marketing */}
            <div className="group relative bg-gradient-to-br from-black/70 via-pink-950/50 to-rose-950/40 border border-pink-500/40 rounded-3xl p-8 sm:p-10 hover:border-pink-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-pink-500/40 transform hover:-translate-y-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <span className="text-6xl sm:text-7xl animate-pulse">🚀</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                    Digital Marketing & SEO
                  </h2>
                </div>
                <p className="text-pink-200 text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed">
                  Aggressive growth engine — SEO domination, social media firepower, content that converts, paid ads that scale.
                </p>
                <ul className="text-pink-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-8 sm:mb-10">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Deep keyword research + full on/off-page SEO
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Social media strategy, content calendar, posting & engagement
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Google Ads, Meta Ads, TikTok Ads management
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Monthly performance reports + optimization
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                    Ongoing monthly (min. 3 months)
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-300 animate-pulse">
                    Starting at $129/month
                  </p>
                  <Link
                    href="/services/marketing"
                    className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 transition-all duration-500 shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                  >
                    <span className="relative z-10 text-white">
                      Get Started →
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Custom Software */}
            <div className="group relative bg-gradient-to-br from-black/70 via-cyan-950/50 to-blue-950/40 border border-cyan-500/40 rounded-3xl p-8 sm:p-10 hover:border-cyan-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/40 transform hover:-translate-y-4 overflow-hidden lg:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <span className="text-6xl sm:text-7xl animate-pulse">🛠️</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Custom Software & Development
                  </h2>
                </div>
                <p className="text-cyan-200 text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed">
                  Bespoke digital products — web apps, SaaS platforms, internal tools, automation, API integrations — built exactly for your vision.
                </p>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                  <ul className="text-cyan-200 space-y-3 sm:space-y-4 text-base sm:text-lg">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                      Custom web & mobile apps
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                      SaaS dashboards & admin panels
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                      Workflow automation & scripts
                    </li>
                  </ul>
                  <ul className="text-cyan-200 space-y-3 sm:space-y-4 text-base sm:text-lg">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                      API development & third-party integrations
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                      Database design & performance optimization
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <span className="text-purple-400 text-2xl sm:text-3xl mt-1">⚡</span>
                      Ongoing maintenance & scaling support
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-300 animate-pulse">
                    Starting at $799
                  </p>
                  <Link
                    href="/services/custom-software"
                    className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all duration-500 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                  >
                    <span className="relative z-10 text-white">
                      Get Started →
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Starters */}
        <section className="mb-20 sm:mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
            Budget-Friendly Starters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Starter Logo */}
            <div className="group relative bg-gradient-to-br from-black/70 to-emerald-950/50 border border-emerald-500/40 rounded-3xl p-8 sm:p-10 hover:border-emerald-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-500/40 transform hover:-translate-y-4">
              <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <span className="text-6xl sm:text-7xl animate-pulse">✨</span>
                <h3 className="text-3xl sm:text-4xl font-black text-emerald-200 group-hover:text-emerald-100 transition-colors">
                  Starter Logo
                </h3>
              </div>
              <ul className="text-emerald-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-6 sm:mb-10">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  3 premium concepts + revisions
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  High-res PNG, SVG, transparent
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Basic color palette & fonts
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  5–7 day delivery
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <p className="text-3xl sm:text-4xl font-black text-emerald-300 animate-pulse">
                  Starting at $89
                </p>
                <Link
                  href="/services/intro-request"
                  className="group relative px-8 py-4 sm:px-8 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all duration-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 text-white">
                    Get Started →
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>

            {/* Social Starter Kit */}
            <div className="group relative bg-gradient-to-br from-black/70 to-pink-950/50 border border-pink-500/40 rounded-3xl p-8 sm:p-10 hover:border-pink-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-pink-500/40 transform hover:-translate-y-4">
              <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <span className="text-6xl sm:text-7xl animate-pulse">📱</span>
                <h3 className="text-3xl sm:text-4xl font-black text-pink-200 group-hover:text-pink-100 transition-colors">
                  Social Starter Kit
                </h3>
              </div>
              <ul className="text-pink-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-6 sm:mb-10">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Profile picture + banner design
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  5 post/story templates
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Basic color & font guide
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  5–7 day delivery
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <p className="text-3xl sm:text-4xl font-black text-pink-300 animate-pulse">
                  Starting at $109
                </p>
                <Link
                  href="/services/intro-request"
                  className="group relative px-8 py-4 sm:px-8 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 transition-all duration-500 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 text-white">
                    Get Started →
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>

            {/* One-Page Site */}
            <div className="group relative bg-gradient-to-br from-black/70 to-cyan-950/50 border border-cyan-500/40 rounded-3xl p-8 sm:p-10 hover:border-cyan-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/40 transform hover:-translate-y-4">
              <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <span className="text-6xl sm:text-7xl animate-pulse">🌍</span>
                <h3 className="text-3xl sm:text-4xl font-black text-cyan-200 group-hover:text-cyan-100 transition-colors">
                  One-Page Site
                </h3>
              </div>
              <ul className="text-cyan-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-6 sm:mb-10">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Fully custom one-page site
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Domain & hosting (1 year free)
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Mobile-optimized & blazing fast
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  10–14 day delivery
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <p className="text-3xl sm:text-4xl font-black text-cyan-300 animate-pulse">
                  Starting at $159
                </p>
                <Link
                  href="/services/intro-request"
                  className="group relative px-8 py-4 sm:px-8 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all duration-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 text-white">
                    Get Started →
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>

            {/* Quick Brand Refresh */}
            <div className="group relative bg-gradient-to-br from-black/70 to-amber-950/50 border border-amber-500/40 rounded-3xl p-8 sm:p-10 hover:border-amber-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-amber-500/40 transform hover:-translate-y-4">
              <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <span className="text-6xl sm:text-7xl animate-pulse">🔥</span>
                <h3 className="text-3xl sm:text-4xl font-black text-amber-200 group-hover:text-amber-100 transition-colors">
                  Quick Brand Refresh
                </h3>
              </div>
              <ul className="text-amber-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-6 sm:mb-10">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Logo refresh or redesign
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Color palette & font refresh
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Social profiles update
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  5–7 day delivery
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <p className="text-3xl sm:text-4xl font-black text-amber-300 animate-pulse">
                  Starting at $119
                </p>
                <Link
                  href="/services/intro-request"
                  className="group relative px-8 py-4 sm:px-8 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 transition-all duration-500 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 text-white">
                    Get Started →
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>

            {/* Social Audit */}
            <div className="group relative bg-gradient-to-br from-black/70 to-teal-950/50 border border-teal-500/40 rounded-3xl p-8 sm:p-10 hover:border-teal-400/80 transition-all duration-700 hover:shadow-2xl hover:shadow-teal-500/40 transform hover:-translate-y-4">
              <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <span className="text-6xl sm:text-7xl animate-pulse">📊</span>
                <h3 className="text-3xl sm:text-4xl font-black text-teal-200 group-hover:text-teal-100 transition-colors">
                  Social Audit & Setup
                </h3>
              </div>
              <ul className="text-teal-200 space-y-3 sm:space-y-4 text-base sm:text-lg mb-6 sm:mb-10">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Profile audit & optimization
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  Profile picture/banner refresh
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  5 post ideas + templates
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="text-indigo-400 text-2xl sm:text-3xl mt-1">⚡</span>
                  5–7 day delivery
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <p className="text-3xl sm:text-4xl font-black text-teal-300 animate-pulse">
                  Starting at $89
                </p>
                <Link
                  href="/services/intro-request"
                  className="group relative px-8 py-4 sm:px-8 sm:py-5 rounded-full overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 transition-all duration-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:scale-105 text-base sm:text-xl font-medium w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 text-white">
                    Get Started →
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Callout */}
        <section className="text-center py-20 sm:py-28 bg-gradient-to-br from-black/70 via-indigo-950/60 to-purple-950/50 border border-indigo-500/40 rounded-3xl backdrop-blur-xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 sm:mb-8 animate-gradient-x bg-[length:200%_200%] leading-tight px-4">
            Need Something Epic?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-indigo-200 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            From full SaaS platforms to unique branding or automation tools — we build exactly what your vision demands.
          </p>
          <Link
            href="/request-custom-quote"
            className="group relative inline-block px-10 sm:px-16 py-6 sm:py-8 rounded-full overflow-hidden bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-105 text-lg sm:text-2xl font-black text-white w-full sm:w-auto"
          >
            <span className="relative z-10">Request Custom Quote</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </section>
      </main>
    </div>
  );
}