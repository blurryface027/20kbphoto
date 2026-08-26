import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Passport Photo Maker Online (3.5x4.5 cm / 413x531 px) | 20KB Photo",
  description:
    "Create standard passport size photo (3.5x4.5 cm / 413x531 px) under 300KB for official applications online. 100% free & private.",
  alternates: { canonical: "https://20kbphoto.in/passport-photo-maker" },
};

export default function PassportPhotoMakerPage() {
  return <DimensionToolClient targetWidth={413} targetHeight={531} type="image" />;
}
