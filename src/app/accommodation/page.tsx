"use client";

import { useState } from "react";

export default function AccommodationPage() {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    mobile: "",
    college: "",
    gender: "male",
    days: 1,
  });

  const [status, setStatus] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/accommodation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          days: Number(form.days),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("Accommodation request submitted");

      setForm({
        name: "",
        rollNo: "",
        email: "",
        mobile: "",
        college: "",
        gender: "male",
        days: 1,
      });
    } catch {
      setStatus("Failed to submit accommodation request");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Accommodation Registration</h1>

        <Input label="Full name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Roll number" name="rollNo" value={form.rollNo} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
        <Input label="College" name="college" value={form.college} onChange={handleChange} />

        <div>
          <label className="text-sm text-gray-300">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-300">Number of days</label>
          <input
            type="number"
            min={1}
            name="days"
            value={form.days}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          />
        </div>

        {status && (
          <p className="text-center text-sm text-cyan-300">{status}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-3 text-cyan-300 hover:bg-cyan-400/20 transition"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

function Input({
  label,
  ...props
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
}) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...props}
        required
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
      />
    </div>
  );
}
