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

      {/* Main Services */}
      <main className="max-w-7xl mx-auto p-6 sm:p-8">
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
              <li>Social media profile + post templates</li>
              <li>Brand style guide PDF</li>
            </ul>
            <p className="text-3xl font-bold text-green-400 mb-2">
              Starting at $720
            </p>
            <p className="text-sm text-indigo-400 mb-4">
              (Market avg: $2,500+ — 70%+ savings)
            </p>
            <Link
              href="/services/branding"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all"
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
              Professional websites for SMBs, bloggers, and corporations — fast, secure, mobile-first.
            </p>
            <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
              <li>Domain registration + setup</li>
              <li>Custom or template-based design</li>
              <li>SEO-friendly, responsive, secure hosting</li>
              <li>CMS (WordPress/Next.js) + basic training</li>
              <li>Maintenance & updates option</li>
            </ul>
            <p className="text-3xl font-bold text-green-400 mb-2">
              Starting at $570
            </p>
            <p className="text-sm text-indigo-400 mb-4">
              (Market avg: $2,000+ — 70%+ savings)
            </p>
            <Link
              href="/services/website"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all"
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
              Boost visibility with SEO, content strategy, social media management, and paid ads.
            </p>
            <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
              <li>On-page/off-page SEO optimization</li>
              <li>Google Business Profile setup</li>
              <li>Social media management</li>
              <li>Content strategy & creation</li>
              <li>Monthly reports + analytics</li>
            </ul>
            <p className="text-3xl font-bold text-green-400 mb-2">
              Starting at $270/month
            </p>
            <p className="text-sm text-indigo-400 mb-4">
              (Market avg: $1,000+ — 70%+ savings)
            </p>
            <Link
              href="/services/marketing"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all"
            >
              Request Service →
            </Link>
          </div>

          {/* 4. Custom Software & SaaS Development */}
          <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
            <h2 className="text-3xl font-bold text-indigo-200 mb-4">
              Custom Software & SaaS Development
            </h2>
            <p className="text-indigo-300 mb-6">
              Build custom tools, apps, or SaaS products tailored to your business.
            </p>
            <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
              <li>Web/mobile app development</li>
              <li>CRM, dashboard, or internal tools</li>
              <li>Subscription billing integration</li>
              <li>Scalable cloud hosting</li>
              <li>Ongoing maintenance & updates</li>
            </ul>
            <p className="text-3xl font-bold text-green-400 mb-2">
              Starting at $2,700
            </p>
            <p className="text-sm text-indigo-400 mb-4">
              (Market avg: $9,250+ — 70%+ savings)
            </p>
            <Link
              href="/services/custom-software"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all"
            >
              Request Service →
            </Link>
          </div>
        </div>

        {/* Introductory Services for Small Budgets (< $300) */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">
            Introductory Services for Small Budgets (&lt; $300)
          </h2>
          <p className="text-center text-indigo-300 mb-10 max-w-3xl mx-auto">
            Perfect entry-level packages for startups, solopreneurs, bloggers, or very small businesses. Maximum value at minimum cost.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Starter Logo */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Starter Logo
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>2 logo concepts + 2 revisions</li>
                <li>High-res PNG, SVG, transparent versions</li>
                <li>Simple color palette</li>
                <li>Fast 5-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $108
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $300–$400)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* 2. Social Media Starter Kit */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Social Media Starter Kit
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Profile picture + banner design</li>
                <li>5 post templates (Instagram/Facebook)</li>
                <li>Color & font guide</li>
                <li>Fast 5-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $132
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $350–$450)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* 3. One-Page Landing Site */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                One-Page Landing Site
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Single-page site (landing + contact)</li>
                <li>Mobile-responsive</li>
                <li>Basic SEO setup</li>
                <li>Domain + 1-year hosting included</li>
                <li>10-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $174
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $520–$700)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* 4. Quick Brand Refresh */}
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 hover:border-green-400 transition-all">
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Quick Brand Refresh
              </h3>
              <ul className="text-indigo-200 list-disc list-inside mb-6 space-y-2">
                <li>Logo update + color refresh</li>
                <li>Social media icons + cover</li>
                <li>Quick style guide</li>
                <li>5-day turnaround</li>
              </ul>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Starting at $144
              </p>
              <p className="text-sm text-indigo-400 mb-4">
                (Market avg: $420–$550)
              </p>
              <Link
                href="/services/intro-request"
                className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Request Service →
              </Link>
            </div>

            {/* 5. Basic Social Media Audit & Setup */}
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
        </div>

        {/* Custom Project Section */}
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 text-center mt-16">
          <h2 className="text-3xl font-bold text-indigo-200 mb-4">
            Custom Project?
          </h2>
          <p className="text-indigo-300 text-lg mb-6 max-w-3xl mx-auto">
            Need something unique? We specialize in custom solutions that fit your exact business needs — from branding refresh to full SaaS platforms.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium"
          >
            Request Custom Quote
          </Link>
        </div>
      </main>
    </div>
  );
}