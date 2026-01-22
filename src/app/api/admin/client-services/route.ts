export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

/* ───────────────────────── GET ───────────────────────── */
export async function GET(request: Request) {
  const user = await currentUser();
  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
    return NextResponse.json({ services: [], clientServices: [] }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';

  try {
    const clientServices = await sql`
      SELECT
        cs.id,
        cs.client_id,
        c.name AS client_name,
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
      JOIN clients c ON cs.client_id = c.id
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
  } catch (err) {
    console.error('GET client-services failed:', err);
    return NextResponse.json({ services: [], clientServices: [] }, { status: 500 });
  }
}

/* ───────────────────────── POST ───────────────────────── */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const {
    client_id,
    service_id,
    is_custom,
    custom_name,
    custom_description,
    start_date,
    expiration_date,
    status = 'pending',
    notes,
  } = await request.json();

  try {
    const [assignment] = await sql`
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
        ${notes || null}
      )
      RETURNING id
    `;

    /* AUTO-CREATE WORK ORDER FOR PENDING */
    if (status === 'pending') {
      await sql`
        INSERT INTO work_orders (
          client_id,
          client_service_id,
          status,
          created_at
        ) VALUES (
          ${client_id},
          ${assignment.id},
          'pending',
          NOW()
        )
      `;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST client-services failed:', err);
    return NextResponse.json({ error: 'Failed to assign service' }, { status: 500 });
  }
}

/* ───────────────────────── PATCH (EDIT) ───────────────────────── */
export async function PATCH(request: Request) {
  const user = await currentUser();
  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const {
    id,
    status,
    start_date,
    expiration_date,
    notes,
  } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    await sql`
      UPDATE client_services
      SET
        status = COALESCE(${status}, status),
        start_date = COALESCE(${start_date}, start_date),
        expiration_date = COALESCE(${expiration_date}, expiration_date),
        notes = COALESCE(${notes}, notes)
      WHERE id = ${id}
    `;

    /* KEEP WORK ORDER IN SYNC */
    if (status) {
      await sql`
        UPDATE work_orders
        SET status = ${status}
        WHERE client_service_id = ${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('PATCH client-services failed:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

/* ───────────────────────── DELETE ───────────────────────── */
export async function DELETE(request: Request) {
  const user = await currentUser();
  if (!user || !['admin', 'support'].includes(user.publicMetadata.role as string)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  try {
    await sql`DELETE FROM work_orders WHERE client_service_id = ${id}`;
    await sql`DELETE FROM client_services WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE client-services failed:', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
