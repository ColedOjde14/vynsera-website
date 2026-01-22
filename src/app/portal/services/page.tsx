// src/app/portal/services/page.tsx
'use client'; // Keep this — it's safe now that we fixed the type mismatch

import { useState, Fragment } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';

// Define the shape of each service (matches your SQL SELECT exactly)
interface Service {
  id: number;
  status: string;
  start_date: string | null;
  expiration_date: string | null;
  notes: string | null;
  is_custom: boolean;
  custom_name: string | null;
  custom_description: string | null;
  predefined_name: string | null;
}

export default async function ClientServices() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const clientId = user.id;

  const sql = neon(process.env.DATABASE_URL!);

  const assignedServicesRaw = await sql`
    SELECT 
      cs.id,
      cs.status,
      cs.start_date,
      cs.expiration_date,
      cs.notes,
      cs.is_custom,
      cs.custom_name,
      cs.custom_description,
      s.name AS predefined_name
    FROM client_services cs
    LEFT JOIN services s ON cs.service_id = s.id
    WHERE cs.client_id = ${clientId}
    ORDER BY cs.assigned_at DESC
  `;

  // Type assertion — safe because SQL columns match the Service interface
  const assignedServices = assignedServicesRaw as Service[];

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/portal"
            className="inline-flex items-center px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all text-lg font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          My Services
        </h1>

        {assignedServices.length === 0 ? (
          <div className="text-center py-20 bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-indigo-300 mb-6">
              No Services Assigned Yet
            </h2>
            <p className="text-xl text-indigo-400 mb-8">
              You don't have any active services at the moment.
            </p>
            <Link
              href="/request-custom-quote"
              className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium"
            >
              Request a Service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignedServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-indigo-200 mb-4 group-hover:text-indigo-100 transition-colors">
                  {service.is_custom ? service.custom_name : service.predefined_name}
                </h3>

                <p className="text-indigo-300 mb-6 line-clamp-3">
                  {service.is_custom ? service.custom_description : ''}
                </p>

                <div className="space-y-3 text-sm text-indigo-400">
                  <p className="font-medium">
                    Status: <span className={`${
                      service.status === 'active' ? 'text-green-400' :
                      service.status === 'completed' ? 'text-blue-400' :
                      service.status === 'cancelled' ? 'text-red-400' :
                      service.status === 'inactive' ? 'text-gray-400' :
                      'text-yellow-400'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </p>
                  <p>Start: {service.start_date ? new Date(service.start_date).toLocaleDateString() : 'Not set'}</p>
                  <p>Expires: {service.expiration_date ? new Date(service.expiration_date).toLocaleDateString() : 'Ongoing'}</p>
                  {service.notes && (
                    <p className="line-clamp-2">Notes: {service.notes}</p>
                  )}
                </div>

                <div className="mt-6 text-center text-indigo-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view full details →
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/request-custom-quote"
            className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium"
          >
            Request New Service
          </Link>
        </div>
      </div>

      {/* Details Modal */}
      <Transition show={!!selectedService} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedService(null)}>
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

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-black/90 backdrop-blur-xl border border-indigo-500/40 p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
                <Dialog.Title className="text-3xl font-bold text-indigo-200 mb-8">
                  {selectedService?.is_custom ? selectedService.custom_name : selectedService?.predefined_name}
                </Dialog.Title>

                <div className="space-y-6 text-indigo-300">
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-100 mb-2">Description</h4>
                    <p className="whitespace-pre-wrap">
                      {selectedService?.is_custom ? selectedService.custom_description : 'No description provided for this service.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-indigo-200">Status</h4>
                      <p className={`mt-1 font-semibold ${
                        selectedService?.status === 'active' ? 'text-green-400' :
                        selectedService?.status === 'completed' ? 'text-blue-400' :
                        selectedService?.status === 'cancelled' ? 'text-red-400' :
                        selectedService?.status === 'inactive' ? 'text-gray-400' :
                        'text-yellow-400'
                      }`}>
                        {selectedService?.status.charAt(0).toUpperCase() + selectedService?.status.slice(1)}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-indigo-200">Start Date</h4>
                      <p className="mt-1">
                        {selectedService?.start_date ? new Date(selectedService.start_date).toLocaleDateString() : 'Not set'}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-indigo-200">Expiration Date</h4>
                      <p className="mt-1">
                        {selectedService?.expiration_date ? new Date(selectedService.expiration_date).toLocaleDateString() : 'Ongoing / No expiration'}
                      </p>
                    </div>

                    {selectedService?.notes && (
                      <div className="col-span-2">
                        <h4 className="font-medium text-indigo-200">Admin Notes</h4>
                        <p className="mt-1 whitespace-pre-wrap">{selectedService.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-8 py-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-lg font-medium"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}