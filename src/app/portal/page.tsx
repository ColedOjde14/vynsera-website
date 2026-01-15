// src/app/portal/page.tsx
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function PortalDashboard() {
  const { userId } = await auth();  // ← This 'await' fixes the Promise type error

  // If not logged in, redirect to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

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
        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-200 mb-6">
            Dashboard Overview
          </h2>
          <p className="text-indigo-200/80 text-base sm:text-lg mb-6">
            Hello! This is your client dashboard. Here you can:
          </p>
          <ul className="list-disc list-inside text-indigo-200/80 space-y-3 text-base sm:text-lg">
            <li>View active services and hosting plans</li>
            <li>Check recent invoices and billing history</li>
            <li>Manage work orders and support tickets</li>
            <li>Update your account details</li>
          </ul>
          <p className="mt-8 text-indigo-300 italic text-base sm:text-lg">
            More features coming soon – stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}