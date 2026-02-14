"use client";

import { useRouter } from "next/navigation";

export default function CoordinatorDashboard() {
  const router = useRouter();

  // 🔐 Check login only when button clicked
  async function handleNavigation(path: string) {
    try {
      const res = await fetch("/api/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.status !== 200) {
        router.push("./login");
        return;
      }

      router.push(path);

    } catch {
      router.push("coordinators/login");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-6 text-center">

        <h1 className="text-3xl font-semibold">
          Coordinator Dashboard
        </h1>

        <div className="space-y-4">

          {/* Events Button */}
          <button
            onClick={() => handleNavigation("/coordinators")}
            className="w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-4 text-lg font-medium text-cyan-300 hover:bg-cyan-400/20 transition"
          >
            Event Registrations
          </button>

          {/* Accommodation Button */}
          <button
            onClick={() => handleNavigation("/admin/accommodation")}
            className="w-full rounded-xl border border-emerald-400/30 bg-emerald-400/10 py-4 text-lg font-medium text-emerald-300 hover:bg-emerald-400/20 transition"
          >
            Accommodation Registrations
          </button>

          {/* Finance Button */}
          <button
            onClick={() => handleNavigation("/admin/finance")}
            className="w-full rounded-xl border border-yellow-400/30 bg-yellow-400/10 py-4 text-lg font-medium text-yellow-300 hover:bg-yellow-400/20 transition"
          >
            Finance Verification
          </button>

        </div>
      </div>
    </main>
  );
}
