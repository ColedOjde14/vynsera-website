// src/app/careers/page.tsx
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Helper to safely parse PostgreSQL array strings like {"Test","Task 2"} or {"Test"}
const parsePgArray = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value; // already parsed array

  const str = String(value).trim();
  if (str.startsWith('{') && str.endsWith('}')) {
    return str
      .slice(1, -1)                      // remove outer braces
      .split(',')                        // split by comma
      .map(item => item.trim().replace(/^"|"$/g, '')) // trim and remove quotes
      .filter(item => item.length > 0);  // remove empty entries
  }

  // Fallback for single value or malformed
  return [str];
};

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
            <p className="text-2xl text-indigo-300 mb-6">No open positions right now.</p>
            <p className="text-lg text-indigo-400">
              Email your resume to <a href="mailto:hr@vynseracorp.com" className="text-indigo-300 hover:text-indigo-100 underline">hr@vynseracorp.com</a> to be considered for future opportunities.
            </p>
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

                {parsePgArray(job.responsibilities).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-indigo-200 mb-3">Responsibilities</h3>
                    <ul className="list-disc list-inside text-indigo-300 space-y-2">
                      {parsePgArray(job.responsibilities).map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {parsePgArray(job.requirements).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-indigo-200 mb-3">Requirements</h3>
                    <ul className="list-disc list-inside text-indigo-300 space-y-2">
                      {parsePgArray(job.requirements).map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/careers/apply"
                  className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}