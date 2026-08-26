import type { Metadata } from "next";
import PanCardToolClient from "@/components/tools/PanCardToolClient";

export const metadata: Metadata = {
  title: "PAN Card Photo Resizer Online — 213x213 px & 300 DPI | 20KB Photo",
  description:
    "Resize your photo and signature for PAN card online application (NSDL Protean / UTIITSL) to exact 213x213 pixels, 300 DPI, and under 50KB size. Free and 100% private.",
  alternates: { canonical: "https://20kbphoto.in/pan-card-photo-resizer" },
};

export default function PanCardResizerPage() {
  return <PanCardToolClient />;
}
