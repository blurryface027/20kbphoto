import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 350x450px Online - 20KB Photo",
  description: "Resize and crop your image to exact 350x450 pixels online for exam and form applications.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-350x450",
  },
  openGraph: {
    title: "Resize Image to 350x450px Online - 20KB Photo",
    description: "Resize and crop your image to exact 350x450 pixels online for exam and form applications.",
    url: "https://20kbphoto.in/image-resizer-350x450",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image to 350x450px Online - 20KB Photo",
    description: "Resize and crop your image to exact 350x450 pixels online for exam and form applications.",
  },
};

export default function ImageResizer350x450Page() {
  return <DimensionToolClient targetWidth={350} targetHeight={450} type="image" />;
}
