"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "admin123"; // 🔥 Change this

type AccommodationType = {
  _id: string;
  college: string;
  gender: string;
  days: number;
  utr: string;
  amount: number;
  verified: boolean;   // ✅ add this
  createdAt: string;
  userId?: {
    name: string;
    email: string;
    mobile: string;
  };
};


export default function AccommodationAdminPage() {
  const [data, setData] = useState<AccommodationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState("all");

  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 Check session storage
  useEffect(() => {
    const saved = sessionStorage.getItem("accommodation_admin_auth");
    if (saved === "true") {
      setAuthenticated(true);
    }
  }, []);

  // 🔐 Handle Login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("accommodation_admin_auth", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  // 🔥 Fetch data after authentication
  useEffect(() => {
    if (!authenticated) return;

    async function loadData() {
      try {
        const res = await fetch("/api/admin/accommodation", {
          cache: "no-store",
        });

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [authenticated]);

  // 🔒 LOGIN SCREEN
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center">
            Admin Login
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
            className="w-full rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-3 text-cyan-300 hover:bg-cyan-400/20 transition"
          >
            Login
          </button>
        </form>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  const filteredData =
    genderFilter === "all"
      ? data
      : data.filter((d) => d.gender === genderFilter);

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  return (
    <main className="min-h-screen px-6 py-16 text-white mt-20">
      <h1 className="text-3xl font-bold mb-6">
        Accommodation Registrations
      </h1>

      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <label className="text-gray-300">Filter by Gender:</label>

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/10 px-4 py-2"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <div className="ml-auto text-cyan-300 font-semibold">
          Total Revenue: ₹{totalRevenue}
        </div>

        <button
          onClick={() => {
            sessionStorage.removeItem("accommodation_admin_auth");
            setAuthenticated(false);
          }}
          className="ml-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-red-300"
        >
          Logout
        </button>
      </div>

      {filteredData.length === 0 ? (
        <p className="text-gray-400">No registrations found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">College</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Days</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">UTR</th>
                <th className="p-3 text-left">Payment Status</th>

                <th className="p-3 text-left">Date</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredData.map((d) => (
                <tr key={d._id} className="border-t border-white/10">
                  <td className="p-3">
                    {d.userId?.name || "N/A"}
                  </td>
                  <td className="p-3">
                    {d.userId?.email || "N/A"}
                  </td>
                  <td className="p-3">
                    {d.userId?.mobile || "N/A"}
                  </td>
                  <td className="p-3">{d.college}</td>
                  <td className="p-3 capitalize">
                    {d.gender}
                  </td>
                  <td className="p-3">{d.days}</td>
                  <td className="p-3 text-cyan-300 font-semibold">
                    ₹{d.amount ?? 0}
                  </td>
                  <td className="p-3">
                    {d.utr || "Not Provided"}
                  </td>
                  <td className="p-3">
  {d.verified ? (
    <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300">
      Verified
    </span>
  ) : (
    <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300">
      Pending
    </span>
  )}
</td>

                  <td className="p-3">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
