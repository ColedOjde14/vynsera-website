// src/app/api/service-request-update/route.ts
import { neon } from '@neondatabase/serverless';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = user.publicMetadata.role as string || undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  if (!isAdminOrSupport) {
    return NextResponse.json({ error: 'Only admins/support can update requests' }, { status: 403 });
  }

  const body = await request.json();
  const { requestId, status } = body;

  if (!requestId || !status) {
    return NextResponse.json({ error: 'Missing request ID or status' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const [updatedRequest] = await sql`
      UPDATE service_requests
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${requestId}
      RETURNING id, status
    `;

    if (!updatedRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, request: updatedRequest });
  } catch (error) {
    console.error('Service request update error:', error);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = user.publicMetadata.role as string || undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  if (!isAdminOrSupport) {
    return NextResponse.json({ error: 'Only admins/support can delete requests' }, { status: 403 });
  }

  const body = await request.json();
  const { requestId } = body;

  if (!requestId) {
    return NextResponse.json({ error: 'Missing request ID' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      DELETE FROM service_requests
      WHERE id = ${requestId}
    `;

    return NextResponse.json({ success: true, message: 'Request deleted' });
  } catch (error) {
    console.error('Service request delete error:', error);
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
  }
}