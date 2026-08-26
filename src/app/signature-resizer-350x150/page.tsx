import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 350×150 Pixels Online | 20KB Photo",
  description: "Resize your signature image to exact 350x150 pixels online for exam applications and government recruitment portals.",
  alternates: {
    canonical: "https://20kbphoto.com/signature-resizer-350x150",
  },
};

export default function SignatureResizer350x150Page() {
  return <DimensionToolClient targetWidth={350} targetHeight={150} type="signature" />;
}
