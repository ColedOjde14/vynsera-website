// src/app/terms/page.tsx
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Terms of Service
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
            These Terms of Service ("Terms") govern your access to and use of the website https://vynseracorp.com (the "Site") and all related services provided by Vynsera Corporation ("Vynsera", "we", "us", or "our"), including but not limited to SaaS solutions, website development, branding/design, digital marketing, hosting, client portal, support services, and any other offerings (collectively, the "Services").
          </p>

          <p className="text-indigo-300 leading-relaxed mb-12">
            By accessing, browsing, or using the Site or Services, you agree to be bound by these Terms. If you do not agree, you may not use the Site or Services.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">1. Eligibility</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Services. By using the Services, you represent that you meet this requirement and have the legal capacity to enter into these Terms.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">2. Accounts & Security</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>You may need to create an account to access certain features (e.g., client portal).</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You agree to notify us immediately of any unauthorized access or use of your account.</li>
            <li>We reserve the right to suspend or terminate accounts for violation of these Terms or suspected fraudulent activity.</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">3. Services & Payment</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We provide Services as described on the Site or in separate written agreements.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>All fees are quoted in USD and are non-refundable except as expressly stated in a project agreement.</li>
            <li>Payment is processed through third-party providers (e.g., Stripe). We do not store full payment card information.</li>
            <li>Additional fees may apply for revisions beyond agreed scope, expedited delivery, or extra services.</li>
            <li>Late payments may incur interest at 1.5% per month or the maximum allowed by law.</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">4. Intellectual Property</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>
              <strong>Your Content:</strong> You retain ownership of any materials you provide to us (e.g., logos, text, images). You grant us a limited, worldwide, royalty-free license to use, reproduce, modify, and display your content solely for providing the Services.
            </li>
            <li>
              <strong>Our Work:</strong> Upon full payment, we grant you a perpetual, non-exclusive, worldwide license to use the final deliverables for your business purposes. We retain ownership of pre-existing tools, code templates, frameworks, and methodologies.
            </li>
            <li>We may display anonymized or generalized examples of our work in our portfolio unless you expressly request otherwise in writing.</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">5. Confidentiality</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We treat your business information, project details, and materials as confidential and will not disclose them to third parties without your written consent, except as required by law or to our subprocessors under strict confidentiality obligations.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">6. Limitation of Liability</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            To the maximum extent permitted by law, Vynsera and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or business interruption, arising from or related to the Services, even if advised of the possibility of such damages.
          </p>
          <p className="text-indigo-300 leading-relaxed">
            Our total liability shall not exceed the amount you paid us for the specific Service giving rise to the claim in the 12 months preceding the claim.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">7. Indemnification</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            You agree to indemnify and hold harmless Vynsera from any claims, losses, liabilities, damages, costs, and expenses (including reasonable attorneys' fees) arising from:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Your breach of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Your content or materials infringing intellectual property or other rights</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">8. Termination</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We may suspend or terminate your access to the Services at any time for violation of these Terms, non-payment, or suspected illegal activity.
          </p>
          <p className="text-indigo-300 leading-relaxed">
            You may terminate your account at any time by contacting support@vynseracorp.com.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">9. Governing Law & Dispute Resolution</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            These Terms are governed by the laws of the State of New York, without regard to conflict of law principles.
          </p>
          <p className="text-indigo-300 leading-relaxed">
            Any disputes arising from these Terms or the Services shall be resolved exclusively in the state or federal courts located in Albany County, New York. You consent to the personal jurisdiction of such courts.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">10. Changes to Terms</h2>
          <p className="text-indigo-300 leading-relaxed">
            We may update these Terms from time to time. We will post the revised Terms on this page and update the "Last updated" date. Continued use of the Services after changes constitutes acceptance.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">11. Contact Us</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            If you have questions about these Terms, please contact:
          </p>
          <p className="text-indigo-300">
            Vynsera Corporation<br />
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