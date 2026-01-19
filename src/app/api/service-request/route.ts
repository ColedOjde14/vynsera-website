// src/app/api/service-request/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await currentUser();

  try {
    const formData = await request.formData();

    const serviceSlug = formData.get('serviceSlug') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || null;
    const budget = formData.get('budget') as string;
    const timeline = formData.get('timeline') as string;
    const details = formData.get('details') as string;

    if (!serviceSlug || !name || !email || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Handle multiple file attachments (optional)
    const files: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('files') && value instanceof File && value.size > 0) {
        if (value.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
        }
        try {
          const blob = await put(`service-requests/${Date.now()}-${value.name}`, value, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          files.push(blob.url);
        } catch (err) {
          console.error('File upload failed:', err);
        }
      }
    }

    // Save to Prisma
    await prisma.serviceRequest.create({
      data: {
        userId: user?.id || null, // Optional - link to user if logged in
        serviceSlug,
        name,
        email,
        phone,
        budget,
        timeline,
        details,
        files,
        status: 'new',
      },
    });

    return NextResponse.json({ success: true, message: 'Request submitted!' });
  } catch (error) {
    console.error('Service request error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}