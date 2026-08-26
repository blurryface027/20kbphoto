import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 200×240 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 200x240 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.com/image-resizer-200x240",
  },
};

export default function ImageResizer200x240Page() {
  return <DimensionToolClient targetWidth={200} targetHeight={240} type="image" />;
}
