import type { Metadata } from "next";
import KBToolClient from "@/components/tools/KBToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 500KB Online - 20KB Photo",
  description: "Compress and resize any photo or signature image to under 500KB for online exam applications and recruitment forms.",
  alternates: {
    canonical: "https://20kbphoto.in/resize-image-to-500kb",
  },
  openGraph: {
    title: "Resize Image to 500KB Online - 20KB Photo",
    description: "Compress and resize any photo or signature image to under 500KB for online exam applications and recruitment forms.",
    url: "https://20kbphoto.in/resize-image-to-500kb",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 500KB Online - 20KB Photo",
    description: "Compress and resize any photo or signature image to under 500KB for online exam applications and recruitment forms.",
  },
};

export default function ResizeImageTo500KBPage() {
  return <KBToolClient targetKB={500} />;
}
