"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center text-center px-4 sm:mt-30 mt-20">

      {/* Welcome Banner */}
      <span className="font-inter mb-3 text-lg sm:text-xl md:text-2xl tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent px-5 py-2 rounded-full border border-white/15 backdrop-blur-md">
        Thank You for Making It Grand
      </span>

      {/* Logo */}
      <Image
        src="/pratistha logo.png"
        alt="Pratistha 2K26 Annual Technical Fest JNTU-GV Vizianagaram"
        width={800}
        height={400}
        className="mx-auto w-[90%] sm:w-[75%] md:w-[65%] lg:w-[55%]"
      />

      {/* Event Completed Message */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-orange-300 mt-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎉 Pratistha 2K26 Successfully Completed
      </motion.h1>

      <p className="text-gray-300 max-w-2xl mt-4 text-lg">
        The Annual Technical Fest of JNTU-GV Vizianagaram was successfully held
        on <span className="text-cyan-300 font-semibold">March 10 & 11, 2026</span>.
        We thank all participants, coordinators, volunteers and judges for
        making this event a grand success.
      </p>

      {/* Highlights */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

        {/* <div className="bg-black/40 border border-cyan-400/30 p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-cyan-400">500+</h2>
          <p className="text-gray-300 mt-2">Participants</p>
        </div> */}

        <div className="bg-black/40 border border-cyan-400/30 p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-indigo-400">10+</h2>
          <p className="text-gray-300 mt-2">Events</p>
        </div>

        <div className="bg-black/40 border border-cyan-400/30 p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-emerald-400">2</h2>
          <p className="text-gray-300 mt-2">Days of Innovation</p>
        </div>

      </div>

      {/* Buttons */}
      {/* <div className="flex gap-4 mt-10 flex-wrap justify-center">

        <a
          href="/gallery"
          className="w-64 h-12 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 flex items-center justify-center hover:scale-105 transition"
        >
          View Event Gallery
        </a>

        <a
          href="/results"
          className="w-64 h-12 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 flex items-center justify-center hover:scale-105 transition"
        >
          See Winners & Results
        </a>

      </div> */}

      {/* Next Year Announcement */}
      <div className="mt-12 text-gray-400 text-sm mb-10">
        🚀 Stay tuned for <span className="text-cyan-300 font-semibold">Pratistha 2K27</span>
      </div>

    </section>
  );
}