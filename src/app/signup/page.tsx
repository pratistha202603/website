"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.message || "Signup failed");
      return;
    }

    // after successful signup → go to login page
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">
          User Signup
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2"
        />

        <input
          name="rollNo"
          placeholder="Roll Number"
          required
          value={form.rollNo}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2"
        />

        <input
          name="mobile"
          placeholder="Mobile"
          required
          value={form.mobile}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2"
        />

        {msg && (
          <p className="text-sm text-center text-red-400">
            {msg}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-2 text-cyan-300 hover:bg-cyan-400/20"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
