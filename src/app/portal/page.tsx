// src/app/portal/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function PortalDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0] || "Client";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Sidebar - Desktop only */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-black/40 backdrop-blur-xl border-r border-indigo-500/20 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-12">
            <img src="/logo.png" alt="Vynsera" className="h-12 w-auto" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Portal
            </span>
          </div>

          <nav className="space-y-2">
            {[
              { label: "Dashboard", href: "/portal", active: true },
              { label: "Services", href: "/portal/services" },
              { label: "Billing & Invoices", href: "/portal/billing" },
              { label: "Work Orders", href: "/portal/orders" },
              { label: "Support Tickets", href: "/portal/support" },
              { label: "Account Settings", href: "/portal/settings" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                  item.active
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40"
                    : "hover:bg-indigo-900/20 text-indigo-200/80 hover:text-indigo-300"
                }`}
              >
                <span className="text-xl">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-indigo-500/20 z-50">
          <div className="flex justify-around items-center py-4 px-2">
            {[
              { label: "Dashboard", href: "/portal" },
              { label: "Services", href: "/portal/services" },
              { label: "Billing", href: "/portal/billing" },
              { label: "Orders", href: "/portal/orders" },
              { label: "Support", href: "/portal/support" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1 text-xs text-indigo-300 hover:text-indigo-100 transition-colors"
              >
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Header */}
        <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Welcome, {displayName}
              </h1>
              <p className="mt-2 text-indigo-300 text-lg">
                Your Vynsera Client Portal • Powered by Innovation
              </p>
            </div>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-12 w-12 border-2 border-indigo-500/50",
                  userButtonPopoverCard: "bg-black/90 backdrop-blur-md border border-indigo-500/30",
                  userButtonPopoverActionButton: "text-indigo-300 hover:text-indigo-200",
                },
              }}
            />
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
              { title: "Uptime This Month", value: "100%", color: "green" },
            ].map((stat, i) => (
              <div
                key={stat.title}
                className="bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
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

          {/* Quick Actions - Consistent white border on hover + glow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Submit Support Ticket", color: "indigo", href: "/portal/support" },
              { title: "View All Work Orders", color: "purple", href: "/portal/orders" },
              { title: "Update Billing Info", color: "pink", href: "/portal/billing" },
            ].map((action) => (
              <a
                key={action.title}
                href={action.href}
                className={`bg-gradient-to-r from-${action.color}-900/40 to-${action.color}-900/30 border border-white/20 rounded-2xl p-8 text-left hover:border-white/80 hover:shadow-2xl hover:shadow-white/30 transition-all duration-500 transform hover:scale-105`}
              >
                <h3 className="text-xl font-semibold text-indigo-200 mb-3">
                  {action.title}
                </h3>
                <p className="text-indigo-300">
                  Get help or manage your account in one click.
                </p>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}