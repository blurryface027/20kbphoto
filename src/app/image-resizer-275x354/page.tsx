import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 275×354 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 275x354 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.com/image-resizer-275x354",
  },
};

export default function ImageResizer275x354Page() {
  return <DimensionToolClient targetWidth={275} targetHeight={354} type="image" />;
}
