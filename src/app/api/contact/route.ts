// src/app/api/contact/route.ts
export const runtime = 'nodejs';

import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name || '';
    const email = body.email || '';
    const message = body.message || '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO contact_submissions (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, CURRENT_TIMESTAMP)
    `;

    // 1. Confirmation email to the user
    await resend.emails.send({
      from: 'Vynsera Team <hello@vynseracorp.com>',
      to: [email],
      subject: 'Thanks for Reaching Out - Vynsera',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f0f1a; color: #e2e8f0;">
          <h1 style="color: #c084fc;">Hi ${name.split(' ')[0]},</h1>
          <p style="font-size: 18px; line-height: 1.6;">
            Thank you for contacting Vynsera! We've received your message and our team is reviewing it now.
          </p>
          <p style="font-size: 16px; opacity: 0.9;">
            We'll get back to you as soon as possible. In the meantime, feel free to explore our <a href="https://vynseracorp.com" style="color: #a78bfa;">website</a> or <a href="https://vynseracorp.com/services" style="color: #a78bfa;">services</a>.
          </p>
          <p style="margin-top: 32px;">Best regards,<br/>The Vynsera Team</p>
          <hr style="border: 1px solid #4c1d95; margin: 32px 0;" />
          <small style="opacity: 0.6;">This is an automated message — no need to reply.</small>
        </div>
      `,
    });

    // 2. Notification email to company
    await resend.emails.send({
      from: 'Vynsera Contact Form <hello@vynseracorp.com>',
      to: [process.env.COMPANY_EMAIL || 'support@vynseracorp.com'],
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background: #0f0f1a; color: #e2e8f0;">
          <h1 style="color: #c084fc;">New Contact Form Submission</h1>
          <p style="opacity: 0.9;">Details:</p>
          
          <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #4c1d95;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #a78bfa;">${email}</a></p>
          </div>

          <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; border-left: 4px solid #c084fc;">
            <p style="margin: 0 0 12px; opacity: 0.8;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 24px; opacity: 0.7;">
            Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Message sent!' });
  } catch (error: any) {
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

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid submission ID' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      DELETE FROM contact_submissions
      WHERE id = ${parsedId}
    `;

    return NextResponse.json({ success: true, message: 'Submission deleted!' });
  } catch (error) {
    console.error('Contact delete error:', error);
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
  }
}