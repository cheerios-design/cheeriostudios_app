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
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
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
