import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 320x400px Online - 20KB Photo",
  description: "Resize and crop your image to exact 320x400 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-320x400",
  },
  openGraph: {
    title: "Resize Image to 320x400px Online - 20KB Photo",
    description: "Resize and crop your image to exact 320x400 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/image-resizer-320x400",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 320x400px Online - 20KB Photo",
    description: "Resize and crop your image to exact 320x400 pixels online for exam and form applications.",
  },
};

export default function ImageResizer320x400Page() {
  return <DimensionToolClient targetWidth={320} targetHeight={400} type="image" />;
}
