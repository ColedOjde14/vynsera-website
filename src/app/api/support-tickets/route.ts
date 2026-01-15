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

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch (error) {
    // Fallback if not FormData (plain JSON)
    const body = await request.json();
    formData = new FormData();
    formData.append('subject', body.subject || '');
    formData.append('description', body.description || '');
    formData.append('priority', body.priority || 'Medium');
  }

  const subject = formData.get('subject') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string || 'Medium';
  const attachment = formData.get('attachment') as File | null;

  if (!subject || !description) {
    return NextResponse.json({ error: 'Missing subject or description' }, { status: 400 });
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
    const [ticket] = await sql`
      INSERT INTO support_tickets (user_id, subject, description, priority, attachment_url)
      VALUES (${user.id}, ${subject}, ${description}, ${priority}, ${attachmentUrl})
      RETURNING id
    `;

    // Add initial message
    await sql`
      INSERT INTO ticket_messages (ticket_id, user_id, message, attachment_url)
      VALUES (${ticket.id}, ${user.id}, ${description}, ${attachmentUrl})
    `;

    return NextResponse.json({ success: true, ticketId: ticket.id, message: 'Ticket submitted successfully!' });
  } catch (error) {
    console.error('Ticket insert error:', error);
    return NextResponse.json({ error: 'Failed to submit ticket' }, { status: 500 });
  }
}