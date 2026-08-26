import type { Metadata } from "next";
import KBToolClient from "@/components/tools/KBToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 40KB Online Free | 20KB Photo",
  description: "Compress and resize any photo or signature image to exactly 40KB or less for online exam applications and government recruitment forms.",
  alternates: {
    canonical: "https://20kbphoto.in/resize-image-to-40kb",
  },
};

export default function ResizeImageTo40KBPage() {
  return <KBToolClient targetKB={40} />;
}
