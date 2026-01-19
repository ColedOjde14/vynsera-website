// src/app/api/admin/clients/route.ts
import { currentUser, clerkClient } from '@clerk/nextjs/server';
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
    const client = await clerkClient(); // v4: call the function
    const usersList = await client.users.getUserList({
      limit: 100,
    });

    return NextResponse.json({ users: usersList }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { users: [], error: 'Failed to fetch clients' }, // fallback array to prevent client crash
      { status: 500 }
    );
  }
}