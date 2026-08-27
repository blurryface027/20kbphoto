import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 200x240px Online - 20KB Photo",
  description: "Resize and crop your image to exact 200x240 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-200x240",
  },
  openGraph: {
    title: "Resize Image to 200x240px Online - 20KB Photo",
    description: "Resize and crop your image to exact 200x240 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/image-resizer-200x240",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 200x240px Online - 20KB Photo",
    description: "Resize and crop your image to exact 200x240 pixels online for exam and form applications.",
  },
};

export default function ImageResizer200x240Page() {
  return <DimensionToolClient targetWidth={200} targetHeight={240} type="image" />;
}
