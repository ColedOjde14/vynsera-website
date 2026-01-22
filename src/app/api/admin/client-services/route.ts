// src/app/api/admin/client-services/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const [services, clientServices] = await Promise.all([
      sql`SELECT * FROM services ORDER BY name`,
      sql`
        SELECT 
          cs.id,
          cs.client_id,
          cs.service_id,
          cs.status,
          cs.start_date,
          cs.expiration_date,
          cs.is_custom,
          cs.custom_name,
          cs.custom_description,
          cs.notes,
          cs.assigned_at,
          s.name AS service_name,
          s.description AS service_description
        FROM client_services cs
        LEFT JOIN services s ON cs.service_id = s.id
        ORDER BY cs.assigned_at DESC
      `
    ]);

    return NextResponse.json({ services, clientServices });
  } catch (error) {
    console.error('Error fetching client services:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const {
    client_id,
    service_id,
    is_custom = false,
    custom_name,
    custom_description,
    start_date,
    expiration_date,
    status = 'pending',
    notes = ''
  } = body;

  if (!client_id) {
    return NextResponse.json({ error: 'Missing client_id' }, { status: 400 });
  }

  if (!is_custom && !service_id) {
    return NextResponse.json({ error: 'Missing service_id for predefined service' }, { status: 400 });
  }

  if (is_custom && (!custom_name || !custom_description)) {
    return NextResponse.json({ error: 'Custom name and description required' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO client_services (
        client_id,
        service_id,
        is_custom,
        custom_name,
        custom_description,
        start_date,
        expiration_date,
        status,
        notes
      ) VALUES (
        ${client_id},
        ${is_custom ? null : service_id},
        ${is_custom},
        ${is_custom ? custom_name : null},
        ${is_custom ? custom_description : null},
        ${start_date || null},
        ${expiration_date || null},
        ${status},
        ${notes}
      )
    `;

    return NextResponse.json({ success: true, message: 'Service assigned successfully' });
  } catch (error) {
    console.error('Assign service error:', error);
    return NextResponse.json({ error: 'Failed to assign service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing assignment ID' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      DELETE FROM client_services WHERE id = ${id}
    `;

    return NextResponse.json({ success: true, message: 'Service assignment deleted' });
  } catch (error) {
    console.error('Delete service assignment error:', error);
    return NextResponse.json({ error: 'Failed to delete assignment' }, { status: 500 });
  }
}