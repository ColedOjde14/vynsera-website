import Link from "next/link";

// src/app/careers/apply/page.tsx
export default function VynseraApplication() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Vynsera Application
        </h1>

        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10 mb-12">
          <p className="text-xl text-indigo-300 mb-6 text-center">
            Thank you for your interest in joining Vynsera. Please complete the form below.
          </p>
        </div>

        <form
          action="/api/job-applications"
          method="POST"
          className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10 space-y-10"
        >
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <label className="block text-indigo-300 text-lg mb-3">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>
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

          {/* Work Authorization */}
          <div>
            <label className="block text-indigo-300 text-lg mb-3">
              Are you legally authorized to work in the United States? *
            </label>
            <div className="flex gap-8">
              <label className="flex items-center text-indigo-300">
                <input
                  type="radio"
                  name="workAuthorization"
                  value="yes"
                  required
                  className="mr-3 accent-indigo-500"
                />
                Yes
              </label>
              <label className="flex items-center text-indigo-300">
                <input
                  type="radio"
                  name="workAuthorization"
                  value="no"
                  className="mr-3 accent-indigo-500"
                />
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
                <input
                  type="radio"
                  name="sponsorship"
                  value="no"
                  required
                  className="mr-3 accent-indigo-500"
                />
                No
              </label>
              <label className="flex items-center text-indigo-300">
                <input
                  type="radio"
                  name="sponsorship"
                  value="yes"
                  className="mr-3 accent-indigo-500"
                />
                Yes
              </label>
            </div>
          </div>

          {/* Education History */}
          <div>
            <label className="block text-indigo-300 text-lg mb-3">Education History *</label>
            <textarea
              name="education"
              required
              rows={6}
              placeholder="List your degrees, institutions, graduation years, GPA (if relevant), major/minor, and any honors or relevant coursework. One entry per line or paragraph."
              className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* Work History */}
          <div>
            <label className="block text-indigo-300 text-lg mb-3">Work History *</label>
            <textarea
              name="workHistory"
              required
              rows={8}
              placeholder="List your previous positions in reverse chronological order (most recent first). Include company name, job title, dates of employment, key responsibilities, and achievements. One entry per line or paragraph."
              className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="px-16 py-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-2xl text-2xl font-bold transform hover:scale-105"
            >
              Submit Application
            </button>
          </div>
        </form>

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