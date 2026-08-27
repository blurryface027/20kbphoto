import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 275x354px Online - 20KB Photo",
  description: "Resize and crop your image to exact 275x354 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-275x354",
  },
  openGraph: {
    title: "Resize Image to 275x354px Online - 20KB Photo",
    description: "Resize and crop your image to exact 275x354 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/image-resizer-275x354",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 275x354px Online - 20KB Photo",
    description: "Resize and crop your image to exact 275x354 pixels online for exam and form applications.",
  },
};

export default function ImageResizer275x354Page() {
  return <DimensionToolClient targetWidth={275} targetHeight={354} type="image" />;
}
