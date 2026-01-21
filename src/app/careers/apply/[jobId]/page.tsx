// src/app/careers/apply/[jobId]/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default async function ApplyJob({ params }: { params: { jobId: string } }) {
  const jobId = parseInt(params.jobId, 10);
  if (isNaN(jobId)) notFound();

  const sql = neon(process.env.DATABASE_URL!);

  const [job] = await sql`
    SELECT * FROM jobs WHERE id = ${jobId} AND status = 'open'
  `;

  if (!job) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Apply for {job.title}
        </h1>

        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10 mb-12">
          <h2 className="text-3xl font-bold text-indigo-200 mb-6">{job.title}</h2>
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-indigo-400">
            <span className="px-4 py-1 rounded-full bg-indigo-500/20">{job.type || 'Full-time'}</span>
            <span className="px-4 py-1 rounded-full bg-purple-500/20">{job.location || 'Remote'}</span>
            {job.department && (
              <span className="px-4 py-1 rounded-full bg-green-500/20">{job.department}</span>
            )}
            {job.salary_range && (
              <span className="px-4 py-1 rounded-full bg-yellow-500/20">{job.salary_range}</span>
            )}
          </div>

          <p className="text-indigo-300 mb-8">{job.description}</p>

          {job.responsibilities?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-200 mb-3">Responsibilities</h3>
              <ul className="list-disc list-inside text-indigo-300 space-y-2">
                {(job.responsibilities as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-indigo-200 mb-3">Requirements</h3>
              <ul className="list-disc list-inside text-indigo-300 space-y-2">
                {(job.requirements as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Application Form */}
        <form
          action="/api/job-applications"
          method="POST"
          encType="multipart/form-data"
          className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-10"
        >
          <input type="hidden" name="jobId" value={job.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-indigo-300 text-lg mb-3">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white placeholder-indigo-400 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-indigo-300 text-lg mb-3">Email</label>
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
            <label className="block text-indigo-300 text-lg mb-3">Resume (PDF, max 5MB)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              required
              className="w-full p-4 rounded-lg bg-black/70 border border-indigo-500/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>

          <div className="mb-10">
            <label className="block text-indigo-300 text-lg mb-3">Cover Letter (optional)</label>
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
      </div>
    </div>
  );
}