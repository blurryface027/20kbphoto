import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 300×80 Pixels Online | 20KB Photo",
  description: "Resize your signature image to exact 300x80 pixels online for exam applications and government recruitment portals.",
  alternates: {
    canonical: "https://20kbphoto.in/signature-resizer-300x80",
  },
};

export default function SignatureResizer300x80Page() {
  return <DimensionToolClient targetWidth={300} targetHeight={80} type="signature" />;
}
