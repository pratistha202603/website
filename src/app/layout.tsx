import "./globals.css";
import ClientBackground from "@/app/components/ClientBackground";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">

        {/* Top right logo - visible on all pages */}
        <Link
          href="/home"
          className="fixed top-0 left-4 z-60 mt-5"
        >
          <Image
            src="/download.jpeg"
            alt="Pratistha Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg w-10 h-10 sm:w-20 sm:h-20 "
            priority
          />
        </Link>

        <ClientBackground>
          {children}
        </ClientBackground>

      </body>
    </html>
  );
}
