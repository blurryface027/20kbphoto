import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 500x500px Online - 20KB Photo",
  description: "Resize and crop your image to exact 500x500 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-500x500",
  },
  openGraph: {
    title: "Resize Image to 500x500px Online - 20KB Photo",
    description: "Resize and crop your image to exact 500x500 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/image-resizer-500x500",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 500x500px Online - 20KB Photo",
    description: "Resize and crop your image to exact 500x500 pixels online for exam and form applications.",
  },
};

export default function ImageResizer500x500Page() {
  return <DimensionToolClient targetWidth={500} targetHeight={500} type="image" />;
}
