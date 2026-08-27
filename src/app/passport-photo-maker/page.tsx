import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Passport Photo Maker - 413x531px, 300KB - 20KB Photo",
  description:
    "Create standard passport size photo (3.5x4.5 cm / 413x531 px) under 300KB for official applications online. 100% private in browser.",
  alternates: { canonical: "https://20kbphoto.in/passport-photo-maker" },
  openGraph: {
    title: "Passport Photo Maker - 413x531px, 300KB - 20KB Photo",
    description:
      "Create standard passport size photo (3.5x4.5 cm / 413x531 px) under 300KB for official applications online. 100% private in browser.",
    url: "https://20kbphoto.in/passport-photo-maker",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Photo Maker - 413x531px, 300KB - 20KB Photo",
    description:
      "Create standard passport size photo (3.5x4.5 cm / 413x531 px) under 300KB for official applications online. 100% private in browser.",
  },
};

export default function PassportPhotoMakerPage() {
  return <DimensionToolClient targetWidth={413} targetHeight={531} type="image" />;
}
