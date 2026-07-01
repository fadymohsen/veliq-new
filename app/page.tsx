import HeroSection from "@/components/sections/HeroSection";
import HeaderBar from "@/components/ui/HeaderBar";
import IntroSection from "@/components/sections/IntroSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

const HOME_FAQS = [
  { q: "What specific services do you provide?", a: "We specialize in three core pillars: Website Development, Website Support, and Technical SEO. We focus purely on digital experiences." },
  { q: "How long does a typical project take?", a: "A standard 5-page marketing site typically takes 3-7 days from kickoff to launch. Comprehensive branding and complex platform migrations usually range from 2-4 weeks." },
  { q: "Can I update the website myself after launch?", a: "Absolutely. We build websites with user-friendly content management in mind. Once we launch, we provide training and documentation showing you exactly how to edit text, swap images, and publish blog posts without writing code." },
  { q: "How do payments and deposits work?", a: "We require a 50% deposit to secure your slot in our production calendar. The remaining 50% is due upon project completion, just before we hand over the final credentials." },
  { q: "Do you offer ongoing support or maintenance?", a: "Yes. We offer monthly support and maintenance plans covering bug fixes, content edits, new page builds, SEO monitoring, and performance optimization." },
];

export default function Home() {
  return (
    <main className="bg-black">
      <JsonLd data={faqSchema(HOME_FAQS)} />
      {/* Hero — full-bleed, fills the entire viewport */}
      <HeroSection />

      {/* Everything below keeps the inset rounded-card stack look */}
      <div className="flex flex-col gap-[10px] p-2">
        <HeaderBar label="About Us" />
        <IntroSection />
        <MissionVisionSection />

        <HeaderBar label="Portfolio" />
        <ProjectsSection />

        <HeaderBar label="Services" />
        <ServicesSection />

        <StatsSection />

        {/* Pricing CTA */}
        <section className="w-full bg-black rounded-[30px] section-padding overflow-hidden">
          <div className="w-full max-w-[700px] mx-auto flex flex-col items-center text-center gap-6">
            <h2 className="heading-1 text-white">Simple, transparent pricing.</h2>
            <p
              className="para-18"
              style={{ color: "rgba(255,255,255,0.5)", maxWidth: "42ch", lineHeight: 1.6 }}
            >
              Website packages, monthly support plans, and SEO services — all with clear pricing and no hidden fees.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full text-white font-semibold hover:brightness-110 transition-all"
              style={{ backgroundColor: "rgb(99,102,241)", fontSize: "14px", fontWeight: 600, padding: "14px 32px" }}
            >
              View Pricing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <HeaderBar label="FAQ" />
        <FaqSection />

        <CtaSection />

        <Footer />
      </div>
    </main>
  );
}
