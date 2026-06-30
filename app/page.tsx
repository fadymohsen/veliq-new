import HeroSection from "@/components/sections/HeroSection";
import HeaderBar from "@/components/ui/HeaderBar";
import IntroSection from "@/components/sections/IntroSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import FaqSection from "@/components/sections/FaqSection";
import PricingSection from "@/components/sections/PricingSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-black">
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

        <HeaderBar label="Pricing" />
        <PricingSection />

        <HeaderBar label="FAQ" />
        <FaqSection />

        <CtaSection />

        <Footer />
      </div>
    </main>
  );
}
