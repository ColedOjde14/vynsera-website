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
    const body = await request.json();

    const {
      full_name,
      email,
      phone,
      authorized_to_work_us,
      requires_sponsorship,
      education_history,
      work_history,
    } = body;

    if (!full_name || !email || !authorized_to_work_us === undefined || !education_history || !work_history) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert booleans to actual boolean values (from form string "true"/"false")
    const authorized = authorized_to_work_us === 'true' || authorized_to_work_us === true;
    const sponsorship = requires_sponsorship === 'true' || requires_sponsorship === true;

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
        ${phone || null},
        ${authorized},
        ${sponsorship},
        ${education_history},
        ${work_history}
      )
    `;

    return NextResponse.json({ success: true, message: 'Application submitted!' });
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing application ID' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      DELETE FROM applications WHERE id = ${id}
    `;

    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Application delete error:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}