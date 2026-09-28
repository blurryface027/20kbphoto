import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { tools, exactKBTools, dimensionTools } from "@/data/tools";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ToolsDirectoryClient from "@/components/tools/ToolsDirectoryClient";
import { HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineShieldCheck, HiOutlineDocumentText } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "All Image and Photo Resizer Tools - 20KB Photo",
  description:
    "Browse our complete collection of free, browser-based image resizers, exact KB compressors, format converters, signature resizers, and document tools. 100% private.",
  alternates: { canonical: "https://20kbphoto.in/tools/" },
  openGraph: {
    title: "All Image and Photo Resizer Tools - 20KB Photo",
    description:
      "Browse our complete collection of free, browser-based image resizers, exact KB compressors, format converters, signature resizers, and document tools. 100% private.",
    url: "https://20kbphoto.in/tools/",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Image and Photo Resizer Tools - 20KB Photo",
    description:
      "Browse our complete collection of free, browser-based image resizers, exact KB compressors, format converters, signature resizers, and document tools. 100% private.",
  },
};

const toolCategoriesOverview = [
  {
    category: "Document & PDF Tools",
    description: "Convert photos, scans, and documents between PDF, JPG, and PNG formats. Includes document edge scanning and multi-photo PDF merging for official portals.",
    popularTools: [
      { name: "JPG to PDF", path: "/tools/jpg-to-pdf" },
      { name: "PDF to JPG", path: "/tools/pdf-to-jpg" },
      { name: "Image to PDF", path: "/tools/image-to-pdf" },
      { name: "Document Scanner", path: "/tools/document-scanner" },
    ],
  },
  {
    category: "Exact File Size Compressors",
    description: "Binary-search compression engine calibrated to compress images strictly under target kilobyte thresholds without pixelation or artifact distortion.",
    popularTools: [
      { name: "Resize to 20KB", path: "/resize-image-to-20kb" },
      { name: "Resize to 50KB", path: "/resize-image-to-50kb" },
      { name: "Resize to 100KB", path: "/resize-image-to-100kb" },
      { name: "Bulk Compressor", path: "/tools/bulk-image-compressor" },
    ],
  },
  {
    category: "Signature Preparation Tools",
    description: "Pre-configured dimension presets for candidate signatures matching government recruitment standards like SSC, UPSC, and IBPS (140×60, 200×80).",
    popularTools: [
      { name: "Signature Resizer", path: "/tools/signature-resizer" },
      { name: "Signature 140×60", path: "/signature-resizer-140x60" },
      { name: "Signature 200×80", path: "/signature-resizer-200x80" },
      { name: "Signature to JPG", path: "/tools/signature-to-jpg" },
    ],
  },
  {
    category: "Image Converters & Format Handlers",
    description: "Convert between JPG, JPEG, PNG, WEBP, and iPhone HEIC files with automatic alpha-channel handling, background fill, and EXIF orientation preservation.",
    popularTools: [
      { name: "Image to JPG", path: "/tools/image-to-jpg" },
      { name: "PNG to JPG", path: "/tools/png-to-jpg" },
      { name: "WebP to JPG", path: "/tools/webp-to-jpg" },
      { name: "JPG to PNG", path: "/tools/jpg-to-png" },
    ],
  },
];

const toolFaqs = [
  {
    question: "How do 20KB Photo online tools preserve user privacy?",
    answer: "Every single tool on 20KB Photo operates 100% locally inside your web browser using HTML5 Canvas, WebAssembly, and JavaScript binary quantization. Your photographs, signatures, identity cards, and documents are NEVER uploaded to any remote server or cloud database."
  },
  {
    question: "Can I resize photos for government exam forms directly on mobile?",
    answer: "Yes. All our tools are fully responsive and touch-optimized for mobile devices, iPhones, and Android smartphones. You can take a photo with your mobile camera or upload from your gallery and download the formatted result in seconds."
  },
  {
    question: "What is the difference between image resizing and image compression?",
    answer: "Image resizing alters the pixel dimensions (width and height, such as 200×230 px or 140×60 px), while image compression reduces the digital storage size (kilobytes or megabytes) without changing the dimensions. Our tools allow you to perform both operations simultaneously."
  },
  {
    question: "How can I convert an iPhone HEIC photo to JPG for online applications?",
    answer: "Upload your iPhone photo directly into our Image Format Converter or Image to JPG tool. The browser automatically decodes the HEIC image, preserves visual quality, and exports a standard JPG file compatible with all Indian government application portals."
  },
  {
    question: "Are there any usage restrictions or watermarks on downloaded files?",
    answer: "No. 20KB Photo provides completely unrestricted, free access with zero watermarks, no account registration requirements, and no daily usage caps."
  }
];

