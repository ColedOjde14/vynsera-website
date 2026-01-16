// src/app/portal/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PortalHeader from "@/components/PortalHeader";
import ClientPortalContent from "@/components/ClientPortalContent";

export default async function PortalDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0] || "Client";
  const userId = user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      <PortalHeader title={`Welcome, ${displayName}!`} subtitle="Your Vynsera Client Portal" />
      <ClientPortalContent displayName={displayName} userId={userId} />
    </div>
  );
}