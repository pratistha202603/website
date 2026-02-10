"use client";

import { useEffect, useState } from "react";

type Accommodation = {
  name: string;
  rollNo: string;
  email: string;
  mobile: string;
  college: string;
  gender: "male" | "female";
  days: number;
};

export default function AccommodationAdminPage() {
  const [data, setData] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "male" | "female">("all");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/accommodation", {
        cache: "no-store",
      });

      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    load();
  }, []);

  const filteredData =
    filter === "all"
      ? data
      : data.filter((d) => d.gender === filter);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 text-white">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Accommodation Requests
        </h1>

        {/* Filter buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-lg text-sm border border-white/10
              ${filter === "all" ? "bg-white/20" : "bg-white/5"}`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("male")}
            className={`px-4 py-1.5 rounded-lg text-sm border border-white/10
              ${filter === "male" ? "bg-white/20" : "bg-white/5"}`}
          >
            Boys
          </button>

          <button
            onClick={() => setFilter("female")}
            className={`px-4 py-1.5 rounded-lg text-sm border border-white/10
              ${filter === "female" ? "bg-white/20" : "bg-white/5"}`}
          >
            Girls
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Showing {filteredData.length} request(s)
      </p>

      {filteredData.length === 0 ? (
        <p className="text-gray-400">No requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Roll No</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">College</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Days</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((s, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.rollNo}</td>
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">{s.mobile}</td>
                  <td className="p-2">{s.college}</td>
                  <td className="p-2 capitalize">
                    {s.gender === "male" ? "Boy" : "Girl"}
                  </td>
                  <td className="p-2">{s.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </main>
  );
}
