// src/app/page.tsx
'use client';  // Add this at the top to enable JS fetch

import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent!');
        setName('');
        setEmail('');
        setMessage('');
        // Redirect to confirmation page
        window.location.href = '/contact-success';
      } else {
        toast.error(data.error || 'Failed to send message.');
      }
    } catch (error) {
      toast.error('Network error. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="text-center">
            <img
              src="/logo.png"
              alt="Vynsera Logo"
              className="mx-auto h-24 w-auto mb-8 drop-shadow-2xl"
            />
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Vynsera
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-indigo-300 max-w-3xl mx-auto">
              SaaS • Design • Hosting
            </p>
            <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
              Premium solutions for ambitious businesses in Albany, NY
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/sign-in"
                className="px-8 py-4 rounded-full border-2 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all text-lg font-medium"
              >
                Client Login
              </Link>

              <Link
                href="/services"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg text-lg font-medium"
              >
                Services
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Us Form */}
      <section className="py-20 px-6 bg-black/30 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-200">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
            <div>
              <label className="block text-indigo-300 text-sm mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-indigo-300 text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-indigo-300 text-sm mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
                placeholder="Tell us about your project or question..."
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-200">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
              <h3 className="text-2xl font-semibold text-indigo-200 mb-4">SaaS Development</h3>
              <p className="text-indigo-300">
                Custom software solutions built for scale and performance.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
              <h3 className="text-2xl font-semibold text-indigo-200 mb-4">Graphic Design</h3>
              <p className="text-indigo-300">
                Stunning visuals and branding that make you stand out.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
              <h3 className="text-2xl font-semibold text-indigo-200 mb-4">Premium Hosting</h3>
              <p className="text-indigo-300">
                Reliable, fast, secure hosting with 99.99% uptime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}