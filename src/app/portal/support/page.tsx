// src/app/portal/support/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { neon } from '@neondatabase/serverless';
import PortalHeader from "@/components/PortalHeader";

export default async function SupportTicketsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata.role as string | undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0] || "Client";

  const sql = neon(process.env.DATABASE_URL!);

  let tickets: any[] = [];

  try {
    if (isAdminOrSupport) {
      tickets = await sql`
        SELECT id, user_id, subject, priority, status, created_at
        FROM support_tickets
        ORDER BY created_at DESC
        LIMIT 100
      `;
    } else {
      tickets = await sql`
        SELECT id, subject, priority, status, created_at
        FROM support_tickets
        WHERE user_id = ${user.id}
        ORDER BY created_at DESC
        LIMIT 100
      `;
    }
  } catch (error) {
    console.error('Ticket fetch error:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      <PortalHeader
        title="Support Tickets"
        subtitle={isAdminOrSupport ? "Manage all client tickets" : "Your support tickets"}
      />

      {/* Rest of your ticket list content */}
      {/* ... keep everything below the header as-is ... */}
    </div>
  );
}