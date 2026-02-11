"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";


export default function FestHomePage() {

  const workshops = [
    "AI & Machine Learning Bootcamp",
    "Web Development with Next.js",
  ];

  const technical = [
    "Code Clash",
    "Hackathon",
    "Paper Presentation",
    "Project Expo",
    "Debug the Code",
    "Tech Quiz",
  ];

  // ✅ must match /nontech/[slug] page titles
  const nonTechnical = [
    "Treasure Hunt",
    "Photography Contest",
    "Poster Designing",
    "Fun Quiz",
    "Reels Challenge",
    "Open Mic",
  ];

  const sponsors = Array.from({ length: 6 }, (_, i) => `Sponsor ${i + 1}`);
  const coordinators = Array.from({ length: 10 }, (_, i) => `Coordinator ${i + 1}`);

  return (
    <main className="relative px-6 py-16 space-y-28 ">
      {/* <div className={styles.indra}>Welcome</div> */}
      <div className="relative  space-y-14">
        <div className="text-center text-4xl font-bold text-amber-200 m-2 mb-5 sm:text-2xl ">Jawaharlal Nehru Technological University - Gurajada Vizianagaram </div>
        <div className="text-center text-3xl font-bold text-amber-200 m-2 mb-5 ">JNTU-GV College of Engineering Vizianagaram (A)</div>
        <div className="text-center text-4xl font-bold text-amber-200 m-2 mb-5 ">Department of Civil Engineering </div>

      </div>
      {/* Hero */}
      <section className="text-center">
                <div className="text-center text-4xl font-bold text-amber-200 m-2 mb-8 ">Welcome to the</div>
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
          PRATISTHA 2K26
        </h1>

        <p className="mt-5 text-gray-300 max-w-xl mx-auto">
          Annual Technical & Cultural Fest – Innovation, Creativity and Technology under one grand celebration.
        </p>
        <div className="text-3xl text-orange-300 font-bold mt-5"> March 8th & 9th</div>
      </section>

      {/* Workshops */}
      <section id="workshops">
        <SectionTitle variant="cyan">Workshops</SectionTitle>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-center">
          {workshops.map((t, i) => (
            <Link
              key={t}
              href={`/workshops/${getSlug(t)}`}
              className="block"
            >
              <GlowCard
                title={t}
                img={`https://picsum.photos/400/300?random=${i + 1}`}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Technical Events */}
      <section id="technical-events">
        <SectionTitle variant="blue">Technical Events</SectionTitle>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          {technical.map((t, i) => (
            <Link
              key={t}
              href={`/technicals/${getSlug(t)}`}
              className="block"
            >
              <MiniCard
                title={t}
                img={`https://picsum.photos/400/300?random=${i + 10}`}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Non-Technical Events */}
      <section id="non-technical-events">
        <SectionTitle variant="pink">Non-Technical Events</SectionTitle>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          {nonTechnical.map((t, i) => (
            <Link
              key={t}
              href={`/nontech/${getSlug(t)}`}
              className="block"
            >
              <MiniCard
                title={t}
                img={`https://picsum.photos/400/300?random=${i + 20}`}
              />
            </Link>
          ))}
        </div>
      </section>
      {/* Accommodation */}
<section id="accommodation">
  <SectionTitle variant="green">Accommodation</SectionTitle>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5">
      <h3 className="text-lg font-semibold mb-2">Boys Hostel</h3>
      <p className="text-sm text-gray-300 mb-2">
        Accommodation facility available for male participants inside the campus.
      </p>
      <p className="text-xs text-gray-400">
        ✔ Shared rooms • ✔ Basic beds • ✔ Drinking water
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5">
      <h3 className="text-lg font-semibold mb-2">Girls Hostel</h3>
      <p className="text-sm text-gray-300 mb-2">
        Safe and comfortable stay for female participants.
      </p>
      <p className="text-xs text-gray-400">
        ✔ Shared rooms • ✔ Security • ✔ Drinking water
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5">
      <h3 className="text-lg font-semibold mb-2">Important Instructions</h3>
      <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
        <li>Accommodation is available on prior request only.</li>
        <li>Participants must carry college ID card.</li>
        <li>Reporting time will be shared after registration.</li>
      </ul>
    </div>
    
          <Link
  href="/accommodation"
  className="inline-block mt-4 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-cyan-300 hover:bg-cyan-400/20"
>
  Register for accommodation
</Link>

  </div>
</section>


      {/* Sponsors */}
      <section id="sponsors">
        <SectionTitle variant="orange">Sponsors</SectionTitle>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...sponsors, ...sponsors].map((s, i) => (
              <SponsorCard
                key={i}
                title={s}
                img={`https://picsum.photos/300/200?random=${i + 30}`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* About College */}
      <section id="about-college">
        <SectionTitle variant="green">About the College</SectionTitle>

        <GlassBox>
          The Civil Engineering Department at Jawaharlal Nehru Technological University - Gurajada Vizianagaram is a hub of academic excellence, innovation, and practical learning. Commited to the 
          nuturing of future leaders in the field of Civil Engineering, the department offers a comprehensive curriculum that combines theoratical knowledge with hands-on experience. Reowned for its 
          state-of-the-art infrastructure and cutting-edge laboratories, the department provides students with a conductice environment for researh and development
        </GlassBox>
      </section>

      {/* About Event */}
      <section id="about-event">
        <SectionTitle variant="violet">About the Event</SectionTitle>

        <GlassBox>
          Pratistha is the Two day National-level Technical Fest organized by the Department of Civil Engineering in which competition is conducted in various Technical and Non-Technical events encourages students
          to participate and showcase their talents. Students put in their best entry learning how to manage time effectively priotirize work, follow a schdule 
        </GlassBox>
      </section>

      {/* Coordinators */}
      <section id="coordinators">
        <SectionTitle variant="cyan">Coordinators</SectionTitle>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
          {coordinators.map((c, i) => (
            <CoordinatorCard
              key={c}
              name={"indrasai"}
              img={`https://picsum.photos/300/300?random=${i + 60}`}
            />
          ))}
        </div>
      </section>

    </main>
  );
}

/* ---------- helper ---------- */

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ---------- Components ---------- */

function SectionTitle({
  children,
  variant = "cyan",
}: {
  children: React.ReactNode;
  variant?: "cyan" | "pink" | "green" | "orange" | "violet" | "blue";
}) {
  const colors = {
    cyan: "from-cyan-400 to-sky-400",
    pink: "from-pink-400 to-rose-400",
    green: "from-emerald-400 to-lime-400",
    orange: "from-orange-400 to-amber-400",
    violet: "from-violet-400 to-fuchsia-400",
    blue: "from-blue-400 to-indigo-400",
  };

  return (
    <h2
      className={`mb-8 text-3xl sm:text-4xl lg:text-5xl font-extrabold
      bg-gradient-to-r ${colors[variant]} bg-clip-text text-transparent`}
    >
      {children}
    </h2>
  );
}

function GlowCard({ title, img }: { title: string; img: string }) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden transition hover:-translate-y-1">
      <img src={img} className="h-44 w-full object-cover" alt={title} />
      <div className="p-4">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">Hands-on learning with expert guidance.</p>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10" />
    </div>
  );
}

function MiniCard({ title, img }: { title: string; img: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:scale-[1.03] transition">
      <img src={img} className="h-28 w-full object-cover" alt={title} />
      <div className="p-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-300">Exciting challenge</p>
      </div>
    </div>
  );
}

function SponsorCard({ title, img }: { title: string; img: string }) {
  return (
    <div className="min-w-[160px] rounded-lg border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
      <img src={img} className="h-20 w-full object-cover" alt={title} />
      <div className="p-2 text-center text-xs text-gray-200">{title}</div>
    </div>
  );
}

function CoordinatorCard({ name, img }: { name: string; img: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-2">
      <img src={img} className="h-16 w-16 rounded-full object-cover mb-2" alt={name} />
      <p className="text-xs font-medium">{name}</p>
      <p className="text-[10px] text-gray-400">Coordinator</p>
    </div>
  );
}

function GlassBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 text-gray-200 leading-relaxed">
      {children}
    </div>
  );
}
