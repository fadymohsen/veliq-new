"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects", count: "11" },
  { label: "Pricing",  href: "/pricing"  },
];

function DotsIcon() {
  return (
    <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden>
      <circle cx="2" cy="3" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="8" cy="3" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="14" cy="3" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 40) {
        setCompact(false);
      } else if (y > lastY + 4) {
        setCompact(true);
      } else if (y < lastY - 4) {
        setCompact(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const expanded = !compact || hovered;

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          className="pointer-events-auto flex items-center rounded-full"
          style={{
            backgroundColor: "rgba(18,18,18,0.96)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.45)",
            padding: "6px 6px",
            gap: "2px",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center rounded-full hover:bg-white/10 transition-colors"
            style={{ padding: "5px 12px" }}
          >
            <Image
              src="/branding/colored-logo.png"
              alt="VELIQ"
              width={72}
              height={24}
              className="object-contain"
              style={{ height: "22px", width: "auto" }}
            />
          </Link>

          {/* Expanded: links + contact */}
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="expanded"
                className="hidden md:flex items-center gap-1"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="w-px h-4 mx-1" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-0.5 rounded-full transition-colors whitespace-nowrap ${
                      pathname === link.href
                        ? "text-white bg-white/10"
                        : "text-[rgb(201,201,201)] hover:text-white hover:bg-white/8"
                    }`}
                    style={{ fontSize: "13px", fontWeight: 500, padding: "7px 14px" }}
                  >
                    {link.label}
                    {link.count && (
                      <sup className="text-[rgb(99,102,241)]" style={{ fontSize: "9px", fontWeight: 700 }}>
                        {link.count}
                      </sup>
                    )}
                  </Link>
                ))}

                <div className="w-px h-4 mx-1" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

                <Link
                  href="/contact"
                  className="flex items-center rounded-full text-white hover:brightness-110 transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: "rgb(99,102,241)",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "7px 18px",
                  }}
                >
                  Contact
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                className="hidden md:flex items-center"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="flex items-center gap-px text-white/60" style={{ padding: "7px 10px" }}>
                  <DotsIcon />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer"
            style={{ padding: "7px 10px" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block bg-white origin-center"
              style={{ width: "16px", height: "1.5px" }}
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block bg-white"
              style={{ width: "16px", height: "1.5px" }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block bg-white origin-center"
              style={{ width: "16px", height: "1.5px" }}
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </motion.nav>
      </header>

      {/* Full-page mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: "rgb(8,8,8)" }}
          >
            {/* Spacer for navbar */}
            <div style={{ height: 80 }} />

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 py-4 transition-colors ${
                      pathname === link.href ? "text-white" : "text-[rgb(120,120,120)] hover:text-white"
                    }`}
                    style={{
                      fontSize: "clamp(28px, 7vw, 42px)",
                      fontWeight: 600,
                      letterSpacing: "-0.04em",
                      borderBottom: "1px solid rgb(22,22,22)",
                    }}
                  >
                    {link.label}
                    {link.count && (
                      <sup style={{ fontSize: "14px", fontWeight: 700, color: "rgb(99,102,241)" }}>
                        {link.count}
                      </sup>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: NAV_LINKS.length * 0.05 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-full text-white font-semibold w-full hover:brightness-110 transition-all"
                  style={{ backgroundColor: "rgb(99,102,241)", fontSize: "16px", fontWeight: 600, padding: "16px 0" }}
                >
                  Contact Us
                </Link>
              </motion.div>
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="px-8 pb-10 flex items-center justify-between"
            >
              <a
                href="mailto:admin@veliq.co"
                style={{ fontSize: "13px", fontWeight: 500, color: "rgb(99,102,241)" }}
                className="hover:opacity-75 transition-opacity"
              >
                admin@veliq.co
              </a>
              <span style={{ fontSize: "12px", color: "rgb(50,50,50)" }}>
                &copy; {new Date().getFullYear()} VELIQ
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
