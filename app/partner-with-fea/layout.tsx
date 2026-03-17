import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With FEA",
  description:
    "Join FEA's curated network of capital partners, advisors, legal experts, and infrastructure providers supporting the next generation of entertainment assets.",
  openGraph: {
    title: "Partner With FEA",
    description:
      "Join FEA's curated network of capital partners, advisors, legal experts, and infrastructure providers supporting the next generation of entertainment assets.",
  },
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
