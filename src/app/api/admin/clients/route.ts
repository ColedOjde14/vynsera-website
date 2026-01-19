// src/app/api/admin/clients/route.ts
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const authData = await auth();
  const { userId, sessionClaims } = authData;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = sessionClaims?.publicMetadata?.role as string | undefined;

  if (role !== 'admin' && role !== 'support') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // clerkClient is the direct object - no () call!
    const { data: users } = await clerkClient.users.getUserList({
      limit: 100, // increase if you have more users
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}