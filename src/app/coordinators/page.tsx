"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Candidate = {
  _id: string;
  userId: {
    name: string;
    college: string;
    email: string;
    mobile: string;
  };
  utr: string;
  verified: boolean;
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
  const [attendance, setAttendance] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("coordinatorUserId");

    if (!userId) {
      router.push("/coordinators/login");
      return;
    }

   const loadData = async () => {
  try {

    const res = await fetch(`/api/coordinators/me?userId=${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    setCoordinator(data);

    const attendanceData: any = {};

    data.events.forEach((event: any) => {

      attendanceData[event.title] = {};

      event.candidates.forEach((c: any, index: number) => {

        attendanceData[event.title][index] = {
          1: c.attendance?.day1 || "",
          2: c.attendance?.day2 || ""
        };

      });

    });

    setAttendance(attendanceData);

  } catch {
    setError("Failed to load coordinator data");
  } finally {
    setLoading(false);
  }
};

    loadData();
  }, [router]);

  const loadAttendance = async () => {

  const res = await fetch("/api/attendance/get");

  const data = await res.json();

  const formatted: any = {};

  data.forEach((item: any) => {

    if (!formatted[item.eventTitle]) {
      formatted[item.eventTitle] = {};
    }

    formatted[item.eventTitle][item._id] = {
      1: item.attendance?.day1 || "",
      2: item.attendance?.day2 || ""
    };

  });

  setAttendance(formatted);

};

  function logout() {
    localStorage.removeItem("coordinatorUserId");
    router.push("/coordinators/login");
  }

  async function markAttendance(
    registrationId: string,
    eventTitle: string,
    userIndex: number,
    day: number,
    value: string
    
  )
   {
    console.log("Registration ID:", registrationId);
    setAttendance((prev: any) => ({
      
      ...prev,
      [eventTitle]: {
        ...(prev[eventTitle] || {}),
        [userIndex]: {
          ...(prev[eventTitle]?.[userIndex] || {}),
          [day]: value,
        },
      },
      
    }));

    await fetch("/api/attendance/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registrationId,
        day,
        status: value,
      }),
    });
  }

  function printEvent(eventTitle: string, candidates: Candidate[] = []) {
    const rows = candidates
      .map((c, i) => {
        const day1 = attendance?.[eventTitle]?.[i]?.[1] || "Not Marked";
        const day2 = attendance?.[eventTitle]?.[i]?.[2] || "Not Marked";

        if (eventTitle.toLowerCase() === "primavera-p6") {
          return `
          <tr>
            <td>${c.userId?.name ?? ""}</td>
            <td>${c.userId?.college ?? ""}</td>
            <td>${c.userId?.email ?? ""}</td>
            <td>${c.userId?.mobile ?? ""}</td>
            <td>${day1}</td>
            <td>${day2}</td>
          </tr>`;
        }

        return `
        <tr>
          <td>${c.userId?.name ?? ""}</td>
          <td>${c.userId?.college ?? ""}</td>
          <td>${c.userId?.email ?? ""}</td>
          <td>${c.userId?.mobile ?? ""}</td>
          <td>${day1}</td>
        </tr>`;
      })
      .join("");

    const headers =
      eventTitle.toLowerCase() === "primavera-p6"
        ? `
        <th>Name</th>
        <th>College</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Day 1</th>
        <th>Day 2</th>`
        : `
        <th>Name</th>
        <th>College</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Attendance</th>`;

    const printWindow = window.open("", "", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
    <head>
    <title>${eventTitle} Attendance</title>
    <style>
    body{font-family:Arial;padding:30px}
    table{border-collapse:collapse;width:100%}
    th,td{border:1px solid #ccc;padding:8px;text-align:left}
    th{background:#f2f2f2}
    h2{margin-bottom:20px}
    </style>
    </head>

    <body>

    <h2>${eventTitle} Attendance Sheet</h2>

    <table>
    <thead>
    <tr>${headers}</tr>
    </thead>

    <tbody>
    ${rows}
    </tbody>

    </table>

    </body>
    </html>
    `);

    printWindow.document.close();
    printWindow.print();
  }

  function saveAttendance(eventTitle: string) {
    const eventAttendance = attendance[eventTitle] || {};
    console.log("Saved Attendance:", eventAttendance);
    alert("Attendance saved successfully!");
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
    <main className="max-w-6xl mx-auto px-6 py-16 text-white mt-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Coordinator Panel</h1>
          <p className="text-lg font-semibold mt-1">{coordinator.name}</p>
        </div>

        <button
          onClick={logout}
          className="text-sm rounded-lg border border-white/10 px-4 py-2 hover:bg-white/10"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4">
        {coordinator.events.map((ev) => (
          <div
            key={ev.title}
            className="rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{ev.title}</p>

              <div className="flex gap-4">
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

                <button
                  onClick={() => printEvent(ev.title, ev.candidates)}
                  className="text-sm text-green-400 hover:underline"
                >
                  Print
                </button>
              </div>
            </div>

            {openEvent === ev.title && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm border border-white/10">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="p-2">Name</th>
                      

                      {ev.title.toLowerCase() === "primavera-p6" ? (
                        <>
                          <th className="p-2">Day 1</th>
                          <th className="p-2">Day 2</th>
                        </>
                      ) : (
                        <th className="p-2">Attendance</th>
                      )}
                      <th className="p-2">College</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Mobile</th>
                      <th className="p-2">Finance Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ev.candidates.map((c, i) => (
                      <tr key={c._id} className="border-t border-white/10">
                        <td className="p-2">{c.userId?.name}</td>
                        
<td className="p-2 text-center">
  <div className="flex justify-center gap-2">

    <button
      onClick={() =>
        markAttendance(c._id, ev.title, i, 1, "Present")
      }
      className={`px-3 py-1 rounded-md text-sm font-semibold
      ${
        attendance?.[ev.title]?.[i]?.[1] === "Present"
          ? "bg-green-500 text-white"
          : "bg-white/10 text-green-400"
      }`}
    >
      ✔
    </button>

    <button
      onClick={() =>
        markAttendance(c._id, ev.title, i, 1, "Absent")
      }
      className={`px-3 py-1 rounded-md text-sm font-semibold
      ${
        attendance?.[ev.title]?.[i]?.[1] === "Absent"
          ? "bg-red-500 text-white"
          : "bg-white/10 text-red-400"
      }`}
    >
      ✖
    </button>

  </div>
</td>
                        {ev.title.toLowerCase() === "primavera-p6" && (
                        <td className="p-2 text-center">
  <div className="flex justify-center gap-2">

    <button
      onClick={() =>
        markAttendance(c._id, ev.title, i, 2, "Present")
      }
      className={`px-3 py-1 rounded-md text-sm font-semibold
      ${
        attendance?.[ev.title]?.[i]?.[2] === "Present"
          ? "bg-green-500 text-white"
          : "bg-white/10 text-green-400"
      }`}
    >
      ✔
    </button>

    <button
      onClick={() =>
        markAttendance(c._id, ev.title, i, 2, "Absent")
      }
      className={`px-3 py-1 rounded-md text-sm font-semibold
      ${
        attendance?.[ev.title]?.[i]?.[2] === "Absent"
          ? "bg-red-500 text-white"
          : "bg-white/10 text-red-400"
      }`}
    >
      ✖
    </button>

  </div>
</td>
                        )}
                        <td className="p-2">{c.userId?.college}</td>
                        <td className="p-2">{c.userId?.email}</td>
                        <td className="p-2">{c.userId?.mobile}</td>
                        <td className="p-2">
                          {c.verified ? "Verified" : "Pending"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => saveAttendance(ev.title)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
                  >
                    Save Attendance
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}