export type Service = {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  fullDesc: string;
  problemHeading: string;
  problemBody: string;
  differentiators: string[];
  tiers: {
    name: string;
    tagline: string;
    features: string[];
  }[];
  signatureTitle: string;
  signaturePromise: string;
  signatureItems: string[];
  results: string[];
  whyFaq: { q: string; a: string }[];
  features: string[];
  process: { step: string; desc: string }[];
  technologies: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "website-development",
    icon: "W",
    title: "Website Development",
    subtitle: "A website that earns its first 7 seconds — and every second after.",
    desc: "We engineer websites for the customers who actually have to use them: scanned in seconds, mobile-first by default, conversion-led from the first pixel.",
    fullDesc: "Most websites are designed for the agency that built them. We engineer websites for the customers who actually have to use them: scanned in seconds, mobile-first by default, conversion-led from the first pixel to the last form field.",
    problemHeading: "The Problem We Saw",
    problemBody: "We have audited dozens of websites that won awards and lost leads. They looked beautiful in a portfolio and crawled on a phone. They had clever interactions that confused a 45-year-old buyer. They were built around the designer's ego, not the customer's task. We build websites the way clients actually use them.",
    differentiators: [
      "Pre-build discovery as standard. Before we open Figma, we study your traffic, your competitors, and what your audience actually does on the web.",
      "Mobile-first by default — because 70%+ of your traffic is. Every layout is designed for the phone first.",
      "Speed is a budget, not a hope. We set a performance budget on day one and hold it through launch.",
      "Conversion-aware from copy to CTA. Every page has one job. Every section earns its place.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "The essentials done right.",
        features: ["Up to 5 pages", "Template-based customized design", "Basic CMS + on-page SEO setup", "Contact form integration", "1 language", "2 revision rounds"],
      },
      {
        name: "Precision",
        tagline: "Strategy + execution together.",
        features: ["Up to 10 pages", "Custom UI design + speed optimization", "CRM + booking + analytics integrations", "Up to 2 languages", "Full on-page SEO", "4 revision rounds + partial copywriting"],
      },
      {
        name: "Mastery",
        tagline: "Full ownership + maximum output.",
        features: ["Unlimited pages", "Full custom UX/UI design system", "Technical SEO audit + ongoing speed monitoring", "Full third-party ecosystem integrations", "Up to 3 languages", "Unlimited revisions + full copywriting"],
      },
    ],
    signatureTitle: "The 7-Second Test",
    signaturePromise: "Every homepage is judged in 7 seconds. Here is what yours must pass.",
    signatureItems: [
      "What does this company do? (In plain language, above the fold.)",
      "Who is it for? (Am I in the right place?)",
      "What's the one specific outcome they promise me?",
      "Why should I trust them? (Logos, proof, numbers — not adjectives.)",
      "How do they do it differently? (One sentence, not a manifesto.)",
      "What's the next step? (One primary CTA, not five.)",
      "Does this look like it was built recently? (Visual currency = brand currency.)",
    ],
    results: [
      "First Contentful Paint under 1.5 seconds on 4G mobile.",
      "Conversion-rate baseline lift within 90 days of launch.",
      "Bounce-rate reduction on top entry pages.",
      "Time-to-form-submission cut by removing friction in the path.",
    ],
    whyFaq: [
      { q: "Why don't you publish prices?", a: "Because the same site costs different money in Cairo, Riyadh, and New York. The discovery meeting calibrates the price to your market and scope." },
      { q: "Why mobile-first when our buyers are on desktop?", a: "Even buyers who close on desktop research on mobile. Mobile-first forces every layout to earn its place. If it works on a phone, it will work on a desktop." },
      { q: "Why custom over a template?", a: "Templates are fine for a side project. For a serious operation, every layout decision you outsource to a template is a position you lose to a competitor who didn't." },
      { q: "Why is bilingual harder than it looks?", a: "Bilingual sites that 'work' often break RTL layouts, mix font hierarchies, or duplicate content in ways that hurt SEO. We architect bilingual sites with the language switch as a first-class citizen." },
    ],
    features: [
      "Custom web application development",
      "E-commerce solutions with payment integration",
      "Progressive Web Apps (PWA)",
      "API development & third-party integrations",
      "Performance optimization & Core Web Vitals",
      "Bilingual / multilingual architecture",
    ],
    process: [
      { step: "Discovery", desc: "We analyze your traffic, competitors, and audience behavior to define the project scope with data, not assumptions." },
      { step: "Design", desc: "We create wireframes and high-fidelity prototypes, mobile-first, aligned with your brand identity." },
      { step: "Development", desc: "We build your site using modern frameworks with clean code, performance budgets, and thorough testing." },
      { step: "Launch & Support", desc: "We deploy, monitor, and provide ongoing maintenance to keep your platform running at peak performance." },
    ],
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Vercel", "AWS"],
  },
  {
    slug: "website-support",
    icon: "S",
    title: "Website Support",
    subtitle: "Your site, watched and improved every week — without you having to ask.",
    desc: "We treat your live website like a system that needs daily attention — not an asset that has already been delivered.",
    fullDesc: "Most websites are launched and forgotten. By the time someone notices the broken contact form, weeks of leads are already lost. We treat your live website like a system that needs daily attention — not an asset that has already been delivered.",
    problemHeading: "The Problem We Saw",
    problemBody: "Sites decay quietly. Plugins break. Forms stop sending. Speed degrades as content piles up. Security holes open the day after launch. The companies who notice last are the ones losing the most.",
    differentiators: [
      "Defined response-time SLA per tier (48 hours / 24 hours / same day). We answer the contract, not the mood.",
      "Proactive monitoring of uptime, page speed, and security — you don't have to discover problems for us to fix them.",
      "Monthly performance reports with the WHY attached: not just 'page speed dropped 12%,' but why, and what we are doing about it.",
      "One support team that already knows your codebase. No tickets handed to a stranger every time.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "The essentials done right.",
        features: ["Up to 3 monthly updates", "48-hour response time", "Bug fixes + basic monitoring", "Security updates", "Text-only content updates"],
      },
      {
        name: "Precision",
        tagline: "Strategy + execution together.",
        features: ["Up to 8 monthly updates", "24-hour response time", "Monthly performance report", "Text + image content updates", "Monthly analytics reporting"],
      },
      {
        name: "Mastery",
        tagline: "Full ownership + maximum output.",
        features: ["Unlimited monthly updates", "Same-day response time", "Weekly performance report", "Full content management", "Weekly analytics reporting"],
      },
    ],
    signatureTitle: "The Same-Day Promise",
    signaturePromise: "What happens inside our same-day SLA — minute by minute.",
    signatureItems: [
      "00:00 — Issue logged via shared channel (WhatsApp, Slack, or email).",
      "Within 1 hour — Acknowledged by a named team member with an initial assessment.",
      "Within 4 hours — Diagnosis confirmed. You receive the root cause and the planned fix in writing.",
      "Within 8 hours — Fix deployed to staging. Internal QA complete.",
      "Within same business day — Fix live in production. You receive confirmation + a one-line WHY.",
    ],
    results: [
      "Uptime kept above 99.9% measured by external monitoring.",
      "Page speed held within performance budget month over month.",
      "Zero post-launch security incidents on covered sites.",
      "Bug-to-fix cycle time tracked and reported every month.",
    ],
    whyFaq: [
      { q: "Why a monthly retainer instead of paying per fix?", a: "Because by the time you are paying per fix, you are paying for problems we could have prevented. The retainer covers prevention — monitoring, updates, security patching — not just reaction." },
      { q: "Why monitor performance proactively?", a: "Because every 100ms of page-load delay costs measurable conversions. Performance does not stay where you launched it — it decays." },
      { q: "Why named team members instead of a ticket queue?", a: "Because tickets handed to a stranger waste the most expensive hour of any support engagement — the hour of re-learning your codebase." },
    ],
    features: [
      "Monthly software & plugin updates",
      "Security monitoring & threat response",
      "Performance optimization & Core Web Vitals",
      "Content updates & copywriting revisions",
      "Bug fixes & cross-browser testing",
      "Monthly analytics & performance reports",
    ],
    process: [
      { step: "Onboard", desc: "We audit your current site, set up monitoring, and document all configurations and access." },
      { step: "Maintain", desc: "We run monthly update cycles, security scans, and proactive performance checks." },
      { step: "Report", desc: "You receive a monthly report covering uptime, performance metrics, and completed tasks." },
      { step: "Evolve", desc: "We handle change requests and improvements as your business grows and needs shift." },
    ],
    technologies: ["Vercel", "Cloudflare", "Google PageSpeed", "Uptime Robot", "Sentry", "Hotjar", "Google Analytics", "GTM"],
  },
  {
    slug: "seo",
    icon: "E",
    title: "SEO",
    subtitle: "Show up where the buying decision actually starts.",
    desc: "We work the queries that move revenue — fewer keywords, all commercial-intent, all tied to a documented revenue path.",
    fullDesc: "Most SEO is busywork sold as strategy — keyword lists no one searches, content no one reads, links no one clicks. We work the opposite way: fewer keywords, all of them commercial-intent, all of them tied to a documented revenue path. Then we explain every move.",
    problemHeading: "The Problem We Saw",
    problemBody: "The SEO industry has trained clients to expect monthly reports full of vanity numbers — rankings on keywords no one buys from, traffic from countries that don't convert, 'backlinks acquired' from sites no one visits. We work the opposite way.",
    differentiators: [
      "Keyword research tied to commercial intent — not search volume. Volume is vanity. Conversion is the metric.",
      "Technical SEO audit before any content. A site with broken indexing cannot be saved by content alone.",
      "Educated reporting on every move. Every ranking shift gets a WHY: was it our work, an algorithm update, or competitor movement?",
      "Competitor tracking that names names. We tell you exactly which competitor took which keyword from you — and how we plan to take it back.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "The essentials done right.",
        features: ["Up to 10 keywords targeted", "On-page optimization", "Basic technical audit", "Monthly content recommendations", "Monthly reporting"],
      },
      {
        name: "Precision",
        tagline: "Strategy + execution together.",
        features: ["Up to 25 keywords", "Full technical SEO audit", "Bi-weekly content recommendations", "Basic backlink building + local SEO", "Monthly reporting + insights"],
      },
      {
        name: "Mastery",
        tagline: "Full ownership + maximum output.",
        features: ["50+ keywords", "Full + ongoing technical SEO", "Weekly content recommendations", "Advanced backlinks + local SEO + competitor tracking", "Weekly reporting + strategy call"],
      },
    ],
    signatureTitle: "The 48-Hour Visibility Audit",
    signaturePromise: "Before you hire us, see what we'll find in 48 hours.",
    signatureItems: [
      "Your top 20 commercial-intent keywords — and where you actually rank for each.",
      "The 5 keywords competitors own that you should — with the page-by-page strategy to take them back.",
      "Your technical SEO health score — indexing issues, broken canonicals, slow pages, mobile-usability errors.",
      "Your content gap map — pages that should exist and don't, ranked by search volume × commercial intent.",
      "Your domain authority versus the three closest competitors — with the realistic 6-month plan to close the gap.",
    ],
    results: [
      "Ranking velocity on commercial-intent keywords (movement up, not just total positions).",
      "Organic conversions — not organic sessions.",
      "Page-1 capture rate on tracked keywords over rolling 90 days.",
      "Domain authority growth versus named competitors.",
    ],
    whyFaq: [
      { q: "Why a retainer instead of a project?", a: "Because SEO is a system, not a project. The first 90 days are technical and content. Months 4–12 are authority and competitive defense. Stop the work and your competitors take back what you earned." },
      { q: "Why so few keywords on the Core tier?", a: "Because 10 commercial-intent keywords driving revenue beat 100 vanity keywords that don't. We would rather rank you #1 on what matters than #15 on a list that looks impressive." },
      { q: "Why does local SEO matter so much?", a: "Because Google's local pack returns three results — not ten. If you are a service business and you are not in those three results, you do not exist to the customer who is buying right now." },
    ],
    features: [
      "Technical SEO audits & implementation",
      "On-page optimization & content strategy",
      "Local SEO & Google Business Profile",
      "Schema markup & structured data",
      "Link building & digital PR",
      "Competitor tracking & intelligence",
    ],
    process: [
      { step: "Audit", desc: "We perform a 48-hour visibility audit of your site's technical health, content, and competitive landscape." },
      { step: "Strategy", desc: "We develop a prioritized roadmap targeting the highest-impact commercial-intent opportunities." },
      { step: "Execute", desc: "Our team implements technical fixes, optimizes content, and builds high-quality backlinks." },
      { step: "Measure & Refine", desc: "We track rankings, conversions, and competitor movement to continuously refine results." },
    ],
    technologies: ["Google Search Console", "Ahrefs", "Screaming Frog", "Schema.org", "Google Analytics", "Semrush", "Core Web Vitals", "Microsoft Clarity"],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
