// src/app/api/admin/jobs/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const jobs = await sql`
      SELECT * FROM jobs
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const {
    title,
    department,
    location,
    type,
    description,
    responsibilities,
    requirements,
    salary_range,
  } = body;

  if (!title || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Clean split: turn textarea into real array of strings
  const cleanArray = (input: string | undefined): string[] | null => {
    if (!input || typeof input !== 'string') return null;
    // Split on newline or comma, trim, filter empty
    return input
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  const respArray = cleanArray(responsibilities);
  const reqArray = cleanArray(requirements);

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO jobs (
        title, department, location, type, description,
        responsibilities, requirements, salary_range, status
      ) VALUES (
        ${title},
        ${department || null},
        ${location || 'Remote'},
        ${type || 'Full-time'},
        ${description},
        ${respArray ? sql`ARRAY[${respArray}]::text[]` : null},
        ${reqArray ? sql`ARRAY[${reqArray}]::text[]` : null},
        ${salary_range || null},
        'open'
      )
    `;

    revalidatePath('/careers');

    return NextResponse.json({ success: true, message: 'Job posted!' });
  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
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
    return NextResponse.json({ error: 'Missing job ID' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      DELETE FROM jobs WHERE id = ${id}
    `;

    revalidatePath('/careers');

    return NextResponse.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    console.error('Job delete error:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}