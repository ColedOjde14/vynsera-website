// src/app/portal/support/[ticketId]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { neon } from '@neondatabase/serverless';
import PortalHeader from "@/components/PortalHeader";
import ClientTicketDetail from "@/components/ClientTicketDetail";

export default async function TicketDetailPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const { ticketId: rawTicketId } = await params;
  const ticketId = parseInt(rawTicketId, 10);

  if (isNaN(ticketId)) {
    notFound();
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata.role as string | undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  const sql = neon(process.env.DATABASE_URL!);

  // Fetch the ticket
  const [ticket] = await sql`
    SELECT id, user_id, subject, description, priority, status, attachment_url, created_at
    FROM support_tickets
    WHERE id = ${ticketId}
  `;

  if (!ticket) {
    notFound();
  }

  // Clients can only view their own tickets
  if (!isAdminOrSupport && ticket.user_id !== user.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-400 text-2xl font-bold">
        Unauthorized to view this ticket
      </div>
    );
  }

  // Fetch all messages
  const messages = await sql`
    SELECT id, user_id, message, attachment_url, created_at
    FROM ticket_messages
    WHERE ticket_id = ${ticketId}
    ORDER BY created_at ASC
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      <PortalHeader
        title={`Ticket #${ticket.id}: ${ticket.subject}`}
        subtitle={isAdminOrSupport ? `Client ID: ${ticket.user_id.slice(0, 8)}...` : "Your Support Ticket"}
      />

      <ClientTicketDetail ticket={ticket} messages={messages} userId={user.id} isAdminOrSupport={isAdminOrSupport} />
    </div>
  );
}