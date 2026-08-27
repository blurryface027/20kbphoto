import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  HiOutlineShieldCheck as ShieldIcon,
  HiOutlineBolt as BoltIcon,
  HiOutlineUserGroup as UsersIcon,
  HiOutlineAcademicCap as CapIcon,
} from "react-icons/hi2";

export const metadata: Metadata = {
  title: "About Us - 20KB Photo",
  description:
    "Learn about 20KB Photo, the 100% private, browser-based image and photo preparation platform built for Indian government exam applicants.",
  alternates: { canonical: "https://20kbphoto.in/about" },
  openGraph: {
    title: "About Us - 20KB Photo",
    description:
      "Learn about 20KB Photo, the 100% private, browser-based image and photo preparation platform built for Indian government exam applicants.",
    url: "https://20kbphoto.in/about",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - 20KB Photo",
    description:
      "Learn about 20KB Photo, the 100% private, browser-based image and photo preparation platform built for Indian government exam applicants.",
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <ShieldIcon className="w-4 h-4" /> 100% Local Browser Processing
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Empowering Indian Applicants with Safe, Fast Photo Tools
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          20KB Photo was created with a clear mission: eliminate form rejection caused by incorrect photo dimensions or file sizes, while guaranteeing 100% user privacy.
        </p>
      </div>

      {/* Core Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Zero Server Uploads</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            All resizing and compression happens right on your device using browser HTMLCanvas technology.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <BoltIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Instant Speed</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Process photos and signatures in under 100ms without waiting for slow cloud servers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <CapIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">100+ Exam Presets</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Pre-configured specs for SSC CGL, UPSC CSE, IBPS PO, RRB NTPC, NEET, JEE, and State PSCs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <UsersIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Always Free</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            No watermarks, no registrations, no hidden fees. Designed for everyday student convenience.
          </p>
        </div>
      </div>

      {/* Story section */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Why We Built 20KB Photo</h2>
        <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
          <p>
            Every year, tens of millions of students and job aspirants across India fill out online application forms for central examinations (UPSC, SSC, Banking, Railways), state recruitment boards, admission tests (NEET, JEE), and police recruitments.
          </p>
          <p>
            One of the most frustrating obstacles applicants face is strict photo and signature submission requirements — such as requiring photos to be exactly <strong className="text-gray-900">275×354 px</strong> and between <strong className="text-gray-900">20 KB and 50 KB</strong>, or signatures to be <strong className="text-gray-900">140×60 px</strong> under <strong className="text-gray-900">20 KB</strong>.
          </p>
          <p>
            Existing online resizer tools often require uploading sensitive passport photographs and signatures to third-party web servers, creating severe privacy risks. 20KB Photo solves this by conducting 100% of image rendering, cropping, resizing, text overlaying, and binary search compression directly inside your device's browser memory.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            href="/tools"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md"
          >
            Explore All Tools
          </Link>
          <Link
            href="/exams"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all"
          >
            Browse Exam Presets
          </Link>
        </div>
      </div>
    </div>
  );
}
