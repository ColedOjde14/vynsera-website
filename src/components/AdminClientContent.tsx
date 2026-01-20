// src/components/AdminClientContent.tsx
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from "next/link";

interface AdminClientProps {
  displayName: string;
  totalTickets: number;
  openTickets: number;
  totalOrders: number;
  pendingOrders: number;
  recentTickets: any[];
  recentOrders: any[];
  contactSubmissions: any[];
  serviceRequests: any[];
}

export default function AdminClientContent({
  displayName,
  totalTickets,
  openTickets,
  totalOrders,
  pendingOrders,
  recentTickets,
  recentOrders,
  contactSubmissions,
  serviceRequests,
}: AdminClientProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedServiceRequest, setSelectedServiceRequest] = useState<any | null>(null);
  const [updatingRequestId, setUpdatingRequestId] = useState<number | null>(null);

  // Clients tab state
  const [clients, setClients] = useState<any[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'orders' | 'contacts' | 'requests' | 'clients'>('overview');

  // Fetch clients from Clerk
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/admin/clients');
        const data = await response.json();

        if (response.ok) {
          const fetchedUsers = data.users?.data || data.users || data.data || [];
          setClients(fetchedUsers);
        } else {
          toast.error(data.error || 'Failed to load clients');
        }
      } catch (err) {
        toast.error('Network error loading clients');
        console.error(err);
      } finally {
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact submission? This cannot be undone.')) return;

    setDeletingId(id);
    try {
      const response = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Contact submission deleted!');
        window.location.reload();
      } else {
        alert(data.error || 'Failed to delete submission.');
      }
    } catch (error) {
      alert('Network error. Try again.');
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateServiceRequest = async (requestId: number, newStatus: string) => {
    setUpdatingRequestId(requestId);
    try {
      const response = await fetch('/api/service-request-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Status updated!');
        window.location.reload();
      } else {
        toast.error(data.error || 'Failed to update status.');
      }
    } catch (error) {
      toast.error('Network error. Try again.');
      console.error(error);
    } finally {
      setUpdatingRequestId(null);
    }
  };

  const handleDeleteServiceRequest = async (requestId: number) => {
    if (!confirm('Are you sure you want to delete this service request? This cannot be undone.')) return;

    try {
      const response = await fetch('/api/service-request-update', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Request deleted!');
        window.location.reload();
      } else {
        toast.error(data.error || 'Failed to delete request.');
      }
    } catch (error) {
      toast.error('Network error.');
      console.error(error);
    }
  };

  const handleDownloadPDF = (req: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Service Request #${req.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
              h1 { color: #4f46e5; text-align: center; }
              .field { margin-bottom: 16px; }
              .label { font-weight: bold; color: #6366f1; }
              .value { margin-left: 8px; }
              hr { border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0; }
            </style>
          </head>
          <body>
            <h1>Service Request #${req.id}</h1>
            <hr>
            <div class="field"><span class="label">Service:</span> <span class="value">${req.service_slug.replace(/-/g, ' ').toUpperCase()}</span></div>
            <div class="field"><span class="label">Name:</span> <span class="value">${req.name}</span></div>
            <div class="field"><span class="label">Email:</span> <span class="value">${req.email}</span></div>
            <div class="field"><span class="label">Phone:</span> <span class="value">${req.phone || 'N/A'}</span></div>
            <div class="field"><span class="label">Budget:</span> <span class="value">${req.budget}</span></div>
            <div class="field"><span class="label">Timeline:</span> <span class="value">${req.timeline}</span></div>
            <div class="field"><span class="label">Details:</span><br><span class="value">${req.details.replace(/\n/g, '<br>')}</span></div>
            <div class="field"><span class="label">Submitted:</span> <span class="value">${new Date(req.created_at).toLocaleString()}</span></div>
            <div class="field"><span class="label">Status:</span> <span class="value">${req.status}</span></div>
            ${req.files?.length > 0 ? `
              <div class="field"><span class="label">Files:</span><br>
                <span class="value">${req.files.map((url: string, i: number) => `<a href="${url}" target="_blank">File ${i + 1}</a>`).join(', ')}</span>
              </div>
            ` : ''}
            <hr>
            <p style="text-align:center; color:#6b7280; margin-top:40px;">
              Generated by Vynsera Admin Panel - ${new Date().toLocaleString()}
            </p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6 sm:p-8">
      {/* Return to Homepage Button */}
      <div className="mb-8 flex justify-start">
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all duration-300 text-lg font-medium"
        >
          Return to Homepage
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-indigo-500/30 pb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-full transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-black/40 text-indigo-300 hover:bg-indigo-500/20'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-6 py-3 rounded-full transition-all ${activeTab === 'tickets' ? 'bg-indigo-600 text-white' : 'bg-black/40 text-indigo-300 hover:bg-indigo-500/20'}`}
        >
          Tickets
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 rounded-full transition-all ${activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'bg-black/40 text-indigo-300 hover:bg-indigo-500/20'}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-6 py-3 rounded-full transition-all ${activeTab === 'contacts' ? 'bg-indigo-600 text-white' : 'bg-black/40 text-indigo-300 hover:bg-indigo-500/20'}`}
        >
          Contacts
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-6 py-3 rounded-full transition-all ${activeTab === 'requests' ? 'bg-indigo-600 text-white' : 'bg-black/40 text-indigo-300 hover:bg-indigo-500/20'}`}
        >
          Requests
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`px-6 py-3 rounded-full transition-all ${activeTab === 'clients' ? 'bg-indigo-600 text-white' : 'bg-black/40 text-indigo-300 hover:bg-indigo-500/20'}`}
        >
          Clients
        </button>
      </div>

      {/* Overview Stats */}
      {activeTab === 'overview' && (
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
      )}

      {/* Recent Tickets */}
      {activeTab === 'tickets' && (
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
      )}

      {/* Recent Work Orders - REMOVED TO FIX CRASH */}
      {activeTab === 'orders' && (
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-indigo-200 mb-6">Recent Work Orders</h2>
          <p className="text-indigo-300 text-center py-12">
            Work orders are temporarily disabled while we stabilize the system.
          </p>
        </div>
      )}

      {/* Contact Submissions */}
      {activeTab === 'contacts' && (
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-indigo-200 mb-6">Contact Submissions</h2>
          {contactSubmissions.length === 0 ? (
            <p className="text-indigo-300 text-center py-12">No contact messages yet</p>
          ) : (
            <div className="space-y-6">
              {contactSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className="cursor-pointer bg-black/30 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-200">
                        {submission.name}
                      </h3>
                      <p className="text-sm text-indigo-300 mt-1">
                        {submission.email}
                      </p>
                    </div>
                    <p className="text-sm text-indigo-300">
                      {new Date(submission.created_at).toLocaleString()}
                    </p>
                  </div>

                  <p className="mt-4 text-indigo-200/80 line-clamp-3">
                    {submission.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Service Inquiries/Requests */}
      {activeTab === 'requests' && (
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-indigo-200 mb-6">Service Inquiries/Requests</h2>
          {serviceRequests.length === 0 ? (
            <p className="text-indigo-300 text-center py-12">No service requests yet</p>
          ) : (
            <div className="space-y-6">
              {serviceRequests.map((req) => (
                <div
                  key={req.id}
                  onClick={() => setSelectedServiceRequest(req)}
                  className="cursor-pointer bg-black/30 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-200">
                        {req.service_slug.replace(/-/g, ' ').toUpperCase()}
                      </h3>
                      <p className="text-sm text-indigo-300 mt-1">
                        {req.name} • {req.email}
                      </p>
                    </div>
                    <p className="text-sm text-indigo-300">
                      {new Date(req.created_at).toLocaleString()} • Status: {req.status}
                    </p>
                  </div>

                  <p className="mt-4 text-indigo-200/80">
                    <strong>Details:</strong> {req.details}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-indigo-200 mb-6">Client Management</h2>
          {loadingClients ? (
            <p className="text-indigo-300 text-center py-12">Loading clients...</p>
          ) : clients.length === 0 ? (
            <p className="text-indigo-300 text-center py-12">No clients yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-indigo-500/20">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-500/20">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-black/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                        {client.firstName || 'N/A'} {client.lastName || ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                        {client.emailAddresses?.[0]?.emailAddress || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                        {client.publicMetadata?.role || 'Client'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="text-indigo-400 hover:text-indigo-200"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-indigo-200 mb-6">
              Contact Submission Details
            </h2>

            <div className="space-y-4 text-indigo-300">
              <p><strong>Name:</strong> {selectedSubmission.name}</p>
              <p><strong>Email:</strong> {selectedSubmission.email}</p>
              <p><strong>Submitted:</strong> {new Date(selectedSubmission.created_at).toLocaleString()}</p>
              <p className="mt-4"><strong>Message:</strong></p>
              <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all"
              >
                Back
              </button>

              <button
                onClick={() => handleDeleteContact(selectedSubmission.id)}
                disabled={deletingId === selectedSubmission.id}
                className={`px-6 py-3 rounded-full bg-red-600/70 text-white hover:bg-red-500/70 transition-all ${deletingId === selectedSubmission.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {deletingId === selectedSubmission.id ? 'Deleting...' : 'Delete Submission'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedServiceRequest && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-indigo-200 mb-6">
              Service Request #{selectedServiceRequest.id}
            </h2>

            <div className="space-y-4 text-indigo-300">
              <p><strong>Service:</strong> {selectedServiceRequest.service_slug.replace(/-/g, ' ').toUpperCase()}</p>
              <p><strong>Name:</strong> {selectedServiceRequest.name}</p>
              <p><strong>Email:</strong> {selectedServiceRequest.email}</p>
              <p><strong>Phone:</strong> {selectedServiceRequest.phone || 'N/A'}</p>
              <p><strong>Budget:</strong> {selectedServiceRequest.budget}</p>
              <p><strong>Timeline:</strong> {selectedServiceRequest.timeline}</p>
              <p><strong>Details:</strong></p>
              <p className="whitespace-pre-wrap">{selectedServiceRequest.details}</p>
              <p><strong>Submitted:</strong> {new Date(selectedServiceRequest.created_at).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedServiceRequest.status}</p>

              {selectedServiceRequest.files?.length > 0 && (
                <div>
                  <p><strong>Files:</strong></p>
                  <ul className="list-disc list-inside">
                    {selectedServiceRequest.files.map((url: string, i: number) => (
                      <li key={i}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-200 underline">
                          File {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-end">
              <button
                onClick={() => setSelectedServiceRequest(null)}
                className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all"
              >
                Close
              </button>

              <button
                onClick={() => handleDownloadPDF(selectedServiceRequest)}
                className="px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
              >
                Download as PDF
              </button>

              <select
                value={selectedServiceRequest.status}
                onChange={(e) => handleUpdateServiceRequest(selectedServiceRequest.id, e.target.value)}
                disabled={updatingRequestId === selectedServiceRequest.id}
                className="bg-black/50 border border-indigo-500/50 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-400 min-w-[160px]"
              >
                <option value="New">New</option>
                <option value="Client Contacted">Client Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Declined">Declined</option>
              </select>

              <button
                onClick={() => handleDeleteServiceRequest(selectedServiceRequest.id)}
                disabled={updatingRequestId === selectedServiceRequest.id}
                className={`px-6 py-3 rounded-full bg-red-700 text-white hover:bg-red-600 transition-all ${updatingRequestId === selectedServiceRequest.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Delete Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-indigo-200 mb-6">
              Client Details
            </h2>

            <div className="space-y-4 text-indigo-300">
              <p><strong>ID:</strong> {selectedClient.id}</p>
              <p><strong>Full Name:</strong> {selectedClient.firstName || 'N/A'} {selectedClient.lastName || ''}</p>
              <p><strong>Email:</strong> {selectedClient.emailAddresses?.[0]?.emailAddress || 'N/A'}</p>
              <p><strong>Phone:</strong> {selectedClient.phoneNumbers?.[0]?.phoneNumber || 'N/A'}</p>
              <p><strong>Role:</strong> {selectedClient.publicMetadata?.role || 'Client'}</p>
              <p><strong>Joined:</strong> {new Date(selectedClient.createdAt).toLocaleString()}</p>
              <p><strong>Last Active:</strong> {new Date(selectedClient.lastSignInAt).toLocaleString()}</p>
              <p><strong>Public Metadata:</strong> <pre className="bg-black/50 p-2 rounded">{JSON.stringify(selectedClient.publicMetadata, null, 2)}</pre></p>
              <p><strong>Private Metadata:</strong> <pre className="bg-black/50 p-2 rounded">{JSON.stringify(selectedClient.privateMetadata, null, 2)}</pre></p>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Helper function for PDF download
const handleDownloadPDF = (req: any) => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Service Request #${req.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { color: #4f46e5; text-align: center; }
            .field { margin-bottom: 16px; }
            .label { font-weight: bold; color: #6366f1; }
            .value { margin-left: 8px; }
            hr { border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>Service Request #${req.id}</h1>
          <hr>
          <div class="field"><span class="label">Service:</span> <span class="value">${req.service_slug.replace(/-/g, ' ').toUpperCase()}</span></div>
          <div class="field"><span class="label">Name:</span> <span class="value">${req.name}</span></div>
          <div class="field"><span class="label">Email:</span> <span class="value">${req.email}</span></div>
          <div class="field"><span class="label">Phone:</span> <span class="value">${req.phone || 'N/A'}</span></div>
          <div class="field"><span class="label">Budget:</span> <span class="value">${req.budget}</span></div>
          <div class="field"><span class="label">Timeline:</span> <span class="value">${req.timeline}</span></div>
          <div class="field"><span class="label">Details:</span><br><span class="value">${req.details.replace(/\n/g, '<br>')}</span></div>
          <div class="field"><span class="label">Submitted:</span> <span class="value">${new Date(req.created_at).toLocaleString()}</span></div>
          <div class="field"><span class="label">Status:</span> <span class="value">${req.status}</span></div>
          ${req.files?.length > 0 ? `
            <div class="field"><span class="label">Files:</span><br>
              <span class="value">${req.files.map((url: string, i: number) => `<a href="${url}" target="_blank">File ${i + 1}</a>`).join(', ')}</span>
            </div>
          ` : ''}
          <hr>
          <p style="text-align:center; color:#6b7280; margin-top:40px;">
            Generated by Vynsera Admin Panel - ${new Date().toLocaleString()}
          </p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
  }
};