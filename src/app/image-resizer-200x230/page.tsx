import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 200×230 Pixels Online | 20KB Photo",
  description: "Resize your image to exactly 200x230 pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-200x230",
  },
};

export default function ImageResizer200x230Page() {
  return <DimensionToolClient targetWidth={200} targetHeight={230} type="image" />;
}
