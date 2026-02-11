"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EVENT_PRICES } from "@/helpers/eventPrices";
import { buildUpiLink } from "@/helpers/upi";
import { UPI_ID, PAYMENT_NAME } from "@/helpers/paymentConfig";
import { useRouter } from "next/navigation";


export default function FormPageClient() {
  const searchParams = useSearchParams();

  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [utr, setUtr] = useState("");
  const router = useRouter();
const [success, setSuccess] = useState(false);


  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    mobile: "",
  });

  const [status, setStatus] = useState("");

  // 🔹 read event from url
  useEffect(() => {
    const ev = searchParams.get("event") || "";
    let type = searchParams.get("type") || "";

    type = type.replace(/^=+/, "");

    setEventTitle(ev);
    setEventType(type);
  }, [searchParams]);

  // 🔹 auto fill user profile
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data?.user) {
          console.log("ME API USER =>", data.user); // 👈 add this
          setForm({
            name: data.user.name || "",
            rollNo: data.user.rollNo || "",
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
    <main className="min-h-screen flex items-center justify-center px-4 text-white ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4 mt-30"
      >
        <h1 className="text-2xl font-bold mb-2">Event Registration</h1>

        <div>
          <label className="text-sm text-gray-300">Selected Event</label>
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

        {/* ✅ email is auto-filled and NOT editable */}
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            readOnly
            className="mt-1 w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 p-3 text-gray-400"
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
          <p className="text-sm text-center text-cyan-300">{status}</p>
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
