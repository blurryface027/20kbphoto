import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { HiOutlineShieldCheck, HiOutlineLockClosed } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Privacy Policy - 20KB Photo Client-Side Data Protection",
  description:
    "Read our Privacy Policy. 20KB Photo operates a 100% client-side zero-upload architecture. We never collect, transmit, or store your photos, signatures, or personal data.",
  alternates: { canonical: "https://20kbphoto.in/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy - 20KB Photo Client-Side Data Protection",
    description:
      "Read our Privacy Policy. 20KB Photo operates a 100% client-side zero-upload architecture. We never collect, transmit, or store your photos, signatures, or personal data.",
    url: "https://20kbphoto.in/privacy-policy/",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - 20KB Photo Client-Side Data Protection",
    description:
      "Read our Privacy Policy. 20KB Photo operates a 100% client-side zero-upload architecture. We never collect, transmit, or store your photos, signatures, or personal data.",
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
        <p className="text-xs text-gray-400 mt-2">Last updated: September 28, 2026 • Effective Date: September 28, 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">1. Client-Side Image Processing & Zero-Upload Guarantee</h2>
          <p>
            At 20KB Photo (<span className="text-gray-900 font-medium">20kbphoto.in</span>), user privacy and document security are our core operational commitments. Unlike traditional image conversion or compression web applications, 20KB Photo runs 100% of all image processing logic—including dimension resizing, crop adjustments, color balancing, DPI header injection, and binary-search JPEG quantization—locally within your web browser&apos;s memory via HTML5 Canvas and client-side JavaScript APIs.
          </p>
          <div className="bg-emerald-50 p-4 sm:p-5 rounded-xl border border-emerald-200 text-emerald-950 text-sm font-medium flex items-start gap-3">
            <HiOutlineLockClosed className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Zero Server Upload Commitment:</strong> Your passport photographs, handwritten signatures, admit cards, certificates, and identity documents are <strong>NEVER transmitted over the internet to our web servers</strong>, cloud storage providers, or any third party. Your files remain completely confined to your local hardware.
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">2. Categories of Information We Do Not Collect</h2>
          <p>
            In accordance with data minimization principles under the Indian Digital Personal Data Protection Act (DPDP Act 2023) and international privacy frameworks:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><strong>No Image Content:</strong> We do not store, view, copy, inspect, or retain your uploaded image files or downloaded photos.</li>
            <li><strong>No Candidate Identifying Data:</strong> We do not collect names, dates of birth, roll numbers, or personal text typed into overlay fields.</li>
            <li><strong>No User Account Credentials:</strong> 20KB Photo does not require user accounts, emails, passwords, phone numbers, or social logins to access full functionality.</li>
            <li><strong>No Document Profiling:</strong> We do not extract biometric vectors, facial geometry, or document metadata for profiling or commercial purposes.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">3. Technical Telemetry & Anonymized Analytics</h2>
          <p>
            To monitor website stability, diagnose interface performance issues, and ensure cross-browser compatibility across desktop and mobile devices, we collect non-personally identifiable telemetry through Google Analytics (GA4).
          </p>
          <p>
            This data may include aggregated technical signals such as browser type, operating system version, screen resolution, referral URLs, language preference, and page load latency. Google Analytics uses anonymized IP addresses and aggregated metrics that cannot be used to identify individual users or link to your personal documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">4. Advertising Networks & Cookies</h2>
          <p>
            20KB Photo is provided as a 100% free utility for students and job applicants. To support server infrastructure and domain maintenance costs, we display non-intrusive advertisements served by third-party advertising partners, including Google AdSense and WeforAds.
          </p>
          <p>
            These advertising networks may set browser cookies or use web beacons to deliver contextual advertisements based on general browsing topics. Advertising partners do not have access to any images processed in your browser. Users can manage or opt out of personalized advertising by visiting Google Ad Settings (<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">adssettings.google.com</a>) or using industry opt-out portals like Your Online Choices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">5. Browser Local Storage & Session Data</h2>
          <p>
            Our web application may utilize standard browser `localStorage` or `sessionStorage` solely to remember user-selected UI preferences, such as your last selected document type (photo vs. signature) or active category filter. This information remains on your local device and is never synchronized to our servers. You may clear your browser cache at any time to remove all saved preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">6. Third-Party External Links</h2>
          <p>
            Our website contains reference links to external third-party sites, including official government examination portals (e.g. ssc.gov.in, upsc.gov.in, ibps.in) and notification guidelines. We have no control over the privacy practices or content of third-party domains and encourage candidates to review their respective privacy policies upon navigating away from our site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">7. Indian Digital Personal Data Protection Act (DPDP Act 2023) Compliance</h2>
          <p>
            20KB Photo fully adheres to the principles of purpose limitation, data minimization, and storage limitation outlined in the Digital Personal Data Protection Act, 2023 (DPDP Act 2023) of India:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li><strong>Right to Privacy & Minimal Processing:</strong> Because all image processing logic executes entirely within client-side volatile memory (RAM) and terminates upon tab closure, no personal data is collected or processed by our organization as a Data Fiduciary.</li>
            <li><strong>No Secondary Data Use:</strong> No data is ever sold, leased, licensed, aggregated, or shared with data brokers, recruiters, coaching institutes, or marketing agencies.</li>
            <li><strong>Right to Erasure & Zero Retention:</strong> Since no personal data or image files are uploaded or stored on our servers, there is no candidate data retained to erase. Your files are automatically purged from local memory as soon as you refresh or close your browser tab.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">8. Candidate Security Recommendations for Cyber Cafes & Shared Computers</h2>
          <p>
            Millions of candidates in India use public cyber cafes, library terminals, or shared computers to complete their examination registration. While 20KB Photo does not store any files on web servers, local copies of your downloaded images may remain on the shared computer&apos;s physical hard drive. To protect your identity:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Always use <strong>Incognito or Private Browsing mode</strong> when accessing 20KB Photo from a public cyber cafe computer.</li>
            <li>After downloading your resized photo and signature, upload them directly to your examination portal and immediately delete the local files from the computer&apos;s &ldquo;Downloads&rdquo; folder.</li>
            <li>Empty the public computer&apos;s Recycle Bin or Trash folder before ending your session.</li>
            <li>Log out of any application portals and close all browser windows completely before vacating the terminal.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">9. Children and Minors Privacy</h2>
          <p>
            Our web platform is designed as an educational utility for candidates of all ages applying for school admissions, entrance examinations (such as Navodaya Vidyalaya, Sainik School, NTSE, and Olympiads), and competitive tests. We do not knowingly solicit, collect, or store personal information from children under the age of 18. All document processing occurs strictly locally under the user&apos;s or guardian&apos;s direct supervision.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">10. Policy Amendments & Updates</h2>
          <p>
            We may update our Privacy Policy periodically to reflect technological improvements, legal requirements, or regulatory changes in data protection laws. Any modifications will be posted directly on this page with an updated &ldquo;Last updated&rdquo; timestamp. We encourage candidates to review this policy periodically.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">11. Governing Law & Jurisdiction</h2>
          <p>
            This Privacy Policy and all matters relating to your access to or use of the website shall be governed by and construed in accordance with the laws of the Republic of India, without giving effect to any principles of conflicts of law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">12. Data Protection Officer & Contact Inquiries</h2>
          <p>
            If you have questions, feedback, or concerns regarding our privacy practices or wish to submit feedback regarding our data handling principles, please contact our team via our{" "}
            <Link href="/contact/" className="text-indigo-600 font-semibold hover:underline">
              Contact Page
            </Link>{" "}
            or email us directly at <span className="text-gray-900 font-medium">support@20kbphoto.in</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
