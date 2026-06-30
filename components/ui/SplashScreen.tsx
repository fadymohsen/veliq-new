"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase("reveal"), 5200);
    const doneTimer = setTimeout(() => setPhase("done"), 6000);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-all duration-600 ${
        phase === "reveal" ? "opacity-0 -translate-y-full" : "opacity-100"
      }`}
    >
      {/* Glowing orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] loading-orb-pulse" />
        <div className="absolute left-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-indigo-600/15 blur-[100px] loading-orb-float" />
        <div className="absolute right-1/4 bottom-1/3 h-[200px] w-[200px] rounded-full bg-sky-600/10 blur-[100px] loading-orb-float-reverse" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo + Animation */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo mark */}
        <div className="relative mb-14">
          {/* Outer ring */}
          <div className="loading-ring absolute -inset-6 rounded-full border border-white/[0.08]" />
          <div className="loading-ring-spin absolute -inset-6 rounded-full border-t border-purple-500/40" />

          {/* Inner glow */}
          <div className="absolute -inset-3 rounded-full bg-purple-500/10 blur-xl loading-inner-glow" />

          {/* The V mark image */}
          <div className="relative h-24 w-24 loading-ring">
            <Image
              src="/branding/colored-icon.png"
              alt="VELIQ"
              width={520}
              height={528}
              className="h-24 w-24 object-contain drop-shadow-[0_0_20px_rgba(123,45,142,0.4)]"
              priority
            />
          </div>
        </div>

        {/* VELIQ logo */}
        <div className="overflow-hidden loading-text">
          <Image
            src="/branding/colored-logo.png"
            alt="VELIQ"
            width={921}
            height={263}
            className="h-10 w-auto brightness-150"
          />
        </div>

        {/* Tagline — word-by-word reveal */}
        <div className="mt-4 flex items-center gap-[0.35em] overflow-hidden">
          {"Precision at the speed of ambition".split(" ").map((word, i) => (
            <span
              key={i}
              className="loading-tagline-word inline-block text-xs font-medium uppercase tracking-[0.15em] text-slate-500"
              style={{ animationDelay: `${2.6 + i * 0.15}s` }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Gradient underline swoosh */}
        <div className="mt-3 h-px w-56 overflow-hidden">
          <div className="loading-tagline-line h-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>

        {/* Loading bar */}
        <div className="mt-10 h-[1px] w-48 overflow-hidden rounded-full bg-white/5">
          <div className="loading-bar h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400" />
        </div>
      </div>
    </div>
  );
}
