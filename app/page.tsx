import Cards from "@/components/section/Cards";
import Contact from "@/components/section/Contact";
import Images from "@/components/section/Images";
import Landing from "@/components/section/Landing";
import CrftdComponent from "@/components/section/Services";
import ExportHero from "@/components/section/ExportHero";
import SVGLine from "@/components/ui/SVGLine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Ethiopian Green Coffee Exporter | Hambaricho Coffee",
  description:
    "Export premium Ethiopian green coffee beans directly from trusted farmers to your roastery. Fresh, traceable, and delivered on time worldwide.",
  keywords: [
    "Ethiopian green coffee beans",
    "Ethiopian coffee exporter",
    "green coffee Ethiopia",
    "specialty coffee Ethiopia",
    "coffee supplier for roasters",
    "Sidamo coffee export",
    "Yirgacheffe green beans",
    "Guji specialty coffee",
  ],
  alternates: {
    canonical: "https://hambarichocoffee.com/",
  },
  openGraph: {
    type: "website",
    url: "https://hambarichocoffee.com/",
    title: "Premium Ethiopian Green Coffee Exporter | Hambaricho Coffee",
    description:
      "Directly sourced Ethiopian green coffee beans for global roasters. Specialty & commercial grades with reliable export services.",
    siteName: "Hambaricho Coffee",
    images: [
      {
        url: "https://hambarichocoffee.com/og-image.jpg", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Hambaricho Coffee - Ethiopian Green Coffee Exporter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HambarichoCoffee", // Replace if you have a Twitter/X handle
    title: "Premium Ethiopian Green Coffee Exporter | Hambaricho Coffee",
    description:
      "Fresh, traceable Ethiopian green coffee beans exported worldwide.",
    images: ["https://hambarichocoffee.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function Home() {
  return (
    <div className="relative">
      <SVGLine />
      <div className="relative bg-secondary">
        <Landing />
        <Cards />
      </div>
      <Images />
      <CrftdComponent />
      <ExportHero />
      <Contact />
    </div>
  );
}
