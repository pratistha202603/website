"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EVENT_PRICES } from "@/helpers/eventPrices";
import { buildUpiLink } from "@/helpers/upi";
import { UPI_ID, PAYMENT_NAME } from "@/helpers/paymentConfig";

export default function FormPage() {
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [utr, setUtr] = useState("");

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    mobile: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    setMounted(true);

    const ev = searchParams.get("event") || "";
    let type = searchParams.get("type") || "";

    // important fix for your ==workshop bug
    type = type.replace(/^=+/, "");

    setEventTitle(ev);
    setEventType(type);
  }, [searchParams]);

  const amount = useMemo(() => {
    return EVENT_PRICES[eventTitle] || 0;
  }, [eventTitle]);

  const upiLink = useMemo(() => {
    if (!eventTitle || !amount) return "#";

    return buildUpiLink(
      UPI_ID,
      PAYMENT_NAME,
      amount,
      `Event-${eventTitle}`
    );
  }, [eventTitle, amount]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!eventTitle || !eventType) {
      setStatus("Invalid event link");
      return;
    }

    if (!utr.trim()) {
      setStatus("Please enter UTR after payment");
      return;
    }

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // TEMP – for now, until login is implemented
          // paste a real User _id from MongoDB
          "x-user-id": "PASTE_REAL_USER_ID_FROM_MONGODB"
        },
        body: JSON.stringify({
          name: form.name,
          rollNo: form.rollNo,
          email: form.email,
          mobile: form.mobile,
          eventTitle,
          eventType,
          utr,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Registration failed");
        return;
      }

      setStatus("Registered successfully");

      setForm({
        name: "",
        rollNo: "",
        email: "",
        mobile: "",
      });

      setUtr("");
    } catch (err) {
      console.error(err);
      setStatus("Registration failed");
    }
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2">
          Event Registration
        </h1>

        {/* Selected event */}
        <div>
          <label className="text-sm text-gray-300">
            Selected Event
          </label>
          <input
            value={eventTitle}
            readOnly
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-sm text-gray-300"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Roll Number</label>
          <input
            name="rollNo"
            required
            value={form.rollNo}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Mobile</label>
          <input
            name="mobile"
            required
            value={form.mobile}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none"
          />
        </div>

        <div className="text-sm text-gray-300">
          Amount to pay: ₹{amount || "—"}
        </div>

        <a
          href={upiLink}
          target="_blank"
          className={`block text-center rounded-lg border
            border-green-400/30 bg-green-400/10 py-2 text-green-300
            hover:bg-green-400/20 ${
              !amount ? "pointer-events-none opacity-50" : ""
            }`}
        >
          Pay using UPI
        </a>

        <div>
          <label className="text-sm text-gray-300">
            Enter UTR / Transaction ID
          </label>
          <input
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          />
        </div>

        {status && (
          <p className="text-sm text-center text-cyan-300">
            {status}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-3 font-medium text-cyan-300 hover:bg-cyan-400/20 transition"
        >
          Submit Registration
        </button>
      </form>
    </main>
  );
}
