import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIN LAB — Fungal Virulence & Sustainable Biotechnology",
  description:
    "The Min Lab studies fungal virulence and develops innovative biotechnology for sustainable agriculture.",
  openGraph: {
    title: "MIN LAB — Fungal Virulence & Sustainable Biotechnology",
    description:
      "Fungal virulence, real-time plant nanosensors, and AI-assisted mushroom evolution research.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MIN LAB — Fungal Virulence & Sustainable Biotechnology",
    description:
      "Fungal virulence, sustainable biotechnology, and fungal evolution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
