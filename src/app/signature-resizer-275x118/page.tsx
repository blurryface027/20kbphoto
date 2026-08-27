import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 275x118px Online - 20KB Photo",
  description: "Resize and crop your signature to exact 275x118 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/signature-resizer-275x118",
  },
  openGraph: {
    title: "Resize Signature to 275x118px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 275x118 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/signature-resizer-275x118",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Signature to 275x118px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 275x118 pixels online for exam and form applications.",
  },
};

export default function SignatureResizer275x118Page() {
  return <DimensionToolClient targetWidth={275} targetHeight={118} type="signature" />;
}
