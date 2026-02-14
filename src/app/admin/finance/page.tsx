"use client";

import { useEffect, useState } from "react";

const FINANCE_PASSWORD = "finance123"; // 🔥 Change this

type Registration = {
  _id: string;
  name: string;
  email: string;
  paid: boolean;
  verified: boolean;
  utr: string; // ✅ Added
};

export default function FinancePage() {
  const [list, setList] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 Check session storage
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
    } else {
      setError("Incorrect password");
    }
  }

  async function loadUsers() {
    setLoading(true);

    const res = await fetch("/api/admin/pending-payments", {
      cache: "no-store",
    });

    const data = await res.json();
    setList(data);
    setLoading(false);
  }

  useEffect(() => {
    if (authenticated) {
      loadUsers();
    }
  }, [authenticated]);

  async function verifyPayment(id: string) {
    const res = await fetch("/api/admin/verify-payment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      loadUsers();
    } else {
      alert("Failed to verify payment");
    }
  }

  // 🔒 PASSWORD SCREEN
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center">
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 text-white mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          Payment Verification (Finance)
        </h1>

        <button
          onClick={() => {
            sessionStorage.removeItem("finance_auth");
            setAuthenticated(false);
          }}
          className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-red-300"
        >
          Logout
        </button>
      </div>

      {list.length === 0 && (
        <p className="text-gray-400">No pending payments.</p>
      )}

      <div className="space-y-4">
        {list.map((r) => (
          <div
            key={r._id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-gray-400">{r.email}</p>

              {/* ✅ UTR DISPLAY */}
              <p className="text-sm">
                UTR:{" "}
                <span className="text-cyan-300">
                  {r.utr || "Not Provided"}
                </span>
              </p>

              <p className="text-sm">
                Paid:{" "}
                <span
                  className={
                    r.paid ? "text-green-400" : "text-red-400"
                  }
                >
                  {r.paid ? "Yes" : "No"}
                </span>
              </p>

              <p className="text-sm">
                Verified:{" "}
                <span
                  className={
                    r.verified
                      ? "text-emerald-400"
                      : "text-yellow-400"
                  }
                >
                  {r.verified ? "Yes" : "Pending"}
                </span>
              </p>
            </div>

            {!r.verified && (
              <button
                onClick={() => verifyPayment(r._id)}
                className="rounded-lg border border-green-400/30 bg-green-400/10 px-4 py-2 text-green-300 hover:bg-green-400/20 transition"
              >
                Mark Verified
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
