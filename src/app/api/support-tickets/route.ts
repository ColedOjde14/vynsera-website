// src/app/api/support-tickets/route.ts
import { neon } from '@neondatabase/serverless';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();

  const subject = formData.get('subject') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string || 'Medium'; // Default to Medium for clients
  const attachment = formData.get('attachment') as File | null;

  if (!subject || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  let attachmentUrl = null;

  if (attachment && attachment.size > 0) {
    if (attachment.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    try {
      const blob = await put(`tickets/${user.id}/${Date.now()}-${attachment.name}`, attachment, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      attachmentUrl = blob.url;
    } catch (error) {
      console.error('File upload error:', error);
      return NextResponse.json({ error: 'Failed to upload attachment' }, { status: 500 });
    }
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO support_tickets (user_id, subject, description, priority, status, attachment_url, created_at)
      VALUES (${user.id}, ${subject}, ${description}, ${priority}, 'Open', ${attachmentUrl}, CURRENT_TIMESTAMP)
    `;

    return NextResponse.json({ success: true, message: 'Ticket created!' });
  } catch (error) {
    console.error('Ticket insert error:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}