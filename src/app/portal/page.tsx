// src/app/portal/page.tsx
import { currentUser, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function PortalDashboard() {
  const user = await currentUser();

  // If no user (not logged in), redirect to sign-in
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with User Menu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              Welcome, {user.firstName || user.emailAddresses[0].emailAddress.split('@')[0]}!
            </h1>
            <p className="mt-3 text-indigo-300 text-lg">
              Your Vynsera Client Portal
            </p>
          </div>

          {/* User profile/logout button */}
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Dashboard Content Card */}
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">
            Dashboard Overview
          </h2>
          <p className="text-indigo-200/80 text-lg mb-6">
            Hello! This is your secure client area. Here you'll be able to view:
          </p>
          <ul className="list-disc list-inside text-indigo-200/80 space-y-2 text-lg">
            <li>Active services and hosting plans</li>
            <li>Recent invoices and billing history</li>
            <li>Work orders and support tickets</li>
            <li>Account settings and updates</li>
          </ul>
          <p className="mt-8 text-indigo-300 italic">
            More features coming soon – stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}