"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EVENT_PAYMENTS } from "@/helpers/eventPayments";

export default function FormPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [eventSlug, setEventSlug] = useState("");
  const [eventType, setEventType] = useState("");
  const [utr, setUtr] = useState("");
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    college: "",
    email: "",
    mobile: "",
  });

  // 🔹 Normalize event from URL
  useEffect(() => {
    const ev = searchParams.get("event") || "";

    const normalized = ev
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/-/g, "");

    setEventSlug(normalized);
  }, [searchParams]);

  // 🔹 Auto select first option
  useEffect(() => {
    if (!eventSlug) return;

    const options = Object.keys(
      EVENT_PAYMENTS[eventSlug]?.options || {}
    );

    if (options.length > 0) {
      setEventType((prev) => prev || options[0]);
    }
  }, [eventSlug]);

  // 🔹 Auto-fill logged-in user
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data?.user) {
          setForm({
            name: data.user.name || "",
            college: data.user.college || "",
            email: data.user.email || "",
            mobile: data.user.mobile || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, []);

  // 🔹 Available options
  const availableOptions = useMemo(() => {
    if (!eventSlug) return [];
    return Object.keys(
      EVENT_PAYMENTS[eventSlug]?.options || {}
    );
  }, [eventSlug]);

  // 🔹 Selected payment
  const selectedPayment = useMemo(() => {
    if (!eventSlug || !eventType) return null;

    return (
      EVENT_PAYMENTS[eventSlug]?.options[eventType] || null
    );
  }, [eventSlug, eventType]);

  const amount = selectedPayment?.amount || 0;
  const qrImage = selectedPayment?.qr || null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!eventSlug || !eventType) {
      setStatus("Invalid event selection");
      return;
    }

    if (!selectedPayment) {
      setStatus("Invalid participation type");
      return;
    }

    if (!utr.trim()) {
      setStatus("Please enter UTR after payment");
      return;
    }

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          eventTitle: eventSlug,
          eventType,
          utr,
          amount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Registration failed");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/home");
      }, 2000);

      setUtr("");
    } catch (err) {
      console.error(err);
      setStatus("Registration failed");
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <div className="rounded-xl border border-green-400/30 bg-green-400/10 px-8 py-6 text-center">
          <h2 className="text-2xl font-bold text-green-300">
            ✅ Registration Successful
          </h2>
          <p className="mt-2 text-sm text-green-200">
            Redirecting to home page...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-5 mt-20"
      >
        <h1 className="text-2xl font-bold text-cyan-400 text-center capitalize">
          {eventSlug || "Event"} Registration
        </h1>

        {/* Participation Type */}
        {availableOptions.length > 1 && (
          <div>
            <label className="text-sm text-gray-300">
              Participation Type
            </label>
            <select
              value={eventType}
              onChange={(e) =>
                setEventType(e.target.value)
              }
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
            >
              {availableOptions.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* User Details */}
        <div>
          <label className="text-sm text-gray-300">
            Full Name
          </label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">
            College Name
          </label>
          <input
            name="college"
            required
            value={form.college}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">
            Email Address
          </label>
          <input
            value={form.email}
            readOnly
            className="mt-1 w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 p-3 text-gray-400"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">
            Mobile Number
          </label>
          <input
            name="mobile"
            required
            value={form.mobile}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          />
        </div>

        {/* QR Section */}
        {qrImage && (
          <div className="text-center rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Scan & Pay ₹{amount}
            </p>
            <img
              src={qrImage}
              alt="QR Code"
              className="mx-auto w-48 h-48 rounded-lg border border-white/10"
            />
          </div>
        )}

        {/* UTR */}
        <div>
          <label className="text-sm text-gray-300">
            UTR / Transaction ID
          </label>
          <input
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-3"
          />
        </div>

        {status && (
          <p className="text-sm text-center text-red-400">
            {status}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-3 font-medium text-cyan-300 hover:bg-cyan-400/20 transition"
        >
          Submit Registration
        </button>
      </form>
    </main>
  );
}