import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 275×118 Pixels Online | 20KB Photo",
  description: "Resize your signature image to exact 275x118 pixels online for exam applications and government recruitment portals.",
  alternates: {
    canonical: "https://20kbphoto.in/signature-resizer-275x118",
  },
};

export default function SignatureResizer275x118Page() {
  return <DimensionToolClient targetWidth={275} targetHeight={118} type="signature" />;
}
