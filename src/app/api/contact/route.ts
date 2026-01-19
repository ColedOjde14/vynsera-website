// src/app/api/contact/route.ts
export const runtime = 'nodejs';

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }

    await prisma.contactSubmission.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true, message: 'Submission deleted!' });
  } catch (error) {
    console.error('Contact delete error:', error);
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
  }
}