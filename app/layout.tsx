import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import GlobalBackground from "@/components/ui/GlobalBackground";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SplashScreen from "@/components/ui/SplashScreen";
import { JsonLd, organizationSchema, localBusinessSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veliq.co"),
  title: {
    default: "VELIQ — Software & Marketing Solutions",
    template: "%s — VELIQ",
  },
  description:
    "Precision at the Speed of Ambition. VELIQ delivers web development, SEO, and website support across Egypt, Saudi Arabia, UAE, and the US.",
  keywords: ["web development", "SEO", "website support", "software agency", "Egypt", "Saudi Arabia", "UAE", "digital agency"],
  authors: [{ name: "VELIQ", url: "https://veliq.co" }],
  openGraph: {
    title: "VELIQ — Software & Marketing Solutions",
    description: "Precision at the Speed of Ambition. Web development, SEO, and website support.",
    url: "https://veliq.co",
    siteName: "VELIQ",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELIQ — Software & Marketing Solutions",
    description: "Precision at the Speed of Ambition. Web development, SEO, and website support.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://veliq.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="relative bg-black text-white min-h-full antialiased overflow-x-hidden">
        <SplashScreen />
        <GlobalBackground />
        <CustomCursor />
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
