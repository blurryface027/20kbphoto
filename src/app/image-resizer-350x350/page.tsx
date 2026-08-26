import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 350×350 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 350x350 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.com/image-resizer-350x350",
  },
};

export default function ImageResizer350x350Page() {
  return <DimensionToolClient targetWidth={350} targetHeight={350} type="image" />;
}
