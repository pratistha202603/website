"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CoordinatorLoginPage() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId.trim()) return;

    // save login
    localStorage.setItem("coordinatorUserId", userId.trim());

    router.push("/coordinators");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Coordinator Login</h1>

        <div>
          <label className="text-sm text-gray-300">User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="demo-user-1"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-3 font-medium text-cyan-300 hover:bg-cyan-400/20 transition"
        >
          Login
        </button>
         {/* <button
          type="button"
          onClick={() => router.push("./signup")}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-base text-gray-300 hover:bg-white/10 transition"
        >
          Go to Signup Page
        </button> */}

      </form>
    </main>
  );
}
