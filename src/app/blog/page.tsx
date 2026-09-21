import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import BlogFilterSection from "@/components/blog/BlogFilterSection";
import { getAllArticles, getAllCategories } from "@/data/blog";
import Link from "next/link";
import { HiOutlineBookOpen, HiOutlineWrenchScrewdriver } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Blog & Guides - Photo Resizing, Compression, & Document Tips | 20KB Photo",
  description:
    "Explore original, practical guides on photo size reduction, image compression to 20KB and 50KB, pixel resizing, passport photo preparation, and document scanning.",
  alternates: { canonical: "https://20kbphoto.in/blog" },
  openGraph: {
    title: "Blog & Guides - 20KB Photo",
    description:
      "Explore original, practical guides on photo size reduction, image compression to 20KB and 50KB, pixel resizing, passport photo preparation, and document scanning.",
    url: "https://20kbphoto.in/blog",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Guides - 20KB Photo",
    description:
      "Explore original, practical guides on photo size reduction, image compression to 20KB and 50KB, pixel resizing, and document scanning.",
  },
};

export default function BlogIndexPage() {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog" },
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <HiOutlineBookOpen className="w-4 h-4" /> Official 20KB Photo Guides
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Image Preparation & Form Submission Guides
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Practical, step-by-step articles to help you compress photos to 20KB/50KB, resize exact pixel dimensions, convert image formats, and pass online form validations cleanly.
        </p>
      </div>

      {/* Interactive Blog Filtering & Articles Grid */}
      <Suspense
        fallback={
          <div className="space-y-8">
            <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ${
                    idx === 0
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, idx) => (
                <BlogCard
                  key={article.slug}
                  article={article}
                  featured={idx === 0}
                />
              ))}
            </div>
          </div>
        }
      >
        <BlogFilterSection articles={articles} categories={categories} />
      </Suspense>

      {/* Bottom Tool CTA Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">Ready to Resize or Compress Your Photo?</h2>
          <p className="text-sm text-gray-300 max-w-xl">
            Use our 100% private, browser-based image resizer and compressor tools. Zero server uploads.
          </p>
        </div>
        <Link
          href="/tools/image-resizer"
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shrink-0 inline-flex items-center gap-2"
        >
          <HiOutlineWrenchScrewdriver className="w-5 h-5" />
          <span>Try Image Resizer Tool</span>
        </Link>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "20KB Photo Blog & Guides",
            url: "https://20kbphoto.in/blog",
            description:
              "Guides on photo compression, image resizing, passport photo preparation, and form submission tips.",
          }),
        }}
      />
    </div>
  );
}
