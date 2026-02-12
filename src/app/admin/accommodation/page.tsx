"use client";

import { useEffect, useState } from "react";

type FormType = {
  name: string;
  rollNo: string;
  email: string;
  mobile: string;
  college: string;
  gender: "male" | "female";
  days: number;
  price: number;
};

const PRICE_PER_DAY = 500;

export default function AccommodationPage() {
  const [form, setForm] = useState<FormType>({
    name: "",
    rollNo: "",
    email: "",
    mobile: "",
    college: "",
    gender: "male",
    days: 1,
    price: 500,
  });

  const [msg, setMsg] = useState("");

  /* ✅ auto fill */
  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/accommodation", {
        credentials: "include",
      });

      const json = await res.json();

      if (json.success && json.user) {
        setForm((prev) => ({
          ...prev,
          name: json.user.name || "",
          rollNo: json.user.rollNo || "",
          email: json.user.email || "",
          mobile: json.user.mobile || "",
        }));
      }
    }

    loadUser();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "days") {
      const d = Number(value);

      setForm((prev) => ({
        ...prev,
        days: d,
        price: d * PRICE_PER_DAY,   // ✅ auto price
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/accommodation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const json = await res.json();

    if (!json.success) {
      setMsg("Accommodation registration failed");
      return;
    }

    setMsg("Accommodation registered successfully ✅");
  }

  return (
    <main className="min-h-screen flex items-center justify-center text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-3 bg-white/5 p-6 rounded-xl border border-white/10"
      >
        <h1 className="text-xl font-semibold text-center">
          Accommodation Form
        </h1>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded bg-white/10"
          required
        />

        <input
          name="rollNo"
          value={form.rollNo}
          onChange={handleChange}
          placeholder="Roll No"
          className="w-full p-2 rounded bg-white/10"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded bg-white/10"
          required
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="w-full p-2 rounded bg-white/10"
          required
        />

        <input
          name="college"
          value={form.college}
          onChange={handleChange}
          placeholder="College"
          className="w-full p-2 rounded bg-white/10"
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10"
        >
          <option value="male">Boy</option>
          <option value="female">Girl</option>
        </select>

        {/* ✅ Days selection */}
        <select name="days"
          value={form.days}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10"
        >
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
        </select>

        {/* ✅ Price display */}
        <div className="text-center text-cyan-300 font-semibold">
          Total Price : ₹{form.price}
        </div>

        {msg && (
          <p className="text-sm text-center text-green-400">
            {msg}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-2 rounded bg-cyan-500/20 text-cyan-300"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
