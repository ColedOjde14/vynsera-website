// src/app/api/admin/client-services/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const clientServices = await sql`
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
        COALESCE(s.name, cs.custom_name) AS service_name
      FROM client_services cs
      LEFT JOIN services s ON cs.service_id = s.id
      ${filter !== 'all' ? sql`WHERE cs.status = ${filter}` : sql``}
      ORDER BY cs.assigned_at DESC
    `;

    const services = await sql`
      SELECT id, name
      FROM services
      ORDER BY name
    `;

    return NextResponse.json({
      services: services ?? [],
      clientServices: clientServices ?? [],
    });
  } catch (error) {
    console.error('Error fetching client services:', error);
    return NextResponse.json({
      error: 'Failed to load data',
      services: [],
      clientServices: [],
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
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

  if (is_custom && (!custom_name?.trim() || !custom_description?.trim())) {
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
        ${is_custom ? custom_name.trim() : null},
        ${is_custom ? custom_description.trim() : null},
        ${start_date || null},
        ${expiration_date || null},
        ${status},
        ${notes.trim() || null}
      )
    `;

    return NextResponse.json({
      success: true,
      message: 'Service assigned successfully'
    });
  } catch (error) {
    console.error('Assign service error:', error);
    return NextResponse.json({ error: 'Failed to assign service' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await currentUser();

  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const { id, status, start_date, expiration_date, notes } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      UPDATE client_services
      SET
        status = COALESCE(${status}, status),
        start_date = COALESCE(${start_date}, start_date),
        expiration_date = COALESCE(${expiration_date}, expiration_date),
        notes = COALESCE(${notes}, notes),
        updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Missing assignment ID' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      DELETE FROM client_services
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: 'Service assignment deleted'
    });
  } catch (error) {
    console.error('Delete service assignment error:', error);
    return NextResponse.json({ error: 'Failed to delete assignment' }, { status: 500 });
  }
}