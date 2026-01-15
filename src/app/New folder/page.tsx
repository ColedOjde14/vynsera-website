// src/app/portal/page.tsx
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function PortalDashboard() {
  const { userId } = auth();

  // If no user ID (not logged in), redirect to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  // Optional: Fetch full user data if needed (e.g., name)
  // const user = await currentUser(); // If you need more details later

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              Welcome to Your Portal!
            </h1>
            <p className="mt-3 text-indigo-300 text-lg">
              Your secure Vynsera client area
            </p>
          </div>

          {/* User profile/logout button */}
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Dashboard Content */}
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">
            Dashboard Overview
          </h2>
          <p className="text-indigo-200/80 text-lg mb-6">
            Hello! This is your client dashboard. Here you'll be able to:
          </p>
          <ul className="list-disc list-inside text-indigo-200/80 space-y-2 text-lg">
            <li>View active services and hosting plans</li>
            <li>Check invoices and billing history</li>
            <li>Manage work orders and support requests</li>
            <li>Update account information</li>
          </ul>
          <p className="mt-8 text-indigo-300 italic">
            More features coming soon – stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}