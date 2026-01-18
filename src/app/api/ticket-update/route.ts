// src/app/api/ticket-update/route.ts
import { neon } from '@neondatabase/serverless';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = user.publicMetadata.role as string | undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  if (!isAdminOrSupport) {
    return NextResponse.json({ error: 'Only admins/support can update tickets' }, { status: 403 });
  }

  const body = await request.json();
  const { ticketId, status, priority } = body;

  if (!ticketId) {
    return NextResponse.json({ error: 'Missing ticket ID' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    let updatedTicket;

    if (status) {
      [updatedTicket] = await sql`
        UPDATE support_tickets
        SET status = ${status}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${ticketId}
        RETURNING *
      `;
    }

    if (priority) {
      [updatedTicket] = await sql`
        UPDATE support_tickets
        SET priority = ${priority}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${ticketId}
        RETURNING *
      `;
    }

    if (!updatedTicket) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    if (!updatedTicket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, ticket: updatedTicket });
  } catch (error) {
    console.error('Ticket update error:', error);
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = user.publicMetadata.role as string | undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  if (!isAdminOrSupport) {
    return NextResponse.json({ error: 'Only admins/support can delete tickets' }, { status: 403 });
  }

  const body = await request.json();
  const { ticketId } = body;

  if (!ticketId) {
    return NextResponse.json({ error: 'Missing ticket ID' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      DELETE FROM support_tickets
      WHERE id = ${ticketId}
    `;

    return NextResponse.json({ success: true, message: 'Ticket deleted' });
  } catch (error) {
    console.error('Ticket delete error:', error);
    return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
  }
}