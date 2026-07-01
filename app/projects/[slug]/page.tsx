import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import DeviceMockups from "@/components/ui/DeviceMockups";
import { PROJECTS, getProject, getOtherProjects } from "@/lib/projects";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — VELIQ`,
    description: project.description,
    alternates: { canonical: `https://veliq.co/projects/${slug}` },
  };
}

// Dark-grey meta pill (Service / Client / Year) used in the intro.
function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span style={{ fontSize: "12px", fontWeight: 400, color: "rgb(201,201,201)", letterSpacing: "-0.5px" }}>
        {label}
      </span>
      <span
        className="text-white"
        style={{
          backgroundColor: "rgb(20,20,20)",
          borderRadius: "30px",
          padding: "8px 14px",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "-0.2px",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// Yellow "Problem" / "Solution" highlighter tag (sticky on the left).
function HighlighterTag({ label }: { label: string }) {
  return (
    <span
      className="shrink-0"
      style={{
        backgroundColor: "rgb(99,102,241)",
        color: "rgb(0,0,0)",
        borderRadius: "100px",
        padding: "7px 18px",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "-0.2px",
      }}
    >
      {label}
    </span>
  );
}

function ContentBlock({
  label,
  heading,
  body,
}: {
  label: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row md:justify-between items-start gap-10 md:gap-[120px] py-[60px]">
      <HighlighterTag label={label} />
      <div className="w-full md:w-[72%] flex flex-col gap-7">
        <h2 className="text-white" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
          {heading}
        </h2>
        <p style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.6, color: "rgb(201,201,201)" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = getOtherProjects(slug, 4);

  return (
    <main className="bg-black min-h-screen flex flex-col items-center" style={{ padding: "0 24px 0" }}>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://veliq.co" },
        { name: "Projects", url: "https://veliq.co/projects" },
        { name: project.title, url: `https://veliq.co/projects/${project.slug}` },
      ])} />

      {/* ── Intro ── */}
      <section className="w-full flex flex-col items-center gap-10" style={{ paddingTop: "94px" }}>
        <div className="w-full max-w-[600px] flex flex-col items-center text-center gap-4">
          <h1 className="heading-1 text-white">{project.title}</h1>
          <p className="para-26 text-white" style={{ textAlign: "center" }}>{project.description}</p>

          {/* Meta pills */}
          <div className="flex items-end justify-center gap-5 mt-2 flex-wrap">
            <MetaPill label="Service" value={project.category} />
            <MetaPill label="Client" value={project.client} />
            <MetaPill label="Year" value={project.year} />
          </div>

          <Button
            label="Visit Website"
            href={project.url}
            variant="primary"
            openInNewTab
            className="mt-2"
          />
        </div>

        {/* ── Device mockups ── */}
        <div className="w-full max-w-[1200px]">
          <DeviceMockups
            url={project.url}
            title={project.title}
            previewImage={project.noEmbed ? project.preview : undefined}
            previewImageMobile={project.noEmbed ? (project.previewMobile ?? project.preview) : undefined}
          />
        </div>
      </section>

      {/* ── Problem ── */}
      <ContentBlock label="Problem" heading={project.problemHeading} body={project.problemBody} />

      {/* ── Two images side by side ── */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-1">
        {[project.image1, project.image2].map((src, i) => (
          <div key={i} className="flex-1" style={{ aspectRatio: "1.246" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${project.title} showcase ${i + 1}`} className="w-full h-full object-cover" style={{ borderRadius: "25px" }} />
          </div>
        ))}
      </div>

      {/* ── Solution ── */}
      <ContentBlock label="Solution" heading={project.solutionHeading} body={project.solutionBody} />

      {/* ── Gallery ── */}
      <section className="w-full max-w-[1520px] flex flex-col gap-[10px]">
        {project.gallery.map((src, i) => (
          <div key={i} className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${project.title} gallery ${i + 1}`} className="w-full h-auto object-cover" style={{ borderRadius: "25px" }} />
          </div>
        ))}
      </section>

      <div className="w-full flex justify-center" style={{ paddingTop: "60px" }}>
        <Button label="Visit Website" href={project.url} variant="primary" openInNewTab />
      </div>

      {/* ── Next project ── */}
      <section className="w-full max-w-[1200px] flex flex-col gap-20" style={{ padding: "100px 0" }}>
        <div className="flex justify-between items-end gap-6">
          <h2 className="heading-1 text-white">Next project.</h2>
          <Button label="All projects" href="/projects" variant="primary" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10px] gap-y-10">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <div className="w-full" style={{ marginInline: "-24px", width: "calc(100% + 48px)" }}>
        <Footer />
      </div>
    </main>
  );
}
