import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 300x300px Online - 20KB Photo",
  description: "Resize and crop your image to exact 300x300 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-300x300",
  },
  openGraph: {
    title: "Resize Image to 300x300px Online - 20KB Photo",
    description: "Resize and crop your image to exact 300x300 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/image-resizer-300x300",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 300x300px Online - 20KB Photo",
    description: "Resize and crop your image to exact 300x300 pixels online for exam and form applications.",
  },
};

export default function ImageResizer300x300Page() {
  return <DimensionToolClient targetWidth={300} targetHeight={300} type="image" />;
}
