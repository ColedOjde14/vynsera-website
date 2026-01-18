// src/app/admin/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { neon } from '@neondatabase/serverless';
import PortalHeader from "@/components/PortalHeader";
import AdminClientContent from "@/components/AdminClientContent";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata.role as string | undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  if (!isAdminOrSupport) {
    redirect("/portal");
  }

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0] || "Admin";

  const sql = neon(process.env.DATABASE_URL!);

  const totalTickets = await sql`SELECT COUNT(*) as count FROM support_tickets`;
  const openTickets = await sql`SELECT COUNT(*) as count FROM support_tickets WHERE status = 'Open'`;
  const totalOrders = await sql`SELECT COUNT(*) as count FROM work_orders`;
  const pendingOrders = await sql`SELECT COUNT(*) as count FROM work_orders WHERE status = 'Pending'`;

  const recentTickets = await sql`
    SELECT id, user_id, subject, priority, status, created_at
    FROM support_tickets
    ORDER BY created_at DESC
    LIMIT 10
  `;

  const recentOrders = await sql`
    SELECT id, user_id, title, status, created_at
    FROM work_orders
    ORDER BY created_at DESC
    LIMIT 10
  `;

  // Fetch contact submissions
  const contactSubmissions = await sql`
    SELECT id, name, email, message, created_at
    FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT 10
  `;

  // New: Fetch service requests
  const serviceRequests = await sql`
    SELECT id, user_id, service_slug, name, email, phone, budget, timeline, details, files, created_at, status
    FROM service_requests
    ORDER BY created_at DESC
    LIMIT 10
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      <PortalHeader title="Admin Panel" subtitle={`Welcome, ${displayName} • Manage Vynsera Operations`} />
      <AdminClientContent
        displayName={displayName}
        totalTickets={totalTickets[0].count}
        openTickets={openTickets[0].count}
        totalOrders={totalOrders[0].count}
        pendingOrders={pendingOrders[0].count}
        recentTickets={recentTickets}
        recentOrders={recentOrders}
        contactSubmissions={contactSubmissions}
        serviceRequests={serviceRequests}
      />
    </div>
  );
}