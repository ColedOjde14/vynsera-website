// src/app/services/request-confirmation/page.tsx
import Link from "next/link";

export default function RequestConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-6">
          Request Submitted!
        </h1>

        <p className="text-xl text-indigo-300 mb-8">
          Thank you for your service request. Our team at <strong>sales@vynseracorp.com</strong> will reach out soon to discuss your needs and provide a custom quote.
        </p>

        <Link
          href="/"
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg text-lg font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}