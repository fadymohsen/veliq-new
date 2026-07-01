export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VELIQ",
  url: "https://veliq.co",
  logo: "https://veliq.co/branding/colored-logo.png",
  description: "Precision at the Speed of Ambition. VELIQ delivers web development, SEO, and website support across Egypt, Saudi Arabia, UAE, and the US.",
  email: "admin@veliq.co",
  telephone: "+201551164671",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  areaServed: [
    { "@type": "Country", name: "Egypt" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United States" },
  ],
  sameAs: [
    "https://www.instagram.com/veliq.co",
    "https://www.facebook.com/veliq.co/",
    "https://www.linkedin.com/company/veliq-co",
  ],
  foundingDate: "2024",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 15 },
  slogan: "Precision at the Speed of Ambition",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://veliq.co/#business",
  name: "VELIQ",
  url: "https://veliq.co",
  logo: "https://veliq.co/branding/colored-logo.png",
  image: "https://veliq.co/branding/colored-logo.png",
  email: "admin@veliq.co",
  telephone: "+201551164671",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  priceRange: "$$",
  serviceType: ["Website Development", "SEO", "Website Support"],
  areaServed: ["Egypt", "Saudi Arabia", "United Arab Emirates", "United States"],
};

export function serviceSchema(service: {
  title: string;
  slug: string;
  desc: string;
  fullDesc: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    url: `https://veliq.co/services/${service.slug}`,
    description: service.fullDesc,
    provider: {
      "@type": "Organization",
      name: "VELIQ",
      url: "https://veliq.co",
    },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United States" },
    ],
    serviceType: service.title,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://veliq.co/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "VELIQ",
      url: "https://veliq.co",
    },
    publisher: {
      "@type": "Organization",
      name: "VELIQ",
      url: "https://veliq.co",
      logo: {
        "@type": "ImageObject",
        url: "https://veliq.co/branding/colored-logo.png",
      },
    },
    articleSection: post.category,
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
