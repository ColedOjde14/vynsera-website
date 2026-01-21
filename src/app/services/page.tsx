// src/app/services/page.tsx
import Link from "next/link";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-indigo-500/20 p-6 sm:p-10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Vynsera Services
            </h1>
            <p className="mt-3 text-xl text-indigo-200 max-w-2xl mx-auto sm:mx-0">
              Premium digital solutions, crafted fast and affordably. Built for dreamers who move quickly.
            </p>
          </div>

          <Link
            href="/"
            className="px-8 py-4 rounded-full border-2 border-indigo-500/60 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 transition-all duration-300 font-medium text-lg shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 sm:p-10">
        {/* Core Services Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Branding */}
            <div className="group bg-gradient-to-br from-black/60 to-indigo-950/40 border border-indigo-500/30 rounded-3xl p-8 sm:p-10 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🎨</span>
                <h2 className="text-4xl font-bold text-indigo-200 group-hover:text-indigo-100 transition-colors">
                  Digital Identity & Branding
                </h2>
              </div>
              <p className="text-indigo-200 text-lg mb-6 leading-relaxed">
                Full visual identity package — logo, color system, typography, social assets, and brand guidelines that make your business instantly recognizable.
              </p>
              <ul className="text-indigo-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> 5–7 premium logo concepts + unlimited revisions
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Business card, letterhead, email signature, favicon
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Full social media kit (profiles, stories, post templates)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Comprehensive brand style guide (PDF)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> 10–14 day delivery
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-purple-300">
                  Starting at $399
                </p>
                <Link
                  href="/services/branding"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* Website Development */}
            <div className="group bg-gradient-to-br from-black/60 to-purple-950/40 border border-purple-500/30 rounded-3xl p-8 sm:p-10 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🌐</span>
                <h2 className="text-4xl font-bold text-purple-200 group-hover:text-purple-100 transition-colors">
                  Domain & Website Development
                </h2>
              </div>
              <p className="text-purple-200 text-lg mb-6 leading-relaxed">
                Fast, modern, responsive website — fully custom, mobile-ready, SEO-optimized, with domain and hosting included.
              </p>
              <ul className="text-purple-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 1–5 page custom site (landing, portfolio, services, etc.)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Domain registration (1 year free)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Hosting, SSL, CDN & performance optimization
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Mobile-first design + basic SEO setup
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 10–18 day delivery
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-indigo-300">
                  Starting at $299
                </p>
                <Link
                  href="/services/website"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* Digital Marketing & SEO */}
            <div className="group bg-gradient-to-br from-black/60 to-pink-950/40 border border-pink-500/30 rounded-3xl p-8 sm:p-10 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🚀</span>
                <h2 className="text-4xl font-bold text-pink-200 group-hover:text-pink-100 transition-colors">
                  Digital Marketing & SEO
                </h2>
              </div>
              <p className="text-pink-200 text-lg mb-6 leading-relaxed">
                Full digital growth package — SEO, social media, content strategy, and paid ads to drive real traffic and leads.
              </p>
              <ul className="text-pink-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Keyword research, on-page/off-page SEO
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Social media setup, content calendar, posting
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Google Ads & Meta Ads management
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Monthly performance reports & analytics
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">⚡</span> Ongoing monthly (min. 3 months)
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-purple-300">
                  Starting at $149/month
                </p>
                <Link
                  href="/services/marketing"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 transition-all duration-300 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* Custom Software */}
            <div className="group bg-gradient-to-br from-black/60 to-cyan-950/40 border border-cyan-500/30 rounded-3xl p-8 sm:p-10 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2 col-span-1 lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🛠️</span>
                <h2 className="text-4xl font-bold text-cyan-200 group-hover:text-cyan-100 transition-colors">
                  Custom Software & Development
                </h2>
              </div>
              <p className="text-cyan-200 text-lg mb-6 leading-relaxed">
                Bespoke solutions — web apps, SaaS platforms, internal tools, automation scripts, API integrations, and more.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <ul className="text-cyan-300 space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 text-xl">⚡</span> Custom web/mobile/desktop apps
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 text-xl">⚡</span> SaaS dashboards & admin panels
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 text-xl">⚡</span> Automation & workflow tools
                  </li>
                </ul>
                <ul className="text-cyan-300 space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 text-xl">⚡</span> API development & integrations
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 text-xl">⚡</span> Database design & optimization
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 text-xl">⚡</span> Ongoing maintenance & support
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-indigo-300">
                  Starting at $999
                </p>
                <Link
                  href="/services/custom-software"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:from-cyan-500 hover:to-indigo-500 transition-all duration-300 font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Introductory / Budget Services */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Budget-Friendly Starters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Starter Logo */}
            <div className="group bg-gradient-to-br from-black/60 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">✨</span>
                <h3 className="text-3xl font-bold text-emerald-200 group-hover:text-emerald-100 transition-colors">
                  Starter Logo
                </h3>
              </div>
              <ul className="text-emerald-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 3 logo concepts + revisions
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> High-res PNG, SVG, transparent
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Basic color palette
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 5–7 day delivery
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-emerald-300">
                  Starting at $99
                </p>
                <Link
                  href="/services/intro-request"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-500 hover:to-green-500 transition-all duration-300 font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* Social Media Starter Kit */}
            <div className="group bg-gradient-to-br from-black/60 to-pink-950/40 border border-pink-500/30 rounded-3xl p-8 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">📱</span>
                <h3 className="text-3xl font-bold text-pink-200 group-hover:text-pink-100 transition-colors">
                  Social Starter Kit
                </h3>
              </div>
              <ul className="text-pink-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Profile picture + banner design
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 5 post/story templates
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Basic color & font guide
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 5–7 day delivery
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-pink-300">
                  Starting at $119
                </p>
                <Link
                  href="/services/intro-request"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 transition-all duration-300 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* One-Page Site */}
            <div className="group bg-gradient-to-br from-black/60 to-cyan-950/40 border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🌍</span>
                <h3 className="text-3xl font-bold text-cyan-200 group-hover:text-cyan-100 transition-colors">
                  One-Page Site
                </h3>
              </div>
              <ul className="text-cyan-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Custom one-page site
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Domain & hosting (1 year free)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Mobile-optimized & fast
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 10–14 day delivery
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-cyan-300">
                  Starting at $179
                </p>
                <Link
                  href="/services/intro-request"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* Quick Brand Refresh */}
            <div className="group bg-gradient-to-br from-black/60 to-amber-950/40 border border-amber-500/30 rounded-3xl p-8 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🔥</span>
                <h3 className="text-3xl font-bold text-amber-200 group-hover:text-amber-100 transition-colors">
                  Quick Brand Refresh
                </h3>
              </div>
              <ul className="text-amber-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Logo update or refresh
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Color & font refresh
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Social profiles update
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 5–7 day delivery
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-amber-300">
                  Starting at $129
                </p>
                <Link
                  href="/services/intro-request"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 font-medium shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>

            {/* Basic Social Audit */}
            <div className="group bg-gradient-to-br from-black/60 to-teal-950/40 border border-teal-500/30 rounded-3xl p-8 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">📊</span>
                <h3 className="text-3xl font-bold text-teal-200 group-hover:text-teal-100 transition-colors">
                  Social Audit & Setup
                </h3>
              </div>
              <ul className="text-teal-300 space-y-3 text-base mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Profile audit & optimization
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> Profile picture/banner refresh
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 5 post ideas + templates
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">⚡</span> 5–7 day delivery
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-teal-300">
                  Starting at $99
                </p>
                <Link
                  href="/services/intro-request"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:scale-105"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Project Callout */}
        <section className="text-center py-20 bg-black/50 backdrop-blur-xl border border-indigo-500/20 rounded-3xl">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Need Something Custom?
          </h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-10">
            From full SaaS platforms to unique branding or automation tools — we build exactly what your business needs.
          </p>
          <Link
            href="/request-custom-quote"
            className="inline-block px-12 py-6 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 font-bold text-xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105"
          >
            Request Custom Quote
          </Link>
        </section>
      </main>
    </div>
  );
}