import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 240×80 Pixels Online | 20KB Photo",
  description: "Resize your signature image to exact 240x80 pixels online for exam applications and government recruitment portals.",
  alternates: {
    canonical: "https://20kbphoto.com/signature-resizer-240x80",
  },
};

export default function SignatureResizer240x80Page() {
  return <DimensionToolClient targetWidth={240} targetHeight={80} type="signature" />;
}
