"use client";

import { use, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

type PlanInfo = {
  name: string;
  price: string;
  suffix: string;
  features: string[];
  category: string;
};

const PLANS: Record<string, PlanInfo> = {
  // Homepage plans
  "design-support": {
    name: "Design Support",
    price: "$1,999",
    suffix: "/ Month",
    category: "Monthly Plan",
    features: ["One active request at a time", "2-day average turnaround", "Social media & Ad creatives"],
  },
  "web-and-growth": {
    name: "Web & Growth",
    price: "$4,499",
    suffix: "/ Month",
    category: "Monthly Plan",
    features: ["Two active requests at a time", "Framer development & updates", "Landing page optimization", "Basic SEO setup", "Presentation decks", "Stock photo sourcing"],
  },
  "agency-partner": {
    name: "Agency Partner",
    price: "$8,999",
    suffix: "/ Month",
    category: "Monthly Plan",
    features: ["Four active requests at a time", "Priority support via Slack", "Unlimited brands", "Advanced 3D & Motion graphics", "Strategy workshops", "Weekly sync calls", "Dedicated Project Manager", "Same-day turnaround on small tasks"],
  },
  // Website packages — without hosting
  "simple-website": {
    name: "Simple Website",
    price: "2,500 - 5,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO setup"],
  },
  "portfolio-website": {
    name: "Portfolio Website",
    price: "5,000 - 10,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Custom portfolio layout", "Project showcase gallery", "Animated transitions", "Mobile-first design"],
  },
  "ecommerce-website": {
    name: "E-Commerce Website",
    price: "10,000 - 15,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Product catalog & management", "Shopping cart & checkout", "Payment gateway integration", "Order management dashboard"],
  },
  "services-and-store": {
    name: "Services & Store",
    price: "15,000 - 20,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Service listings & booking", "Online payments & invoicing", "Integrated store", "Admin dashboard"],
  },
  // Website packages — with hosting
  "simple-website-hosting": {
    name: "Simple Website (with Hosting)",
    price: "4,500 - 7,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO setup", "Domain & hosting included"],
  },
  "portfolio-website-hosting": {
    name: "Portfolio Website (with Hosting)",
    price: "10,000 - 16,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Custom portfolio layout", "Project showcase gallery", "Animated transitions", "Mobile-first design", "Domain & hosting included"],
  },
  "ecommerce-website-hosting": {
    name: "E-Commerce Website (with Hosting)",
    price: "18,000 - 25,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Product catalog & management", "Shopping cart & checkout", "Payment gateway integration", "Order management dashboard", "Domain & hosting included"],
  },
  "services-and-store-hosting": {
    name: "Services & Store (with Hosting)",
    price: "25,000 - 35,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Service listings & booking", "Online payments & invoicing", "Integrated store", "Admin dashboard", "Domain & hosting included"],
  },
  // Support plans
  "basic-support": {
    name: "Basic Support",
    price: "500 - 2,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Simple bug fixing & quick patches", "Image & content edits on request", "Website uptime & health monitoring", "Technical guidance & consultations"],
  },
  "basic-support-seo": {
    name: "Basic Support + SEO",
    price: "2,000 - 5,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Everything in Basic Support plan", "Technical SEO audits & reporting", "On-page optimization & corrections", "Core Web Vitals & performance fixes"],
  },
  "professional-support": {
    name: "Professional Support",
    price: "5,000 - 8,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Everything in Basic Support plan", "Full implementation of requirements", "Design & build new website pages", "Priority response & fast delivery"],
  },
  "professional-seo": {
    name: "Professional + SEO",
    price: "8,000 - 12,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Everything in Professional Support", "SEO issue fixing & technical fixes", "Core Web Vitals & indexing issues", "On-page SEO corrections & audits"],
  },
  // SEO
  "seo-package": {
    name: "SEO Package",
    price: "35,000",
    suffix: "EGP",
    category: "SEO Service (3-Month Engagement)",
    features: ["Keyword Research & Strategy", "On-Page SEO", "Technical SEO", "Off-Page & Backlinks", "AI & Answer Optimization", "Monthly Reports & Analytics"],
  },
};

