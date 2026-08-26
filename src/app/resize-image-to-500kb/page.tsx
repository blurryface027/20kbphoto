import type { Metadata } from "next";
import KBToolClient from "@/components/tools/KBToolClient";

export const metadata: Metadata = {
  title: "Resize Image to 500KB Online Free | 20KB Photo",
  description: "Compress and resize any photo or signature image to exactly 500KB or less for online exam applications and government recruitment forms.",
  alternates: {
    canonical: "https://20kbphoto.com/resize-image-to-500kb",
  },
};

export default function ResizeImageTo500KBPage() {
  return <KBToolClient targetKB={500} />;
}
