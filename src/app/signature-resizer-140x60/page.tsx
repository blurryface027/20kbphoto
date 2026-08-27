import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 140x60px Online - 20KB Photo",
  description: "Resize and crop your signature to exact 140x60 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/signature-resizer-140x60",
  },
  openGraph: {
    title: "Resize Signature to 140x60px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 140x60 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/signature-resizer-140x60",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Signature to 140x60px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 140x60 pixels online for exam and form applications.",
  },
};

export default function SignatureResizer140x60Page() {
  return <DimensionToolClient targetWidth={140} targetHeight={60} type="signature" />;
}
