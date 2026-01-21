// src/app/careers/page.tsx
import { neon } from '@neondatabase/serverless';
import Link from 'next/link'; // ← This line fixes the error

export default async function Careers() {
  const sql = neon(process.env.DATABASE_URL!);

  const jobs = await sql`
    SELECT * FROM jobs
    WHERE status = 'open'
    ORDER BY created_at DESC
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Careers at Vynsera
        </h1>

        <p className="text-xl text-indigo-300 text-center mb-20 max-w-3xl mx-auto">
          Join a team that builds ambitious software for dreamers. We're remote-first, fast-moving, and obsessed with quality.
        </p>

        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-indigo-300">No open positions right now.</p>
            <p className="text-lg text-indigo-400 mt-4">
              Check back soon — or send us your resume anyway!
            </p>
            <Link
              href="/request-custom-quote"
              className="mt-8 inline-block px-10 py-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10 hover:border-indigo-400 transition-all hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <h2 className="text-3xl font-bold text-indigo-200 mb-4">{job.title}</h2>
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-indigo-400">
                  <span className="px-4 py-1 rounded-full bg-indigo-500/20">{job.type || 'Full-time'}</span>
                  <span className="px-4 py-1 rounded-full bg-purple-500/20">{job.location || 'Remote'}</span>
                  {job.department && (
                    <span className="px-4 py-1 rounded-full bg-green-500/20">{job.department}</span>
                  )}
                  {job.salary_range && (
                    <span className="px-4 py-1 rounded-full bg-yellow-500/20">{job.salary_range}</span>
                  )}
                </div>

                <p className="text-indigo-300 mb-6">{job.description}</p>

                {job.responsibilities?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-indigo-200 mb-3">Responsibilities</h3>
                    <ul className="list-disc list-inside text-indigo-300 space-y-2">
                      {job.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.requirements?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-indigo-200 mb-3">Requirements</h3>
                    <ul className="list-disc list-inside text-indigo-300 space-y-2">
                      {job.requirements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={`/careers/apply/${job.id}`}
                  className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Custom Project Callout */}
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-12 text-center mt-20">
          <h2 className="text-4xl font-bold text-indigo-200 mb-6">
            Don't See a Fit?
          </h2>
          <p className="text-xl text-indigo-300 mb-8 max-w-3xl mx-auto">
            We love custom challenges. If you're passionate and have a unique project in mind, reach out — we build things that don't exist yet.
          </p>
          <Link
            href="/request-custom-quote"
            className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-2xl text-xl font-bold"
          >
            Let's Talk Custom
          </Link>
        </div>
      </div>
    </div>
  );
}