const COUNTRIES = [
  { name: "Egypt", code: "+20", flag: "\u{1F1EA}\u{1F1EC}", minLen: 11, maxLen: 11 },
  { name: "Saudi Arabia", code: "+966", flag: "\u{1F1F8}\u{1F1E6}", minLen: 9, maxLen: 9 },
  { name: "UAE", code: "+971", flag: "\u{1F1E6}\u{1F1EA}", minLen: 9, maxLen: 9 },
  { name: "Kuwait", code: "+965", flag: "\u{1F1F0}\u{1F1FC}", minLen: 8, maxLen: 8 },
  { name: "Qatar", code: "+974", flag: "\u{1F1F6}\u{1F1E6}", minLen: 8, maxLen: 8 },
  { name: "Bahrain", code: "+973", flag: "\u{1F1E7}\u{1F1ED}", minLen: 8, maxLen: 8 },
  { name: "Oman", code: "+968", flag: "\u{1F1F4}\u{1F1F2}", minLen: 8, maxLen: 8 },
  { name: "Jordan", code: "+962", flag: "\u{1F1EF}\u{1F1F4}", minLen: 9, maxLen: 9 },
  { name: "Lebanon", code: "+961", flag: "\u{1F1F1}\u{1F1E7}", minLen: 7, maxLen: 8 },
  { name: "Iraq", code: "+964", flag: "\u{1F1EE}\u{1F1F6}", minLen: 10, maxLen: 10 },
  { name: "Morocco", code: "+212", flag: "\u{1F1F2}\u{1F1E6}", minLen: 9, maxLen: 9 },
  { name: "United States", code: "+1", flag: "\u{1F1FA}\u{1F1F8}", minLen: 10, maxLen: 10 },
  { name: "United Kingdom", code: "+44", flag: "\u{1F1EC}\u{1F1E7}", minLen: 10, maxLen: 10 },
  { name: "Turkey", code: "+90", flag: "\u{1F1F9}\u{1F1F7}", minLen: 10, maxLen: 10 },
];

type Country = (typeof COUNTRIES)[number];

const INDIGO = "rgb(99,102,241)";

