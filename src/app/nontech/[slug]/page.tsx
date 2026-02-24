"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const nonTechnicalEvents = [
  {
    title: "BGMI & FF",
    description: "Enter the BattleGround, Exit as  Champion! Stratergy plus team work is eual to booyah",
    date: "3 March 2026",
    time: "4:00 PM – 6:00 PM",
    venue: "Online",
    coordinator: "J Saketh",
    price:"Squad :200 solo:50",
    gift:"Up to 1000 , Per Kill:10"
  },
  {
    title: "Photo & Reel Contest",
    description: "Freeze Time to your Lens and Reel the Real Talent",
    date: "20 Feb to 10 March 2026",
    time: "24 / 7",
    venue: "Online",
    coordinator: "Madhan Kumar",
    price:"Photo:30 Reel : 30 Combo:50",
    gift:"Photo:Upto 1000 Reel:Upto 1000 Combo:Upto 2000"
  },
  {
    title: "Treasure Hunt",
    description: "Think Smart. Move Fast. Win Big!",
    date: "11 March 2026",
    time: "11:00 PM – 12:00 PM",
    venue: "Civil Engineering Department",
    coordinator: "B Kalpana",
    price:"Single:50 Team(4):200",
    gift:"Upto 1000"

  },
  {
    title: "Image Quiz",
    description: "",
    date: "11 March 2026",
    time: "10:00 AM – 11:00 AM",
    venue: "Department of Civil Engineering ",
    coordinator: "K.M Sesidhar",
    price:"Rupees 30",
    gift:"Up to 500"
  },
  {
    title: "Rubics Cube",
    description: "Create and submit an exciting short reel.",
    date: "11 March 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Department of Civil Engineering",
    coordinator: "N. Vishal",
    price:"Rupees 40",
    gift:"Up to 500"
  },
  {
    title: "Match the Hands",
    description: "Show your talent in singing, comedy or poetry.",
    date: "11 March 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Department of Civil Engineering on Stalls",
    coordinator: "B. Chakradhar",
    price:"Rupees 30",
    gift:"Up to 500"
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
      {/* <img src="/nevents/photo.jpeg" alt=""  className="w-80 ml-"/> */}

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
        <Info label="Entry Fee" value={event.price} />
        <Info label="prize for Winner" value={event.gift} />
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
