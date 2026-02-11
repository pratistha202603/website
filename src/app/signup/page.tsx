"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingCircle from "@/app/components/LoadingCircle";

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // ✅ after successful signup (auto login already happens in backend)
      // router.refresh()
      // router.push("/home");
      setSuccess(true);
setMsg("Account created successfully 🎉");

setTimeout(() => {
  router.push("/home");
  router.refresh();
}, 1200);


    } catch (err) {
      console.error(err);
      setMsg("Signup failed");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center text-white
                     bg-gradient-to-br from-cyan-900/40 via-black to-emerald-900/30">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-white/10
                   bg-white/5 backdrop-blur-xl p-6 space-y-4 shadow-xl"
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
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none"
        />

        <input
          name="rollNo"
          placeholder="Roll Number"
          required
          value={form.rollNo}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none"
        />

        <input
          name="mobile"
          placeholder="Mobile"
          required
          value={form.mobile}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none"
        />

        {msg && (
  <p
    className={`text-sm text-center ${
      success ? "text-green-400" : "text-red-300"
    }`}
  >
    {msg}
  </p>
)}


        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center rounded-lg
                     border border-cyan-400/30 bg-cyan-400/10 py-2
                     text-cyan-300 hover:bg-cyan-400/20 transition
                     disabled:opacity-60"
        >
          {loading ? <LoadingCircle /> : "Create Account"}
        </button>
      </form>
    </main>
  );
}
