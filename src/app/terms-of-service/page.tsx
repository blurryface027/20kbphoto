import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | 20KB Photo",
  description:
    "Review the Terms of Service for using 20KB Photo's free browser-based image resizing and compression utilities.",
  alternates: { canonical: "https://20kbphoto.com/terms-of-service" },
};

export default function TermsOfServicePage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Terms of Service" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-400 mt-2">Effective date: January 1, 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using 20KB Photo (<span className="text-gray-900 font-medium">20kbphoto.com</span>), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">2. Description of Utility Services</h2>
          <p>
            20KB Photo provides web utilities designed to assist users in resizing, cropping, compressing, converting, and adding text overlays to photograph and signature files locally within the browser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">3. Verification Responsibility</h2>
          <p>
            Exam notifications and government portal submission rules (such as SSC, UPSC, IBPS, NTA, RRB) are subject to periodic updates by official testing authorities. While we strive to maintain accurate presets, users are responsible for verifying their output against official exam notifications before final submission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">4. Intellectual Property & Fair Use</h2>
          <p>
            All website design, software logic, branding, and text are protected by applicable intellectual property rights. Users may access our utilities for personal, non-commercial use free of charge.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
          <p>
            20KB Photo and its developers shall not be liable for application rejections, technical errors, portal downtime, or data loss resulting from the use of our services.
          </p>
        </section>
      </div>
    </div>
  );
}
