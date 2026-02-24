
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const technicalEvents = [
  {
    title: "Auto CAD",
    description: "A design competition to test your CAD skills.",
    date: "10 March 2026",
    time: "10:00 AM – 12:00 PM",
    venue: "Department of civil engineering",
    coordinator: "Ch.N. Siddardha",
    price:"Single 100 Team(2) 200",
    gift:"Up to 1500"
  },
  {
    title: "Brain Battle",
    description: "A quiz competition to challenge your technical knowledge.",
    date: "10 March 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Department of Civil engineering",
    coordinator: "K.J.R. Swamy",
    price:"Team(3):150 Team(4):200",
    gift:"Up to 1500"
  },
  {
    title: "Stickstopia",
    description: "Stability Check",
    date: "10 March 2026",
    time: "10:00 AM – 12:00 PM",
    venue: "Department of Mechanical engineering (LH-4)",
    coordinator: "M. Uma Mahesh",
    price:"single:80 Team(2):150",
    gift:"An Exiting Gift"
  },
  {
    title: "Instrument IQ",
    description: "Who am I",
    date: "10 March 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Civil Engineering Laboratories",
    coordinator: "G. Anil Kumar",
    price:"Rupees : 80",
    gift:"an Exiting Gift"
  },
  {
    title: "Presentation HUB",
    description: "A powepoint presentation competition to express your ideas on a technical topic.",
    date: "10 March 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Department of Civil Engineering (LH-2)",
    coordinator: "M. Ajay",
    price:"Rupees :100",
    gift:"An Exiting Gift"
  },
  {
    title: "Geometry",
    description: "Surveying Competition",
    date: "10 March 2026",
    time: "11:00 AM – 1:00 PM",
    venue: "Department of Civil Engineering",
    coordinator: "Y. Pavan Kumar",
    price:"Single:100 Team(2):150",
    gift:"Up to 1500"
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
    <main className="max-w-3xl mx-auto px-6 py-20 text-white sm:mt-10">

      <h1
        className="text-3xl sm:text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
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
        <Info label="Registration Fee" value={event.price} />
        <Info label="Prize Money" value={event.gift} />
      </div>

      <Link
        href={`/form?event=${getSlug(event.title)} &type=technical`}
        className="inline-block rounded-lg border border-blue-400/30  bg-blue-400/10 px-6 py-3 font-medium text-blue-300  hover:bg-blue-400/20 transition"
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
