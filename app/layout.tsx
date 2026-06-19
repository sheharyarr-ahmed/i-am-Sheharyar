import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://sheharyar-ahmed.vercel.app";
const DESCRIPTION =
  "I build systems that execute work: autonomous agents, full-stack products, and native iOS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sheharyar Ahmed",
    template: "%s · Sheharyar Ahmed",
  },
  description: DESCRIPTION,
  authors: [{ name: "Sheharyar Ahmed", url: SITE_URL }],
  creator: "Sheharyar Ahmed",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Sheharyar Ahmed",
    title: "Sheharyar Ahmed",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheharyar Ahmed",
    description: DESCRIPTION,
    creator: "@real_sheharyar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`}>
      <body className="h-full">
        <Loader />
        <a
          href="https://sherylabs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="studio-mark"
          aria-label="SheryLabs studio"
        />
        <PageTransition>{children}</PageTransition>
        <Nav />
      </body>
    </html>
  );
}
