// src/app/api/admin/clients/route.ts
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Extend the type for publicMetadata to include role
interface ExtendedSessionClaims {
  publicMetadata?: {
    role?: string;
  };
}

export async function GET() {
  const authData = await auth();
  const { userId, sessionClaims } = authData;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Safe access with type assertion + fallback
  const claims = sessionClaims as ExtendedSessionClaims | null;
  const role = claims?.publicMetadata?.role;

  if (role !== 'admin' && role !== 'support') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { data: users } = await clerkClient.users.getUserList({
      limit: 100,
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