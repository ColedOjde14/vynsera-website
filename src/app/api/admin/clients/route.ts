// src/app/api/admin/clients/route.ts
import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Safe type assertion for publicMetadata.role
  const role = user.publicMetadata?.role as string | undefined;

  if (role !== 'admin' && role !== 'support') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // Correct v5+ syntax: clerkClient is the object - no () call
    const { data: users } = await clerkClient.users.getUserList({
      limit: 100, // increase if you have more users
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { users: [], error: 'Failed to fetch clients' }, // fallback array to prevent client .map crash
      { status: 500 }
    );
  }
}