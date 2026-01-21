// src/app/api/job-applications/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const applications = await sql`
      SELECT *
      FROM applications
      ORDER BY created_at DESC
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

    const full_name = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || null;
    const authorized_to_work_us_str = formData.get('authorized_to_work_us') as string;
    const requires_sponsorship_str = formData.get('requires_sponsorship') as string;
    const education_history = formData.get('education_history') as string;
    const work_history = formData.get('work_history') as string;

    // Validate required fields
    if (!full_name || !email || !authorized_to_work_us_str || !education_history || !work_history) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert radio string values to booleans
    const authorized_to_work_us = authorized_to_work_us_str === 'true';
    const requires_sponsorship = requires_sponsorship_str === 'true';

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO applications (
        full_name,
        email,
        phone,
        authorized_to_work_us,
        requires_sponsorship,
        education_history,
        work_history
      ) VALUES (
        ${full_name},
        ${email},
        ${phone},
        ${authorized_to_work_us},
        ${requires_sponsorship},
        ${education_history},
        ${work_history}
      )
    `;

    return NextResponse.json({ success: true, message: 'Application submitted!' });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}