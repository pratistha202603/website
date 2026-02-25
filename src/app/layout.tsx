import "./globals.css";
import ClientBackground from "@/app/components/ClientBackground";
import { GoogleAnalytics } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pratistha 2K26 | JNTU-GV Technical Fest",
  description:
    "Pratistha 2K26 is the annual technical and cultural fest of JNTU-GV College of Engineering Vizianagaram.",
  keywords: [
    "Pratistha 2K26",
    "JNTU GV fest",
    "Engineering college fest Vizianagaram",
    "Technical fest Andhra Pradesh",
    "JNTU-GV workshops",
    "Civil engineering fest",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="relative bg-zinc-950 text-zinc-100 antialiased">

        {/* Google Analytics */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}

        {/* Top Left Logo - Visible on all pages */}
        <Link
          href="/home"
          className="fixed top-5 left-4 z-[9999]"
        >
          <Image
            src="/download.jpeg"
            alt="Pratistha 2K26 Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg w-10 h-10 sm:w-20 sm:h-20 object-cover"
            priority
          />
        </Link>

        {/* Background + Page Content */}
        <ClientBackground>
          {children}
        </ClientBackground>

      </body>
    </html>
  );
}