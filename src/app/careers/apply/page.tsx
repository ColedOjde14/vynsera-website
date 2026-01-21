// src/app/careers/apply/page.tsx
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';

export default async function ApplyJob({
  searchParams,
}: {
  searchParams: { jobId?: string };
}) {
  const jobIdStr = searchParams.jobId;

  console.log('Raw jobId from query param:', jobIdStr); // ← Debug 1

  if (!jobIdStr) {
    console.log('No jobId in URL');
    return notFound();
  }

  const jobId = Number(jobIdStr);
  console.log('Parsed jobId:', jobId); // ← Debug 2

  if (isNaN(jobId)) {
    console.log('Invalid jobId:', jobIdStr);
    return notFound();
  }

  const sql = neon(process.env.DATABASE_URL!);

  console.log('Running query for job ID:', jobId); // ← Debug 3

  const jobs = await sql`
    SELECT * FROM jobs WHERE id = ${jobId} AND status = 'open'
  `;

  console.log('Query returned rows:', jobs); // ← Debug 4

  const job = jobs[0];

  if (!job) {
    console.log('No open job found for ID:', jobId);
    return notFound();
  }

  // ... rest of your original return JSX ...
}