// src/app/api/contact/route.ts
export const runtime = 'nodejs';

import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let name: string | null = null;
    let email: string | null = null;
    let message: string | null = null;

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      // JSON payload
      const body = await request.json();
      name = body.name || body.Name || null;
      email = body.email || body.Email || null;
      message = body.message || body.Message || null;
    } else {
      // FormData / urlencoded payload (your current form)
      const formData = await request.formData();
      name = formData.get('name') as string | null;
      email = formData.get('email') as string | null;
      message = formData.get('message') as string | null;
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields (name, email, message)' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO contact_submissions (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, CURRENT_TIMESTAMP)
    `;

    return NextResponse.json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}