export default function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan: planSlug } = use(params);
  const planInfo = PLANS[planSlug];

  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", notes: "" });
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!planInfo) {
    return (
      <main className="bg-black min-h-screen pt-16">
        <section className="section-padding max-w-[600px] mx-auto flex flex-col gap-6 items-center text-center">
          <h1 className="heading-1 text-white">Plan not found.</h1>
          <p className="para-18" style={{ color: "rgba(255,255,255,0.5)" }}>
            The plan you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full text-white font-semibold hover:brightness-110 transition-all"
            style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "12px 28px" }}
          >
            View Pricing
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = "Name is required (min 2 characters).";
    if (!form.phone.trim() || form.phone.trim().length < selectedCountry.minLen) {
      newErrors.phone = `Enter a valid ${selectedCountry.minLen}-digit number.`;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    // Simulate submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[900px] mx-auto">

        {/* Back link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 mb-10 transition-colors hover:text-white"
          style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to Pricing
        </Link>

        {submitted ? (
          /* Success */
          <div
            className="flex flex-col gap-5 items-center justify-center rounded-[20px] p-16 text-center"
            style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 64, height: 64, backgroundColor: "rgba(99,102,241,0.15)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-white" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>
              You&apos;re all set!
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: "36ch", lineHeight: 1.6 }}>
              Thanks for choosing <span className="text-white font-medium">{planInfo.name}</span>. We&apos;ve received your request and will get back to you within 24 hours.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
              Check your inbox — a confirmation email is on its way.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex rounded-full text-white font-semibold hover:brightness-110 transition-all"
              style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "12px 28px" }}
            >
              Back to Home
            </Link>
          </div>
        ) : (
          /* Checkout form */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left — Order summary */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div
                className="rounded-[20px] p-7 flex flex-col gap-5"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {planInfo.category}
                  </span>
                  <h2 className="text-white mt-1" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {planInfo.name}
                  </h2>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-white" style={{ fontSize: 32, fontWeight: 700 }}>{planInfo.price}</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{planInfo.suffix}</span>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                <div className="flex flex-col gap-3">
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                    What&apos;s included
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {planInfo.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="shrink-0 mt-[5px]" style={{ display: "inline-block", width: 2, height: 12, borderRadius: 2, backgroundColor: "rgb(255,210,0)" }} />
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.45 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Refund Policy", href: "/legal/refund" },
                  { label: "Terms & Conditions", href: "/legal/terms" },
                  { label: "Privacy Policy", href: "/legal/privacy" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
                    className="hover:text-white transition-colors underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded-[20px] p-8"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <h3 className="text-white" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>
                  Complete your order
                </h3>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Full Name <span style={{ color: INDIGO }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                    style={{ borderColor: errors.name ? "rgb(239,68,68)" : "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = errors.name ? "rgb(239,68,68)" : "rgb(40,40,40)")}
                  />
                  {errors.name && <p style={{ fontSize: 12, color: "rgb(239,68,68)" }}>{errors.name}</p>}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Company / Agency <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Your company name"
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                    style={{ borderColor: "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Phone Number <span style={{ color: INDIGO }}>*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setCountryOpen(!countryOpen)}
                        className="flex h-full items-center gap-2 rounded-[12px] bg-[rgb(20,20,20)] px-3 py-4 text-sm text-white border transition-colors hover:border-[rgb(60,60,60)]"
                        style={{ borderColor: "rgb(40,40,40)" }}
                      >
                        <span>{selectedCountry.flag}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{selectedCountry.code}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      {countryOpen && (
                        <div
                          className="absolute left-0 top-full z-50 mt-1 max-h-56 w-52 overflow-y-auto rounded-[12px] shadow-2xl"
                          style={{ backgroundColor: "rgb(16,16,16)", border: "1px solid rgb(40,40,40)" }}
                        >
                          {COUNTRIES.map((c) => (
                            <button
                              key={`${c.name}-${c.code}`}
                              type="button"
                              onClick={() => { setSelectedCountry(c); setCountryOpen(false); setForm((f) => ({ ...f, phone: "" })); }}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
                              style={{ color: selectedCountry.name === c.name ? INDIGO : "rgba(255,255,255,0.7)" }}
                            >
                              <span>{c.flag}</span>
                              <span className="flex-1 truncate">{c.name}</span>
                              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= selectedCountry.maxLen) setForm({ ...form, phone: val });
                      }}
                      placeholder={"0".repeat(selectedCountry.minLen)}
                      className="flex-1 bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                      style={{ borderColor: errors.phone ? "rgb(239,68,68)" : "rgb(40,40,40)" }}
                      onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                      onBlur={(e) => (e.target.style.borderColor = errors.phone ? "rgb(239,68,68)" : "rgb(40,40,40)")}
                    />
                  </div>
                  {errors.phone && <p style={{ fontSize: 12, color: "rgb(239,68,68)" }}>{errors.phone}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Email Address <span style={{ color: INDIGO }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                    style={{ borderColor: errors.email ? "rgb(239,68,68)" : "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = errors.email ? "rgb(239,68,68)" : "rgb(40,40,40)")}
                  />
                  {errors.email && <p style={{ fontSize: 12, color: "rgb(239,68,68)" }}>{errors.email}</p>}
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Additional Notes <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Tell us about your project or any specific requirements..."
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors resize-none"
                    style={{ borderColor: "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                  />
                </div>

                {errors.submit && (
                  <p
                    className="rounded-[12px] px-4 py-3 text-sm"
                    style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "rgb(239,68,68)" }}
                  >
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-full text-white font-semibold transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "14px 0" }}
                >
                  {submitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

      </section>
      <Footer />
    </main>
  );
}
