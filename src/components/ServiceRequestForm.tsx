// src/components/ServiceRequestForm.tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface ServiceRequestFormProps {
  serviceSlug: string;
  title: string;
  description: string;
  budgetLabel?: string;
  timelineLabel?: string;
}

export default function ServiceRequestForm({
  serviceSlug,
  title,
  description,
  budgetLabel = "Expected Budget",
  timelineLabel = "Desired Timeline",
}: ServiceRequestFormProps) {
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
    formData.append('serviceSlug', serviceSlug);
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

      // If the response is a redirect (status 3xx), it will automatically follow it
      // We don't need to parse JSON on success because the server redirects
      if (response.ok || response.redirected) {
        toast.success('Request submitted!');
        // No need to manually redirect - server handles it
      } else {
        // Only parse JSON on error (non-redirect responses)
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
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
        <p className="text-indigo-300 text-lg mb-12">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
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
            <label className="block text-indigo-300 text-sm mb-2">{budgetLabel}</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
              placeholder="$500 - $2,000"
            />
          </div>

          <div>
            <label className="block text-indigo-300 text-sm mb-2">{timelineLabel}</label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
              placeholder="ASAP / 2-4 weeks / Flexible"
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