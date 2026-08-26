import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 320×400 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 320x400 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.com/image-resizer-320x400",
  },
};

export default function ImageResizer320x400Page() {
  return <DimensionToolClient targetWidth={320} targetHeight={400} type="image" />;
}
