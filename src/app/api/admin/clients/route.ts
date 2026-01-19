// src/app/api/admin/clients/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = user.publicMetadata.role as string | undefined;
  if (role !== 'admin' && role !== 'support') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const usersList = await prisma.user.findMany({
      take: 100,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ users: usersList }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { users: [], error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}