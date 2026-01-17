// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vynsera - SaaS • Design • Hosting",
  description: "Premium solutions for ambitious businesses in Albany, NY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

// src/app/layout.tsx (add to imports and inside <body>)
import { Toaster } from 'react-hot-toast';

// Inside <body>
<Toaster position="top-center" />