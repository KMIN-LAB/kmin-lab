import type { Metadata } from "next";
import LabHome from "../LabHome";

export const metadata: Metadata = {
  title: "MIN LAB — Fungal Virulence & Sustainable Biotechnology",
  description:
    "The Min Lab at Pukyong National University studies fungal virulence and develops innovative biotechnology for sustainable agriculture.",
};

export default function EnglishHome() {
  return <LabHome locale="en" />;
}
