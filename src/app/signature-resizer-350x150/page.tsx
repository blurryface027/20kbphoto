import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 350x150px Online - 20KB Photo",
  description: "Resize and crop your signature to exact 350x150 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/signature-resizer-350x150",
  },
  openGraph: {
    title: "Resize Signature to 350x150px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 350x150 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/signature-resizer-350x150",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Signature to 350x150px Online - 20KB Photo",
    description: "Resize and crop your signature to exact 350x150 pixels online for exam and form applications.",
  },
};

export default function SignatureResizer350x150Page() {
  return <DimensionToolClient targetWidth={350} targetHeight={150} type="signature" />;
}
