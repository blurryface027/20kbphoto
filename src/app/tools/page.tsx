import type { Metadata } from "next";
import { Suspense } from "react";
import { tools, exactKBTools, dimensionTools } from "@/data/tools";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ToolsDirectoryClient from "@/components/tools/ToolsDirectoryClient";

export const metadata: Metadata = {
  title: "All Image and Photo Resizer Tools - 20KB Photo",
  description:
    "Browse our complete collection of free, browser-based image resizers, KB compressors, photo format converters, signature resizers, and document tools.",
  alternates: { canonical: "https://20kbphoto.in/tools" },
  openGraph: {
    title: "All Image and Photo Resizer Tools - 20KB Photo",
    description:
      "Browse our complete collection of free, browser-based image resizers, KB compressors, photo format converters, signature resizers, and document tools.",
    url: "https://20kbphoto.in/tools",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Image and Photo Resizer Tools - 20KB Photo",
    description:
      "Browse our complete collection of free, browser-based image resizers, KB compressors, photo format converters, signature resizers, and document tools.",
  },
};

export default function ToolsDirectoryPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "All Tools" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6 mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          All Online Image & Photo Tools
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600">
          Fast, 100% private browser tools for resizing, compressing, converting, and formatting photos for official applications.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading tools...</div>}>
        <ToolsDirectoryClient
          tools={JSON.parse(JSON.stringify(tools))}
          exactKBTools={JSON.parse(JSON.stringify(exactKBTools))}
          dimensionTools={JSON.parse(JSON.stringify(dimensionTools))}
        />
      </Suspense>
    </div>
  );
}
