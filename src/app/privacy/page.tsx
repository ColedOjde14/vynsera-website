// src/app/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="mt-2 text-indigo-300 text-lg">
              Last updated: January 18, 2026
            </p>
          </div>

          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 sm:p-8 pb-24">
        <div className="prose prose-invert prose-indigo max-w-none">
          <p className="text-indigo-300 leading-relaxed mb-12">
            Vynsera Corporation ("we", "us", "our") operates the website{" "}
            <strong>https://vynseracorp.com</strong> (the "Site") and provides related services including but not limited to SaaS solutions, website development, branding/design services, digital marketing, hosting, and client portal access (collectively, the "Services").
          </p>

          <p className="text-indigo-300 leading-relaxed mb-12">
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our Services, or interact with us in any way.
          </p>

          <p className="text-indigo-300 leading-relaxed mb-12">
            By accessing or using the Site or Services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our Site or Services.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">1. Information We Collect</h2>

          <h3 className="text-2xl font-semibold text-indigo-300 mt-10 mb-4">A. Information you provide directly</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Name, email address, phone number, business name, and other contact information</li>
            <li>Billing and payment information (handled exclusively by third-party processors – we do not store full card details)</li>
            <li>Project brief, requirements, files, assets, logos, content, or any materials you upload or send us</li>
            <li>Username, password (hashed), and other account registration information</li>
            <li>Messages, support tickets, chat history, and communications sent through our client portal or support channels</li>
          </ul>

          <h3 className="text-2xl font-semibold text-indigo-300 mt-10 mb-4">B. Information collected automatically</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>IP address and approximate geographic location</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device type</li>
            <li>Pages viewed, time spent, referring/exit pages</li>
            <li>Clickstream data and interaction with the Site/Services</li>
            <li>Cookies, web beacons, and similar tracking technologies (see Cookie section below)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-indigo-300 mt-10 mb-4">C. Information from third parties</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Authentication data from Clerk (identity provider)</li>
            <li>Payment confirmation data from Stripe (never full card details)</li>
            <li>Analytics data from Vercel, Google Analytics, or similar services (anonymized)</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">2. How We Use Your Information</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>To provide, maintain, and improve the Site and Services</li>
            <li>To process and fulfill service requests, projects, and client engagements</li>
            <li>To communicate with you (project updates, support tickets, invoices, important notices)</li>
            <li>To authenticate and secure your client portal account</li>
            <li>To process payments (via Stripe – we never store card data)</li>
            <li>To detect, prevent, and address technical issues, fraud, or abuse</li>
            <li>To comply with legal obligations</li>
            <li>For internal business purposes (analytics, service improvement, research)</li>
          </ul>
          <p className="text-indigo-300 leading-relaxed">
            We <strong>do not</strong> sell your personal information to third parties.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">3. Sharing of Information</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>
              <strong>Service providers</strong> — Stripe (payments), Clerk (authentication), Vercel (hosting), Neon (database), Vercel Blob (file storage), email delivery providers
            </li>
            <li>
              <strong>Legal authorities</strong> — when required by law, subpoena, court order, or to protect rights/safety
            </li>
            <li>
              <strong>Business transfers</strong> — in connection with merger, acquisition, or sale of assets
            </li>
          </ul>
          <p className="text-indigo-300 leading-relaxed">
            All third-party service providers are contractually required to protect your data and use it only for the purposes we instruct.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">4. Data Retention</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We retain personal information only as long as necessary for the purposes outlined in this policy or as required by law:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Active client/project data: retained for the duration of the relationship + 7 years (accounting/tax purposes)</li>
            <li>Support tickets/chat: retained for 2–5 years (depending on nature)</li>
            <li>Marketing inquiries: retained until unsubscribe or deletion request</li>
            <li>Logs/analytics (anonymized): up to 26 months</li>
          </ul>
          <p className="text-indigo-300 leading-relaxed">
            You may request deletion of your personal data at any time (subject to legal retention obligations).
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">5. Your Rights</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Access, correction, deletion</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Object to processing</li>
            <li>Withdraw consent (where processing is based on consent)</li>
          </ul>
          <p className="text-indigo-300 leading-relaxed">
            To exercise these rights, contact us at <strong>support@vynseracorp.com</strong>.
          </p>
          <p className="text-indigo-300 leading-relaxed">
            We respond to all legitimate requests within one month (extendable under complex cases).
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">6. Security</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We implement reasonable technical and organizational measures to protect your information:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Encryption in transit (TLS 1.3)</li>
            <li>Encrypted-at-rest storage (Neon, Vercel Blob)</li>
            <li>Access controls and role-based permissions</li>
            <li>Regular security assessments</li>
            <li>Secure authentication (Clerk with MFA options)</li>
          </ul>
          <p className="text-indigo-300 leading-relaxed">
            However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">7. Cookies & Tracking Technologies</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We use cookies and similar technologies for:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Essential functionality (session management, authentication)</li>
            <li>Analytics & performance (Google Analytics – anonymized)</li>
            <li>Marketing (limited retargeting pixels)</li>
          </ul>
          <p className="text-indigo-300 leading-relaxed">
            You can manage cookies through your browser settings. Blocking essential cookies may affect Site functionality.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">8. Children's Privacy</h2>
          <p className="text-indigo-300 leading-relaxed">
            Our Services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If you believe we have collected such information, please contact us immediately.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">9. Changes to This Privacy Policy</h2>
          <p className="text-indigo-300 leading-relaxed">
            We may update this policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
          <p className="text-indigo-300 leading-relaxed">
            Continued use of the Site/Services after changes constitutes acceptance.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">10. Contact Us</h2>
          <p className="text-indigo-300 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact:
          </p>
          <p className="text-indigo-300 mt-6">
            <strong>Vynsera Corporation</strong><br />
            418 Broadway STE N<br />
            Albany, NY 12207<br />
            Email: <a href="mailto:support@vynseracorp.com" className="text-indigo-400 hover:text-indigo-200 transition-colors">support@vynseracorp.com</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/70 border-t border-indigo-500/10 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-indigo-400 text-sm">
          © {new Date().getFullYear()} Vynsera Corporation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}