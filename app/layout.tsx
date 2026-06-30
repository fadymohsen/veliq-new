import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import GlobalBackground from "@/components/ui/GlobalBackground";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SplashScreen from "@/components/ui/SplashScreen";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELIQ — Software & Marketing Solutions",
  description:
    "VELIQ is your dedicated backbone team. We deliver web development, mobile apps, SEO, digital marketing, data analytics, and brand strategy across Egypt, Saudi Arabia, UAE, and the US.",
  keywords: ["web development", "digital marketing", "SEO", "mobile apps", "brand strategy", "data analytics", "software agency", "Egypt", "Saudi Arabia"],
  openGraph: {
    title: "VELIQ — Software & Marketing Solutions",
    description:
      "Your dedicated backbone team. Every channel. One direction.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
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
