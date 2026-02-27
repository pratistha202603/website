"use client";

import { useState } from "react";

const ADMIN_ID = "indra";
const ADMIN_PASSWORD = "123456";

type Registration = {
  _id: string;
  eventTitle: string;
  utr: string;
  verified: boolean;
  amount:number;
  userId: {
    name: string;
    email: string;
    mobile?: string;
    gender?: string;
  };
};

export default function AdminPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchData();
    } else {
      setError("Invalid Admin ID or Password");
    }
  }

  async function fetchData() {
    setLoadingData(true);
    const res = await fetch("/api/admin/all-registrations");
    const data = await res.json();
    setRegistrations(data.registrations || []);
    setLoadingData(false);
  }

  const uniqueEvents = [
    "all",
    ...Array.from(new Set(registrations.map((r) => r.eventTitle))),
  ];

  const filteredRegistrations = registrations.filter((r) => {
    const eventMatch =
      selectedEvent === "all" || r.eventTitle === selectedEvent;

    const genderMatch =
      selectedGender === "all" ||
      r.userId?.gender?.toLowerCase() === selectedGender;

    const statusMatch =
      selectedStatus === "all" ||
      (selectedStatus === "verified" && r.verified) ||
      (selectedStatus === "pending" && !r.verified);

    return eventMatch && genderMatch && statusMatch;
  });
  const totalAmount = registrations.reduce(
  (sum, r) => sum + (r.amount || 0),
  0
);

const totalVerifiedAmount = registrations
  .filter((r) => r.verified)
  .reduce((sum, r) => sum + (r.amount || 0), 0);

const totalPendingAmount = registrations
  .filter((r) => !r.verified)
  .reduce((sum, r) => sum + (r.amount || 0), 0);

  // 🔐 Login UI (Styled same as your other forms)
  if (!authenticated) {
    return (
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

        {/* background glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10
                     bg-white/10 backdrop-blur-xl p-8 shadow-2xl space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-cyan-300">
            Admin Access
          </h2>

          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10
                       p-3 outline-none text-white placeholder:text-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10
                       p-3 outline-none text-white placeholder:text-gray-400"
          />

          {error && (
            <p className="text-sm text-center text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg border border-cyan-400/30
                       bg-cyan-400/10 py-3 font-medium text-cyan-300
                       hover:bg-cyan-400/20 transition"
          >
            Login
          </button>
        </form>
      </main>
    );
  }

  // ✅ Dashboard UI (Matching Finance Page Style)
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-12 text-white">

      {/* background glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-cyan-300">
            Admin Dashboard
          </h1>

          <button
            onClick={() => setAuthenticated(false)}
            className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-red-300 hover:bg-red-400/20 transition"
          >
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4">

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="rounded-lg border border-white/10 bg-black/40 p-2"
            >
              {uniqueEvents.map((event) => (
                <option key={event}>{event}</option>
              ))}
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="rounded-lg border border-white/10 bg-black/40 p-2"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-white/10 bg-black/40 p-2"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          {/* 💰 Collection Stats */}
<div className="grid md:grid-cols-3 gap-4">

  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10
                  backdrop-blur-xl p-6 shadow-lg">
    <p className="text-sm text-gray-400">Total Collected</p>
    <h2 className="text-2xl font-bold text-cyan-300">
      ₹ {totalAmount}
    </h2>
  </div>

  <div className="rounded-2xl border border-green-400/20 bg-green-400/10
                  backdrop-blur-xl p-6 shadow-lg">
    <p className="text-sm text-gray-400">Verified Amount</p>
    <h2 className="text-2xl font-bold text-green-400">
      ₹ {totalVerifiedAmount}
    </h2>
  </div>

  <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10
                  backdrop-blur-xl p-6 shadow-lg">
    <p className="text-sm text-gray-400">Pending Amount</p>
    <h2 className="text-2xl font-bold text-yellow-400">
      ₹ {totalPendingAmount}
    </h2>
  </div>

</div>

          <p className="text-sm text-gray-400">
            Showing {filteredRegistrations.length} registrations
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 text-cyan-300">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Event</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">UTR</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((r) => (
                  <tr key={r._id} className="border-b border-white/5">
                    <td className="p-3">{r.userId?.name}</td>
                    <td className="p-3">{r.eventTitle}</td>
                    <td className="p-3">{r.userId?.gender || "-"}</td>
                    <td className="p-3">{r.utr}</td>
                    <td className="p-3">
                      {r.verified ? (
                        <span className="text-green-400">Verified</span>
                      ) : (
                        <span className="text-yellow-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
          </div>

        </div>
      </div>
    </main>
  );
}