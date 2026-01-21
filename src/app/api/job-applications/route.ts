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

    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const authorized_to_work_us_str = formData.get('authorized_to_work_us') as string;
    const requires_sponsorship_str = formData.get('requires_sponsorship') as string;
    const work_experience = formData.get('work_experience') as string;
    const education = formData.get('education') as string;
    const position_applying_for = formData.get('position_applying_for') as string;
    const why_interested = formData.get('why_interested') as string;
    const salary_expectations = formData.get('salary_expectations') as string || null;
    const disability_status = formData.get('disability_status') as string || null;
    const veteran_status = formData.get('veteran_status') as string || null;

    // Required fields check
    if (!first_name || !last_name || !email || !phone || !authorized_to_work_us_str || !work_experience || !education || !position_applying_for || !why_interested) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const authorized_to_work_us = authorized_to_work_us_str === 'true';
    const requires_sponsorship = requires_sponsorship_str === 'true';

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO applications (
        first_name,
        last_name,
        email,
        phone,
        authorized_to_work_us,
        requires_sponsorship,
        work_experience,
        education,
        position_applying_for,
        why_interested,
        salary_expectations,
        disability_status,
        veteran_status
      ) VALUES (
        ${first_name},
        ${last_name},
        ${email},
        ${phone},
        ${authorized_to_work_us},
        ${requires_sponsorship},
        ${work_experience},
        ${education},
        ${position_applying_for},
        ${why_interested},
        ${salary_expectations},
        ${disability_status},
        ${veteran_status}
      )
    `;

    return NextResponse.json({ success: true, message: 'Application submitted!' });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing application ID' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`
      DELETE FROM applications WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Delete application error:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}