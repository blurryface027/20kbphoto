import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 200x230px Online - 20KB Photo",
  description: "Resize and crop your image to exact 200x230 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-200x230",
  },
  openGraph: {
    title: "Resize Image to 200x230px Online - 20KB Photo",
    description: "Resize and crop your image to exact 200x230 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/image-resizer-200x230",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 200x230px Online - 20KB Photo",
    description: "Resize and crop your image to exact 200x230 pixels online for exam and form applications.",
  },
};

export default function ImageResizer200x230Page() {
  return <DimensionToolClient targetWidth={200} targetHeight={230} type="image" />;
}
