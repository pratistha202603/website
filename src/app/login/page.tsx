"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingCircle from "../components/LoadingCircle";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Login failed");
        return;
      }

      router.push("/form");
    } catch (err) {
      setMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10
                   bg-white/10 backdrop-blur-xl p-8 shadow-2xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-300">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-gray-300">
          Login to continue your event registration
        </p>

        <div>
          <label className="text-xs text-gray-400">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10
                       p-3 outline-none text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10
                       p-3 outline-none text-white placeholder:text-gray-400"
          />
        </div>

        {msg && (
          <p className="text-sm text-center text-red-300">
            {msg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg border border-cyan-400/30
                     bg-cyan-400/10 py-3 font-medium text-cyan-300
                     hover:bg-cyan-400/20 transition disabled:opacity-50"
        >
          {loading ? <LoadingCircle /> : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-cyan-300 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
