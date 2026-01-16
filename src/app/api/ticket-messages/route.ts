// src/app/api/ticket-messages/route.ts
import { neon } from '@neondatabase/serverless';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = user.publicMetadata.role as string | undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  const formData = await request.formData();
  const ticketId = formData.get('ticketId') as string;
  const message = formData.get('message') as string;
  const attachment = formData.get('attachment') as File | null;

  if (!ticketId || !message) {
    return NextResponse.json({ error: 'Missing ticket ID or message' }, { status: 400 });
  }

  const parsedTicketId = parseInt(ticketId, 10);
  if (isNaN(parsedTicketId)) {
    return NextResponse.json({ error: 'Invalid ticket ID' }, { status: 400 });
  }

  let attachmentUrl = null;

  if (attachment && attachment.size > 0) {
    if (attachment.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    try {
      const blob = await put(`tickets/${user.id}/${ticketId}/${Date.now()}-${attachment.name}`, attachment, {
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
    // Verify ticket exists and user has access
    const [ticket] = await sql`
      SELECT id FROM support_tickets
      WHERE id = ${parsedTicketId}
      ${!isAdminOrSupport ? sql`AND user_id = ${user.id}` : sql``}
    `;

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found or unauthorized' }, { status: 403 });
    }

    // Insert new message
    await sql`
      INSERT INTO ticket_messages (ticket_id, user_id, message, attachment_url)
      VALUES (${parsedTicketId}, ${user.id}, ${message}, ${attachmentUrl})
    `;

    // Update ticket timestamp
    await sql`
      UPDATE support_tickets
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parsedTicketId}
    `;

    return NextResponse.json({ success: true, message: 'Reply sent!' });
  } catch (error) {
    console.error('Message insert error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}