// src/app/api/service-request/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
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

    // Handle multiple file attachments (optional) - unchanged
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

    const sql = neon(process.env.DATABASE_URL!);

    // Save to DB - unchanged
    await sql`
      INSERT INTO service_requests (service_slug, name, email, phone, budget, timeline, details, files, created_at)
      VALUES (${serviceSlug}, ${name}, ${email}, ${phone}, ${budget}, ${timeline}, ${details}, ${files}, CURRENT_TIMESTAMP)
    `;

    // NEW: Send confirmation email to user
    await resend.emails.send({
      from: 'Vynsera Services <sales@vynseracorp.com>',
      to: [email],
      subject: 'Service Request Received - Vynsera',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f0f1a; color: #e2e8f0;">
          <h1 style="color: #c084fc;">Hi ${name.split(' ')[0]},</h1>
          <p style="font-size: 18px; line-height: 1.6;">
            Thank you for your service request! We've received it for <strong>${serviceSlug}</strong> and our team is reviewing it now.
          </p>
          <p style="font-size: 16px; opacity: 0.9;">
            We'll get back to you soon with next steps or a quote. In the meantime, feel free to explore more on our <a href="https://vynseracorp.com/services" style="color: #a78bfa;">services page</a>.
          </p>
          <p style="margin-top: 32px;">Best regards,<br/>The Vynsera Team</p>
          <hr style="border: 1px solid #4c1d95; margin: 32px 0;" />
          <small style="opacity: 0.6;">This is an automated message — no need to reply.</small>
        </div>
      `,
    });

    // NEW: Send notification to company
    await resend.emails.send({
      from: 'Vynsera Service Requests <services@vynseracorp.com>',
      to: [process.env.COMPANY_EMAIL || 'support@vynseracorp.com'],
      subject: `New Service Request: ${name} (${serviceSlug})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background: #0f0f1a; color: #e2e8f0;">
          <h1 style="color: #c084fc;">New Service Request Received</h1>
          <p style="opacity: 0.9;">Details:</p>
          
          <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #4c1d95;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #a78bfa;">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Service:</strong> ${serviceSlug}</p>
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
          </div>

          <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; border-left: 4px solid #c084fc; margin-top: 20px;">
            <p style="margin: 0 0 12px; opacity: 0.8;"><strong>Details:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${details}</p>
          </div>

          ${files.length > 0 ? `
            <div style="margin-top: 20px;">
              <p style="opacity: 0.8;"><strong>Attachments:</strong></p>
              <ul style="margin: 8px 0 0; padding-left: 20px;">
                ${files.map(url => `<li><a href="${url}" style="color: #a78bfa;">${url.split('/').pop()}</a></li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <p style="margin-top: 24px; opacity: 0.7;">
            Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Request submitted!' });
  } catch (error: any) {
    console.error('Service request error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}