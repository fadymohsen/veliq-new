"use client";

import Link from "next/link";
import Image from "next/image";

const INDIGO = "rgb(99,102,241)";

const MENU_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing",  href: "/pricing" },
  { label: "Projects", href: "/projects" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",      href: "/legal/privacy" },
  { label: "Terms & Conditions",  href: "/legal/terms" },
  { label: "Refund Policy",       href: "/legal/refund" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/veliq.co",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/veliq.co/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/veliq-co",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

function scrollToTop() {
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer
      className="w-full flex flex-col overflow-hidden"
      style={{ backgroundColor: "rgb(0,0,0)" }}
    >
      {/* ── Top content ──────────────────────────────────────────── */}
      <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-12 px-8 pt-16 pb-12">

        {/* Left: CTA + contact */}
        <div className="flex flex-col gap-6 max-w-xs">
          <div className="flex flex-col gap-1">
            <span
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}
            >
              Ready to build?
            </span>
            <h3
              className="text-white"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 28px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.2 }}
            >
              Let&apos;s create something<br />that moves people.
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="mailto:admin@veliq.co"
              style={{ fontSize: "14px", fontWeight: 600, color: INDIGO, letterSpacing: "-0.01em" }}
              className="hover:opacity-75 transition-opacity w-fit"
            >
              admin@veliq.co
            </a>
            <a
              href="tel:+201551164671"
              style={{ fontSize: "14px", fontWeight: 400, color: "rgb(80,80,80)" }}
              className="hover:text-white transition-colors w-fit"
            >
              +20 155 116 4671
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity w-fit"
            style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: "50%",
              border: "1px solid rgb(38,38,38)", color: "white", fontSize: "14px",
            }}>↑</span>
            Back to top
          </button>
        </div>

        {/* Right: nav + social */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
              Menu
            </span>
            <ul className="flex flex-col gap-[10px]">
              {MENU_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ fontSize: "14px", fontWeight: 500, color: "rgb(100,100,100)" }}
                    className="hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
              Legal
            </span>
            <ul className="flex flex-col gap-[10px]">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ fontSize: "14px", fontWeight: 500, color: "rgb(100,100,100)" }}
                    className="hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
              Social
            </span>
            <div className="flex flex-col" style={{ borderTop: "1px solid rgb(22,22,22)" }}>
              {SOCIAL_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 transition-colors duration-200"
                  style={{ borderBottom: "1px solid rgb(22,22,22)", color: "rgb(80,80,80)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="group-hover:text-white transition-colors duration-200">
                      {l.icon}
                    </span>
                    <span
                      className="group-hover:text-white transition-colors duration-200"
                      style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.01em" }}
                    >
                      {l.label}
                    </span>
                  </div>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div style={{ height: "1px", backgroundColor: "rgb(18,18,18)", margin: "0 32px" }} />

      {/* ── Bottom brand row ─────────────────────────────────────── */}
      <div className="w-full flex items-center justify-between px-8 py-6">
        <Image
          src="/branding/colored-logo.png"
          alt="VELIQ"
          width={100}
          height={32}
          className="object-contain"
          style={{ opacity: 0.85 }}
        />
        <span style={{ fontSize: "12px", fontWeight: 400, color: "rgb(50,50,50)", letterSpacing: "-0.01em" }}>
          © {new Date().getFullYear()} VELIQ. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
