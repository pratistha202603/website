"use client";

import { useEffect, useState } from "react";

type Registration = {
  _id: string;
  name: string;
  email: string;
  paid: boolean;
  verified: boolean;
};

export default function FinancePage() {
  const [list, setList] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);

    const res = await fetch("/api/admin/pending-payments");
    const data = await res.json();

    setList(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function verifyPayment(id: string) {
    const res = await fetch("/api/admin/verify-payment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),   // ✅ must be id
    });

    if (res.ok) {
      loadUsers();
    } else {
      alert("Failed to verify payment");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Payment Verification (Finance)
      </h1>

      {list.length === 0 && <p>No pending payments.</p>}

      <div className="space-y-4">
        {list.map((r) => (
          <div
            key={r._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-gray-500">{r.email}</p>

              <p className="text-sm">
                Paid: {r.paid ? "Yes" : "No"}
              </p>
            </div>

            <button
              onClick={() => verifyPayment(r._id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Mark Verified
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
