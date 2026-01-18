// src/app/services/intro-request/page.tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function IntroRequest() {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [details, setDetails] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('serviceSlug', 'intro-' + selectedPackage);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('budget', budget);
    formData.append('timeline', timeline);
    formData.append('details', details);

    if (files) {
      for (const file of files) {
        formData.append('files', file);
      }
    }

    try {
      const response = await fetch('/api/service-request', {
        method: 'POST',
        body: formData,
      });

      // Check for success or redirect - client handles redirect
      if (response.redirected || response.ok) {
        toast.success('Request submitted!');
        window.location.href = '/services/request-confirmation';
      } else {
        // Parse JSON only on error
        const data = await response.json();
        toast.error(data.error || 'Failed to submit request.');
      }
    } catch (error) {
      toast.error('Network error. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          Introductory Service Request
        </h1>
        <p className="text-indigo-300 text-lg mb-12">
          Select your desired package and tell us more about your needs. We'll get back to you quickly with a custom plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <div>
            <label className="block text-indigo-300 text-sm mb-2">Which package are you interested in?</label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              required
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white focus:outline-none focus:border-indigo-400"
            >
              <option value="">Select a package</option>
              <option value="starter-logo">Starter Logo ($108)</option>
              <option value="social-kit">Social Media Starter Kit ($132)</option>
              <option value="one-page-website">One-Page Landing Site ($174)</option>
              <option value="brand-refresh">Quick Brand Refresh ($144)</option>
              <option value="social-audit">Basic Social Media Audit & Setup ($114)</option>
            </select>
          </div>

          <div>
            <label className="block text-indigo-300 text-sm mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
              placeholder="Your full name"
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
            <label className="block text-indigo-300 text-sm mb-2">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
              placeholder="(123) 456-7890"
            />
          </div>

          <div>
            <label className="block text-indigo-300 text-sm mb-2">Budget</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
              placeholder="$100 - $300"
            />
          </div>

          <div>
            <label className="block text-indigo-300 text-sm mb-2">Timeline</label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
              placeholder="ASAP / 1-2 weeks / Flexible"
            />
          </div>

          <div>
            <label className="block text-indigo-300 text-sm mb-2">Details & Needs</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              rows={6}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
              placeholder="Tell us everything: goals, preferences, inspiration, existing assets, etc."
            />
          </div>

          <div>
            <label className="block text-indigo-300 text-sm mb-2">Attachments (optional)</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white file:bg-indigo-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Request Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}