"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

const packages = [
  {
    slug: "simple-website",
    name: "Simple Website",
    subtitle: "Up to 5 Pages",
    priceWithout: { min: 2500, max: 5000 },
    priceWith: { min: 4500, max: 7000 },
    delivery: "3 days",
    popular: false,
    features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO setup"],
  },
  {
    slug: "portfolio-website",
    name: "Portfolio Website",
    subtitle: "Showcase Your Work",
    priceWithout: { min: 5000, max: 10000 },
    priceWith: { min: 10000, max: 16000 },
    delivery: "7 days",
    popular: false,
    features: ["Custom portfolio layout", "Project showcase gallery", "Animated transitions", "Mobile-first design"],
  },
  {
    slug: "ecommerce-website",
    name: "E-Commerce Website",
    subtitle: "Sell Online",
    priceWithout: { min: 10000, max: 15000 },
    priceWith: { min: 18000, max: 25000 },
    delivery: "15-20 days",
    popular: true,
    features: ["Product catalog & management", "Shopping cart & checkout", "Payment gateway integration", "Order management dashboard"],
  },
  {
    slug: "services-and-store",
    name: "Services & Store",
    subtitle: "Display, Pay & Sell",
    priceWithout: { min: 15000, max: 20000 },
    priceWith: { min: 25000, max: 35000 },
    delivery: "20-30 days",
    popular: false,
    features: ["Service listings & booking", "Online payments & invoicing", "Integrated store", "Admin dashboard"],
  },
];

const supportPlans = [
  {
    slug: "basic-support",
    name: "Basic Support",
    price: "500 - 2,000",
    suffix: "EGP / month",
    description: "Essentials to keep your website stable and your team unblocked.",
    features: [
      "Simple bug fixing & quick patches",
      "Image & content edits on request",
      "Website uptime & health monitoring",
      "Technical guidance & consultations",
    ],
    disclaimer: null,
    highlighted: false,
  },
  {
    slug: "basic-support-seo",
    name: "Basic Support + SEO",
    price: "2,000 - 5,000",
    suffix: "EGP / month",
    description: "Basic Support with developer-level SEO to keep your rankings healthy.",
    features: [
      "Everything in Basic Support plan",
      "Technical SEO audits & reporting",
      "On-page optimization & corrections",
      "Core Web Vitals & performance fixes",
    ],
    disclaimer: null,
    highlighted: false,
  },
  {
    slug: "professional-support",
    name: "Professional Support",
    price: "5,000 - 8,000",
    suffix: "EGP / month",
    description: "Everything in Basic, plus hands-on implementation and page building.",
    features: [
      "Everything in Basic Support plan",
      "Full implementation of requirements",
      "Design & build new website pages",
      "Priority response & fast delivery",
    ],
    disclaimer: "Does not include website enhancements, optimization, or SEO support.",
    highlighted: true,
  },
  {
    slug: "professional-seo",
    name: "Professional + SEO",
    price: "8,000 - 12,000",
    suffix: "EGP / month",
    description: "Everything in Professional, plus SEO issue fixing to keep your rankings healthy.",
    features: [
      "Everything in Professional Support",
      "SEO issue fixing & technical fixes",
      "Core Web Vitals & indexing issues",
      "On-page SEO corrections & audits",
    ],
    disclaimer: "Does not include blog creation, SEO enhancements, or new content strategy.",
    highlighted: false,
  },
];

const seoPackage = {
  slug: "seo-package",
  name: "SEO Package",
  subtitle: "3-Month Engagement",
  price: "35,000",
  suffix: "EGP",
  features: [
    { label: "Keyword Research & Strategy", desc: "Primary & long-tail keywords, search intent analysis, competitor keyword gap" },
    { label: "On-Page SEO", desc: "Titles, meta descriptions, content structure (H1-H3), internal linking & URL optimization" },
    { label: "Technical SEO", desc: "Site speed, Core Web Vitals, mobile-first, crawl errors, sitemap & indexing" },
    { label: "Off-Page & Backlinks", desc: "Quality backlink building, guest posting, digital PR & brand authority" },
    { label: "AI & Answer Optimization", desc: "GEO & AEO - get found in AI tools, voice search & Google featured snippets" },
    { label: "Monthly Reports & Analytics", desc: "GA4, Search Console, keyword rankings & full performance insights every month" },
  ],
  tools: "SEMrush, Ahrefs, Screaming Frog, GA4, GSC, Microsoft Clarity, GTM",
};

const INDIGO = "rgb(99,102,241)";
const MUTED = "rgba(255,255,255,0.5)";

