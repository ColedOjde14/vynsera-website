// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative flex-grow flex items-center justify-center px-6 py-40 sm:py-56 lg:px-8">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="relative inline-block mb-16 group">
            <img
              src="/logo.png"
              alt="Vynsera Logo"
              className="mx-auto h-64 sm:h-80 w-auto drop-shadow-2xl transition-all duration-1000 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>

          <p className="text-4xl sm:text-7xl font-light text-indigo-200 tracking-widest mb-8 animate-pulse-slow">
            Dare to Dream
          </p>

          <p className="text-xl sm:text-3xl text-indigo-300/80 font-light max-w-4xl mx-auto">
            Where bold vision meets flawless execution.
          </p>

          {/* Large CTA + Client Login Below */}
          <div className="mt-20 flex flex-col items-center gap-8">
            <Link
              href="/services"
              className="inline-block px-16 py-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all duration-500 shadow-2xl text-2xl sm:text-3xl font-bold backdrop-blur-md transform hover:scale-105 hover:shadow-purple-500/40"
            >
              View Our Services
            </Link>

            <Link
              href="https://accounts.vynseracorp.com/sign-in"
              className="px-12 py-6 rounded-full border-2 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 text-xl font-medium backdrop-blur-sm"
            >
              Client Login
            </Link>
          </div>
        </div>
      </header>

      {/* Informative Services Overview */}
      <section className="py-32 px-6 bg-black/20 backdrop-blur-sm border-t border-indigo-500/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light text-center mb-24 bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            What We Create
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="group p-12 bg-black/30 rounded-3xl border border-indigo-500/20 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
              <h3 className="text-3xl font-medium text-indigo-200 mb-8 group-hover:text-indigo-100 transition-colors">
                Branding & Identity
              </h3>
              <p className="text-xl text-indigo-300/80 group-hover:text-indigo-200 transition-colors">
                Visual stories that make you unforgettable.
              </p>
            </div>

            <div className="group p-12 bg-black/30 rounded-3xl border border-indigo-500/20 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
              <h3 className="text-3xl font-medium text-indigo-200 mb-8 group-hover:text-indigo-100 transition-colors">
                Websites & Digital Presence
              </h3>
              <p className="text-xl text-indigo-300/80 group-hover:text-indigo-200 transition-colors">
                Experiences that convert and captivate.
              </p>
            </div>

            <div className="group p-12 bg-black/30 rounded-3xl border border-indigo-500/20 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
              <h3 className="text-3xl font-medium text-indigo-200 mb-8 group-hover:text-indigo-100 transition-colors">
                Marketing & Growth
              </h3>
              <p className="text-xl text-indigo-300/80 group-hover:text-indigo-200 transition-colors">
                Strategies that drive real results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vynsera Promise */}
      <section className="py-32 px-6 bg-black/30 backdrop-blur-sm border-t border-indigo-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-20 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            The Vynsera Difference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-12 bg-black/20 rounded-3xl border border-green-500/20 backdrop-blur-sm hover:border-green-400/40 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 group">
              <h3 className="text-3xl font-medium text-green-300 mb-8 group-hover:text-green-200 transition-colors">
                Radical Affordability
              </h3>
              <p className="text-xl text-indigo-300/80 group-hover:text-indigo-200 transition-colors">
                Premium quality at prices others can't match — 70%+ below market.
              </p>
            </div>

            <div className="p-12 bg-black/20 rounded-3xl border border-green-500/20 backdrop-blur-sm hover:border-green-400/40 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 group">
              <h3 className="text-3xl font-medium text-green-300 mb-8 group-hover:text-green-200 transition-colors">
                Lightning Speed
              </h3>
              <p className="text-xl text-indigo-300/80 group-hover:text-indigo-200 transition-colors">
                Fast turnarounds because your momentum matters.
              </p>
            </div>

            <div className="p-12 bg-black/20 rounded-3xl border border-green-500/20 backdrop-blur-sm hover:border-green-400/40 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 group">
              <h3 className="text-3xl font-medium text-green-300 mb-8 group-hover:text-green-200 transition-colors">
                Human First
              </h3>
              <p className="text-xl text-indigo-300/80 group-hover:text-indigo-200 transition-colors">
                Direct, honest, no BS — your vision, our obsession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-32 px-6 bg-black/40 backdrop-blur-sm border-t border-indigo-500/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-light text-center mb-20 bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Let's Create Together
          </h2>

          <form action="/api/contact" method="POST" className="space-y-10 bg-black/50 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-indigo-300 text-lg mb-4 font-light">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-black/70 border border-indigo-500/30 rounded-xl p-6 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400 transition-all duration-300 text-lg"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-indigo-300 text-lg mb-4 font-light">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/70 border border-indigo-500/30 rounded-xl p-6 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400 transition-all duration-300 text-lg"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-indigo-300 text-lg mb-4 font-light">Message</label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full bg-black/70 border border-indigo-500/30 rounded-xl p-6 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400 transition-all duration-300 text-lg"
                placeholder="Your vision, your goals, your dream project..."
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-16 py-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-500 shadow-2xl text-2xl font-bold transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/70 border-t border-indigo-500/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-indigo-200 mb-4">Vynsera Corporation</h3>
            <p className="text-indigo-300">
              418 Broadway STE N<br />
              Albany, NY 12207
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-indigo-200 mb-4">Contact</h3>
            <p className="text-indigo-300">
              Email: <a href="mailto:support@vynseracorp.com" className="hover:text-indigo-200 transition-colors">support@vynseracorp.com</a><br />
              Phone: <a href="tel:+16072003460" className="hover:text-indigo-200 transition-colors">607-200-3460</a>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-indigo-200 mb-4">Hours</h3>
            <p className="text-indigo-300">
              Monday to Friday: 9am – 4pm EST<br />
              <span className="text-green-400 font-medium">Existing Client Support: 24/7</span>
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-10 text-base text-indigo-400">
            <Link href="/privacy" className="hover:text-indigo-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-indigo-200 transition-colors">
              Terms Of Service
            </Link>
            <Link href="/acceptable-use" className="hover:text-indigo-200 transition-colors">
              Acceptable Use
            </Link>
          </div>
          <p className="mt-12 text-indigo-400 text-sm">
            © {new Date().getFullYear()} Vynsera Corporation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}