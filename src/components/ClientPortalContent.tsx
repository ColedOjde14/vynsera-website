// src/components/ClientPortalContent.tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

interface ClientPortalProps {
  displayName: string;
  userId: string;
}

export default function ClientPortalContent({ displayName, userId }: ClientPortalProps) {
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
    if (attachment) {
      formData.append('attachment', attachment);
    }

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
    } catch (error) {
      toast.error('Network error. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Header with Return to Homepage */}
      <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Welcome, {displayName}!
            </h1>
            <p className="mt-2 text-indigo-300 text-lg">
              Your Vynsera Client Portal
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all duration-300 text-lg font-medium"
            >
              Return to Homepage
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto p-6 sm:p-8 pb-24 lg:pb-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Active Services", value: "0", color: "indigo" },
            { title: "Open Work Orders", value: "0", color: "purple" },
            { title: "Pending Invoices", value: "$0.00", color: "pink" },
            { title: "My Tickets", value: "View", color: "green", link: "/portal/support" },
          ].map((stat, i) => (
            <div
              key={stat.title}
              className={`bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 ${stat.link ? 'cursor-pointer hover:scale-105' : ''}`}
              onClick={stat.link ? () => window.location.href = stat.link : undefined}
            >
              <p className="text-indigo-300 text-sm uppercase tracking-wider mb-2">
                {stat.title}
              </p>
              <p className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
            <h3 className="text-2xl font-semibold text-indigo-200 mb-6">Active Services</h3>
            <p className="text-indigo-200/80 text-center py-12">
              No active services yet. Explore our offerings to get started.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all">
            <h3 className="text-2xl font-semibold text-indigo-200 mb-6">Recent Invoices</h3>
            <p className="text-indigo-200/80 text-center py-12">
              No invoices yet. Your first service will appear here.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-indigo-900/40 to-indigo-900/30 border border-white/20 rounded-2xl p-8 text-left hover:border-white/80 hover:shadow-2xl hover:shadow-white/30 transition-all duration-500 transform hover:scale-105 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-indigo-200 mb-3">
              Submit Support Ticket
            </h3>
            <p className="text-indigo-300">
              Get help or manage your account in one click.
            </p>
          </button>

          <a
            href="/portal/orders"
            className="bg-gradient-to-r from-purple-900/40 to-purple-900/30 border border-white/20 rounded-2xl p-8 text-left hover:border-white/80 hover:shadow-2xl hover:shadow-white/30 transition-all duration-500 transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-indigo-200 mb-3">
              View All Work Orders
            </h3>
            <p className="text-indigo-300">
              Get help or manage your account in one click.
            </p>
          </a>

          <a
            href="/portal/billing"
            className="bg-gradient-to-r from-pink-900/40 to-pink-900/30 border border-white/20 rounded-2xl p-8 text-left hover:border-white/80 hover:shadow-2xl hover:shadow-white/30 transition-all duration-500 transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-indigo-200 mb-3">
              Update Billing Info
            </h3>
            <p className="text-indigo-300">
              Get help or manage your account in one click.
            </p>
          </a>
        </div>

        {/* Support Ticket Modal */}
        <Transition show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-black/80 backdrop-blur-xl border border-indigo-500/30 p-8 text-left align-middle shadow-2xl transition-all">
                    <Dialog.Title as="h3" className="text-2xl font-bold text-indigo-200 mb-6">
                      Submit Support Ticket
                    </Dialog.Title>

                    <form onSubmit={handleSubmitTicket} className="space-y-6">
                      <div>
                        <label className="block text-indigo-300 text-sm mb-2">Subject</label>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
                          placeholder="Brief description of the issue"
                        />
                      </div>

                      <div>
                        <label className="block text-indigo-300 text-sm mb-2">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          rows={5}
                          className="w-full bg-black/50 border border-indigo-500/50 rounded-lg p-4 text-white placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
                          placeholder="Provide details about your issue..."
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

                      <div className="flex justify-end gap-4 mt-8">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className={`px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {loading ? 'Submitting...' : 'Submit Ticket'}
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </div>
  );
}