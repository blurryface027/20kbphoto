import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 300×300 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 300x300 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-300x300",
  },
};

export default function ImageResizer300x300Page() {
  return <DimensionToolClient targetWidth={300} targetHeight={300} type="image" />;
}
