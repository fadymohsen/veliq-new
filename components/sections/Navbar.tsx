"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects", count: "10" },
  { label: "Pricing",  href: "/pricing"  },
  { label: "Blog",     href: "/blog"     },
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

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-[20px] overflow-hidden"
            style={{
              backgroundColor: "rgba(18,18,18,0.97)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ul className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-white rounded-xl hover:bg-white/10 transition-colors"
                    style={{ fontSize: "15px", fontWeight: 500, padding: "12px 16px" }}
                  >
                    {link.label}
                    {link.count && (
                      <span className="text-[rgb(99,102,241)]" style={{ fontSize: "11px", fontWeight: 700 }}>
                        ({link.count})
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-full text-white font-semibold w-full"
                  style={{ backgroundColor: "rgb(99,102,241)", fontSize: "14px", padding: "12px 0" }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
