import Link from "next/link";

const technicalEvents = [
  {
    title: "Code Clash",
    desc: "Competitive programming contest to test your logic and speed.",
  },
  {
    title: "Hackathon",
    desc: "Build innovative solutions in a team within limited time.",
  },
  {
    title: "Paper Presentation",
    desc: "Present your technical ideas before expert judges.",
  },
  {
    title: "Project Expo",
    desc: "Showcase your real-time and academic projects.",
  },
  {
    title: "Debug the Code",
    desc: "Find and fix errors in given programs.",
  },
  {
    title: "Tech Quiz",
    desc: "Quiz competition based on core CS and engineering topics.",
  },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TechnicalEventsPage() {
  return (
    <main className="relative px-6 py-20 text-white max-w-7xl mx-auto">

      {/* heading */}
      <h1
        className="mb-12 text-4xl sm:text-5xl lg:text-6xl font-extrabold
        bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400
        bg-clip-text text-transparent text-center"
      >
        Technical Events
      </h1>

      {/* cards – same style as workshops */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

        {technicalEvents.map((event, i) => (
          <div
            key={event.title}
            className="group relative rounded-xl
            border border-white/10
            bg-white/5 backdrop-blur-lg
            overflow-hidden
            transition hover:-translate-y-1"
          >
            {/* image */}
            <img
              src={`https://picsum.photos/400/300?random=${i + 80}`}
              alt={event.title}
              className="h-44 w-full object-cover"
            />

            {/* content */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">
                {event.title}
              </h3>

              <p className="text-sm text-gray-300">
                {event.desc}
              </p>

              <Link
                href={`/form?event=${slugify(event.title)}`}
                className="inline-block mt-2 rounded-lg
                border border-cyan-400/30
                bg-cyan-400/10 px-4 py-2
                text-sm font-medium text-cyan-300
                hover:bg-cyan-400/20 transition"
              >
                Register
              </Link>
            </div>

            {/* glow overlay (same as workshop card) */}
            <div
              className="pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100 transition
              bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10"
            />
          </div>
        ))}

      </div>
    </main>
  );
}
