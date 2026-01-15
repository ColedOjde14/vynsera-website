// src/app/portal/page.tsx
import { currentUser, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function PortalDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              Welcome, {user.firstName || "Client"}!
            </h1>
            <p className="mt-3 text-indigo-300 text-lg">
              Your Vynsera Client Portal
            </p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <p className="text-xl text-indigo-200 mb-6">
            Hello! This is your secure dashboard. Billing, services, and work orders coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}