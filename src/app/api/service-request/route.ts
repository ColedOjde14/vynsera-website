// src/app/api/service-request/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const serviceSlug = formData.get('serviceSlug') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || null;
    const budget = formData.get('budget') as string;
    const timeline = formData.get('timeline') as string;
    const details = formData.get('details') as string;

    if (!serviceSlug || !name || !email || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Handle files
    const files: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('files') && value instanceof File && value.size > 0) {
        if (value.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
        }
        try {
          const blob = await put(`service-requests/${Date.now()}-${value.name}`, value, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          files.push(blob.url);
        } catch (err) {
          console.error('File upload failed:', err);
        }
      }
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO service_requests (service_slug, name, email, phone, budget, timeline, details, files, created_at)
      VALUES (${serviceSlug}, ${name}, ${email}, ${phone}, ${budget}, ${timeline}, ${details}, ${files}, CURRENT_TIMESTAMP)
    `;

    return NextResponse.redirect(new URL('/services/request-confirmation', request.url));
  } catch (error: any) {
    console.error('Service request error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return NextResponse.json({ error: error.message || 'Failed to submit request' }, { status: 500 });
  }
}