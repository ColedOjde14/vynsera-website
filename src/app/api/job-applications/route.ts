// src/app/api/job-applications/route.ts
export const runtime = 'nodejs';

import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const applications = await sql`
      SELECT *
      FROM applications
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const first_name = formData.get('first_name')?.toString().trim() || '';
    const last_name = formData.get('last_name')?.toString().trim() || '';
    const name = `${first_name} ${last_name}`.trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim() || null;
    const authorized_to_work_us = formData.get('authorized_to_work_us')?.toString() === 'true';
    const requires_sponsorship = formData.get('requires_sponsorship')?.toString() === 'true';
    const work_experience = formData.get('work_experience')?.toString().trim() || null;
    const education = formData.get('education')?.toString().trim() || null;
    const position_applying_for = formData.get('position_applying_for')?.toString().trim();
    const why_interested = formData.get('why_interested')?.toString().trim();
    const salary_expectations = formData.get('salary_expectations')?.toString().trim() || null;
    const disability_status = formData.get('disability_status')?.toString() || null;
    const veteran_status = formData.get('veteran_status')?.toString() || null;

    // Validation
    if (!name || !email || !position_applying_for || !why_interested) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Save to database
    const [application] = await sql`
      INSERT INTO applications (
        name, email, phone, authorized_to_work_us, requires_sponsorship,
        work_experience, education, position_applying_for, why_interested,
        salary_expectations, disability_status, veteran_status, created_at
      )
      VALUES (
        ${name}, ${email}, ${phone}, ${authorized_to_work_us}, ${requires_sponsorship},
        ${work_experience}, ${education}, ${position_applying_for}, ${why_interested},
        ${salary_expectations}, ${disability_status}, ${veteran_status}, NOW()
      )
      RETURNING id, name, email, position_applying_for, created_at
    `;

    // 1. Confirmation to applicant (using backticks for interpolation)
    await resend.emails.send({
      from: 'Vynsera Careers <careers@vynseracorp.com>',
      to: [email],
      subject: 'Application Received - Vynsera',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f0f1a; color: #e2e8f0;">
          <h1 style="color: #c084fc;">Hello ${first_name || name},</h1>
          <p style="font-size: 18px; line-height: 1.6;">
            Thank you for applying to Vynsera! We've received your application for <strong>${position_applying_for}</strong>.
          </p>
          <p style="font-size: 16px; opacity: 0.9;">
            Our team will review it and be in touch if there's a fit. In the meantime, feel free to explore our <a href="https://vynseracorp.com" style="color: #a78bfa;">website</a>.
          </p>
          <p style="margin-top: 32px;">Best regards,<br/>The Vynsera Team</p>
          <hr style="border: 1px solid #4c1d95; margin: 32px 0;" />
          <small style="opacity: 0.6;">This is an automated message — do not reply.</small>
        </div>
      `,
    });

    // 2. Notification to company
    await resend.emails.send({
      from: 'Vynsera Applications <careers@vynseracorp.com>',
      to: [process.env.COMPANY_EMAIL || 'support@vynseracorp.com'],
      subject: `New Application: ${name} for ${position_applying_for}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background: #0f0f1a; color: #e2e8f0;">
          <h1 style="color: #c084fc;">New Career Application</h1>
          <p style="opacity: 0.9;">Submitted just now:</p>
          
          <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #4c1d95;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #a78bfa;">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Position:</strong> ${position_applying_for}</p>
            <p><strong>Authorized to work in US:</strong> ${authorized_to_work_us ? 'Yes' : 'No'}</p>
            <p><strong>Requires sponsorship:</strong> ${requires_sponsorship ? 'Yes' : 'No'}</p>
          </div>

          <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; border-left: 4px solid #c084fc;">
            <p style="margin: 0 0 12px; opacity: 0.8;"><strong>Why interested:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${why_interested}</p>
          </div>

          ${work_experience ? `
            <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; margin-top: 20px;">
              <p style="margin: 0 0 12px; opacity: 0.8;"><strong>Work Experience:</strong></p>
              <p style="margin: 0; white-space: pre-wrap;">${work_experience}</p>
            </div>
          ` : ''}

          ${education ? `
            <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; margin-top: 20px;">
              <p style="margin: 0 0 12px; opacity: 0.8;"><strong>Education:</strong></p>
              <p style="margin: 0; white-space: pre-wrap;">${education}</p>
            </div>
          ` : ''}

          <p style="margin-top: 24px; opacity: 0.7;">
            Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully!' });
  } catch (error: any) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}

// DELETE (admin) - unchanged
export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing application ID' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql`
      DELETE FROM applications WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Delete application error:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}