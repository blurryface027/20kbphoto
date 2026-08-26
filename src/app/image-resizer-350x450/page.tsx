import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 350×450 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 350x450 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-350x450",
  },
};

export default function ImageResizer350x450Page() {
  return <DimensionToolClient targetWidth={350} targetHeight={450} type="image" />;
}
