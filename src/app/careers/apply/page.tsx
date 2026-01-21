// src/app/careers/apply/page.tsx
import Link from 'next/link';

export default function Apply() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          General Application
        </h1>

        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10 mb-12">
          <p className="text-xl text-indigo-300 mb-6">
            We are always looking for talented people to join the Vynsera team. 
            Even if no positions are currently open, feel free to submit your information and resume.
          </p>
          <p className="text-lg text-indigo-400">
            We'll keep your application on file for future opportunities.
          </p>
        </div>

        {/* Full Application Form */}
        <form
          action="/api/job-applications"
          method="POST"
          encType="multipart/form-data"
          className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10"
        >
          {/* Hidden field for general application (no jobId) */}
          <input type="hidden" name="jobId" value="" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-indigo-300 text-lg mb-3">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-indigo-300 text-lg mb-3">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-indigo-300 text-lg mb-3">Phone (optional)</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div className="mb-8">
            <label className="block text-indigo-300 text-lg mb-3">Resume (PDF, max 5MB) *</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              required
              className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>

          <div className="mb-10">
            <label className="block text-indigo-300 text-lg mb-3">Cover Letter / Why Vynsera? (optional)</label>
            <textarea
              name="coverLetter"
              rows={6}
              className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-xl font-medium"
          >
            Submit Application
          </button>
        </form>

        <div className="text-center mt-12">
          <p className="text-indigo-400">
            <Link href="/careers" className="hover:text-indigo-200">
              ← Back to Careers
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}