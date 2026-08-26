import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 140×60 Pixels Online | 20KB Photo",
  description: "Resize your signature image to exact 140x60 pixels online for exam applications and government recruitment portals.",
  alternates: {
    canonical: "https://20kbphoto.com/signature-resizer-140x60",
  },
};

export default function SignatureResizer140x60Page() {
  return <DimensionToolClient targetWidth={140} targetHeight={60} type="signature" />;
}
