"use client";

import { motion } from "framer-motion";
import SideMenu from "./SideMenu";
import CursorGlow from "./CursorGlow";

export default function ClientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* 🌊 Base Dark Teal Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              #0f3f46 0%,
              #0b3a41 30%,
              #082f36 60%,
              #041f24 100%
            )
          `,
        }}
      />

      {/* 💚 Subtle Moving Light Green Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: `
            linear-gradient(
              120deg,
              transparent 20%,
              rgba(34,197,94,0.08) 40%,
              rgba(34,197,94,0.15) 50%,
              rgba(34,197,94,0.08) 60%,
              transparent 80%
            )
          `,
          backgroundSize: "200% 200%",
        }}
      />

      {/* 🌫 Soft Depth Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/1 backdrop-blur-[1px]" />

      {/* ✨ Cursor Glow */}
      <div className="pointer-events-none absolute inset-0">
        <CursorGlow />
      </div>

      {/* UI Layer */}
      <div className="relative z-50 min-h-screen">

        {/* Side menu button */}
        <div className="fixed top-5 right-5 z-9999">
          <SideMenu />
        </div>

        {children}
      </div>
    </main>
  );
}
