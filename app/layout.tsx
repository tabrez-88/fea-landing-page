import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = "https://stage.funkyland.io";

export const metadata: Metadata = {
  title: {
    default: "FEA — Funkyland Entertainment Asset | Launching Soon",
    template: "%s | FEA",
  },
  description:
    "FEA is a curated platform for entertainment projects built for longevity and success. Helping creators bring ambitious films, music, games, and live events to life.",
  keywords: [
    "FEA",
    "Funkyland Entertainment Asset",
    "entertainment platform",
    "creator platform",
    "films",
    "music",
    "games",
    "live events",
    "entertainment funding",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FEA — Funkyland Entertainment Asset",
    title: "FEA — Funkyland Entertainment Asset | Launching Soon",
    description:
      "A curated platform for entertainment projects built for longevity and success. Supporting creators in films, music, games, and live events.",
    images: [
      {
        url: "/assets/fea-light.png",
        width: 1200,
        height: 630,
        alt: "FEA — Funkyland Entertainment Asset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FEA — Funkyland Entertainment Asset | Launching Soon",
    description:
      "A curated platform for entertainment projects built for longevity and success.",
    images: ["/assets/fea-light.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <head>
        <meta name="apple-mobile-web-app-title" content="FEA" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
