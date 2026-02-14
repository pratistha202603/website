"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ALL_EVENTS = [
  { label: "AI & Machine Learning Bootcamp", slug: "ai-machine-learning-bootcamp" },
  { label: "Web Development with Next.js", slug: "web-development-with-next-js" },
  { label: "Data Science with Python", slug: "data-science-with-python" },

  { label: "Code Clash", slug: "code-clash" },
  { label: "Hackathon", slug: "hackathon" },
  { label: "Paper Presentation", slug: "paper-presentation" },
  { label: "Project Expo", slug: "project-expo" },
  { label: "Debug the Code", slug: "debug-the-code" },
  { label: "Tech Quiz", slug: "tech-quiz" },

  { label: "Treasure Hunt", slug: "treasure-hunt" },
  { label: "Photography Contest", slug: "photography-contest" },
  { label: "Poster Designing", slug: "poster-designing" },
  { label: "Fun Quiz", slug: "fun-quiz" },
  { label: "Reels Challenge", slug: "reels-challenge" },
  { label: "Open Mic", slug: "open-mic" },
];

export default function AddCoordinatorPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((e) => e !== slug)
        : [...prev, slug]
    );
  }

  function remove(slug: string) {
    setSelected((prev) => prev.filter((e) => e !== slug));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selected.length) {
      setStatus("Select at least one event");
      return;
    }

    const res = await fetch("/api/admin/coordinators", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        userId,
        events: selected,
      }),
    });

    if (res.ok) {
      setStatus("Coordinator created successfully");
      setName("");
      setUserId("");
      setSelected([]);
      setOpen(false);
    } else {
      setStatus("Failed to create coordinator");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-semibold">Add Coordinator</h1>

        {/* Coordinator Name */}
        <div>
          <label className="text-lg text-gray-200">Coordinator name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-lg outline-none"
          />
        </div>

        {/* User ID */}
        <div>
          <label className="text-lg text-gray-200">User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            placeholder="demo-user-1"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-lg outline-none"
          />
        </div>

        {/* Selected Event Chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selected.map((slug) => {
              const ev = ALL_EVENTS.find((e) => e.slug === slug);
              return (
                <span
                  key={slug}
                  className="flex items-center gap-2 rounded-full
                  border border-cyan-400/30 bg-cyan-400/10
                  px-4 py-1.5 text-sm"
                >
                  {ev?.label}
                  <button
                    type="button"
                    onClick={() => remove(slug)}
                    className="text-cyan-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Event Picker Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-xl border border-white/10 bg-white/10
          px-4 py-3 text-left text-lg flex items-center justify-between"
        >
          <span>
            {selected.length === 0
              ? "Assign events"
              : `${selected.length} events selected`}
          </span>
          <span className="text-xl">▾</span>
        </button>

        {/* Modal */}
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
            />

            <div
              className="fixed left-1/2 top-1/2 z-[9999]
              w-[min(90vw,520px)]
              -translate-x-1/2 -translate-y-1/2
              rounded-2xl border border-white/10
              bg-slate-950 p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-lg font-semibold">Select events</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto space-y-1">
                {ALL_EVENTS.map((ev) => (
                  <label
                    key={ev.slug}
                    className="flex items-center gap-3 rounded-lg px-3 py-2
                    text-base cursor-pointer hover:bg-white/10"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(ev.slug)}
                      onChange={() => toggle(ev.slug)}
                      className="h-4 w-4 accent-cyan-400"
                    />
                    <span>{ev.label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-cyan-400/30
                  bg-cyan-400/10 px-5 py-2 text-cyan-300"
                >
                  Done
                </button>
              </div>
            </div>
          </>
        )}

        {/* Status Message */}
        {status && (
          <p className="text-center text-cyan-300">
            {status}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-3.5 text-lg font-medium text-cyan-300 hover:bg-cyan-400/20 transition"
        >
          Create Coordinator
        </button>

        {/* Login Button */}
        <button
          type="button"
          onClick={() => router.push("./login")}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-base text-gray-300 hover:bg-white/10 transition"
        >
          Go to Login Page
        </button>

      </form>
    </main>
  );
}
