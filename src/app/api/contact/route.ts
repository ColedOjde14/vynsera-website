// src/app/api/contact/route.ts
export const runtime = 'nodejs';

import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Read body only once
    const body = await request.json();

    // Extract fields (case-insensitive for robustness)
    const name = body.name || body.Name || '';
    const email = body.email || body.Email || '';
    const message = body.message || body.Message || '';

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