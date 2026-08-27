import type { Metadata } from "next";
import PanCardToolClient from "@/components/tools/PanCardToolClient";

export const metadata: Metadata = {
  title: "PAN Card Photo Resizer Online - 213x213px, 50KB - 20KB Photo",
  description:
    "Resize photo and signature for NSDL and UTIITSL online PAN card applications to exact 213x213 pixels, 300 DPI, and 50KB limit.",
  alternates: { canonical: "https://20kbphoto.in/pan-card-photo-resizer" },
  openGraph: {
    title: "PAN Card Photo Resizer Online - 213x213px, 50KB - 20KB Photo",
    description:
      "Resize photo and signature for NSDL and UTIITSL online PAN card applications to exact 213x213 pixels, 300 DPI, and 50KB limit.",
    url: "https://20kbphoto.in/pan-card-photo-resizer",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PAN Card Photo Resizer Online - 213x213px, 50KB - 20KB Photo",
    description:
      "Resize photo and signature for NSDL and UTIITSL online PAN card applications to exact 213x213 pixels, 300 DPI, and 50KB limit.",
  },
};

export default function PanCardResizerPage() {
  return <PanCardToolClient />;
}