export default function ToolsDirectoryPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "All Tools" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": toolFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <HiOutlineSparkles className="w-4 h-4 text-indigo-600" />
          Complete Browser Utility Suite
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          All Online Image & Photo Tools
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Fast, 100% private browser tools for resizing, compressing, converting, and formatting photos for official applications and government examinations.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading tools...</div>}>
        <ToolsDirectoryClient
          tools={JSON.parse(JSON.stringify(tools))}
          exactKBTools={JSON.parse(JSON.stringify(exactKBTools))}
          dimensionTools={JSON.parse(JSON.stringify(dimensionTools))}
        />
      </Suspense>

      {/* Tool Categories Deep Dive */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Specialized Tool Categories
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Select the right utility tailored to your document and application specifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolCategoriesOverview.map((cat) => (
            <div key={cat.category} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-gray-900">{cat.category}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.popularTools.map((t) => (
                  <Link
                    key={t.name}
                    href={t.path}
                    className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 border border-gray-200 text-xs font-semibold transition-all"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Formats & Capabilities Matrix */}
      <section className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <h2 className="font-extrabold text-base sm:text-lg">
            Supported Formats & Conversion Capabilities
          </h2>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-indigo-200 font-semibold">
            Zero Server Uploads
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                <th className="py-3 px-4">Tool Group</th>
                <th className="py-3 px-4">Input Formats</th>
                <th className="py-3 px-4">Output Formats</th>
                <th className="py-3 px-4">Max Target File Size</th>
                <th className="py-3 px-4">Recommended Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
              <tr className="hover:bg-indigo-50/30">
                <td className="py-3 px-4 font-bold text-gray-900">Exact KB Compressors</td>
                <td className="py-3 px-4 font-mono">JPG, PNG, WEBP, HEIC</td>
                <td className="py-3 px-4 font-semibold text-indigo-600">JPG, PNG, WEBP</td>
                <td className="py-3 px-4">10 KB – 500 KB</td>
                <td className="py-3 px-4">SSC, UPSC, IBPS portal limits</td>
              </tr>
              <tr className="hover:bg-indigo-50/30">
                <td className="py-3 px-4 font-bold text-gray-900">Dimension Resizers</td>
                <td className="py-3 px-4 font-mono">All major image files</td>
                <td className="py-3 px-4 font-semibold text-indigo-600">JPG, PNG</td>
                <td className="py-3 px-4">Custom Pixels / CM</td>
                <td className="py-3 px-4">Photo (200×230, 275×354), Sig (140×60)</td>
              </tr>
              <tr className="hover:bg-indigo-50/30">
                <td className="py-3 px-4 font-bold text-gray-900">PDF Converters</td>
                <td className="py-3 px-4 font-mono">JPG, PNG, PDF</td>
                <td className="py-3 px-4 font-semibold text-indigo-600">PDF, JPG</td>
                <td className="py-3 px-4">Multi-page document</td>
                <td className="py-3 px-4">Admit cards, marksheets, certificates</td>
              </tr>
              <tr className="hover:bg-indigo-50/30">
                <td className="py-3 px-4 font-bold text-gray-900">Utilities</td>
                <td className="py-3 px-4 font-mono">JPG, PNG, WEBP</td>
                <td className="py-3 px-4 font-semibold text-indigo-600">Transparent PNG, JPG</td>
                <td className="py-3 px-4">Full Resolution</td>
                <td className="py-3 px-4">Background removal, metadata stripping</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Directory FAQ Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Common questions regarding our browser-based photo preparation tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolFaqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-5 transition-all [&[open]]:shadow-xs"
            >
              <summary className="font-bold text-sm sm:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-indigo-600 transition-colors">
                <span>{faq.question}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
