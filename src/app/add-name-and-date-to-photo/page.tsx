import type { Metadata } from "next";
import NameDateToolClient from "@/components/tools/NameDateToolClient";

export const metadata: Metadata = {
  title: "Add Name and Date to Photo Online - 20KB Photo",
  description:
    "Add candidate name and date of photo overlay to your photograph for SSC, UPSC, and official government exam forms.",
  alternates: { canonical: "https://20kbphoto.in/add-name-and-date-to-photo" },
  openGraph: {
    title: "Add Name and Date to Photo Online - 20KB Photo",
    description:
      "Add candidate name and date of photo overlay to your photograph for SSC, UPSC, and official government exam forms.",
    url: "https://20kbphoto.in/add-name-and-date-to-photo",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Name and Date to Photo Online - 20KB Photo",
    description:
      "Add candidate name and date of photo overlay to your photograph for SSC, UPSC, and official government exam forms.",
  },
};

export default function AddNameDatePage() {
  return <NameDateToolClient includeDate={true} />;
}
