// src/app/portal/services/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';

export default async function ClientServices() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const clientId = user.id;

  const sql = neon(process.env.DATABASE_URL!);

  const assignedServices = await sql`
    SELECT 
      cs.id,
      cs.status,
      cs.start_date,
      cs.expiration_date,
      cs.notes,
      cs.is_custom,
      cs.custom_name,
      cs.custom_description,
      s.name AS predefined_name,
      s.description AS predefined_description
    FROM client_services cs
    LEFT JOIN services s ON cs.service_id = s.id
    WHERE cs.client_id = ${clientId}
    ORDER BY cs.assigned_at DESC
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
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
                className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition-all hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <h3 className="text-2xl font-bold text-indigo-200 mb-4">
                  {service.is_custom ? service.custom_name : service.predefined_name}
                </h3>

                <p className="text-indigo-300 mb-6">
                  {service.is_custom ? service.custom_description : service.predefined_description}
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
                    <p>Notes: {service.notes}</p>
                  )}
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
    </div>
  );
}