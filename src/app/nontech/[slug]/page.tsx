"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const nonTechnicalEvents = [
  {
    title: "BGMI & FF",
    description: "Solve clues and reach the final destination.",
    date: "11 March 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Campus",
    coordinator: "Student Council",
  },
  {
    title: "Photo & Reel Contest",
    description: "Show your creativity through the lens.",
    date: "10 March 2026",
    time: "10:00 AM – 11:30 AM",
    venue: "Open Ground",
    coordinator: "Cultural Club",
  },
  {
    title: "Treasure Hunt",
    description: "Design creative posters on given themes.",
    date: "10 March 2026",
    time: "12:00 PM – 1:30 PM",
    venue: "Drawing Hall",
    coordinator: "Fine Arts Club",
  },
  {
    title: "Image Quiz",
    description: "Enjoy a fun-filled quiz with general topics.",
    date: "11 March 2026",
    time: "10:00 AM – 11:00 AM",
    venue: "Seminar Hall",
    coordinator: "Literary Club",
  },
  {
    title: "Rubics Cube",
    description: "Create and submit an exciting short reel.",
    date: "11 March 2026",
    time: "1:00 PM – 3:00 PM",
    venue: "Media Room",
    coordinator: "Media Team",
  },
  {
    title: "Match the Hands",
    description: "Show your talent in singing, comedy or poetry.",
    date: "12 March 2026",
    time: "11:00 AM – 1:00 PM",
    venue: "Open Stage",
    coordinator: "Cultural Committee",
  },
];

function getSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NonTechnicalEventPage() {
  const params = useParams();
  const slug = params.slug as string;

  const event = nonTechnicalEvents.find(
    (e) => getSlug(e.title) === slug
  );

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Non-technical event not found
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-white sm:mt-10">

      <h1
        className="text-3xl sm:text-4xl font-extrabold mb-6
        bg-gradient-to-r from-pink-400 to-rose-400
        bg-clip-text text-transparent"
      >
        {event.title}
      </h1>

      <p className="text-gray-300 mb-8 leading-relaxed">
        {event.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Info label="Date" value={event.date} />
        <Info label="Time" value={event.time} />
        <Info label="Venue" value={event.venue} />
        <Info label="Coordinator" value={event.coordinator} />
      </div>

      <Link
        href={`/form?event=${getSlug(event.title)} &type=nontechnical`}
        className="inline-block rounded-lg
        border border-pink-400/30
        bg-pink-400/10 px-6 py-3
        font-medium text-pink-300
        hover:bg-pink-400/20 transition"
      >
        Register for this Event
      </Link>

    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
