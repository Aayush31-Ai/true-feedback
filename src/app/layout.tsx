import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";

import { Toaster } from "sonner";
import AuthProvider from "@/context/AuthProvider";

// ✅ Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "True Feedback | Honest Anonymous Feedback Platform",
  description:
    "True Feedback lets you receive honest, anonymous feedback from friends, peers, or your audience. Improve, connect, and grow through real insights.",
  keywords: [
    "Anonymous Feedback",
    "True Feedback",
    "Honest Reviews",
    "Feedback Platform",
    "Anonymous Messaging",
    "Send Feedback",
    "Receive Feedback",
  ],
  authors: [{ name: "Aayush Pal" }],
  creator: "Aayush Pal",
  publisher: "Aayush Pal",
  metadataBase: new URL("https://true-feedback-hazel-delta.vercel.app/"),
  openGraph: {
    title: "True Feedback | Get Honest Feedback, Anonymously",
    description:
      "Receive 100% honest and anonymous feedback with True Feedback — a safe and modern platform for sharing thoughts.",
    url: "https://true-feedback-hazel-delta.vercel.app/",
    siteName: "True Feedback",
    images: [
      {
        url: "/favicon.png", // ✅ You can add this in your public/ folder
        width: 1200,
        height: 630,
        alt: "True Feedback - Anonymous feedback platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "True Feedback | Get Honest Feedback, Anonymously",
    description:
      "Receive 100% honest and anonymous feedback with True Feedback.",
    images: ["/favicon.png"],
    creator: "@truefeedback",
  },
  icons: {
    icon: "/favicon.png", // ✅ Add favicon.ico in your public/ folder
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#000000",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Additional meta tags for SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="True Feedback" />
        <meta
          name="google-site-verification"
          content="your-verification-code" // optional for Google Search Console
        />
      </head>
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
          {children}
          <Toaster position="bottom-right" />
        </body>
      </AuthProvider>
    </html>
  );
}
