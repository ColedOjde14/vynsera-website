// src/app/api/admin/jobs/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'; // ← Added this import

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

  // Split comma or newline-separated strings into arrays
  const respArray = responsibilities
    ? responsibilities.split(/[\n,]+/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
    : null;

  const reqArray = requirements
    ? requirements.split(/[\n,]+/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
    : null;

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO jobs (
        title, department, location, type, description,
        responsibilities, requirements, salary_range, status
      ) VALUES (
        ${title}, ${department || null}, ${location || 'Remote'},
        ${type || 'Full-time'}, ${description},
        ${respArray ? sql`ARRAY[${respArray}]` : null},
        ${reqArray ? sql`ARRAY[${reqArray}]` : null},
        ${salary_range || null}, 'open'
      )
    `;

    // Force refresh of the careers page so new jobs appear immediately
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

    // Also revalidate careers page when deleting a job
    revalidatePath('/careers');

    return NextResponse.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    console.error('Job delete error:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}