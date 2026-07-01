import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { SERVICES, getService } from "@/lib/services";
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const ICONS: Record<string, React.ReactNode> = {
  "website-development": (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  "website-support": (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  "seo": (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
};

const INDIGO = "rgb(99,102,241)";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title}`,
    description: service.desc,
    alternates: { canonical: `https://veliq.co/services/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.whyFaq.map((f) => ({ q: `WHY: ${f.q}`, a: f.a })))} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://veliq.co" },
        { name: "Services", url: "https://veliq.co/services" },
        { name: service.title, url: `https://veliq.co/services/${service.slug}` },
      ])} />
      <article className="max-w-[1200px] mx-auto section-padding flex flex-col gap-20">

        {/* Hero */}
        <div className="flex flex-col gap-6 max-w-[760px]">
          <div
            className="flex items-center justify-center rounded-[20px] self-start"
            style={{ width: 80, height: 80, backgroundColor: INDIGO }}
          >
            {ICONS[service.slug]}
          </div>
          <h1
            className="text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1.05 }}
          >
            {service.title}
          </h1>
          <p style={{ fontSize: "20px", fontWeight: 500, color: INDIGO, letterSpacing: "-0.01em" }}>
            {service.subtitle}
          </p>
          <p className="text-[rgb(201,201,201)]" style={{ fontSize: "17px", lineHeight: 1.75, maxWidth: "56ch" }}>
            {service.fullDesc}
          </p>
        </div>

        {/* The Problem We Saw */}
        <div className="flex flex-col gap-6">
          <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            {service.problemHeading}
          </h2>
          <p className="text-[rgb(160,160,160)]" style={{ fontSize: "16px", lineHeight: 1.8, maxWidth: "64ch" }}>
            {service.problemBody}
          </p>
        </div>

        {/* How VELIQ Does It Differently */}
        <div className="flex flex-col gap-8">
          <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            How VELIQ does it differently.
          </h2>
          <div className="flex flex-col gap-4">
            {service.differentiators.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-6 rounded-[16px]"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <span
                  className="shrink-0 text-white flex items-center justify-center rounded-full"
                  style={{ width: 32, height: 32, backgroundColor: INDIGO, fontSize: "14px", fontWeight: 700 }}
                >
                  {i + 1}
                </span>
                <p className="text-[rgb(201,201,201)]" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <div className="flex flex-col gap-8">
          <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            What you get.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.tiers.map((tier, i) => (
              <div
                key={tier.name}
                className="flex flex-col gap-5 rounded-[20px] p-7"
                style={{
                  backgroundColor: "rgb(14,14,14)",
                  border: i === 2 ? `1px solid rgba(99,102,241,0.35)` : "1px solid rgb(28,28,28)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-white" style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {tier.name}
                  </h3>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{tier.tagline}</span>
                </div>
                <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                <ul className="flex flex-col gap-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="shrink-0 mt-[5px]" style={{ display: "inline-block", width: 2, height: 12, borderRadius: 2, backgroundColor: "rgb(255,210,0)" }} />
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.45 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Signature Module */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
              {service.signatureTitle}
            </h2>
            <p style={{ fontSize: "16px", color: INDIGO, fontWeight: 500 }}>{service.signaturePromise}</p>
          </div>
          <div
            className="rounded-[20px] p-8 flex flex-col gap-4"
            style={{ backgroundColor: "rgb(14,14,14)", border: `1px solid rgba(99,102,241,0.2)` }}
          >
            {service.signatureItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span
                  className="shrink-0 flex items-center justify-center rounded-full"
                  style={{ width: 26, height: 26, backgroundColor: "rgba(99,102,241,0.15)", color: INDIGO, fontSize: "12px", fontWeight: 700 }}
                >
                  {i + 1}
                </span>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            What results look like.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.results.map((r) => (
              <div
                key={r}
                className="flex items-start gap-3 p-5 rounded-[16px]"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <span
                  className="shrink-0 mt-0.5 rounded-full flex items-center justify-center text-white"
                  style={{ width: 20, height: 20, backgroundColor: INDIGO, fontSize: "11px", fontWeight: 700 }}
                >
                  ✓
                </span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WHY FAQ */}
        <div className="flex flex-col gap-8">
          <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            The WHY FAQ.
          </h2>
          <div className="flex flex-col gap-4">
            {service.whyFaq.map((faq) => (
              <div
                key={faq.q}
                className="flex flex-col gap-3 p-6 rounded-[16px]"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <h3 className="text-white" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  WHY: {faq.q}
                </h3>
                <p style={{ fontSize: "14px", color: "rgb(160,160,160)", lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="flex flex-col gap-8">
          <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            Our process.
          </h2>
          <div className="flex flex-col gap-4">
            {service.process.map((item, i) => (
              <div
                key={item.step}
                className="flex items-start gap-5 p-6 rounded-[16px]"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <span className="shrink-0 text-white/30" style={{ fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-white" style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em" }}>{item.step}</span>
                  <span className="text-[rgb(201,201,201)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-col gap-6">
          <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
            Tools &amp; technologies.
          </h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full text-white"
                style={{ backgroundColor: "rgb(22,22,22)", border: "1px solid rgb(40,40,40)", fontSize: "13px", fontWeight: 500, padding: "8px 18px" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Trust Statement */}
        <div
          className="rounded-[20px] p-8 text-center"
          style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
        >
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontStyle: "italic" }}>
            &ldquo;After our discovery meeting, we recommend the tier that fits your actual needs — not the one that fits our revenue targets.&rdquo;
          </p>
        </div>

        {/* Back + CTA */}
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-80 transition-opacity"
            style={{ border: "1px solid rgb(40,40,40)", fontSize: "14px", fontWeight: 500, padding: "12px 24px" }}
          >
            ← All Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: INDIGO, fontSize: "14px", fontWeight: 600, padding: "12px 28px" }}
          >
            Book Discovery Meeting →
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
