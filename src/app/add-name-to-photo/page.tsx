import type { Metadata } from "next";
import NameDateToolClient from "@/components/tools/NameDateToolClient";

export const metadata: Metadata = {
  title: "Add Name to Photo Online - 20KB Photo",
  description:
    "Overlay candidate name onto your photo for exam applications online. 100% private in browser.",
  alternates: { canonical: "https://20kbphoto.in/add-name-to-photo" },
  openGraph: {
    title: "Add Name to Photo Online - 20KB Photo",
    description:
      "Overlay candidate name onto your photo for exam applications online. 100% private in browser.",
    url: "https://20kbphoto.in/add-name-to-photo",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Name to Photo Online - 20KB Photo",
    description:
      "Overlay candidate name onto your photo for exam applications online. 100% private in browser.",
  },
};

export default function AddNamePage() {
  return <NameDateToolClient includeDate={false} />;
}
