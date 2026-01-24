// src/app/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  // Animated typing phrases - full "We [action] [service]" cycles
  const phrases = [
    "We Build fast, modern websites",
    "We Design Custom Logos & Branding Identity",
    "We Craft SEO-optimized Websites",
    "We Engineer Full-Stack Web Applications",
    "We Create Scalable SaaS Platforms",
    "We Architect Robust Backend Systems",
    "We Launch Seamless Digital Experiences",
    "We Develop High-Performance Software",
    "We Optimize Lightning-Fast Websites",
    "We Innovate Custom Engineering Solutions"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      toast.success("You're now logged in!", {
        duration: 4000,
        position: 'top-center',
      });
    }
  }, [isLoaded, isSignedIn]);

  // Smooth typing animation
  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950" />;
  }

  const role = user?.publicMetadata?.role as string | undefined;
  const isAdminOrSupport = role === 'admin' || role === 'support';
  const portalUrl = isAdminOrSupport ? '/admin' : '/portal';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative flex-grow flex items-center justify-center px-6 py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative inline-block mb-10 sm:mb-14 group"
          >
            <img
              src="/logo.png"
              alt="Vynsera"
              className="mx-auto h-48 sm:h-64 lg:h-80 w-auto drop-shadow-2xl transition-all duration-1000 group-hover:scale-105 group-hover:rotate-2"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-indigo-500/30 blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl sm:text-2xl lg:text-3xl font-light text-indigo-200/90 tracking-wide max-w-4xl mx-auto mb-10 sm:mb-12"
          >
            Where bold vision meets flawless execution.
          </motion.p>

          {/* Animated typing - full phrases including "We" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-indigo-300/80 mb-12 sm:mb-16 flex justify-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative inline-block min-w-[280px] sm:min-w-[420px] lg:min-w-[540px] text-center font-medium"
            >
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
              >
                {displayText}
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -right-1 top-0 text-pink-400"
              >
                |
              </motion.span>
            </motion.span>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <Link
              href="/services"
              className="group relative inline-flex px-12 sm:px-16 py-6 sm:py-8 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-xl sm:text-2xl shadow-2xl hover:shadow-pink-500/60 transition-all duration-500 transform hover:scale-105 active:scale-100 overflow-hidden"
            >
              <span className="relative z-10">Explore Our Services</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl opacity-50"
              />
            </Link>

            {isSignedIn ? (
              <Link
                href={portalUrl}
                className="inline-flex px-12 sm:px-16 py-6 sm:py-8 rounded-full border-2 border-pink-500/50 text-pink-300 hover:bg-pink-500/10 hover:border-pink-400 transition-all duration-300 text-xl sm:text-2xl font-medium backdrop-blur-sm active:scale-100"
              >
                Access Portal
              </Link>
            ) : (
              <Link
                href="https://accounts.vynseracorp.com/sign-in"
                className="inline-flex px-12 sm:px-16 py-6 sm:py-8 rounded-full border-2 border-pink-500/40 text-pink-300 hover:bg-pink-500/10 hover:border-pink-400 transition-all duration-300 text-xl sm:text-2xl font-medium backdrop-blur-sm active:scale-100"
              >
                Client Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Core Engineering Excellence */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl border-t border-purple-500/10 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 sm:mb-24 lg:mb-32 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent overflow-visible"
          >
            Core Engineering Excellence
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {/* Website Development */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="group relative p-10 sm:p-12 bg-black/50 backdrop-blur-2xl border border-purple-500/40 rounded-3xl hover:border-purple-400/70 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-purple-200 mb-6 sm:mb-8 group-hover:text-purple-100 transition-colors">
                  Website Development
                </h3>
                <p className="text-lg sm:text-xl text-purple-300/90 group-hover:text-purple-200 transition-colors leading-relaxed">
                  Lightning-fast, responsive, SEO-optimized websites built with modern Next.js, Tailwind, animations, and obsessive performance tuning.
                </p>
              </div>
            </motion.div>

            {/* Custom Software */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="group relative p-10 sm:p-12 bg-black/50 backdrop-blur-2xl border border-pink-500/40 rounded-3xl hover:border-pink-400/70 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-pink-200 mb-6 sm:mb-8 group-hover:text-pink-100 transition-colors">
                  Custom Software
                </h3>
                <p className="text-lg sm:text-xl text-pink-300/90 group-hover:text-pink-200 transition-colors leading-relaxed">
                  Bespoke applications, SaaS platforms, internal tools, automation — engineered for your exact vision with clean code, scalability, and reliability.
                </p>
              </div>
            </motion.div>

            {/* Full-Stack Engineering */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="group relative p-10 sm:p-12 bg-black/50 backdrop-blur-2xl border border-indigo-500/40 rounded-3xl hover:border-indigo-400/70 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-indigo-200 mb-6 sm:mb-8 group-hover:text-indigo-100 transition-colors">
                  Full-Stack Engineering
                </h3>
                <p className="text-lg sm:text-xl text-indigo-300/90 group-hover:text-indigo-200 transition-colors leading-relaxed">
                  Robust backend systems, APIs, databases, cloud architecture, and seamless frontend integration — built to last and scale with your business.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vynsera Difference */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl border-t border-pink-500/10">
        <div className="max-w-7xl mx-auto pb-40 lg:pb-56">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-24 sm:mb-32 lg:mb-40 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent overflow-visible"
          >
            The Vynsera Difference
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 pb-16 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="group p-8 sm:p-12 bg-black/40 backdrop-blur-xl border border-pink-500/40 rounded-3xl hover:border-pink-400/70 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-700"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-pink-300 mb-6 sm:mb-8 group-hover:text-pink-100 transition-colors">
                Radical Affordability
              </h3>
              <p className="text-base sm:text-lg text-pink-200/90 group-hover:text-pink-100 transition-colors">
                Premium engineering quality at prices 70%+ below market — no compromise, just unmatched value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="group p-8 sm:p-12 bg-black/40 backdrop-blur-xl border border-pink-500/40 rounded-3xl hover:border-pink-400/70 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-700"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-pink-300 mb-6 sm:mb-8 group-hover:text-pink-100 transition-colors">
                Lightning Speed
              </h3>
              <p className="text-base sm:text-lg text-pink-200/90 group-hover:text-pink-100 transition-colors">
                Rapid development cycles that respect your timeline — fast delivery without cutting corners.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="group p-8 sm:p-12 bg-black/40 backdrop-blur-xl border border-pink-500/40 rounded-3xl hover:border-pink-400/70 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-700"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-pink-300 mb-6 sm:mb-8 group-hover:text-pink-100 transition-colors">
                Human-First + Custom Portal
              </h3>
              <p className="text-base sm:text-lg text-pink-200/90 group-hover:text-pink-100 transition-colors">
                Direct, honest collaboration + a dedicated client portal for real-time updates, file sharing, progress tracking, and 24/7 support — your project, your control.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-20 sm:py-32 px-6 bg-black/40 backdrop-blur-sm border-t border-indigo-500/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-center mb-12 sm:mb-16 bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Let's Build Something Real
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 bg-black/50 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              <div>
                <label className="block text-indigo-300 text-base sm:text-lg mb-3 sm:mb-4 font-light">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-black/70 border border-indigo-500/30 rounded-xl p-5 sm:p-6 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400 transition-all duration-300 text-base sm:text-lg"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-indigo-300 text-base sm:text-lg mb-3 sm:mb-4 font-light">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/70 border border-indigo-500/30 rounded-xl p-5 sm:p-6 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400 transition-all duration-300 text-base sm:text-lg"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-indigo-300 text-base sm:text-lg mb-3 sm:mb-4 font-light">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full bg-black/70 border border-indigo-500/30 rounded-xl p-5 sm:p-6 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400 transition-all duration-300 text-base sm:text-lg"
                placeholder="Tell us about your project, vision, or challenge..."
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-12 sm:px-16 py-6 sm:py-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-500 shadow-2xl text-lg sm:text-2xl font-bold transform hover:scale-105 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          {formStatus === 'success' && (
            <div className="mt-10 p-8 bg-green-900/60 border border-green-500/50 rounded-2xl text-green-200 text-center shadow-2xl animate-fade-in-out">
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p className="text-xl">
                Your message has been received.
              </p>
              <p className="text-lg mt-4">
                We'll get back to you soon.
              </p>
            </div>
          )}

          {formStatus === 'error' && (
            <div className="mt-10 p-8 bg-red-900/60 border border-red-500/50 rounded-2xl text-red-200 text-center shadow-2xl animate-fade-in-out">
              <h3 className="text-2xl font-bold mb-4">Oops!</h3>
              <p className="text-xl">
                Something went wrong while sending your message.
              </p>
              <p className="text-lg mt-4">
                Please try again or email us directly at support@vynseracorp.com
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/70 border-t border-indigo-500/10 py-12 sm:py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-200 mb-4">Vynsera Corporation</h3>
            <p className="text-indigo-300 text-base sm:text-lg">
              418 Broadway STE N<br />
              Albany, NY 12207
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-200 mb-4">Contact</h3>
            <p className="text-indigo-300 text-base sm:text-lg">
              Email: <a href="mailto:support@vynseracorp.com" className="hover:text-indigo-200 transition-colors">support@vynseracorp.com</a><br />
              Phone: <a href="tel:+16072003460" className="hover:text-indigo-200 transition-colors">607-200-3460</a>
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-200 mb-4">Hours</h3>
            <p className="text-indigo-300 text-base sm:text-lg">
              Monday to Friday: 9am – 4pm EST<br />
              <span className="text-green-400 font-medium">Existing Client Support: 24/7</span>
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-base sm:text-lg text-indigo-400">
            <Link href="/privacy" className="hover:text-indigo-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-indigo-200 transition-colors">
              Terms Of Service
            </Link>
            <Link href="/acceptable-use" className="hover:text-indigo-200 transition-colors">
              Acceptable Use
            </Link>
            <Link href="/careers" className="hover:text-indigo-200 transition-colors">
              Careers
            </Link>
          </div>
          <p className="mt-8 sm:mt-12 text-indigo-400 text-sm sm:text-base">
            © {new Date().getFullYear()} Vynsera Corporation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}