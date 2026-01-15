// src/app/portal/support/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { neon } from '@neondatabase/serverless';

export default async function SupportTicketsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata.role as string | undefined;
  const isAdminOrSupport = role === "admin" || role === "support";

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0] || "Client";
  const userId = user.id;

  const sql = neon(process.env.DATABASE_URL!);

  let tickets: any[] = [];

  try {
    if (isAdminOrSupport) {
      // Admins see ALL tickets
      tickets = await sql`
        SELECT id, user_id, subject, description, priority, status, created_at
        FROM support_tickets
        ORDER BY created_at DESC
        LIMIT 50
      `;
    } else {
      // Clients see only their own
      tickets = await sql`
        SELECT id, subject, description, priority, status, created_at
        FROM support_tickets
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT 50
      `;
    }
  } catch (error) {
    console.error('Ticket fetch error:', error);
    // Fallback to empty array on error
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Support Tickets
          </h1>
          <p className="mt-2 text-indigo-300 text-lg">
            {isAdminOrSupport ? "Manage all client tickets" : "Your support tickets"} • {displayName}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        {tickets.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-semibold text-indigo-200 mb-4">
              {isAdminOrSupport ? "No tickets found" : "No open tickets yet"}
            </h2>
            <p className="text-indigo-300 text-lg">
              {isAdminOrSupport
                ? "All clients are good for now. New tickets will appear here."
                : "Submit a support ticket above to get help from our team."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-indigo-200">
                    {ticket.subject}
                  </h3>
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    ticket.priority === 'Urgent' ? 'bg-red-600/30 text-red-300' :
                    ticket.priority === 'High' ? 'bg-orange-600/30 text-orange-300' :
                    ticket.priority === 'Medium' ? 'bg-yellow-600/30 text-yellow-300' :
                    'bg-green-600/30 text-green-300'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>

                <p className="text-indigo-200/80 mb-4">
                  {ticket.description}
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-indigo-300 gap-4">
                  <div>
                    <span className="font-medium">
                      Status: {ticket.status}
                    </span>
                    <span className="ml-4">
                      Created: {new Date(ticket.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {isAdminOrSupport && (
                    <div className="text-indigo-400">
                      Client ID: {ticket.user_id.slice(0, 8)}...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}