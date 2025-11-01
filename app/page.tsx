import Cards from "@/components/section/Cards";
import ExportHero from "@/components/section/ExportHero";
import Landing from "@/components/section/Landing";
import Service from "@/components/section/Service";
import Spotlight from "@/components/section/Spotlight/Spotlight";
import Marquee from "@/components/ui/Marquee";
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
        url: "https://hambarichocoffee.com/images/og.png",
        width: 1200,
        height: 630,
        alt: "Hambaricho Coffee - Ethiopian Green Coffee Exporter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HambarichoCoffee",
    title: "Premium Ethiopian Green Coffee Exporter | Hambaricho Coffee",
    description:
      "Fresh, traceable Ethiopian green coffee beans exported worldwide.",
    images: ["https://hambarichocoffee.com/images/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function Home() {
  return (
    <div className="relative">
      {/* <SVGLine /> */}
      <div className="relative bg-secondary overflow-x-hidden">
        <Landing />
        <Marquee className="flex lg:hidden -mt-8 mb-10 relative z-30" />
        <Cards />
        <Spotlight />
      </div>
      <Service />
      <ExportHero />
    </div>
  );
}
