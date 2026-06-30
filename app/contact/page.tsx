"use client";

import Footer from "@/components/sections/Footer";
import { useState } from "react";

const CONTACT_INFO = [
  { label: "Email",    value: "admin@veliq.co",    href: "mailto:admin@veliq.co" },
  { label: "Phone",    value: "+20 155 116 4671",  href: "tel:+201551164671" },
  { label: "Location", value: "Cairo, Egypt",       href: null },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/veliq.co" },
  { label: "Facebook",  href: "https://www.facebook.com/veliq.co/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/veliq-co" },
];

const FAQS = [
  {
    q: "How quickly can you start on my project?",
    a: "Most projects kick off within 1–2 weeks of signing. We'll schedule a discovery call to understand your needs and align on timelines before we begin.",
  },
  {
    q: "What's your typical project timeline?",
    a: "It depends on scope. A marketing campaign might take 2–4 weeks, while a full web application could take 2–4 months. We'll give you a clear timeline during our proposal phase.",
  },
  {
    q: "Do you work with startups or only established businesses?",
    a: "We work with both. Whether you're a startup looking for an MVP or an enterprise needing a complex platform, we tailor our approach to fit your stage and budget.",
  },
  {
    q: "What if I need ongoing support after launch?",
    a: "We offer flexible maintenance and support plans. Many of our clients continue working with us long after launch for updates, optimization, and new features.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", message: "" });
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-20">

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1 className="heading-1 text-white">Let&apos;s talk.</h1>
          <p className="para-32 text-[rgb(201,201,201)] max-w-xl">
            Have a project in mind? We&apos;d love to hear about it. We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — info */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Contact cards */}
            <div className="flex flex-col gap-3">
              {CONTACT_INFO.map((item) => {
                const inner = (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 p-5 rounded-[16px]"
                    style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "rgb(124,124,124)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {item.label}
                    </span>
                    <span className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
                      {item.value}
                    </span>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">{inner}</a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <span style={{ fontSize: "11px", fontWeight: 600, color: "rgb(124,124,124)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Follow Us
              </span>
              <div className="flex gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full text-white hover:bg-white/10 transition-colors"
                    style={{
                      border: "1px solid rgb(40,40,40)",
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "8px 16px",
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div
                className="flex flex-col gap-4 items-center justify-center rounded-[20px] p-12 text-center"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)", minHeight: "360px" }}
              >
                <div
                  className="flex items-center justify-center rounded-full text-black"
                  style={{ width: 56, height: 56, backgroundColor: "rgb(99,102,241)", fontSize: "24px" }}
                >
                  ✓
                </div>
                <h3 className="text-white" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  Message sent!
                </h3>
                <p className="text-[rgb(201,201,201)]" style={{ fontSize: "15px", maxWidth: "32ch" }}>
                  We&apos;ll get back to you within 24 hours at {form.email}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-[20px] p-8"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <h3 className="text-white" style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  Send a message
                </h3>

                {[
                  { id: "name",    label: "Full name",      type: "text",  placeholder: "Your name" },
                  { id: "email",   label: "Email",           type: "email", placeholder: "you@company.com" },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label className="para-14 text-[rgb(201,201,201)]">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                      className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 para-16 outline-none border border-transparent transition-colors"
                      style={{ borderColor: "rgb(40,40,40)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgb(99,102,241)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="para-14 text-[rgb(201,201,201)]">Project brief</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project..."
                    required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 para-16 outline-none border border-transparent transition-colors resize-none"
                    style={{ borderColor: "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgb(99,102,241)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                  />
                </div>

                {error && (
                  <p className="text-sm rounded-[12px] px-4 py-3" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "rgb(239,68,68)" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="self-start rounded-full text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "rgb(99,102,241)", fontSize: "14px", fontWeight: 600, padding: "12px 28px" }}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-10">
          <h2 className="text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.05em" }}>
            Common questions.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="flex flex-col gap-3 p-6 rounded-[16px]"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <h3 className="text-white" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  {faq.q}
                </h3>
                <p className="text-[rgb(201,201,201)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
