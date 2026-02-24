"use client";

import Link from "next/link";

export default function CoordinatorDashboard() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-6 text-center">

        <h1 className="text-3xl font-semibold">
          Coordinator Dashboard
        </h1>

        <div className="space-y-4">

          {/* Events Login */}
          <Link
            href="/coordinators"
            className="block w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-4 text-lg font-medium text-cyan-300 hover:bg-cyan-400/20 transition"
          >
            Events Coordinators
          </Link>

          {/* Accommodation Login */}
          <Link
            href="/admin/accommodation"
            className="block w-full rounded-xl border border-emerald-400/30 bg-emerald-400/10 py-4 text-lg font-medium text-emerald-300 hover:bg-emerald-400/20 transition"
          >
            Accommodation Coordinators
          </Link>

          {/* Finance Login */}
          <Link
            href="/admin/finance"
            className="block w-full rounded-xl border border-yellow-400/30 bg-yellow-400/10 py-4 text-lg font-medium text-yellow-300 hover:bg-yellow-400/20 transition"
          >
            Finance Coordinators
          </Link>

          {/* Admin */}
          <Link
            href="/admin"
            className="block w-full rounded-xl border border-purple-400/30 bg-purple-400/10 py-4 text-lg font-medium text-purple-300 hover:bg-purple-400/20 transition"
          >
            Admin
          </Link>

        </div>
      </div>
    </main>
  );
}