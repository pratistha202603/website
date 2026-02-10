
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const technicalEvents = [
  {
    title: "Code Clash",
    description: "Competitive coding contest to test your problem solving skills.",
    date: "10 March 2026",
    time: "10:00 AM – 12:00 PM",
    venue: "Computer Lab",
    coordinator: "CSE Department",
  },
  {
    title: "Hackathon",
    description: "Build innovative solutions within a limited time.",
    date: "10 March 2026",
    time: "1:00 PM – 7:00 PM",
    venue: "Innovation Hall",
    coordinator: "Coding Club",
  },
  {
    title: "Paper Presentation",
    description: "Present your technical ideas before industry experts.",
    date: "11 March 2026",
    time: "10:00 AM – 12:00 PM",
    venue: "Seminar Hall",
    coordinator: "Research Cell",
  },
  {
    title: "Project Expo",
    description: "Showcase your academic and personal projects.",
    date: "11 March 2026",
    time: "1:00 PM – 4:00 PM",
    venue: "Expo Block",
    coordinator: "ECE Department",
  },
  {
    title: "Debug the Code",
    description: "Find and fix errors in given programs.",
    date: "12 March 2026",
    time: "10:00 AM – 11:30 AM",
    venue: "Programming Lab",
    coordinator: "IT Department",
  },
  {
    title: "Tech Quiz",
    description: "Fast paced quiz based on technology and computers.",
    date: "12 March 2026",
    time: "12:00 PM – 1:00 PM",
    venue: "Lecture Hall",
    coordinator: "Tech Club",
  },
];

function getSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TechnicalEventPage() {
  const params = useParams();
  const slug = params.slug as string;

  const event = technicalEvents.find(
    (e) => getSlug(e.title) === slug
  );

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Technical event not found
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-white">

      <h1
        className="text-3xl sm:text-4xl font-extrabold mb-6
        bg-gradient-to-r from-blue-400 to-indigo-400
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
        href={`/form?event=${getSlug(event.title)} &type=technical`}
        className="inline-block rounded-lg
        border border-blue-400/30
        bg-blue-400/10 px-6 py-3
        font-medium text-blue-300
        hover:bg-blue-400/20 transition"
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
