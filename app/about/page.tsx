"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

/* ── Palette ──────────────────────────────────────────────────────── */
const INDIGO = "rgb(99,102,241)";
const PURPLE = "rgb(168,85,247)";
const TEAL   = "rgb(45,212,191)";
const PINK   = "rgb(236,72,153)";
const SKY    = "rgb(56,189,248)";
const GREEN  = "rgb(74,222,128)";

/* ── Data ─────────────────────────────────────────────────────────── */
const STATS = [
  { value: "4",    label: "Countries",     color: INDIGO  },
  { value: "15+",  label: "Happy Clients", color: PURPLE  },
  { value: "100%", label: "Satisfaction",  color: TEAL    },
  { value: "4.8×", label: "Avg ROAS",      color: GREEN   },
];

/* Equation tokens — "Elite" is ONE token rendered with two inner spans */
const EQ_TOKENS: { node: React.ReactNode; delay: number }[] = [
  { node: <span style={{ color: "white", fontWeight: 800 }}>VELIQ</span>, delay: 0 },
  { node: <span style={{ color: "rgba(255,255,255,0.3)" }}>=</span>, delay: 0.12 },
  { node: <span style={{ color: PURPLE, fontWeight: 800 }}>Velocity</span>, delay: 0.24 },
  { node: <span style={{ color: "rgba(255,255,255,0.3)" }}>+</span>, delay: 0.36 },
  {
    node: (
      <span style={{ fontWeight: 800 }}>
        <span style={{ color: INDIGO }}>El</span>
        <span style={{ color: TEAL }}>ite</span>
      </span>
    ),
    delay: 0.48,
  },
  { node: <span style={{ color: "rgba(255,255,255,0.3)" }}>+</span>, delay: 0.60 },
  { node: <span style={{ color: TEAL, fontWeight: 800 }}>IQ</span>, delay: 0.72 },
];

const NAME_CARDS = [
  { letter: "V",  bg: "linear-gradient(135deg,rgb(109,40,217),rgb(168,85,247))", title: "Velocity",              desc: "We move with urgency and intent",      color: PURPLE },
  { letter: "E",  bg: "linear-gradient(135deg,rgb(49,46,129),rgb(79,70,229))",   title: "Elite",                 desc: "Premium standards, not premium ego",  color: INDIGO },
  { letter: "IQ", bg: "linear-gradient(135deg,rgb(15,118,110),rgb(20,184,166))", title: "Intelligence & Precision", desc: "Data-driven, measured, deliberate", color: TEAL   },
];

const VALUES = [
  { title: "Speed",           desc: "We move fast without cutting corners. Every deadline is a promise, not a suggestion.",                      color: PINK  },
  { title: "Accuracy",        desc: "Every deliverable, every decision, every client interaction is measured against real outcomes.",             color: INDIGO },
  { title: "Transparency",    desc: "No black boxes. Weekly pulse, monthly strategy, quarterly review. You always know where you stand.",         color: TEAL   },
  { title: "Dedication",      desc: "Every client gets a dedicated team. Not tasks. Not packages. A team that owns your digital presence.",       color: PURPLE },
  { title: "Intelligence",    desc: "We educate first, sell second. Every claim connects to a result or a client benefit.",                       color: SKY    },
  { title: "Professionalism", desc: "Confident, direct, warm. Never arrogant. Never vague. We speak with precision and care.",                   color: PINK   },
];

const PROBLEMS = [
  { problem: '"Nothing is connected"',          solution: "Full-channel alignment under one dedicated team: web, social, ads, brand — all moving together.",                                                color: INDIGO },
  { problem: '"I don\'t know what they\'re doing"', solution: "Radical transparency through educated reporting. Weekly pulse + monthly strategy + quarterly review.",                                      color: PURPLE },
  { problem: '"I can\'t measure the growth"',   solution: "Outcome-based KPIs tied to real business metrics: bookings, qualified leads, revenue — not vanity numbers.",                                   color: TEAL   },
];

