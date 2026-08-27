import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 300x80px Online - 20KB Photo",
  description: "Resize and crop your signature to exact 300x80 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/signature-resizer-300x80",
  },
  openGraph: {
    title: "Resize Signature to 300x80px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 300x80 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/signature-resizer-300x80",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Signature to 300x80px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 300x80 pixels online for exam and form applications.",
  },
};

export default function SignatureResizer300x80Page() {
  return <DimensionToolClient targetWidth={300} targetHeight={80} type="signature" />;
}
