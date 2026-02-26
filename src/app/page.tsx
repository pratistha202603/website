"use client";

import { motion } from "framer-motion";

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

export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col flex-wrap items-center justify-center px-4 text-center">

      <span className="font-inter mb-1 text-lg sm:text-xl md:text-2xl tracking-widest mt-30 uppercase bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent px-5 py-2 rounded-full border border-white/15 backdrop-blur-md">
        Welcome to the Annual Tech Fest
      </span>

      <img src="/pratistha logo.png" alt="Pratistha 2K26" />

      <a
        href="/home"
        className="w-80 h-14 text-2xl text-slate-100 font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 transition hover:scale-105 flex items-center justify-center mt-10"
      >
        Explore Fest
      </a>

    </section>
  );
}