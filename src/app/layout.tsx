import type { Metadata, Viewport } from "next";

import "./globals.css";
import Providers from "./providers";
import BottomNav from "@/components/bottom-nav/BottomNav";
import localFont from "next/font/local";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Regular.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const bevellier = localFont({
  src: "../../public/fonts/Bevellier-Medium.woff2",
  variable: "--font-bevellier",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://interactapp.ir"),
  title: "Interact",
  description:
    "A social media application , create and share posts, stories, ... and connect with the world.",

  openGraph: {
    title: "Interact",
    description:
      "A social media application , create and share posts, stories, ... and connect with the world.",
    url: "https://interactapp.ir",
    siteName: "Interact",
    type: "website",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "lu079FPfmpbssY06rbpS151MytBUwzT20UIxxfZLl8A",
  },
  authors: [{ name: "Pouria Vojdani" }],
  keywords: [
    "Social",
    "social media",
    "posts",
    "stories",
    "followers",
    "likes",
    "comments",
    "message",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${bevellier.variable}`}>
      <body>
        <Providers>
          {children}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
