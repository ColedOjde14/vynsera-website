// src/app/api/admin/assign-service/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { userId, serviceSlug } = await request.json();

    if (!userId || !serviceSlug) {
      return NextResponse.json({ error: 'Missing userId or serviceSlug' }, { status: 400 });
    }

    const existing = await prisma.serviceAssignment.findUnique({
      where: {
        userId_serviceSlug: { userId, serviceSlug },
      },
    });

    if (existing) {
      return NextResponse.json({ message: 'Service already assigned' });
    }

    await prisma.serviceAssignment.create({
      data: {
        userId,
        serviceSlug,
        status: 'assigned',
      },
    });

    return NextResponse.json({ message: 'Service assigned successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to assign service' }, { status: 500 });
  }
}