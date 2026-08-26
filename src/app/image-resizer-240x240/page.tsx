import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 240×240 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 240x240 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.com/image-resizer-240x240",
  },
};

export default function ImageResizer240x240Page() {
  return <DimensionToolClient targetWidth={240} targetHeight={240} type="image" />;
}
