// src/app/services/page.tsx
import Link from "next/link";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="mt-2 text-indigo-300 text-lg">
              Premium digital solutions at unbeatable prices — designed for every budget.
            </p>
          </div>

          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        {/* Main Services */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Business Digital Identity & Branding */}
            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
              <h2 className="text-3xl font-bold text-indigo-200 mb-4">
                Business Digital Identity & Branding
              </h2>
              <p className="text-indigo-300 mb-6">
                Complete branding package: logo, stationery, social media kits, color palette, typography, and brand guidelines.
              </p>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Custom logo design (3–5 concepts + revisions)</li>
                <li>Business card, letterhead, email signature</li>
                <li>Social media kit (profiles, highlights, templates)</li>
                <li>Brand guidelines PDF</li>
                <li>7–14 day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                Starting at $720
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $1,500–$3,000)
              </p>
              <Link
                href="/services/branding"
                className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* 2. Domain & Website Development */}
            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
              <h2 className="text-3xl font-bold text-indigo-200 mb-4">
                Domain & Website Development
              </h2>
              <p className="text-indigo-300 mb-6">
                Modern, fast, responsive website with domain registration, hosting, and ongoing support.
              </p>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Custom one-page or multi-page site</li>
                <li>Domain registration (1 year free)</li>
                <li>Hosting & SSL included</li>
                <li>Mobile-optimized & SEO basics</li>
                <li>10–21 day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                Starting at $570
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $1,200–$4,000)
              </p>
              <Link
                href="/services/website"
                className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* 3. Digital Marketing & SEO */}
            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
              <h2 className="text-3xl font-bold text-indigo-200 mb-4">
                Digital Marketing & SEO
              </h2>
              <p className="text-indigo-300 mb-6">
                SEO, social media management, content creation, and paid ads to drive real traffic and growth.
              </p>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Keyword research & on-page SEO</li>
                <li>Social media setup & content calendar</li>
                <li>Monthly content & ad management</li>
                <li>Performance reporting</li>
                <li>Ongoing monthly</li>
              </ul>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                Starting at $270/month
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $800–$2,000/month)
              </p>
              <Link
                href="/services/marketing"
                className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* 4. Custom Software */}
            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
              <h2 className="text-3xl font-bold text-indigo-200 mb-4">
                Custom Software
              </h2>
              <p className="text-indigo-300 mb-6">
                Bespoke software solutions including web apps, SaaS platforms, internal tools, and automation systems.
              </p>
              <p className="text-sm text-indigo-400 mb-4">(Market avg: $10,000+)</p>
              <Link
                href="/services/custom-software"
                className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
              >
                Request Service →
              </Link>
            </div>
          </div>
        </section>

        {/* Clear Division */}
        <div className="border-t border-indigo-500/30 my-16"></div>

        {/* Introductory Services */}
        <section>
          <h2 className="text-4xl font-bold text-green-300 mb-10 text-center">
            Introductory Services for Any Budget
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Starter Logo */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Starter Logo
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>3 logo concepts + revisions</li>
                <li>High-res PNG, SVG, transparent</li>
                <li>Simple color palette</li>
                <li>7-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $108
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $250–$500)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* Social Media Starter Kit */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Social Media Starter Kit
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Profile picture + banner design</li>
                <li>5 post templates</li>
                <li>Color palette & fonts</li>
                <li>7-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $132
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $300–$600)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* One-Page Landing Site */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                One-Page Landing Site
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Custom one-page site</li>
                <li>Domain & hosting (1 year free)</li>
                <li>Mobile-optimized</li>
                <li>10–14 day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $174
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $400–$1,000)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* Quick Brand Refresh */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Quick Brand Refresh
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Logo refresh or update</li>
                <li>Color palette refresh</li>
                <li>Social profiles update</li>
                <li>7-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $144
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $300–$700)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* Basic Social Media Audit & Setup */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Basic Social Media Audit & Setup
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Profile audit + optimization</li>
                <li>Profile picture/banner refresh</li>
                <li>5 post ideas + templates</li>
                <li>7-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $114
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $250–$350)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>
          </div>
        </section>

        {/* Custom Project Callout - Moved to Bottom */}
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 text-center mt-16">
          <h2 className="text-3xl font-bold text-indigo-200 mb-4">
            Custom Project?
          </h2>
          <p className="text-indigo-300 text-lg mb-6">
            Need something unique? We specialize in custom solutions that fit your exact business needs — from branding refresh to full SaaS platforms.
          </p>
          <Link
            href="/request-custom-quote"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium"
          >
            Request Custom Quote
          </Link>
        </div>
      </main>
    </div>
  );
}