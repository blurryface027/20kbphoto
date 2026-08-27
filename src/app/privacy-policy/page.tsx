import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { HiOutlineShieldCheck, HiOutlineLockClosed } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Privacy Policy - 20KB Photo",
  description:
    "Read our Privacy Policy. 20KB Photo processes all images locally inside your browser memory. We never collect, store, or upload your photos or personal data.",
  alternates: { canonical: "https://20kbphoto.in/privacy-policy" },
  openGraph: {
    title: "Privacy Policy - 20KB Photo",
    description:
      "Read our Privacy Policy. 20KB Photo processes all images locally inside your browser memory. We never collect, store, or upload your photos or personal data.",
    url: "https://20kbphoto.in/privacy-policy",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - 20KB Photo",
    description:
      "Read our Privacy Policy. 20KB Photo processes all images locally inside your browser memory. We never collect, store, or upload your photos or personal data.",
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <HiOutlineShieldCheck className="w-4 h-4 text-emerald-600" /> Complete Client-Side Privacy Guarantee
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-400 mt-2">Last updated: August 27, 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">1. Client-Side Image Processing Guarantee</h2>
          <p>
            At 20KB Photo (<span className="text-gray-900 font-medium">20kbphoto.in</span>), user privacy is our highest priority. All image resizing, compression, format conversion, cropping, and text overlay operations occur strictly within your Web Browser's local RAM memory using HTML5 Canvas API technology.
          </p>
          <p className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-emerald-900 text-sm font-medium flex items-center gap-2">
            <HiOutlineLockClosed className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Your photographs, signatures, and document scans are <strong>NEVER uploaded to any external server</strong>, cloud database, or third-party storage.</span>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">2. Information We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>We do not collect or store uploaded image files or photos.</li>
            <li>We do not collect candidate names, dates of birth, or text overlays typed into tools.</li>
            <li>We do not require user accounts, emails, passwords, or registration.</li>
            <li>We do not track identity or build personal user profiles.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">3. Technical Analytics & Local Storage</h2>
          <p>
            We may collect non-personally identifiable technical telemetry (such as browser type, operating system version, page load performance, and aggregated page visits) solely to optimize user interface speed and cross-device compatibility.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">4. Third-Party Advertising & Services</h2>
          <p>
            We may display third-party advertisements (such as Google AdSense) to keep our tools 100% free for students. Advertising networks may use cookies to serve relevant non-personalized ads based on page content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please reach out through our{" "}
            <a href="/contact" className="text-indigo-600 font-semibold hover:underline">
              Contact Page
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
