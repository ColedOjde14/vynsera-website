// src/app/portal/support/[ticketId]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { neon } from '@neondatabase/serverless';
import { UserButton } from "@clerk/nextjs";

export default async function TicketDetailPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const resolvedParams = await params;  // Await the Promise
  const ticketId = parseInt(resolvedParams.ticketId, 10);

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
    return <div className="p-8 text-center text-red-400 text-xl font-bold">Unauthorized to view this ticket</div>;
  }

  // Fetch all messages for this ticket
  const messages = await sql`
    SELECT id, user_id, message, attachment_url, created_at
    FROM ticket_messages
    WHERE ticket_id = ${ticketId}
    ORDER BY created_at ASC
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Ticket #{ticket.id}: {ticket.subject}
          </h1>
          <p className="mt-2 text-indigo-300 text-lg">
            {isAdminOrSupport ? `Client ID: ${ticket.user_id.slice(0, 8)}...` : "Your Support Ticket"} • Created {new Date(ticket.created_at).toLocaleString()}
          </p>
          <p className="mt-1 text-sm">
            Priority: <span className={`font-medium ${
              ticket.priority === 'Urgent' ? 'text-red-400' :
              ticket.priority === 'High' ? 'text-orange-400' :
              ticket.priority === 'Medium' ? 'text-yellow-400' :
              'text-green-400'
            }`}>{ticket.priority}</span> • Status: <span className="font-medium text-indigo-300">{ticket.status}</span>
          </p>
        </div>
      </header>

      {/* Messages/Chat History */}
      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-12 text-center">
              <h2 className="text-2xl font-semibold text-indigo-200 mb-4">
                No messages yet
              </h2>
              <p className="text-indigo-300 text-lg">
                Start the conversation below.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.user_id === user.id ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-6 ${
                  msg.user_id === user.id
                    ? "bg-indigo-600/30 border border-indigo-500/50"
                    : "bg-gray-800/50 border border-gray-700/50"
                }`}>
                  <p className="text-indigo-100 whitespace-pre-wrap">{msg.message}</p>
                  {msg.attachment_url && (
                    <a
                      href={msg.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-indigo-300 hover:text-indigo-100 underline text-sm"
                    >
                      View Attachment
                    </a>
                  )}
                  <p className="mt-3 text-xs text-indigo-400">
                    {new Date(msg.created_at).toLocaleString()} • {msg.user_id === user.id ? 'You' : (isAdminOrSupport ? 'Support' : 'Client')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reply Form */}
        <div className="mt-12 bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-indigo-200 mb-6">
            Send a Reply
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-indigo-300 text-sm mb-2">Message</label>
              <textarea
                required
                rows={4}
                className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
                placeholder="Type your reply here..."
              />
            </div>

            <div>
              <label className="block text-indigo-300 text-sm mb-2">Attachment (optional, max 5MB)</label>
              <input
                type="file"
                accept="image/*,.pdf"
                className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white file:bg-indigo-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}