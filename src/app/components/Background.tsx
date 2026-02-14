"use client";

import { motion } from "framer-motion";
import CursorGlow from "./CursorGlow";
import SideMenu from "./SideMenu";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      {/* background gradient (visual only) */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          // background:
          //   "linear-gradient(120deg,#020617,#0ea5e9,#6366f1,#22c55e,#020617)",
          // backgroundSize: "300% 300%",
          background: "linear-gradient(180deg, #0f2a44, 0%, #1b3b6f, 100%)"
          // backgroundSize: "100% 200%",
        }}
      />

      {/* dark blur overlay (visual only) */}
      <div className="pointer-events-none absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* cursor glow (must not block clicks) */}
      <div className="pointer-events-none absolute inset-0">
        <CursorGlow />
      </div>

      {/* UI layer */}
      <div className="relative z-50 min-h-screen">

        {/* ✅ side menu button */}
        <div className="fixed right-5 top-5 z-[999]">
          <SideMenu />
        </div>

        {/* page content */}
        {children}

      </div>
    </main>
  );
}
