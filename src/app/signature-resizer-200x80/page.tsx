import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to 200×80 Pixels Online | 20KB Photo",
  description: "Resize your signature image to exact 200x80 pixels online for exam applications and government recruitment portals.",
  alternates: {
    canonical: "https://20kbphoto.com/signature-resizer-200x80",
  },
};

export default function SignatureResizer200x80Page() {
  return <DimensionToolClient targetWidth={200} targetHeight={80} type="signature" />;
}
