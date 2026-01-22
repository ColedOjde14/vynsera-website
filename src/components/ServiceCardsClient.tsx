// src/components/ServiceCardsClient.tsx
'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

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

interface ServiceCardsClientProps {
  services: Service[];
}

export default function ServiceCardsClient({ services }: ServiceCardsClientProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
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
                        {/* Fixed: safe access + fallback */}
                        {selectedService?.status 
                          ? selectedService.status.charAt(0).toUpperCase() + selectedService.status.slice(1)
                          : 'Unknown'}
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
    </>
  );
}