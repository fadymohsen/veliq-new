"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const PLANS = [
  {
    name: "Design Support",
    description: "Perfect for startups needing consistent social and marketing assets.",
    price: "1,999",
    cta: "Get Started",
    href: "/checkout/design-support",
    bg: "rgb(14,14,14)",
    mutedColor: "rgba(255,255,255,0.5)",
    dividerColor: "rgba(255,255,255,0.1)",
    ctaBg: "rgb(99,102,241)",
    dim: false,
    features: [
      "One active request at a time",
      "2-day average turnaround",
      "Social media & Ad creatives",
    ],
  },
  {
    name: "Web & Growth",
    description: "Comprehensive support for growing companies, including web development.",
    price: "4,499",
    cta: "Scale Now",
    href: "/checkout/web-and-growth",
    bg: "rgb(14,14,14)",
    mutedColor: "rgba(255,255,255,0.5)",
    dividerColor: "rgba(255,255,255,0.1)",
    ctaBg: "rgb(99,102,241)",
    dim: false,
    features: [
      "Two active requests at a time",
      "Framer development & updates",
      "Landing page optimization",
      "Basic SEO setup",
      "Presentation decks",
      "Stock photo sourcing",
    ],
  },
  {
    name: "Agency Partner",
    description: "A fully dedicated design team integrated directly into your workflow.",
    price: "8,999",
    cta: "Book a Call",
    href: "/checkout/agency-partner",
    bg: "rgb(14,14,14)",
    mutedColor: "rgba(255,255,255,0.4)",
    dividerColor: "rgba(255,255,255,0.08)",
    ctaBg: "rgb(32,32,32)",   // dark CTA for "premium / contact us" tier
    dim: true,                 // card appears at 65% opacity — de-emphasised
    features: [
      "Four active requests at a time",
      "Priority support via Slack",
      "Unlimited brands",
      "Advanced 3D & Motion graphics",
      "Strategy workshops",
      "Weekly sync calls",
      "Dedicated Project Manager",
      "Same-day turnaround on small tasks",
    ],
  },
] as const;

const FADE = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section ref={ref} className="w-full bg-black rounded-[30px] section-padding overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-20">

        {/* Heading */}
        <motion.h2
          className="heading-1 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          Pricing.
        </motion.h2>

        {/* Testimonial row */}
        <motion.div
          className="flex flex-col md:flex-row items-start justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="flex items-center gap-3 shrink-0">
            <Image
              src="https://framerusercontent.com/images/Yu9jCAlIsZa9Zjjiuq1z4zV4JBo.png"
              alt="Michael Williams"
              width={54}
              height={54}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col gap-0.5">
              <span className="para-16 text-white">Michael Williams</span>
              <span className="para-14" style={{ color: "rgba(255,255,255,0.6)" }}>
                CEO @Vixopedia
              </span>
            </div>
          </div>
          <p className="para-32 text-white md:w-[55%]">
            Most agencies sell time. We sell displacement. Choose a high-impact
            sprint to accelerate your market position, or partner with us for the long haul.
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="flex flex-col md:flex-row gap-[10px]">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="flex-1 rounded-[20px] p-8 flex flex-col gap-6"
              style={{
                backgroundColor: plan.bg,
                // Agency Partner card — visually de-emphasised
                opacity: plan.dim ? 0.65 : 1,
              }}
              variants={FADE}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              {/* Name + description */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-white"
                  style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em" }}
                >
                  {plan.name}
                </h3>
                <p style={{ fontSize: "13px", fontWeight: 400, color: plan.mutedColor, lineHeight: 1.55 }}>
                  {plan.description}
                </p>
              </div>

              {/* Price — superscript $ + large number + /Month */}
              <div className="flex items-baseline" style={{ gap: "2px" }}>
                <sup
                  className="text-white"
                  style={{ fontSize: "18px", fontWeight: 500, lineHeight: 1 }}
                >
                  $
                </sup>
                <span
                  className="text-white"
                  style={{ fontSize: "60px", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {plan.price}
                </span>
                <span style={{ fontSize: "13px", fontWeight: 400, color: plan.mutedColor, marginLeft: "6px" }}>
                  / Month
                </span>
              </div>

              {/* CTA — full width pill */}
              <Link
                href={plan.href}
                className="w-full flex items-center justify-center rounded-full text-white font-semibold hover:brightness-110 transition-all"
                style={{
                  backgroundColor: plan.ctaBg,
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "15px 0",
                }}
              >
                {plan.cta}
              </Link>

              {/* Divider */}
              <div className="w-full h-px" style={{ backgroundColor: plan.dividerColor }} />

              {/* Feature list */}
              <div className="flex flex-col gap-3">
                <span className="text-white" style={{ fontSize: "15px", fontWeight: 700 }}>
                  What&apos;s included
                </span>
                <ul className="flex flex-col gap-[10px]">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      {/* YELLOW vertical bar — confirmed from frame 6 pixel analysis */}
                      <span
                        className="shrink-0"
                        style={{
                          display: "inline-block",
                          width: "2px",
                          height: "14px",
                          marginTop: "3px",
                          borderRadius: "2px",
                          backgroundColor: "rgb(255,210,0)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.75)",
                          lineHeight: 1.45,
                        }}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
