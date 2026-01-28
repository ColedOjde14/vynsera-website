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
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus('idle');
    setErrorMessage(null);

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

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        toast.success('Request submitted! Check your email for confirmation.');
        setTimeout(() => {
          setFormStatus('idle');
          // Optional: reset form
          setName('');
          setEmail('');
          setPhone('');
          setBudget('');
          setTimeline('');
          setDetails('');
          setFiles(null);
        }, 10000);
      } else {
        setErrorMessage(data.error || 'Failed to submit request.');
        setFormStatus('error');
        toast.error(data.error || 'Submission failed.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setFormStatus('error');
      toast.error('Network error');
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

        {formStatus === 'success' ? (
          <div className="text-center py-20 bg-green-900/30 border border-green-500/40 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-green-300 mb-6">Request Received</h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Thank you! We've received your service request and will review it shortly.
              <br /><br />
              Check your email for confirmation. Our team will be in touch soon.
            </p>
          </div>
        ) : formStatus === 'error' ? (
          <div className="text-center py-12 bg-red-900/30 border border-red-500/40 rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-red-300 mb-4">Submission Failed</h2>
            <p className="text-lg text-indigo-200">
              {errorMessage || 'Something went wrong. Please try again or email support@vynseracorp.com.'}
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}