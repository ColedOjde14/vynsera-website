// src/app/api/job-applications/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const applications = await sql`
      SELECT ja.*, j.title as job_title
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.id
      ORDER BY ja.created_at DESC
    `;
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to load applications' }, { status: 500 });
  }
}

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
    let resumeUrl: string | null = null;
    if (resume && resume.size > 0) {
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Resume too large (max 5MB)' }, { status: 400 });
      }

      try {
        const blob = await put(`resumes/${Date.now()}-${resume.name}`, resume, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        resumeUrl = blob.url;
      } catch (uploadError) {
        console.error('Resume upload failed:', uploadError);
        return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
      }
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