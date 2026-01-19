import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { userId, title, description, serviceSlug, dueDate } = await request.json();

    if (!userId || !title) {
      return NextResponse.json({ error: 'Missing userId or title' }, { status: 400 });
    }

    const workOrder = await prisma.workOrder.create({
      data: {
        userId,
        title,
        description: description || null,
        serviceSlug: serviceSlug || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: 'pending',
      },
    });

    return NextResponse.json({ message: 'Work order created', workOrder });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create work order' }, { status: 500 });
  }
}