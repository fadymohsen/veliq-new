"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: "100vh", backgroundColor: "rgb(0,0,0)" }}
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(800px, 120vw)",
            height: "min(800px, 120vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-24 text-center max-w-[860px]">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/branding/colored-logo.png"
            alt="VELIQ"
            width={180}
            height={58}
            priority
            className="object-contain"
            style={{ height: "clamp(36px, 6vw, 52px)", width: "auto" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-white"
          style={{
            fontSize: "clamp(2.2rem, 7vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
          }}
        >
          Precision at the
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, rgb(99,102,241), rgb(168,85,247), rgb(45,212,191))",
            }}
          >
            Speed of Ambition.
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            maxWidth: "48ch",
            letterSpacing: "-0.01em",
          }}
        >
          We build websites, optimize search rankings, and provide ongoing support
          — so you can focus on growing your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full text-white hover:brightness-110 transition-all"
            style={{
              backgroundColor: "rgb(99,102,241)",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 32px",
              letterSpacing: "-0.01em",
            }}
          >
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full text-white hover:bg-white/10 transition-all"
            style={{
              fontSize: "15px",
              fontWeight: 500,
              padding: "14px 28px",
              border: "1px solid rgba(255,255,255,0.12)",
              letterSpacing: "-0.01em",
            }}
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
        >
          {["10+ Projects Delivered", "Clients across 4 Countries", "SEO & Development"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: "rgb(99,102,241)",
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.3)", letterSpacing: "-0.01em" }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <motion.div
          className="rounded-full"
          style={{ width: 24, height: 38, border: "1.5px solid rgba(255,255,255,0.15)" }}
        >
          <motion.div
            className="mx-auto mt-2 rounded-full"
            style={{ width: 3, height: 8, backgroundColor: "rgba(255,255,255,0.3)" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
