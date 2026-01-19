import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const workOrders = await prisma.workOrder.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ workOrders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load work orders' }, { status: 500 });
  }
}