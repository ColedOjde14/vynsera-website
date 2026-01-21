import Link from "next/link";

// src/app/careers/apply/page.tsx
export default function VynseraApplication() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Vynsera Application
        </h1>

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
                name="full_name"
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
          <div className="space-y-6">
            <div>
              <label className="block text-indigo-300 text-lg mb-3">
                Are you legally authorized to work in the United States? *
              </label>
              <div className="flex gap-8">
                <label className="flex items-center text-indigo-300">
                  <input
                    type="radio"
                    name="authorized_to_work_us"
                    value="true"
                    required
                    className="mr-3 accent-indigo-500"
                  />
                  Yes
                </label>
                <label className="flex items-center text-indigo-300">
                  <input
                    type="radio"
                    name="authorized_to_work_us"
                    value="false"
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
                    name="requires_sponsorship"
                    value="false"
                    required
                    className="mr-3 accent-indigo-500"
                  />
                  No
                </label>
                <label className="flex items-center text-indigo-300">
                  <input
                    type="radio"
                    name="requires_sponsorship"
                    value="true"
                    className="mr-3 accent-indigo-500"
                  />
                  Yes
                </label>
              </div>
            </div>
          </div>

          {/* Education History */}
          <div>
            <label className="block text-indigo-300 text-lg mb-3">
              Education History * <span className="text-sm">(degrees, institutions, years, major, GPA/honors if relevant)</span>
            </label>
            <textarea
              name="education_history"
              required
              rows={6}
              placeholder="Example:\nBachelor of Science in Computer Science, Syracuse University, 2020-2024\nGPA: 3.8, Dean's List 2022-2024\nRelevant coursework: Data Structures, Algorithms, Web Development"
              className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* Work History */}
          <div>
            <label className="block text-indigo-300 text-lg mb-3">
              Work History * <span className="text-sm">(previous roles, companies, dates, key responsibilities/achievements)</span>
            </label>
            <textarea
              name="work_history"
              required
              rows={8}
              placeholder="Example:\nSoftware Engineer Intern, TechCorp, May 2023 - Aug 2023\n- Developed full-stack features using React and Node.js\n- Improved application performance by 40%\n\nCustomer Support Specialist, Local Business, 2020 - 2022\n- Handled 50+ customer inquiries daily\n- Reduced response time by 30%"
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