// src/components/ClientTicketDetail.tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface TicketDetailProps {
  ticket: any;
  messages: any[];
  userId: string;
  isAdminOrSupport: boolean;
}

export default function ClientTicketDetail({ ticket, messages, userId, isAdminOrSupport }: TicketDetailProps) {
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('ticketId', ticket.id.toString());
    formData.append('message', newMessage);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await fetch('/api/ticket-messages', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Reply sent!');
        setNewMessage('');
        setAttachment(null);
        window.location.reload(); // Refresh to show new message
      } else {
        toast.error(data.error || 'Failed to send reply.');
      }
    } catch (error) {
      toast.error('Network error. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6 sm:p-8">
      {/* Messages/Chat History */}
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
              className={`flex flex-col ${msg.user_id === userId ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-6 ${
                msg.user_id === userId
                  ? "bg-indigo-600/30 border border-indigo-500/50"
                  : isAdminOrSupport
                    ? "bg-purple-600/30 border border-purple-500/50"
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
                  {new Date(msg.created_at).toLocaleString()} • {msg.user_id === userId ? 'You' : (isAdminOrSupport ? 'Client' : 'Support')}
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
        <form onSubmit={handleSendReply} className="space-y-6">
          <div>
            <label className="block text-indigo-300 text-sm mb-2">Message</label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white file:bg-indigo-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}