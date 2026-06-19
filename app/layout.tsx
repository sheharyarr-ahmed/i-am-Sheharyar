import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Sheharyar Ahmed",
  description:
    "Sheharyar Ahmed — building systems that execute work: autonomous agents, full-stack products, and native iOS.",
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
        <PageTransition>{children}</PageTransition>
        <Nav />
      </body>
    </html>
  );
}
