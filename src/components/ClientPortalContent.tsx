'use client';

import { useState, Fragment } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';

interface ClientPortalProps {
  displayName: string;
  userId: string;
  activeServicesCount: number;
  openWorkOrdersCount: number;
}

const gradientMap: Record<string, string> = {
  indigo: 'from-indigo-400 to-indigo-600',
  purple: 'from-purple-400 to-purple-600',
  pink: 'from-pink-400 to-pink-600',
  green: 'from-green-400 to-green-600',
};

export default function ClientPortalContent({
  displayName,
  userId,
  activeServicesCount,
  openWorkOrdersCount,
}: ClientPortalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('description', description);
    if (attachment) formData.append('attachment', attachment);

    try {
      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Ticket submitted!');
        setIsModalOpen(false);
        setSubject('');
        setDescription('');
        setAttachment(null);
      } else {
        toast.error(data.error || 'Failed to submit ticket.');
      }
    } catch (err) {
      toast.error('Network error. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6 sm:p-8 pb-24 lg:pb-8">
      {/* Return to Homepage */}
      <div className="mb-8">
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all text-lg font-medium"
        >
          Return to Homepage
        </Link>
      </div>

      {/* Quick Stats - Now using real counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'Active Services', value: activeServicesCount.toString(), color: 'green' },
          { title: 'Open Work Orders', value: openWorkOrdersCount.toString(), color: 'purple' },
          { title: 'Pending Invoices', value: '$0.00', color: 'pink' },
          {
            title: 'My Tickets',
            value: 'View',
            color: 'indigo',
            link: '/portal/support',
          },
        ].map((stat) => {
          const card = (
            <div
              className="bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 transition-all hover:shadow-xl hover:shadow-indigo-500/10 hover:scale-105"
            >
              <p className="text-indigo-300 text-sm uppercase tracking-wider mb-2">
                {stat.title}
              </p>
              <p
                className={`text-4xl font-bold bg-gradient-to-r ${
                  gradientMap[stat.color]
                } bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
            </div>
          );

          return stat.link ? (
            <Link key={stat.title} href={stat.link}>
              {card}
            </Link>
          ) : (
            <div key={stat.title}>{card}</div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-indigo-900/40 to-indigo-900/30 border border-white/20 rounded-2xl p-8 text-left hover:border-white/80 hover:shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-indigo-200 mb-3">
            Submit Support Ticket
          </h3>
          <p className="text-indigo-300">
            Get help or manage your account in one click.
          </p>
        </button>

        {/* Updated: "View All Work Orders" → "My Services" */}
        <Link
          href="/portal/services"
          className="bg-gradient-to-r from-purple-900/40 to-purple-900/30 border border-white/20 rounded-2xl p-8 text-left hover:border-white/80 hover:shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-indigo-200 mb-3">
            My Services
          </h3>
          <p className="text-indigo-300">
            View and manage your assigned services.
          </p>
        </Link>

        <Link
          href="/portal/billing"
          className="bg-gradient-to-r from-pink-900/40 to-pink-900/30 border border-white/20 rounded-2xl p-8 text-left hover:border-white/80 hover:shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-indigo-200 mb-3">
            Update Billing Info
          </h3>
          <p className="text-indigo-300">
            Manage payment methods and invoices.
          </p>
        </Link>
      </div>

      {/* Support Ticket Modal (unchanged) */}
      <Transition show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-black/80 backdrop-blur-xl border border-indigo-500/30 p-8 shadow-2xl">
              <Dialog.Title className="text-2xl font-bold text-indigo-200 mb-6">
                Submit Support Ticket
              </Dialog.Title>

              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  required
                  className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white"
                />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={5}
                  required
                  className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white"
                />

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setAttachment(e.target.files?.[0] || null)
                  }
                  className="w-full text-white"
                />

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Ticket'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}