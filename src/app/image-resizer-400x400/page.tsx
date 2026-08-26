import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 400×400 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 400x400 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-400x400",
  },
};

export default function ImageResizer400x400Page() {
  return <DimensionToolClient targetWidth={400} targetHeight={400} type="image" />;
}
