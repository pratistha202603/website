"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";





export default function FestHomePage() {

  const [count, setCount] = useState<number | null>(null);

useEffect(() => {
  console.log("FestHomePage mounted");

  async function loadVisitors() {
    try {
      const res = await fetch("/api/visitors");

      console.log("Response status:", res.status);

      if (!res.ok) {
        console.log("Response not OK");
        return;
      }

      const data = await res.json();
      console.log("Visitor data:", data);

      setCount(data.total);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }

  loadVisitors();
}, []);

const workshops = [
  {
    title: "Primavera p6",
    img: "/tevents/primavera.png",
  },
]

 const technical = [
  {
    title: "Auto CAD",
    img: "/tevents/cad.jpeg",
  },
  {
    title: "Brain Battle",
    img: "/tevents/brain.jpeg",
  },
  {
    title: "Stickstopia",
    img: "/tevents/sixtopia.jpeg",
  },
  {
    title: "Instrument IQ",
    img: "/tevents/iq.jpeg",
  },
  {
    title: "Presentation Hub",
    img: "/tevents/ppt.jpeg",
  },
  {
    title: "Geometry",
    img: "/tevents/survey.jpeg",
  },
  
];



  // ✅ must match /nontech/[slug] page titles
   const nonTechnical = [
  {
    title: "BGMI & FF",
    img: "/nevents/bgmi.jpeg",
  },
  {
    title: "Photo Reel Contest",
    img: "/nevents/reel.jpeg",
  },
  {
    title: "Treasure Hunt",
    img: "/nevents/treasure.jpeg",
  },
  {
    title: "Image Quiz",
    img: "/nevents/image.jpeg",
  },
  {
    title: "Rubics Cube",
    img: "/nevents/cube.jpeg",
  },
  {
    title: "Match The Hands",
    img: "/nevents/match.jpeg",
  },
];


  const sponsors = Array.from({ length: 6 }, (_, i) => `Sponsor ${i + 1}`);
    const coordinators = [
  { name: "M Madhan Kumar", coor:"Fest Coordinator", img: "/coordinators/madhan.jpeg", contact: "tel:8886552434" },
  { name: "U Charitha Ratnam", img: "/coordinators/charitha.jpeg" , coor:"Fest Coordinator" },
  { name: "Buddala Chakradhar   ", img: "/coordinators/chakri.jpeg" , coor:"Student Coordinator ", contact: "tel:6301410265" },
  { name: "M Hema Tejaswani", img: "/coordinators/hema.jpeg", coor:"Student Coordinator ", },
  { name: "R Venkata Sri Teja", img: "/coordinators/teja.jpeg", coor:"Accommodation Coordinator ", contact : "tel:7569864639" },
  { name: "V Dhana Laxmi", img: "/coordinators/dhana.jpeg", coor:"Accommodation Coordinator ", },
  { name: "CH Sidhardha", img: "/coordinators/siddu.jpeg", coor:"Tech Events Coordinator ",  contact: "tel:9014114261" },
  { name: "M Pavithra", img: "/coordinators/image.jpeg", coor:"Tech Events Coordinator ",   },
];

  return (
    <main className="relative py-3 sm:py-5 space-y-5 sm:px-50">
      {/* Visitor Counter */}

      <div className="sm:mt-30 mt-10">
      {/* <div className={styles.indra}>Welcome</div> */}
      <div className="relative  space-y-20  sm:space-y-20">
        <div className="text-center text-md font-bold text-slate-50 mb-2 mt-20 sm:mt-20 sm:text-3xl ">Jawaharlal Nehru Technological University - Gurajada Vizianagaram </div>
        <div className="text-center text-sm sm:text-3xl font-bold text-slate-50  mb-5 ">JNTU-GV College of Engineering Vizianagaram (A)</div>
        <div className="text-center text-lg sm:text-3xl font-bold text-slate-50 mt-10 ">Department of Civil Engineering </div>

      </div>
      {/* Hero */}
      <section className="text-center">
                <div className="text-center text-4xl font-bold text-amber-200 m-2 mb-8 mt-10">Welcome to</div>
        <img src="/pratistha logo.png" alt="pratistha2026"  className=" mx-auto w-[90%] sm:w-[75%] md:w-[65%] lg:w-[55%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"/>

        <p  className="mt-5 text-gray-300 max-w-xl mx-auto">
          Annual Technical & Cultural Fest – Innovation, Creativity and Technology under one grand celebration.
        </p>
        <div className="text-3xl text-orange-300 font-bold mt-10 mb-20 sm:mb-10  "> March 10th & 11th</div>
      </section>
      </div>
      {/* About College */}
      <section id="about-college" className="p-0 sm:pt-25 text-center wrap-break-word text-xs sm:text-lg {styles.block}">
        <SectionTitle variant="green">About the College</SectionTitle>
<div className="flex justify-center mt-2">
        <GlassBox>
          JNTU College of Engineering, Vizianagaram established in the year 2007 as a constituent of JNTU Kakinada.
           Jawaharlal Nehru Technological University Gurajada Vizianagaram come into existence as separate University. 
           The university is spread across six districts.
            There are 2 constituent colleges and 37 affiliated colleges under its jurisdiction and cateri
             -ng education indifferent Engineering, Pharmacy and Management departments.
          </GlassBox>
        </div>
      </section>
      {/* About College */}
      <section id="about-Civil" className="p-0 sm:pt-25 text-center wrap-break-word text-xs sm:text-lg mb-5 {styles.block}">
        <SectionTitle variant="orange">Civil Engineering Department</SectionTitle>
<div className="flex justify-center">
        <GlassBox>
          The Civil Engineering Department at Jawaharlal Nehru Technological University - Gurajada Vizianagaram is a hub of academic excellence, innovation, and practical learning. Commited to the 
          nuturing of future leaders in the field of Civil Engineering, the department offers a comprehensive curriculum that combines theoratical knowledge with hands-on experience. Reowned for its 
          state-of-the-art infrastructure and cutting-edge laboratories, the department provides students with a conductice environment for researh and development
        </GlassBox>
        </div>
      </section>

       <section id="about-event" className="p-0 sm:pt-25 text-center wrap-break-word text-xs sm:text-lg {styles.block}">
        <SectionTitle variant="violet">About the Event</SectionTitle>
<div className="flex justify-center">
        <GlassBox>
          Pratistha is the Two day National-level Technical Fest organized by the Department of Civil Engineering in which competition is conducted in various Technical and Non-Technical events encourages students
          to participate and showcase their talents. Students put in their best entry learning how to manage time effectively priotirize work, follow a schdule 
        </GlassBox>
        </div>
      </section>


      {/* Workshops */}
     <section className="text-center {styles.block}" id="workshops">
  <SectionTitle variant="cyan">Workshops</SectionTitle>

  <div className="flex justify-center w-full">
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 text-center">
      {workshops.map((t) => (
        <Link
          key={t.title}
          href={`/workshops/${getSlug(t.title)}`}
          className="block"
        >
          <GlowCard
            title={t.title}
            img={t.img}
          />
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* Technical Events */}
     <section id="technical-events" className="pt-25 text-center {styles.block}">
  <SectionTitle variant="blue">Technical Events</SectionTitle>

  <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
    {technical.map((t, i) => (
      <Link
        key={t.title}
        href={`/technicals/${getSlug(t.title)}`}
        className="block"
      >
        <MiniCard
          title={t.title}
          img={t.img}
        />
      </Link>
    ))}
  </div>
</section>


      {/* Non-Technical Events */}
      <section id="non-technical-events" className="pt-25 text-center {styles.block}">
   <SectionTitle variant="pink">Non-Technical Events</SectionTitle>


  <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 {styles.block}">
    {nonTechnical.map((t, i) => (
      <Link
        key={t.title}
        href={`/nontech/${getSlug(t.title)}`}
        className="block"
      >
        <MiniCard
          title={t.title}
          img={t.img}
        />
      </Link>
    ))}
  </div>
</section>

      {/* Accommodation */}
<section id="accommodation" className="pt-25 text-center mt-0 {styles.block}">
  <SectionTitle variant="green">Accommodation</SectionTitle>

  <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1 text-justify text-2xl sm:m-10 mt-10 ">

    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 ">
      <h3 className="text-lg font-semibold mb-2"></h3>
      <p className="text-sm text-gray-300 mb-2">
          We're thrilled to offer 2 DAYS ACCOMMODATION for the Participants of Pratistha-2k26! Enjoy a Comfortable Stay. delecious meals,
          and a vibrant campus atmosphere 
              </p>
      <p className="text-base text-orange-300 mb-2 text-center font-bold">
          Dates: March 10th & 11th
              </p>
      <p className="text-sm text-gray-300 mb-2">
          Location: Jntugv college, Dwarapudi, Vizianagaram, Andhra Pradesh 535003. Limited slots available!
              </p>
      <p className="text-sm text-gray-300 mb-2">

            <a href="tel:7569864639" className="text-cyan-400 font-bold hover:underline m-2 text-md">
  Contact us: 7569864639 
</a>
               for more Details . Don't miss out -- see you soon
              </p>
      <p className="text-xs text-gray-400">
        ✔ Shared rooms • ✔ Basic beds • ✔ Drinking water
      </p>
    </div>



    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5">
      <h3 className="text-lg font-semibold mb-2">Important Instructions</h3>
      <ul className="text-sm text-gray-300 list-none pl-5 space-y-1">
        <li>Accommodation is available on prior request only.</li>
        <li>Participants must carry college ID card.</li>
        <li>Reporting time will be shared after registration.</li>
      </ul>
    </div>
    
          <Link
  href="/accommodation"
  className="inline-block mt-4 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-cyan-300 hover:bg-cyan-400/20 text-center"
>
  Register for accommodation
</Link>

  </div>
</section>


      {/* Sponsors */}
      <section id="sponsors" className="text-center {styles.block}">
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
            {[...sponsors , ...sponsors].map((s, i) => (
              <SponsorCard
                key={i}
                title={s}
                img="/sponser/sponser1.jpeg"
              />
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* About Event */}
     

      {/* Coordinators */}
<section id="coordinators" className="text-center {styles.block}">
  {/* Coordinators */}
<section id="coordinators" className="text-center {styles.block}">
  <SectionTitle variant="cyan">Coordinators</SectionTitle>

  <div className="grid grid-cols-2 gap-4 sm:grid-cols- md:grid-cols-5 lg:grid-cols-8">
    {coordinators.map((c, i) => (
      <a
        key={i}
        href={c.contact}
        className="block"
      >
        <CoordinatorCard
          name={c.name}
          img={c.img}
          coor = {c.coor}

        />
      </a>
    ))}
  </div>
  {/* <div className="fixed top-6 right-6 z-[9999]"> */}
  <div className="rounded-xl border border-cyan-400/40 bg-black/40 backdrop-blur-md px-5 py-2 shadow-xl mt-20 sm:mx-100 mx-20 md:mx-20">
    <p className="text-white-300 text-sm sm:text-base font-semibold ">
      👥 Total Visitors: {count}
    </p>
  </div>
{/* </div> */}
</section>
</section>


      {/* ---------------- Footer Section ---------------- */}
      {/* Visitor Counter */}


<section className="mt-24 pt-12 border-t border-white/10 text-center space-y-8 {styles.block}">



  {/* Social Media Buttons */}
  <div>
    <h3 className="text-lg font-semibold mb-4 text-gray-300">
      Connect With Us
    </h3>

    <div className="flex justify-center gap-6 flex-wrap">
      <a
        href="http://www.youtube.com/@pratistha2k26"
        target="_blank"
        className="rounded-lg border border-red-500/30 bg-red-500/10 px-6 py-2 text-red-400 hover:bg-red-500/20 transition"
      >
        YouTube
      </a>

      <a
        href="https://www.instagram.com/pratistha_2k26?utm_source=qr&igsh=MTFpN2RjZGd6bmJrdQ=="
        target="_blank"
        className="rounded-lg border border-pink-500/30 bg-pink-500/10 px-6 py-2 text-pink-400 hover:bg-pink-500/20 transition"
      >
        Instagram
      </a>

      <a
        href="mailto:pratistha2k26@gmail.com"
        className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-6 py-2 text-amber-300 hover:bg-amber-400/20 transition"
      >
        Gmail
      </a>
    </div>
  </div>

  {/* Coordinator Access Buttons */}
  <div className="pt-8">
    <h3 className="text-sm text-gray-400 mb-3">
      <a href="/coordinators/dashboard">Coordinator Access</a>
    </h3>


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
      <img src={img} className="h-20 w-full object-coverb m-2" alt={title} />
      {/* <div className="p-2 text-center text-xs text-gray-200">{title}</div> */}
    </div>
  );
}

function CoordinatorCard({ name, img , coor}: { name: string; img: string , coor: string}) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-2">
      <img src={img} className="h-16 w-16 rounded-full object-cover mb-2" alt={name} />
      <p className="text-sm font-medium">{name}</p>
      <p className="text-md text-blue-300 font-bold">{coor}</p>
    </div>
  );
}

function GlassBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-2 sm:p-6  text-gray-200 leading-relaxed text-justify">
      {children}
    </div>
  );
}
