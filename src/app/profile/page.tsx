"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Registration = {
  eventTitle: string;
  eventType: string;
  paid: boolean;
  verified: boolean;
  utr: string;
};

type Accommodation = {
  college: string;
  gender: string;
  days: number;
  amount: number;
  utr: string;
  verified: boolean;        // ✅ Added
  createdAt: string;
};

type User = {
  name: string;
  email: string;
  college: string;
  mobile: string;
  gender: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [accommodation, setAccommodation] =
    useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
          setRegistrations(data.registrations || []);
          setAccommodation(data.accommodation || null);
        }
      } catch (error) {
        console.error("Profile load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16 text-white mt-20 space-y-12">

      {/* USER INFO */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>

        <p><span className="text-gray-400">Name:</span> {user?.name}</p>
        <p>
  <span className="text-gray-400">Gender:</span> {user?.gender}
</p>

        <p><span className="text-gray-400">College:</span> {user?.college}</p>
        <p><span className="text-gray-400">Email:</span> {user?.email}</p>
        <p><span className="text-gray-400">Mobile:</span> {user?.mobile}</p>
      </div>

      {/* REGISTERED EVENTS */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Registered Events</h2>

        {registrations.length === 0 ? (
          <p className="text-gray-400">
            You have not registered for any events.
          </p>
        ) : (
          <div className="space-y-4">
            {registrations.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="font-semibold text-lg">
                  {r.eventTitle}
                </p>

                <p className="text-sm text-gray-400 capitalize">
                  {r.eventType}
                </p>

                <p className="text-sm mt-2">
                  UTR:{" "}
                  <span className="text-cyan-300">
                    {r.utr || "Not Provided"}
                  </span>
                </p>

                <p className="text-sm">
                  Payment:{" "}
                  <span className={r.paid ? "text-green-400" : "text-red-400"}>
                    {r.paid ? "Paid" : "Not Paid"}
                  </span>
                </p>

                <p className="text-sm">
                  Verification:{" "}
                  <span className={r.verified ? "text-emerald-400" : "text-yellow-400"}>
                    {r.verified ? "Verified" : "Pending"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACCOMMODATION DETAILS */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Accommodation Details
        </h2>

        {!accommodation ? (
          <p className="text-gray-400">
            You have not registered for accommodation.
          </p>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            {/* <p>
              <span className="text-gray-400">College:</span>{" "}
              {accommodation.college}
            </p> */}

            <p>
              <span className="text-gray-400">Gender:</span>{" "}
              {accommodation.gender}
            </p>

            <p>
              <span className="text-gray-400">Days:</span>{" "}
              {accommodation.days}
            </p>

            <p>
              <span className="text-gray-400">Amount:</span>{" "}
              ₹{accommodation.amount}
            </p>

            <p>
              <span className="text-gray-400">UTR:</span>{" "}
              <span className="text-cyan-300">
                {accommodation.utr}
              </span>
            </p>

            <p>
              <span className="text-gray-400">Verification:</span>{" "}
              <span className={
                accommodation.verified
                  ? "text-emerald-400"
                  : "text-yellow-400"
              }>
                {accommodation.verified ? "Verified" : "Pending"}
              </span>
            </p>

            <p>
              <span className="text-gray-400">Registered On:</span>{" "}
              {new Date(accommodation.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

    </main>
  );
}
