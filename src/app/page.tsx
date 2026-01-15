// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white flex items-center justify-center">
      {/* Hero Section - Centered & Minimal */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8 text-center max-w-5xl mx-auto">
        {/* Logo - Moved down, larger, with subtle glow */}
        <div className="mb-16 animate-fade-in">
          <img
            src="/logo.png"           // Your logo in public/logo.png
            alt="Vynsera Logo"
            className="mx-auto h-40 md:h-56 w-auto drop-shadow-2xl filter brightness-110" // Bigger + slight glow
          />
        </div>

        {/* Tagline - Title Case, elegant & spacious */}
        <p className="text-2xl md:text-4xl text-indigo-200/90 leading-relaxed animate-slide-up animation-delay-300">
          SaaS Solutions • Commercial Design • Premium Hosting Services
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 animate-slide-up animation-delay-500">
          <a
            href="/services"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-6 text-xl font-semibold text-white shadow-xl hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Explore Services
          </a>
          <a
            href="/portal/login"
            className="rounded-full border-2 border-indigo-400/60 px-12 py-6 text-xl font-semibold text-indigo-300 hover:text-white hover:border-indigo-300 transition-all duration-300"
          >
            Client Portal →
          </a>
        </div>

        {/* Nice "Trusted by..." line - subtle & elegant */}
        <div className="mt-20 animate-fade-in animation-delay-700">
          <p className="text-lg text-indigo-300/70 tracking-wide uppercase font-medium">
            Trusted By Innovators Across New York State
          </p>
        </div>
      </section>

      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.12),transparent_50%)]" />
    </main>
  );
}