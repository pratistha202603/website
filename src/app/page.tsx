"use client";

import { motion } from "framer-motion";
import Image from "next/image"
import { useEffect, useState } from "react";

const words = [
  "PRATISTHA",
  "2K26",
  "ANNUAL",
  "TECH",
  "FEST",
  "Civil",
  "EVENTS",
  "CHALLENGES",
];

/* ================= Countdown Component ================= */

function CountdownTimer() {
  const eventDate = new Date("2026-03-10T09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center text-2xl font-bold text-green-400">
        🎉 Pratistha 2K26 is Live!
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 sm:gap-8 text-center">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-cyan-400/30 bg-black/40 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 shadow-lg min-w-[70px]"
        >
          <div className="text-xl sm:text-3xl font-bold text-cyan-300">
            {value}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 uppercase">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}


export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col flex-wrap items-center justify-center  text-center">

      <span className="font-inter mb-1 text-lg sm:text-xl md:text-2xl tracking-widest sm:mt-30 uppercase bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent px-5 py-2 rounded-full border border-white/15 backdrop-blur-md">
        Welcome to the Annual Tech Fest
      </span>
<Image
  src="/pratistha logo.png"
  alt="pratistha2026"
  width={800}
  height={400}
  className="mx-auto w-[90%] sm:w-[75%] md:w-[65%] lg:w-[55%]"
/>
<div className="text-3xl text-orange-300 font-bold mt-5 sm:mt-0 mb-20 sm:mb-10">
  March 10th & 11th
</div><div className="mt-0x">
  <CountdownTimer />
</div>

      <a
        href="/home"
        className="w-80 h-14 text-2xl text-slate-100 font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 transition hover:scale-105 flex items-center justify-center mt-10"
      >
        Explore Fest
      </a>

    </section>
  );
}