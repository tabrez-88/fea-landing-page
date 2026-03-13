import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "FEA | Comming soon",
  description: "Bring your project to FEA",
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
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
