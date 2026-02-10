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
    <main className="relative min-h-screen text-white">

      {/* animated background */}
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
          background:
            "linear-gradient(120deg,#020617,#0ea5e9,#6366f1,#22c55e,#020617)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* dark blur overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* cursor glow */}
      <div className="pointer-events-none absolute inset-0">
        <CursorGlow />
      </div>

      {/* UI layer */}
      <div className="relative z-50 min-h-screen">

        {/* side menu button */}
        <div className="fixed top-5 right-5 z-[9999]">
          <SideMenu />
        </div>

        {/* page content */}
        {children}

      </div>
    </main>
  );
}
