// src/app/layout.tsx (or app/layout.tsx)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // or your global styles file

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vynsera",
  description: "Professional Software Engineering For Those Who Dream",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Vynsera",
    description: "Professional Software Engineering For Those Who Dream",
    url: "https://vynseracorp.com",
    siteName: "Vynsera",
    images: [
      {
        url: "/og-image.jpg", // replace with your actual OG image if you have one
        width: 1200,
        height: 630,
        alt: "Vynsera - Professional Software Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vynsera",
    description: "Professional Software Engineering For Those Who Dream",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}