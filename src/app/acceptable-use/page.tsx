// src/app/acceptable-use/page.tsx
import Link from "next/link";

export default function AcceptableUsePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-indigo-500/20 p-6 sm:p-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Acceptable Use Policy
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
            This Acceptable Use Policy ("AUP") outlines the rules and guidelines for using Vynsera Corporation's ("Vynsera", "we", "us", or "our") website https://vynseracorp.com (the "Site") and all related services, including but not limited to SaaS solutions, website development, branding/design, digital marketing, hosting, client portal, support services, and any other offerings (collectively, the "Services").
          </p>

          <p className="text-indigo-300 leading-relaxed mb-12">
            By accessing or using the Site or Services, you agree to comply with this AUP. Violation of this policy may result in suspension or termination of your access, without refund, and we may report illegal activity to law enforcement.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">1. Prohibited Conduct</h2>

          <p className="text-indigo-300 leading-relaxed mb-6">
            You may not use the Site or Services for any purpose that is unlawful, harmful, abusive, or otherwise objectionable. Prohibited activities include, but are not limited to:
          </p>

          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Transmitting, uploading, or sharing content that is illegal, defamatory, obscene, pornographic, harassing, threatening, invasive of privacy, or violates intellectual property rights</li>
            <li>Engaging in fraud, phishing, spam, or any form of unsolicited commercial communication</li>
            <li>Distributing malware, viruses, worms, trojans, ransomware, or any harmful code</li>
            <li>Attempting unauthorized access, hacking, denial-of-service attacks, or probing/scanning our systems</li>
            <li>Impersonating any person or entity, or misrepresenting your affiliation</li>
            <li>Scraping, crawling, or systematically extracting data from the Site without permission</li>
            <li>Interfering with the operation of the Site or Services, or the experience of other users</li>
            <li>Using the Services to store, transmit, or process illegal content or for illegal purposes</li>
            <li>Violating any applicable local, state, national, or international law or regulation</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">2. User Content & Responsibility</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            You are solely responsible for any content you upload, post, or transmit through the Services ("User Content"). By submitting User Content, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>You own or have the necessary rights to use and share the content</li>
            <li>The content does not infringe any third-party rights</li>
            <li>The content complies with all applicable laws</li>
          </ul>
          <p className="text-indigo-300 leading-relaxed">
            We do not pre-screen User Content and are not responsible for its accuracy, legality, or appropriateness.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">3. Account & Security</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            You agree to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Provide accurate information when creating an account</li>
            <li>Maintain the confidentiality of your credentials</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">4. Enforcement & Termination</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            We reserve the right, at our sole discretion, to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-indigo-300">
            <li>Monitor use of the Services</li>
            <li>Investigate violations of this AUP</li>
            <li>Take appropriate action, including removal of content, suspension, or termination of accounts</li>
            <li>Report violations to law enforcement</li>
          </ul>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">5. Changes to This Acceptable Use Policy</h2>
          <p className="text-indigo-300 leading-relaxed">
            We may update this AUP from time to time. We will post the revised policy on this page and update the "Last updated" date. Continued use of the Services after changes constitutes acceptance.
          </p>

          <h2 className="text-3xl font-bold text-indigo-200 mt-16 mb-6">6. Contact Us</h2>
          <p className="text-indigo-300 leading-relaxed mb-6">
            If you have questions about this Acceptable Use Policy, please contact:
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