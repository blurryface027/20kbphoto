import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 500×500 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 500x500 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.com/image-resizer-500x500",
  },
};

export default function ImageResizer500x500Page() {
  return <DimensionToolClient targetWidth={500} targetHeight={500} type="image" />;
}
