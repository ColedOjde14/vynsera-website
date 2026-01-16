// src/components/AdminClientContent.tsx
'use client';

interface AdminClientProps {
  displayName: string;
  totalTickets: number;
  openTickets: number;
  totalOrders: number;
  pendingOrders: number;
  recentTickets: any[];
  recentOrders: any[];
}

export default function AdminClientContent({
  displayName,
  totalTickets,
  openTickets,
  totalOrders,
  pendingOrders,
  recentTickets,
  recentOrders,
}: AdminClientProps) {
  return (
    <main className="max-w-7xl mx-auto p-6 sm:p-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
          <p className="text-indigo-300 text-sm uppercase tracking-wider mb-2">Total Tickets</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
            {totalTickets}
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
          <p className="text-indigo-300 text-sm uppercase tracking-wider mb-2">Open Tickets</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            {openTickets}
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
          <p className="text-indigo-300 text-sm uppercase tracking-wider mb-2">Total Work Orders</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            {totalOrders}
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
          <p className="text-indigo-300 text-sm uppercase tracking-wider mb-2">Pending Orders</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {pendingOrders}
          </p>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-indigo-200 mb-6">Recent Tickets</h2>
        {recentTickets.length === 0 ? (
          <p className="text-indigo-300 text-center py-12">No recent tickets</p>
        ) : (
          <div className="space-y-6">
            {recentTickets.map((ticket) => (
              <a
                key={ticket.id}
                href={`/portal/support/${ticket.id}`}
                className="block bg-black/30 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-200">
                      {ticket.subject}
                    </h3>
                    <p className="text-sm text-indigo-300 mt-1">
                      Client ID: {ticket.user_id.slice(0, 8)}...
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      ticket.priority === 'Urgent' ? 'bg-red-600/30 text-red-300' :
                      ticket.priority === 'High' ? 'bg-orange-600/30 text-orange-300' :
                      ticket.priority === 'Medium' ? 'bg-yellow-600/30 text-yellow-300' :
                      'bg-green-600/30 text-green-300'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      ticket.status === 'Open' ? 'bg-green-600/30 text-green-300' :
                      ticket.status === 'In Progress' ? 'bg-blue-600/30 text-blue-300' :
                      'bg-gray-600/30 text-gray-300'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-indigo-200/80 text-sm">
                  Created: {new Date(ticket.created_at).toLocaleString()}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Recent Work Orders */}
      <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-200 mb-6">Recent Work Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-indigo-300 text-center py-12">No recent work orders</p>
        ) : (
          <div className="space-y-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-black/30 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-200">
                      {order.title}
                    </h3>
                    <p className="text-sm text-indigo-300 mt-1">
                      Client ID: {order.user_id.slice(0, 8)}...
                    </p>
                  </div>

                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Pending' ? 'bg-yellow-600/30 text-yellow-300' :
                    order.status === 'In Progress' ? 'bg-blue-600/30 text-blue-300' :
                    'bg-green-600/30 text-green-300'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <p className="mt-4 text-indigo-200/80 text-sm">
                  Created: {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}