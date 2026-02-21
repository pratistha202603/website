"use client";

import { useEffect, useState } from "react";
import { EVENT_PRICES } from "@/helpers/eventPrices";
import { EVENT_PAYMENTS } from "@/helpers/eventPayments";


type Payment = {
  _id: string;
  eventTitle: string;
  eventType: string;
  userId: {
    name: string;
    email: string;
    mobile?: string;
  };
  utr: string;
  verified: boolean;
};


export default function FinancePage() {
  const FINANCE_PASSWORD =
    process.env.NEXT_PUBLIC_FINANCE_PASSWORD;

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 Check session
  useEffect(() => {
    const saved = sessionStorage.getItem("finance_auth");
    if (saved === "true") {
      setAuthenticated(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (password === FINANCE_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("finance_auth", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  async function loadData() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/pending-payments", {
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success) {
        setPayments(result.data);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  async function verifyPayment(id: string, type: string) {
    const res = await fetch("/api/admin/verify-payment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
    });

    if (res.ok) {
      loadData();
    } else {
      alert("Verification failed");
    }
  }

  // 🔐 LOGIN UI
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f3d3e] via-[#0b3a3b] to-[#072c2d] text-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-cyan-400">
            Finance Login
          </h2>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg border border-green-400/30 bg-green-400/10 py-3 text-green-300 hover:bg-green-400/20 transition"
          >
            Login
          </button>
        </form>
      </main>
    );
  }

  // 🔄 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  function formatEventTitle(slug: string) {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

  // 📊 Dashboard
  return (
    <div className="min-h-screen px-6 py-16 text-white mt-20 space-y-6 bg-gradient-to-br from-[#0f3d3e] via-[#0b3a3b] to-[#072c2d]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-cyan-400">
          Finance Payment Verification
        </h1>

        <button
          onClick={() => {
            sessionStorage.removeItem("finance_auth");
            setAuthenticated(false);
          }}
          className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-red-300 hover:bg-red-400/20 transition"
        >
          Logout
        </button>
      </div>

      {/* Summary */}
      <div className="flex gap-6 text-sm">
        <p>
          Pending Payments:{" "}
          <span className="text-cyan-300 font-medium">
            {payments.length}
          </span>
        </p>

        <p>
          Total Amount:{" "}
          <span className="text-green-300 font-medium">
         ₹
{payments.reduce(
  (sum, p) =>
    sum + (EVENT_PRICES[p.eventTitle]?.price || 0),
  0
)}
 
          </span>
        </p>
      </div>

      {payments.length === 0 && (
        <p className="text-gray-400">
          No pending payments.
        </p>
      )}

      <div className="space-y-4">
        {payments.map((p) => (
          <div
            key={p._id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 flex justify-between items-center backdrop-blur-md"
          >
            <div>
              <p className="font-medium">
                {p.userId?.name}
              <span className="text-xs px-2 py-1 rounded-md bg-cyan-400/20 text-cyan-300 ml-2">
  {formatEventTitle(p.eventTitle)}
</span>

              </p>

              <p className="text-sm text-gray-400">
                {p.userId?.email}
              </p>

              {p.userId?.mobile && (
                <p className="text-sm text-gray-400">
                  Mobile: {p.userId?.mobile}
                </p>
              )}

              <p className="text-sm">
  Amount: ₹{EVENT_PRICES[p.eventTitle]?.price || 0}
</p>

              <p className="text-sm">
                UTR:{" "}
                <span className="text-cyan-300">
                  {p.utr}
                </span>
              </p>
            </div>

           <button
  onClick={() =>
    verifyPayment(
      p._id,
      p.eventType === "accommodation"
        ? "accommodation"
        : "event"
    )
  }
  className="rounded-lg border border-green-400/30 bg-green-400/10 px-4 py-2 text-green-300 hover:bg-green-400/20 transition"
>
  Mark Verified
</button>

          </div>
        ))}
      </div>
    </div>
  );
}
