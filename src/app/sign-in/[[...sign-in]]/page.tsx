// src/app/sign-in/[[...sign-in]]/page.tsx
'use client';

import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to load

    if (isSignedIn && user) {
      const role = user.publicMetadata.role as string | undefined;
      const isAdminOrSupport = role === 'admin' || role === 'support';

      // Redirect based on role
      router.replace(isAdminOrSupport ? '/admin' : '/portal');
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Show loading while Clerk is checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950">
        <p className="text-xl text-indigo-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img
            src="/logo.png"
            alt="Vynsera Logo"
            className="mx-auto h-20 w-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-white">Welcome to Vynsera</h1>
          <p className="mt-2 text-indigo-300">
            Sign in to access your portal
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-black/50 backdrop-blur-lg border border-indigo-500/30 shadow-2xl rounded-2xl",
              headerTitle: "text-white text-2xl font-bold",
              headerSubtitle: "text-indigo-300 text-base",
              formFieldLabel: "text-indigo-200",
              formFieldInput: "bg-black/40 border-indigo-500/50 text-white placeholder:text-indigo-400 rounded-lg",
              formFieldErrorText: "text-pink-400",
              formButtonPrimary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full shadow-lg",
              formButtonSecondary: "bg-transparent border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10",
              footerActionLink: "text-indigo-400 hover:text-indigo-300",
              footerActionText: "text-indigo-300",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/portal"  // Fallback - client-side logic overrides this
          afterSignUpUrl="/portal"
        />
      </div>
    </div>
  );
}