export default function PricingPage() {
  const [withHosting, setWithHosting] = useState(false);

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <h1 className="heading-1 text-white">Pricing.</h1>
          <p className="para-18" style={{ color: MUTED, maxWidth: 500 }}>
            Choose the package that fits your needs. All prices are in Egyptian Pounds (EGP).
          </p>
        </div>

        {/* ── Website Packages ── */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-white" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>
              Website Packages
            </h2>

            {/* Toggle */}
            <div
              className="flex items-center rounded-full p-[3px]"
              style={{ backgroundColor: "rgb(18,18,18)", border: "1px solid rgb(30,30,30)" }}
            >
              <button
                onClick={() => setWithHosting(false)}
                className="rounded-full px-5 py-2 text-sm font-medium transition-all"
                style={{
                  backgroundColor: !withHosting ? INDIGO : "transparent",
                  color: !withHosting ? "white" : "rgba(255,255,255,0.45)",
                }}
              >
                Without Domain & Hosting
              </button>
              <button
                onClick={() => setWithHosting(true)}
                className="rounded-full px-5 py-2 text-sm font-medium transition-all"
                style={{
                  backgroundColor: withHosting ? INDIGO : "transparent",
                  color: withHosting ? "white" : "rgba(255,255,255,0.45)",
                }}
              >
                With Domain & Hosting
              </button>
            </div>
          </div>

          {/* Package cards */}
          <div className="grid gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => {
              const price = withHosting ? pkg.priceWith : pkg.priceWithout;
              const checkoutSlug = withHosting ? `${pkg.slug}-hosting` : pkg.slug;
              return (
                <div
                  key={pkg.slug}
                  className="relative flex flex-col rounded-[20px] p-7 gap-5"
                  style={{
                    backgroundColor: "rgb(14,14,14)",
                    border: pkg.popular ? `1px solid rgba(99,102,241,0.35)` : "1px solid rgb(22,22,22)",
                  }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className="rounded-full px-4 py-1 text-white"
                        style={{ fontSize: 11, fontWeight: 600, backgroundColor: INDIGO }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <h3 className="text-white" style={{ fontSize: 17, fontWeight: 700 }}>{pkg.name}</h3>
                    <span style={{ fontSize: 13, color: MUTED }}>{pkg.subtitle}</span>
                  </div>

                  <div>
                    <span className="text-white" style={{ fontSize: 28, fontWeight: 700 }}>
                      {price.min.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 600, color: MUTED }}> - {price.max.toLocaleString()}</span>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>EGP</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span style={{ fontSize: 13, color: MUTED }}>
                      Delivery: <span className="text-white font-medium">{pkg.delivery}</span>
                    </span>
                  </div>

                  <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                  <ul className="flex flex-col gap-2.5 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="shrink-0 mt-[5px]" style={{ display: "inline-block", width: 2, height: 12, borderRadius: 2, backgroundColor: "rgb(255,210,0)" }} />
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.45 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/checkout/${checkoutSlug}`}
                    className="w-full flex items-center justify-center rounded-full text-white font-semibold hover:brightness-110 transition-all"
                    style={{
                      backgroundColor: pkg.popular ? INDIGO : "rgb(28,28,28)",
                      fontSize: 14,
                      fontWeight: 600,
                      padding: "13px 0",
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Support Plans ── */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 items-center text-center">
            <h2 className="text-white" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>
              Website Maintenance Plans
            </h2>
            <p style={{ fontSize: 15, color: MUTED }}>
              Keep your site fast, secure, and growing — every month.
            </p>
          </div>

          <div className="grid gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
            {supportPlans.map((plan) => (
              <div
                key={plan.slug}
                className="relative flex flex-col rounded-[20px] p-7 gap-5"
                style={{
                  backgroundColor: "rgb(14,14,14)",
                  border: plan.highlighted ? `1px solid rgba(99,102,241,0.35)` : "1px solid rgb(22,22,22)",
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="rounded-full px-4 py-1 text-white"
                      style={{ fontSize: 11, fontWeight: 600, backgroundColor: INDIGO }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <h3 className="text-white" style={{ fontSize: 17, fontWeight: 700 }}>{plan.name}</h3>
                  <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{plan.description}</span>
                </div>

                <div>
                  <span className="text-white" style={{ fontSize: 22, fontWeight: 700 }}>{plan.price}</span>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{plan.suffix}</p>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="shrink-0 mt-[5px]" style={{ display: "inline-block", width: 2, height: 12, borderRadius: 2, backgroundColor: "rgb(255,210,0)" }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.45 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.disclaimer && (
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
                    * {plan.disclaimer}
                  </p>
                )}

                <Link
                  href={`/checkout/${plan.slug}`}
                  className="w-full flex items-center justify-center rounded-full text-white font-semibold hover:brightness-110 transition-all"
                  style={{
                    backgroundColor: plan.highlighted ? INDIGO : "rgb(28,28,28)",
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "13px 0",
                  }}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── SEO Package ── */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 items-center text-center">
            <h2 className="text-white" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>
              SEO Service
            </h2>
            <p style={{ fontSize: 15, color: MUTED, maxWidth: 450 }}>
              A dedicated developer working on your project for 3 months — with full reports and website support included.
            </p>
          </div>

          <div
            className="max-w-[700px] mx-auto w-full rounded-[20px] p-8"
            style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Left */}
              <div className="flex flex-col gap-5 sm:w-[40%]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{seoPackage.name}</h3>
                  <span style={{ fontSize: 13, color: MUTED }}>{seoPackage.subtitle}</span>
                </div>
                <div>
                  <span className="text-white" style={{ fontSize: 36, fontWeight: 700 }}>{seoPackage.price}</span>
                  <span style={{ fontSize: 14, color: MUTED, marginLeft: 6 }}>{seoPackage.suffix}</span>
                </div>
                <Link
                  href={`/checkout/${seoPackage.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold hover:brightness-110 transition-all"
                  style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "13px 24px" }}
                >
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
              <div className="sm:hidden h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

              {/* Right */}
              <div className="flex flex-col gap-3 flex-1">
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                  What&apos;s Included
                </span>
                {seoPackage.features.map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-[5px]" style={{ display: "inline-block", width: 2, height: 12, borderRadius: 2, backgroundColor: "rgb(255,210,0)" }} />
                    <div>
                      <p className="text-white" style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10, marginTop: 4 }}>
                  Tools: {seoPackage.tools}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CTA */}
        <p className="text-center" style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
          Have a custom project in mind?{" "}
          <Link href="/contact" className="transition-colors hover:text-white" style={{ color: INDIGO }}>
            Get in touch
          </Link>{" "}
          and we&apos;ll figure it out together.
        </p>

      </section>
      <Footer />
    </main>
  );
}
