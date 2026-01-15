// src/app/portal/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ClientPortalContent from "@/components/ClientPortalContent";

export default async function PortalDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0] || "Client";
  const userId = user.id;

  return <ClientPortalContent displayName={displayName} userId={userId} />;
}