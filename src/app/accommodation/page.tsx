"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PRICE_PER_DAY = 300;

export default function AccommodationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
    gender: "male",
    days: 1,
    utr: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // const totalAmount = form.days * PRICE_PER_DAY;
  // const totalAmount = (if(form.days ==1){300} else if(form.days == 2) {500} else if(form.days == 3) {350} else {0};
  const PRICE_MAP: Record<number, number> = {
  1: 300,
  2: 500,
  3: 350,
};

const totalAmount = PRICE_MAP[form.days] ?? 0;

  // 🔥 Dynamic QR based on days
const qrImagePath = `/payments/accommodation-${form.days}.jpeg`;

  // ✅ AUTO FILL + LOGIN CHECK
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/accommodation", {
          credentials: "include", // 🔥 IMPORTANT
        });

        // 🔴 Not logged in
        if (res.status === 401) {
          router.push("/signup");
          return;
        }

        const data = await res.json();

        if (!data?.success || !data.user) {
          router.push("/signup");
          return;
        }

        // ✅ Auto-fill user data
        setForm((prev) => ({
          ...prev,
          name: data.user.name ?? "",
            college: data.user.college ?? "",
          email: data.user.email ?? "",
          mobile: data.user.mobile ?? "",
        }));

      } catch (err) {
        console.error(err);
        router.push("/signup");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  // ✅ Countdown Redirect After Success
  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        router.push("/home");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [success, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "days" ? Number(value) : value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/accommodation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          amount: totalAmount,
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("Accommodation registered successfully 🎉");
      setSuccess(true);

    } catch {
      setStatus("Failed to submit accommodation request");
    }
  }

  if (loading) {
    return null; // prevents flash before redirect
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white mt-30">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Accommodation Registration
        </h1>

        {/* Auto-filled */}
        <Input label="Full name" name="name" value={form.name} readOnly />
      
        <Input label="Email" name="email" value={form.email} readOnly />
     

        {/* Editable */}
        <Input
          label="College"
          name="college"
          value={form.college}
          onChange={handleChange}
        />

<Input
  label="Mobile"
  name="mobile"
  value={form.mobile}
  onChange={handleChange}
/>


        {/* Gender */}
        <div>
          <label className="text-sm text-gray-300" htmlFor="gender">Gender</label>
          <select
          id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Days */}
        <div>
          <label className="text-sm text-gray-300" htmlFor="days">
            Number of Days
          </label>
          <select
          id="days"
            name="days"
            value={form.days}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          >
            <option value={1}>1 Day</option>
            <option value={2}>2 Days</option>
            <option value={3}>3 Days (Make Sure You need to Register for workshop)</option>
          </select>
        </div>

        {/* Amount */}
        <div className="rounded-lg bg-cyan-400/10 border border-cyan-400/20 p-3 text-center">
          <p className="text-sm text-gray-300">
            {/* Price per day: ₹{PRICE_PER_DAY} */}
          </p>
          <p className="text-lg font-semibold text-cyan-300 mt-1">
            Total Amount: ₹{totalAmount}
          </p>
        </div>
        {/* QR Code */}
<div className="text-center space-y-2">
  <p className="text-sm text-gray-300">
    Scan & Pay ₹{totalAmount}
  </p>

  <div className="flex justify-center">
    <img
      src={qrImagePath}
      alt="Accommodation QR Code"
      className="w-48 h-48 rounded-lg border border-white/10 bg-white/5 p-2"
    />
  </div>
</div>

        {/* UTR */}
        <Input
          label="UTR Number"
          name="utr"
          value={form.utr}
          onChange={handleChange}
        />

        {/* Status */}
        {status && (
          <p
            className={`text-center text-sm font-medium ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}

        {success && (
          <p className="text-center text-sm text-gray-400">
            Redirecting to home in {countdown} seconds...
          </p>
        )}

        <button
          type="submit"
          disabled={success}
          className="w-full rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-3 text-cyan-300 hover:bg-cyan-400/20 transition disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

function Input({
  label,
  readOnly,
  ...props
}: {
  label: string;
  name: string;
  value: string;
  onChange?: any;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...props}
        readOnly={readOnly}
        required
        className={`mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3 ${
          readOnly ? "cursor-not-allowed opacity-80" : ""
        }`}
      />
    </div>
  );
}
