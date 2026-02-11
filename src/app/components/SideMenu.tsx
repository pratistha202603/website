"use client";
export const dynamic = "force-dynamic";


import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const festLink = (hash: string) =>
    pathname === "/home" ? hash : `/home${hash}`;

  const links = [
    { label: "Home", href: "/home" },
    { label: "Workshops", href: festLink("#workshops") },
    { label: "Events", href: festLink("#technical-events") },
    { label: "Accommodation", href: festLink("#accommodation") },
    { label: "About", href: festLink("#about-college") },
    { label: "Coordinators", href: festLink("#coordinators") },
  ];

  // ✅ check login status
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        setLoggedIn(res.ok);
      } catch {
        setLoggedIn(false);
      }
    }

    checkLogin();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setLoggedIn(false);
    router.push("/login");
  }

  function handleLogin() {
    router.push("/login");
  }

  return (
    <>
      {/* ---------------- Desktop Top Menu ---------------- */}
      <nav className="hidden md:flex fixed top-5 left-0 right-0 z-40 items-center justify-center gap-10 bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-6 text-white">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="text-xl hover:text-cyan-300 transition font-bold text-white"
          >
            {l.label}
          </Link>
        ))}

        {/* ✅ Login / Logout switch */}
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="text-xl font-bold text-red-300 hover:text-red-400 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="text-xl font-bold text-cyan-300 hover:text-cyan-400 transition"
          >
            Login
          </button>
        )}
      </nav>

      {/* ---------------- Mobile Hamburger ---------------- */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed top-4 right-4 z-50 group flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition hover:bg-white/20"
      >
        <span className="h-[2px] w-5 bg-white"></span>
        <span className="h-[2px] w-5 bg-white"></span>
        <span className="h-[2px] w-5 bg-white"></span>
      </button>

      {/* ---------------- Mobile Side Menu ---------------- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed right-0 top-0 z-40 h-full w-72 border-l border-white/20
                         bg-white/10 backdrop-blur-xl p-6 text-white"
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
                {links.map((l) => (
                  <MenuLink
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </MenuLink>
                ))}

                {/* ✅ Login / Logout switch (mobile) */}
                {loggedIn ? (
                  <button
                    onClick={async () => {
                      setOpen(false);
                      await handleLogout();
                    }}
                    className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10
                               px-4 py-2 text-left text-red-300 hover:bg-red-400/20 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogin();
                    }}
                    className="mt-4 rounded-lg border border-cyan-400/20 bg-cyan-400/10
                               px-4 py-2 text-left text-cyan-300 hover:bg-cyan-400/20 transition"
                  >
                    Login
                  </button>
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

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
