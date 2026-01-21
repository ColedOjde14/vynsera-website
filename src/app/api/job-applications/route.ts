// src/app/api/job-applications/route.ts
export const runtime = 'nodejs';

import { put } from '@vercel/blob';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const jobId = formData.get('jobId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || null;
    const coverLetter = formData.get('coverLetter') as string || null;
    const resume = formData.get('resume') as File | null;

    if (!jobId || !name || !email || !resume) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const parsedJobId = parseInt(jobId, 10);
    if (isNaN(parsedJobId)) {
      return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
    }

    // Upload resume to Vercel Blob
    let resumeUrl = null;
    if (resume.size > 0) {
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Resume too large (max 5MB)' }, { status: 400 });
      }

      const blob = await put(`resumes/${Date.now()}-${resume.name}`, resume, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      resumeUrl = blob.url;
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO job_applications (
        job_id, name, email, phone, resume_url, cover_letter
      ) VALUES (
        ${parsedJobId}, ${name}, ${email}, ${phone},
        ${resumeUrl}, ${coverLetter}
      )
    `;

    return NextResponse.json({ success: true, message: 'Application submitted!' });
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}