/* ── Shared animation helpers ─────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  };
}

function Label({ children, color = "rgba(255,255,255,0.3)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color }}>
      {children}
    </span>
  );
}

function SectionHeading({ children, inView }: { children: React.ReactNode; inView: boolean }) {
  return (
    <motion.h2
      className="text-white"
      style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1.1 }}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.1, ease }}
    >
      {children}
    </motion.h2>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function AboutPage() {

  const heroRef    = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLElement>(null);
  const whoRef     = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const mvRef      = useRef<HTMLElement>(null);
  const valRef     = useRef<HTMLElement>(null);
  const ctaRef     = useRef<HTMLElement>(null);

  const heroIn    = useInView(heroRef,    { once: true, margin: "0px 0px -80px 0px" });
  const nameIn    = useInView(nameRef,    { once: true, margin: "0px 0px -80px 0px" });
  const whoIn     = useInView(whoRef,     { once: true, margin: "0px 0px -80px 0px" });
  const problemIn = useInView(problemRef, { once: true, margin: "0px 0px -80px 0px" });
  const mvIn      = useInView(mvRef,      { once: true, margin: "0px 0px -80px 0px" });
  const valIn     = useInView(valRef,     { once: true, margin: "0px 0px -80px 0px" });
  const ctaIn     = useInView(ctaRef,     { once: true, margin: "0px 0px -80px 0px" });

  return (
    <main className="bg-black min-h-screen pt-16">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="section-padding max-w-[1200px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-5 max-w-[760px]">
          <motion.div {...fadeUp(0)} animate={heroIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}>
            <Label color={TEAL}>About VELIQ</Label>
          </motion.div>
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              style={{ fontSize: "clamp(3.5rem,7.5vw,6.9rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.05 }}
              initial={{ y: "100%" }} animate={heroIn ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.08, ease }}
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, rgb(168,85,247), rgb(99,102,241), rgb(45,212,191))" }}>
                Precision
              </span>{" "}
              <span style={{ color: "white" }}>at the</span>
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, rgb(99,102,241), rgb(45,212,191), rgb(56,189,248))" }}>
                Speed of Ambition.
              </span>
            </motion.h1>
          </div>
          <motion.p
            style={{ fontSize: "clamp(1rem,1.5vw,18px)", color: "rgb(100,100,100)", lineHeight: 1.75, maxWidth: "52ch" }}
            initial={{ opacity: 0, y: 16 }} animate={heroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
          >
            Every channel. One direction. We don&apos;t manage your marketing — we own it with you.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-2 rounded-[20px]"
              style={{ backgroundColor: "rgb(12,12,12)", border: "1px solid rgb(26,26,26)", borderTop: `2px solid ${stat.color}`, padding: "clamp(20px,2.5vw,32px)" }}
              initial={{ opacity: 0, y: 24 }} animate={heroIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease }}
            >
              <span style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1, color: stat.color }}>
                {stat.value}
              </span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why The Name ──────────────────────────────────────────── */}
      <section ref={nameRef} className="section-padding max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={nameIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
            <Label color={PURPLE}>Why The Name</Label>
          </motion.div>

          {/* VELIQ = Velocity + Elite + IQ — clip reveal per token */}
          <div className="flex flex-wrap items-baseline justify-center" style={{ gap: "clamp(6px,1vw,16px)", rowGap: 4 }}>
            {EQ_TOKENS.map((token, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1.15 }}>
                <motion.span
                  style={{ display: "inline-block", fontSize: "clamp(2rem,4.5vw,56px)", letterSpacing: "-0.05em" }}
                  initial={{ y: "110%" }}
                  animate={nameIn ? { y: 0 } : {}}
                  transition={{ duration: 0.7, delay: token.delay, ease }}
                >
                  {token.node}
                </motion.span>
              </span>
            ))}
          </div>
        </div>

        {/* Name cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {NAME_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="flex flex-col items-center text-center gap-6 rounded-[24px]"
              style={{ backgroundColor: "rgb(12,12,12)", border: "1px solid rgb(26,26,26)", borderTop: `2px solid ${card.color}`, padding: "clamp(28px,3vw,44px)" }}
              initial={{ opacity: 0, y: 32 }} animate={nameIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.6 + i * 0.1, ease }}
            >
              <div className="flex items-center justify-center rounded-[18px]" style={{ width: 72, height: 72, background: card.bg }}>
                <span style={{ fontSize: card.letter.length > 1 ? "22px" : "28px", fontWeight: 900, color: "white" }}>{card.letter}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em", color: card.color }}>{card.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "rgb(90,90,90)" }}>{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Who We Are ────────────────────────────────────────────── */}
      <section ref={whoRef} className="section-padding max-w-[1200px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0 }} animate={whoIn ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <Label color={SKY}>Who We Are</Label>
          </motion.div>
          <SectionHeading inView={whoIn}>A global boutique agency.</SectionHeading>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {["VELIQ is a global boutique agency operating across Egypt, Saudi Arabia, UAE, and the United States, specializing in web development, app development, branding, UX, and full-stack digital marketing.",
            "Every client gets a dedicated team. Not tasks. Not packages. A team that owns your digital presence, thinks with you, and moves with the speed and precision your business deserves.",
          ].map((text, i) => (
            <motion.p
              key={i}
              style={{ fontSize: "17px", lineHeight: 1.8, color: "rgb(100,100,100)" }}
              initial={{ opacity: 0, y: 20 }} animate={whoIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── The Problem We Solve ──────────────────────────────────── */}
      <section ref={problemRef} className="section-padding max-w-[1200px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0 }} animate={problemIn ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <Label color={SKY}>Why We Exist</Label>
          </motion.div>
          <SectionHeading inView={problemIn}>The problem we solve.</SectionHeading>
          <motion.p
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.75, color: "rgb(100,100,100)" }}
            initial={{ opacity: 0, y: 16 }} animate={problemIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Most growing businesses are stuck between large agencies that treat them like a number on a spreadsheet,
            and freelancers who can&apos;t cover all needs under one roof.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={item.problem}
              className="flex flex-col gap-5 rounded-[20px]"
              style={{ backgroundColor: "rgb(12,12,12)", border: "1px solid rgb(26,26,26)", borderTop: `2px solid ${item.color}`, padding: "clamp(20px,2.5vw,32px)" }}
              initial={{ opacity: 0, y: 28 }} animate={problemIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.3 + i * 0.1, ease }}
            >
              <p style={{ fontSize: "15px", fontWeight: 600, fontStyle: "italic", color: item.color }}>{item.problem}</p>
              <div style={{ height: "1px", backgroundColor: "rgb(26,26,26)" }} />
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgb(120,120,120)" }}>{item.solution}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────── */}
      <section ref={mvRef} className="section-padding max-w-[1200px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0 }} animate={mvIn ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <Label color={PINK}>What Drives Us</Label>
          </motion.div>
          <SectionHeading inView={mvIn}>Mission &amp; Vision.</SectionHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { dot: INDIGO, label: "Mission", labelColor: INDIGO, title: "Engineering Seamless Brand Experiences", body: "VELIQ exists to engineer seamless brand experiences, combining velocity, intelligence, and creative precision, so that every web, app, design, and marketing channel our clients own moves in one unified direction: forward." },
            { dot: TEAL,   label: "Vision",  labelColor: TEAL,   title: "The Most Trusted Growth Architecture Firm", body: "To become the most trusted growth architecture firm for elite brands across four continents, where every digital touchpoint is a deliberate act of precision — and every client engagement raises the standard for what great work looks like." },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              className="flex flex-col gap-5 rounded-[24px]"
              style={{ backgroundColor: "rgb(12,12,12)", border: "1px solid rgb(26,26,26)", borderTop: `2px solid ${card.dot}`, padding: "clamp(24px,3vw,40px)" }}
              initial={{ opacity: 0, y: 28 }} animate={mvIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.12, ease }}
            >
              <div className="flex items-center gap-3">
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: card.dot }} />
                <Label color={card.labelColor}>{card.label}</Label>
              </div>
              <h3 className="text-white" style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.3 }}>{card.title}</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgb(100,100,100)" }}>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────── */}
      <section ref={valRef} className="section-padding max-w-[1200px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <motion.div initial={{ opacity: 0 }} animate={valIn ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <Label color={GREEN}>How We Operate</Label>
          </motion.div>
          <SectionHeading inView={valIn}>Our core values.</SectionHeading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              className="flex flex-col gap-3 rounded-[20px]"
              style={{ backgroundColor: "rgb(12,12,12)", border: "1px solid rgb(26,26,26)", borderTop: `2px solid ${v.color}`, padding: "clamp(20px,2.5vw,32px)" }}
              initial={{ opacity: 0, y: 28 }} animate={valIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.08, ease }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: v.color, letterSpacing: "0.08em" }}>0{i + 1}</span>
              <h3 className="text-white" style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em" }}>{v.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgb(90,90,90)" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="section-padding max-w-[1200px] mx-auto flex flex-col gap-8 items-center text-center">
        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0 }} animate={ctaIn ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <Label color={PURPLE}>Ready?</Label>
          </motion.div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="text-white"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 600, letterSpacing: "-0.05em", maxWidth: "16ch", lineHeight: 1.05 }}
              initial={{ y: "100%" }} animate={ctaIn ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease }}
            >
              Great businesses deserve more than average agencies.
            </motion.h2>
          </div>
          <motion.p
            style={{ fontSize: "18px", fontWeight: 600, color: TEAL }}
            initial={{ opacity: 0, y: 16 }} animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            You deserve more.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={ctaIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.42, ease }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full text-white"
            style={{ backgroundColor: INDIGO, fontSize: "15px", fontWeight: 600, padding: "14px 36px", letterSpacing: "-0.01em" }}
          >
            Get in Touch →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
