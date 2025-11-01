import { ThemeProvider } from "@/components/context/ThemeContext";
import { CursorProvider } from "@/components/context/CursorContext";
import NavBar from "@/components/layout/NavBar";
import Preloader from "@/components/ui/Preloader";
import SmoothScrolling from "@/utils/SmoothScrolling";
import { Providers } from "@/utils/Transition";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hambaricho Coffee – Premium Ethiopian Green Coffee",
    template: "%s | Hambaricho Coffee",
  },
  description:
    "Export premium Ethiopian green coffee beans directly from trusted farmers to global roasters. Fresh, traceable, and delivered on time.",
  alternates: {
    canonical: "https://hambarichocoffee.com/",
  },
  openGraph: {
    type: "website",
    url: "https://hambarichocoffee.com/",
    siteName: "Hambaricho Coffee",
    images: [
      {
        url: "https://hambarichocoffee.com/images/og.png",
        width: 1200,
        height: 630,
        alt: "Hambaricho Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HambarichoCoffee",
    images: ["https://hambarichocoffee.com/images/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        <Providers>
          <ThemeProvider>
            <CursorProvider>
              <Preloader />
              <SmoothScrolling>
                <NavBar />
                {children}
                <Footer />
              </SmoothScrolling>
              <Analytics />
            </CursorProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
