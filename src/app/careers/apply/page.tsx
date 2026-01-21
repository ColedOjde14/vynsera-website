// src/app/careers/apply/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VynseraApplication() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 10000); // 10s
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 8000);
      }
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 8000);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Vynsera Application
        </h1>

        {formStatus === 'success' ? (
          <div className="text-center py-20 bg-green-900/30 border border-green-500/40 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-green-300 mb-6">Application Received</h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Thank you for applying. Your application has been received.
              <br /><br />
              hr@vynseracorp.com will reach out if your experience and skills match our current or future openings.
            </p>
            <div className="mt-12">
              <Link
                href="/careers"
                className="inline-block px-10 py-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-lg font-medium"
              >
                Back to Careers
              </Link>
            </div>
          </div>
        ) : formStatus === 'error' ? (
          <div className="text-center py-12 bg-red-900/30 border border-red-500/40 rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-red-300 mb-4">Submission Failed</h2>
            <p className="text-lg text-indigo-200">
              Something went wrong. Please try again or email your application directly to hr@vynseracorp.com.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-indigo-300 text-lg mb-3">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-indigo-300 text-lg mb-3">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-indigo-300 text-lg mb-3">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-indigo-300 text-lg mb-3">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            {/* Work Authorization */}
            <div className="space-y-6">
              <div>
                <label className="block text-indigo-300 text-lg mb-3">
                  Are you legally authorized to work in the United States? *
                </label>
                <div className="flex gap-8">
                  <label className="flex items-center text-indigo-300">
                    <input type="radio" name="authorized_to_work_us" value="true" required className="mr-3 accent-indigo-500" />
                    Yes
                  </label>
                  <label className="flex items-center text-indigo-300">
                    <input type="radio" name="authorized_to_work_us" value="false" className="mr-3 accent-indigo-500" />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-indigo-300 text-lg mb-3">
                  Will you now or in the future require sponsorship for employment visa status (e.g., H-1B)? *
                </label>
                <div className="flex gap-8">
                  <label className="flex items-center text-indigo-300">
                    <input type="radio" name="requires_sponsorship" value="false" required className="mr-3 accent-indigo-500" />
                    No
                  </label>
                  <label className="flex items-center text-indigo-300">
                    <input type="radio" name="requires_sponsorship" value="true" className="mr-3 accent-indigo-500" />
                    Yes
                  </label>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <label className="block text-indigo-300 text-lg mb-3">Work Experience * <span className="text-sm">(list roles, companies, dates, responsibilities, achievements)</span></label>
              <textarea
                name="work_experience"
                required
                rows={8}
                placeholder="Example (reverse chronological order):\nSoftware Engineer, TechCorp, 2022–Present\n- Led development of scalable web applications\n- Improved system performance by 45%\n\nIntern, StartupX, 2021\n- Built frontend features using React"
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>

            {/* Education */}
            <div>
              <label className="block text-indigo-300 text-lg mb-3">Education * <span className="text-sm">(degrees, institutions, dates, major, GPA/honors if relevant)</span></label>
              <textarea
                name="education"
                required
                rows={6}
                placeholder="Example:\nBachelor of Science in Computer Science, Syracuse University, 2018–2022\nGPA: 3.9/4.0, Magna Cum Laude\nRelevant coursework: Algorithms, Systems Design, Machine Learning"
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>

            {/* Position & Interest */}
            <div>
              <label className="block text-indigo-300 text-lg mb-3">What position are you applying for? *</label>
              <input
                type="text"
                name="position_applying_for"
                required
                placeholder="e.g. Software Engineer, Marketing Specialist, General Application"
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-indigo-300 text-lg mb-3">Why are you interested in Vynsera? *</label>
              <textarea
                name="why_interested"
                required
                rows={5}
                placeholder="Tell us why you want to join Vynsera and what excites you about our work."
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-indigo-300 text-lg mb-3">Salary Expectations (optional)</label>
              <input
                type="text"
                name="salary_expectations"
                placeholder="e.g. $120,000–$150,000 or Open to discussion"
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>

            {/* EEOC Optional Questions */}
            <div className="space-y-6 pt-6 border-t border-indigo-500/20">
              <p className="text-indigo-400 text-sm italic">
                Vynsera is an equal opportunity employer. The following questions are optional and used only for government reporting purposes. Your responses will not affect your application.
              </p>

              <div>
                <label className="block text-indigo-300 text-lg mb-3">Do you have a disability? (optional)</label>
                <select
                  name="disability_status"
                  className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="">Prefer not to answer</option>
                  <option value="yes">Yes, I have a disability</option>
                  <option value="no">No, I do not have a disability</option>
                </select>
              </div>

              <div>
                <label className="block text-indigo-300 text-lg mb-3">Veteran status (optional)</label>
                <select
                  name="veteran_status"
                  className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="">Prefer not to answer</option>
                  <option value="protected_veteran">Protected veteran</option>
                  <option value="not_protected">Not a protected veteran</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-12">
              <button
                type="submit"
                disabled={loading}
                className={`px-16 py-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-2xl text-2xl font-bold transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}

        <div className="text-center mt-12">
          <p className="text-indigo-400 text-lg">
            <Link href="/careers" className="hover:text-indigo-200">
              ← Back to Careers
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}