import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Studio — VELIQ",
  description: "Learn about our design studio, process, and team.",
};

export default function StudioPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto">
        <h1 className="heading-1 text-white">Studio.</h1>
        <p className="para-32 text-[rgb(201,201,201)] mt-8 max-w-2xl">
          We are a design and automation lab dedicated to removing friction. By
          integrating advanced AI and kinetic workflows, we transform static
          companies into self-driving entities.
        </p>
      </section>
      <Footer />
    </main>
  );
}
