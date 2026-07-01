import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

function renderLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link key={i} href={match[2]} className="text-[rgb(99,102,241)] hover:underline transition-colors">
          {match[1]}
        </Link>
      );
    }
    return part;
  });
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — VELIQ`,
    description: post.excerpt,
    alternates: { canonical: `https://veliq.co/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://veliq.co" },
        { name: "Blog", url: "https://veliq.co/blog" },
        { name: post.title, url: `https://veliq.co/blog/${post.slug}` },
      ])} />
      <article className="section-padding max-w-[760px] mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="rounded-full text-black"
              style={{
                backgroundColor: "rgb(99,102,241)",
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 14px",
                letterSpacing: "-0.2px",
              }}
            >
              {post.category}
            </span>
            <span className="para-12 text-[rgb(201,201,201)]">{post.date} · {post.readTime}</span>
          </div>
          <h1
            className="text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 600, lineHeight: "110%", letterSpacing: "-0.04em" }}
          >
            {post.title}
          </h1>
          <p className="text-[rgb(201,201,201)]" style={{ fontSize: "18px", lineHeight: 1.6 }}>
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgb(28,28,28)]" />

        {/* Content */}
        <div className="flex flex-col gap-6">
          {post.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-white"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, letterSpacing: "-0.03em", marginTop: "8px" }}
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p
                key={i}
                className="text-[rgb(201,201,201)] leading-relaxed"
                style={{ fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                {renderLinks(block)}
              </p>
            );
          })}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-[rgb(28,28,28)]">
          <div
            className="flex items-center justify-center rounded-full text-white"
            style={{ width: 40, height: 40, backgroundColor: "rgb(99,102,241)", fontSize: "14px", fontWeight: 700 }}
          >
            V
          </div>
          <div className="flex flex-col">
            <span className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>{post.author}</span>
            <span className="text-[rgb(201,201,201)]" style={{ fontSize: "12px" }}>veliq.agency@gmail.com</span>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
