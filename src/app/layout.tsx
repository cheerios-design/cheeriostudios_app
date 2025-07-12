// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cheerio Studios - Where Digital Dreams Take Flight",
  description:
    "Boutique digital agency transforming ambitious ideas into extraordinary online experiences. Web design, development, and digital marketing.",
  keywords:
    "web design, web development, digital marketing, branding, SEO, Cheerio Studios",
  authors: [{ name: "Sam Daramroei", url: "https://cheeriostudios.com" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Cheerio Studios - Where Digital Dreams Take Flight",
    description:
      "Transform your digital presence with cutting-edge design and development.",
    type: "website",
    locale: "en_US",
    url: "https://cheeriostudios.com",
    siteName: "Cheerio Studios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheerio Studios - Where Digital Dreams Take Flight",
    description:
      "Transform your digital presence with cutting-edge design and development.",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body bg-dark-bg text-white overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
