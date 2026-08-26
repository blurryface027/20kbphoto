import type { Metadata } from "next";
import NameDateToolClient from "@/components/tools/NameDateToolClient";

export const metadata: Metadata = {
  title: "Add Name & Date to Photo Online | 20KB Photo",
  description:
    "Add candidate name and date of photo overlay to your passport photograph for SSC, UPSC, and official government exam forms. 100% free and private.",
  alternates: { canonical: "https://20kbphoto.in/add-name-and-date-to-photo" },
};

export default function AddNameDatePage() {
  return <NameDateToolClient includeDate={true} />;
}
