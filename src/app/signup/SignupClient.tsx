"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingCircle from "@/app/components/LoadingCircle";

export default function SignupClient() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    college:"",
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
    <main className="min-h-screen flex items-center justify-center text-white pt-20 m-3">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-white/10
        bg-white/5 backdrop-blur-xl p-6 space-y-5 shadow-xl"
      >
        <h1 className="text-xl font-semibold text-center">
          User Signup
        </h1>

        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm text-white/80">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none focus:border-cyan-400/50"
            placeholder="full name "
          />
        </div>

        {/* Roll Number */}
        <div className="space-y-1">
          <label htmlFor="college" className="text-sm text-white/80">
            College Name
          </label>
          <input
            id="college"
            name="college"
            required
            value={form.college}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none focus:border-cyan-400/50"
            placeholder="College Name"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-white/80">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none focus:border-cyan-400/50"
            placeholder="email address"
          />
        </div>

        {/* Mobile */}
        <div className="space-y-1">
          <label htmlFor="mobile" className="text-sm text-white/80">
            Mobile Number
          </label>
          <input
            id="mobile"
            name="mobile"
            required
            value={form.mobile}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none focus:border-cyan-400/50"
            placeholder="mobile number"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-white/80">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/10 p-2 outline-none focus:border-cyan-400/50"
            placeholder="password"
          />
        </div>

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
        <div className="text-center text-sm text-gray-400">
  Already have an account?{" "}
  <span
    onClick={() => router.push("/login")}
    className="text-cyan-300 hover:underline cursor-pointer"
  >
    Login
  </span>
</div>

      </form>
    </main>
  );
}
