import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bring Your Project to FEA",
  description:
    "Submit your film, music, game, live event, or creator-led initiative to FEA. Select entertainment projects may be reviewed ahead of launch.",
  openGraph: {
    title: "Bring Your Project to FEA",
    description:
      "Submit your film, music, game, live event, or creator-led initiative to FEA. Select entertainment projects may be reviewed ahead of launch.",
  },
};

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
