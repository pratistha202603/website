"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Candidate = {
  name: string;
  rollNo: string;
  email: string;
  mobile: string;
  utr: string;
};

type EventData = {
  title: string;
  candidates: Candidate[];
};

type Coordinator = {
  name: string;
  events: EventData[];
};

export default function CoordinatorsPage() {
  const [coordinator, setCoordinator] = useState<Coordinator | null>(null);
  const [openEvent, setOpenEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("coordinatorUserId");

    // not logged in
    if (!userId) {
      router.push("/coordinators/login");
      return;
    }

    const loadData = async () => {
      try {
        const res = await fetch(
          `/api/coordinators/me?userId=${userId}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setCoordinator(data);
      } catch {
        setError("Failed to load coordinator data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  function logout() {
    localStorage.removeItem("coordinatorUserId");
    router.push("/coordinators/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  if (error || !coordinator) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-400">
        {error || "No data found"}
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 text-white">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Coordinator Panel</h1>
          <p className="text-lg font-semibold mt-1">
            {coordinator.name}
          </p>
        </div>

        <button
          onClick={logout}
          className="text-sm rounded-lg border border-white/10 px-4 py-2 hover:bg-white/10"
        >
          Logout
        </button>
      </div>

      {coordinator.events.length === 0 && (
        <p className="text-gray-400">
          No events assigned to you.
        </p>
      )}

      <div className="space-y-4">
        {coordinator.events.map((ev) => (
          <div
            key={ev.title}
            className="rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{ev.title}</p>

              <button
                onClick={() =>
                  setOpenEvent(openEvent === ev.title ? null : ev.title)
                }
                className="text-sm text-cyan-300 hover:underline"
              >
                {openEvent === ev.title
                  ? "Hide candidates"
                  : "View candidates"}
              </button>
            </div>

            {openEvent === ev.title && (
              <div className="mt-4 overflow-x-auto">
                {ev.candidates.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No registrations yet.
                  </p>
                ) : (
                  <table className="min-w-full text-sm border border-white/10">
                    <thead className="bg-white/10">
                      <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Roll No</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Mobile</th>
                        <th className="p-2 text-left">UTR</th>

                      </tr>
                    </thead>
                    <tbody>
                      {ev.candidates.map((c, i) => (
                        <tr key={i} className="border-t border-white/10">
                          <td className="p-2">{c.name}</td>
                          <td className="p-2">{c.rollNo}</td>
                          <td className="p-2">{c.email}</td>
                          <td className="p-2">{c.mobile}</td>
                          <td className="p-2">{c.utr}</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </main>
  );
}
