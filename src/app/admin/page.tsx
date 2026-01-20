// src/app/admin/page.tsx
import AdminClientContent from '@/components/AdminClientContent';
import { currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    redirect('/');
  }

  const sql = neon(process.env.DATABASE_URL!);

  // Temporarily disabled work orders queries to prevent crash
  // const totalOrders = await sql`SELECT COUNT(*) as count FROM work_orders`;
  // const pendingOrders = await sql`SELECT COUNT(*) as count FROM work_orders WHERE status = 'Pending'`;
  // const recentOrders = await sql`SELECT * FROM work_orders ORDER BY created_at DESC LIMIT 5`;

  // Safe defaults (no DB query)
  const totalOrders = { count: 0 };
  const pendingOrders = { count: 0 };
  const recentOrders: any[] = [];

  // Fetch the other data (these should work with your current DB)
  const [openTicketsResult] = await sql`SELECT COUNT(*) as count FROM support_tickets WHERE status = 'Open'`;
  const openTickets = openTicketsResult?.count || 0;

  const [totalTicketsResult] = await sql`SELECT COUNT(*) as count FROM support_tickets`;
  const totalTickets = totalTicketsResult?.count || 0;

  const recentTickets = await sql`
    SELECT id, subject, user_id, priority, status, created_at
    FROM support_tickets
    ORDER BY created_at DESC
    LIMIT 5
  `;

  const contactSubmissions = await sql`
    SELECT id, name, email, message, created_at
    FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT 5
  `;

  const serviceRequests = await sql`
    SELECT id, service_slug, name, email, status, created_at
    FROM service_requests
    ORDER BY created_at DESC
    LIMIT 5
  `;

  return (
    <AdminClientContent
      displayName={user.firstName || 'Admin'}
      totalTickets={Number(totalTickets)}
      openTickets={Number(openTickets)}
      totalOrders={Number(totalOrders.count)}
      pendingOrders={Number(pendingOrders.count)}
      recentTickets={recentTickets}
      recentOrders={recentOrders}
      contactSubmissions={contactSubmissions}
      serviceRequests={serviceRequests}
    />
  );
}