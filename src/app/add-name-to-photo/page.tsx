import type { Metadata } from "next";
import NameDateToolClient from "@/components/tools/NameDateToolClient";

export const metadata: Metadata = {
  title: "Add Name to Photo Online | 20KB Photo",
  description:
    "Overlay candidate name onto your photo for exam applications easily online. 100% free, private, and instant.",
  alternates: { canonical: "https://20kbphoto.com/add-name-to-photo" },
};

export default function AddNamePage() {
  return <NameDateToolClient includeDate={false} />;
}
