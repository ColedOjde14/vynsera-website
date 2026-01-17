// src/app/api/contact/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO contact_submissions (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, CURRENT_TIMESTAMP)
    `;

    // Redirect to confirmation page on success
    return NextResponse.redirect(new URL('/contact-success', request.url));
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      DELETE FROM contact_submissions
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true, message: 'Submission deleted!' });
  } catch (error) {
    console.error('Contact delete error:', error);
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
  }
}