import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with VELIQ. We'll get back to you within 24 hours.",
  alternates: { canonical: "https://veliq.co/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
