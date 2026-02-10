"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // helper: same page scroll if already on /home
  const festLink = (hash: string) =>
    pathname === "/home" ? hash : `/home${hash}`;

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="group flex h-11 w-11 sm:h-12 sm:w-12 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition hover:bg-white/20"
      >
        <span className="h-[2px] w-5 bg-white"></span>
        <span className="h-[2px] w-5 bg-white"></span>
        <span className="h-[2px] w-5 bg-white"></span>
      </button>

      {/* Side menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* overlay */}
            <motion.div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* panel */}
            <motion.aside
              className="fixed right-0 top-0 z-40 h-full w-72 border-l border-white/20 bg-white/10 backdrop-blur-xl p-6 text-white"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold">Menu</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-sm">

                {/* ✅ Home button added */}
                <MenuLink
                  href="/home"
                  onClick={() => setOpen(false)}
                >
                  Home
                </MenuLink>

                <MenuLink
                  href={festLink("#workshops")}
                  onClick={() => setOpen(false)}
                >
                  Workshops
                </MenuLink>

                <MenuLink
                  href={festLink("#technical-events")}
                  onClick={() => setOpen(false)}
                >
                  Technical Events
                </MenuLink>

                <MenuLink
                  href={festLink("#non-technical-events")}
                  onClick={() => setOpen(false)}
                >
                  Non-Technical Events
                </MenuLink>
                <MenuLink
                  href={festLink("#accommodation")}
                  onClick={() => setOpen(false)}
                >
                  Accommodation
                </MenuLink>

                <MenuLink
                  href={festLink("#sponsors")}
                  onClick={() => setOpen(false)}
                >
                  Sponsors
                </MenuLink>

                <MenuLink
                  href={festLink("#about-college")}
                  onClick={() => setOpen(false)}
                >
                  About College
                </MenuLink>

                <MenuLink
                  href={festLink("#about-event")}
                  onClick={() => setOpen(false)}
                >
                  About Event
                </MenuLink>

                <MenuLink
                  href={festLink("#coordinators")}
                  onClick={() => setOpen(false)}
                >
                  Coordinators
                </MenuLink>

              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* small helper */

function MenuLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/15"
    >
      {children}
    </Link>
  );
}
