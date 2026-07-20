import type { Metadata } from "next";
import LabHome from "./LabHome";

export const metadata: Metadata = {
  title: "MIN LAB — 진균 병원성과 지속가능한 생명공학",
  description:
    "부경대학교 미생물학과 Min Lab은 병원성 진균의 병원성 기작을 규명하고 지속가능한 농업을 위한 혁신 생명공학 기술을 개발합니다.",
};

export default function Home() {
  return <LabHome locale="ko" />;
}
