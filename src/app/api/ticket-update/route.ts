// src/app/api/ticket-update/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
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

  try {
    const updatedTicket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        updatedAt: new Date(),
      },
    });

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

  try {
    await prisma.supportTicket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json({ success: true, message: 'Ticket deleted' });
  } catch (error) {
    console.error('Ticket delete error:', error);
    return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
  }
}