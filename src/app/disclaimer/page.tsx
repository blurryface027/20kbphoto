import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer - 20KB Photo",
  description:
    "Disclaimer regarding exam portal specifications, third-party government trademarks, and image processing tools.",
  alternates: { canonical: "https://20kbphoto.in/disclaimer" },
  openGraph: {
    title: "Disclaimer - 20KB Photo",
    description:
      "Disclaimer regarding exam portal specifications, third-party government trademarks, and image processing tools.",
    url: "https://20kbphoto.in/disclaimer",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer - 20KB Photo",
    description:
      "Disclaimer regarding exam portal specifications, third-party government trademarks, and image processing tools.",
  },
};

export default function DisclaimerPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Disclaimer" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Disclaimer
        </h1>
        <p className="text-xs text-gray-400 mt-2">Last updated: August 27, 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">1. Non-Affiliation with Government Authorities</h2>
          <p>
            20KB Photo (<span className="text-gray-900 font-medium">20kbphoto.in</span>) is an independent utility website. We are <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Institute of Banking Personnel Selection (IBPS), National Testing Agency (NTA), Railway Recruitment Boards (RRB), or any state/central government recruitment authorities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">2. Trademark & Brand Names</h2>
          <p>
            All exam names, acronyms (e.g. SSC CGL, UPSC CSE, IBPS PO, NEET UG, JEE Main), logos, and trademarks mentioned on this website belong to their respective trademark holders. Reference to these trademarks is purely for descriptive, informational, and identification purposes to assist applicants in finding required photo dimensions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">3. Requirement Verification Notice</h2>
          <p>
            While our team continuously updates photo width, height, aspect ratio, file size range (KB), and background specifications against official examination notifications, official rules can change at any time. Users are advised to double-check their processed files against their active application bulletin prior to submitting.
          </p>
        </section>
      </div>
    </div>
  );
}
