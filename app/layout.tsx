import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://mortgages.plus";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mortgages+ — Compare mortgage offers & run the numbers",
    template: "%s · Mortgages+",
  },
  description:
    "Free mortgage calculators and side-by-side offers for every phase of your home loan — from pre-qualification to closing. Get a personalized quote in minutes.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Mortgages+",
    title: "Mortgages+ — Compare mortgage offers & run the numbers",
    description:
      "Free mortgage calculators and side-by-side offers for every phase of your home loan.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-ink">{children}</body>
    </html>
  );
}
