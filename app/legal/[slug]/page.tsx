import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

type Section = { heading: string; body?: string; bullets?: string[]; note?: string };

type LegalPage = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: Section[];
};

const PAGES: Record<string, LegalPage> = {
  privacy: {
    title: "Privacy Policy",
    description: "How VELIQ collects, uses, and protects your personal data.",
    lastUpdated: "June 30, 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "We collect information you provide directly when you use our services, including:",
        bullets: [
          "Contact Information: Name, email address, phone number, and company name when you fill out our contact form or request a consultation.",
          "Project Information: Details about your business and project requirements shared during consultations.",
          "Usage Data: Information about how you interact with our website, including pages visited, time spent, and referring URLs.",
          "Device Data: Browser type, operating system, IP address, and device identifiers collected automatically.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: "We use the collected information to:",
        bullets: [
          "Respond to your inquiries and provide requested services.",
          "Improve our website, services, and user experience.",
          "Send project updates and relevant communications you've opted into.",
          "Analyze website traffic and usage patterns to enhance performance.",
          "Comply with legal obligations and protect our rights.",
        ],
      },
      {
        heading: "3. Data Sharing & Third Parties",
        body: "We do not sell, trade, or rent your personal information. We may share data with trusted third-party service providers who assist us in operating our website and business, subject to confidentiality agreements. These may include:",
        bullets: [
          "Hosting and infrastructure providers.",
          "Analytics services (e.g., Google Analytics).",
          "Communication tools for project management.",
        ],
      },
      {
        heading: "4. Data Security",
        body: "We implement industry-standard security measures to protect your personal data, including encryption in transit (SSL/TLS), secure server infrastructure, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "5. Your Rights",
        body: "You have the right to:",
        bullets: [
          "Access, correct, or delete your personal data.",
          "Withdraw consent for data processing at any time.",
          "Request a copy of the data we hold about you.",
          "Object to or restrict certain processing activities.",
        ],
        note: "To exercise any of these rights, please contact us at admin@veliq.co.",
      },
      {
        heading: "6. Data Retention",
        body: "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Contact form submissions are retained for up to 24 months unless you request earlier deletion.",
      },
      {
        heading: "7. Children's Privacy",
        body: "Our services are not directed to individuals under 16. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child, we will take steps to delete it promptly.",
      },
      {
        heading: "8. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
      },
      {
        heading: "9. Contact Us",
        body: "If you have any questions about this Privacy Policy, please contact us at admin@veliq.co or visit our Contact page.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    description: "The rules and guidelines governing the use of VELIQ's website and services.",
    lastUpdated: "June 30, 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing or using the VELIQ website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms constitute a legally binding agreement between you and VELIQ.",
      },
      {
        heading: "2. Services",
        body: "VELIQ provides software development, digital marketing, design, and consulting services. The specific scope, deliverables, timeline, and pricing for any project will be defined in a separate project agreement or proposal. These Terms of Service govern your general use of our website and interactions with our company.",
      },
      {
        heading: "3. Intellectual Property",
        body: "All content on this website — including text, graphics, logos, icons, images, and software — is the property of VELIQ or its content suppliers and is protected by international copyright laws.",
        bullets: [
          "You may not reproduce, distribute, or create derivative works from our website content without written permission.",
          "Ownership of project deliverables will be defined in individual project agreements.",
          "VELIQ retains the right to showcase completed projects in our portfolio unless otherwise agreed.",
        ],
      },
      {
        heading: "4. User Responsibilities",
        body: "When using our website and services, you agree to:",
        bullets: [
          "Provide accurate and truthful information in all forms and communications.",
          "Not use our website for any unlawful purpose or in violation of any applicable laws.",
          "Not attempt to gain unauthorized access to our systems or interfere with our website's operation.",
          "Not transmit any malicious code, viruses, or harmful data through our website.",
        ],
      },
      {
        heading: "5. Project Agreements",
        body: "Specific project terms — including scope, payment schedules, milestones, revision policies, and delivery timelines — will be outlined in separate project proposals or contracts. In the event of a conflict between these Terms of Service and a project agreement, the project agreement shall prevail for matters related to that specific project.",
      },
      {
        heading: "6. Payment Terms",
        body: "Payment terms for services will be specified in individual project proposals. Unless otherwise agreed:",
        bullets: [
          "A deposit may be required before work begins.",
          "Invoices are due within 14 days of issuance.",
          "Late payments may incur additional fees as outlined in the project agreement.",
        ],
      },
      {
        heading: "7. Limitation of Liability",
        body: "VELIQ shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim. This website and its content are provided \"as is\" without warranties of any kind.",
      },
      {
        heading: "8. Termination",
        body: "We reserve the right to terminate or suspend access to our website at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties. Project-specific termination terms will be governed by the applicable project agreement.",
      },
      {
        heading: "9. Governing Law",
        body: "These Terms of Service shall be governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Cairo, Egypt.",
      },
      {
        heading: "10. Changes to Terms",
        body: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our website after changes are posted constitutes your acceptance of the revised terms.",
      },
      {
        heading: "11. Contact Us",
        body: "If you have questions about these Terms of Service, please reach out at admin@veliq.co or visit our Contact page.",
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    description: "VELIQ's refund and cancellation policy for our services.",
    lastUpdated: "June 30, 2026",
    sections: [
      {
        heading: "1. Overview",
        body: "At VELIQ, we are committed to delivering high-quality work that meets your expectations. This Refund Policy outlines the terms and conditions under which refunds may be issued for our services.",
      },
      {
        heading: "2. Deposit & Upfront Payments",
        body: "Most projects require an upfront deposit before work begins. Please note:",
        bullets: [
          "Deposits are non-refundable once work has commenced on your project.",
          "If you cancel before any work has started, you are entitled to a full refund of your deposit.",
          "The deposit amount and payment schedule will be specified in your project proposal.",
        ],
      },
      {
        heading: "3. Project Cancellation",
        body: "If you wish to cancel a project after work has begun:",
        bullets: [
          "You will be billed for all work completed up to the date of cancellation.",
          "Any unused portion of your payment (beyond completed work) will be refunded within 14 business days.",
          "Cancellation requests must be submitted in writing to admin@veliq.co.",
          "VELIQ will provide a summary of completed work and any remaining balance.",
        ],
      },
      {
        heading: "4. Subscription & Support Plans",
        body: "For monthly support and maintenance plans:",
        bullets: [
          "You may cancel your subscription at any time before the next billing cycle.",
          "No refunds are issued for the current billing period once payment has been processed.",
          "Cancellation takes effect at the end of the current billing period — you retain access until then.",
          "Annual plans may be eligible for a pro-rated refund if cancelled within the first 30 days.",
        ],
      },
      {
        heading: "5. SEO Services",
        body: "Due to the nature of SEO work:",
        bullets: [
          "SEO packages are billed on a monthly or quarterly basis as agreed in your proposal.",
          "Refunds are not available for completed months of SEO work.",
          "If you cancel mid-engagement, you will receive all reports and deliverables for work completed to date.",
          "Results cannot be guaranteed as search engine rankings depend on many external factors.",
        ],
      },
      {
        heading: "6. Revision & Satisfaction",
        body: "Before requesting a refund, we encourage you to use the revision rounds included in your project agreement. We are committed to working with you until the deliverables meet the agreed-upon specifications. The number of revision rounds will be defined in your project proposal.",
      },
      {
        heading: "7. Disputes",
        body: "If you believe you are entitled to a refund not covered by this policy, please contact us at admin@veliq.co. We will review your case on an individual basis and respond within 5 business days. We are committed to resolving disputes fairly and promptly.",
      },
      {
        heading: "8. How to Request a Refund",
        body: "To request a refund, please:",
        bullets: [
          "Send an email to admin@veliq.co with the subject line \"Refund Request\".",
          "Include your project name, invoice number, and reason for the refund.",
          "Allow up to 14 business days for processing after approval.",
        ],
      },
      {
        heading: "9. Changes to This Policy",
        body: "We reserve the right to update this Refund Policy at any time. Changes will be posted on this page with an updated revision date. The policy in effect at the time of your purchase will apply to that transaction.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return {};
  return {
    title: `${page.title} — VELIQ`,
    description: page.description,
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[760px] mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4">
          <h1 className="heading-1 text-white">{page.title}.</h1>
          <p className="para-14" style={{ color: "rgba(255,255,255,0.4)" }}>
            Last updated: {page.lastUpdated}
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {page.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3">
              <h2
                className="text-white"
                style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {section.heading}
              </h2>

              {section.body && (
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "15px", fontWeight: 400, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}
                >
                  {section.body}
                </p>
              )}

              {section.bullets && (
                <ul className="flex flex-col gap-2 pl-1">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span
                        className="shrink-0 mt-[7px]"
                        style={{
                          display: "inline-block",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "rgb(99,102,241)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.7,
                        }}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p
                  style={{ fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
                >
                  {section.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-8 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
            style={{ fontSize: "14px", fontWeight: 500, color: "rgb(99,102,241)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
