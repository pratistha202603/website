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
      <body className="">

        {/* Top right logo - visible on all pages */}
        <Link
          href="/home"
          className="fixed top-4 left-4 z-50 mt-5"
        >
          <Image
            src="/download.jpeg"
            alt="Pratistha Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
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
