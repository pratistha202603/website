"use client";

import { useEffect, useState } from "react";

type Point = { x: number; y: number };

export default function CursorThread() {
  const [points, setPoints] = useState<Point[]>([]);
  const [active, setActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const maxPoints = 5;

  // ✅ Detect desktop (no touch devices)
  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    setIsDesktop(!hasTouch);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let timeout: any;

    const move = (e: MouseEvent) => {
      setActive(true);

      setPoints((prev) => {
        const next = [...prev, { x: e.clientX, y: e.clientY }];
        return next.slice(-maxPoints);
      });

      clearTimeout(timeout);
      timeout = setTimeout(() => setActive(false), 80);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      clearTimeout(timeout);
    };
  }, [isDesktop]);

  // ❌ Don't render anything on mobile
  if (!isDesktop) return null;

  const path =
    points.length > 1
      ? "M " + points.map((p) => `${p.x} ${p.y}`).join(" L ")
      : "";

  return (
    <>
      {/* subtle glow background */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-200"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(500px at center, rgba(99,102,241,0.06), transparent 70%)",
        }}
      />

      {/* thread */}
      <svg
        className="pointer-events-none fixed inset-0 z-10"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient
            id="threadGrad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="120"
            y2="0"
          >
            <stop offset="0%" stopColor="rgba(34,211,238,0.2)" />
            <stop offset="50%" stopColor="rgba(99,102,241,0.9)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0.9)" />
          </linearGradient>

          <filter id="threadGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={path}
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#threadGlow)"
        />
      </svg>
    </>
  );
}