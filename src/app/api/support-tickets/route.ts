// src/app/api/support-tickets/route.ts
import { neon } from '@neondatabase/serverless';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { subject, description, priority } = await request.json();

  if (!subject || !description) {
    return NextResponse.json({ error: 'Missing subject or description' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO support_tickets (user_id, subject, description, priority)
      VALUES (${user.id}, ${subject}, ${description}, ${priority || 'Medium'})
    `;

    return NextResponse.json({ success: true, message: 'Ticket submitted successfully!' });
  } catch (error) {
    console.error('Ticket insert error:', error);
    return NextResponse.json({ error: 'Failed to submit ticket' }, { status: 500 });
  }
}