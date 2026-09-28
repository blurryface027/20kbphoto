import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - 20KB Photo Terms of Use",
  description:
    "Review the Terms of Service for using 20KB Photo's free browser-based image resizing, cropping, compression, and photo preparation utilities.",
  alternates: { canonical: "https://20kbphoto.in/terms-of-service/" },
  openGraph: {
    title: "Terms of Service - 20KB Photo Terms of Use",
    description:
      "Review the Terms of Service for using 20KB Photo's free browser-based image resizing, cropping, compression, and photo preparation utilities.",
    url: "https://20kbphoto.in/terms-of-service/",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - 20KB Photo Terms of Use",
    description:
      "Review the Terms of Service for using 20KB Photo's free browser-based image resizing, cropping, compression, and photo preparation utilities.",
  },
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
        <p className="text-xs text-gray-400 mt-2">Last updated: September 28, 2026 • Effective Date: September 28, 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms & Eligibility</h2>
          <p>
            By accessing, browsing, or utilizing the web utilities available on 20KB Photo (<span className="text-gray-900 font-medium">20kbphoto.in</span>), you agree to comply with and be bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
          </p>
          <p>
            These terms apply to all visitors, registered candidates, job applicants, and students who utilize our browser-based photo resizing, document scanning, and compression utilities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">2. Description of Utility Services</h2>
          <p>
            20KB Photo provides self-service, browser-based graphical utility tools designed to assist candidates in cropping, resizing, compressing, converting, and adding text annotations to photograph and signature files locally within the browser memory.
          </p>
          <p>
            All processing operations occur directly on the user&apos;s client device using HTML5 Canvas technology. 20KB Photo acts solely as a client-side execution environment and does not store, host, transmit, or archive any user media files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">3. Independent Platform & Non-Affiliation Disclaimer</h2>
          <div className="bg-amber-50 p-4 sm:p-5 rounded-xl border border-amber-200 text-amber-950 text-sm">
            <p className="font-bold mb-1">Government Non-Affiliation Notice:</p>
            <p>
              20KB Photo is an independent digital utility platform. We are <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Institute of Banking Personnel Selection (IBPS), State Bank of India (SBI), Railway Recruitment Boards (RRB), National Testing Agency (NTA), or any Central or State Government recruiting department, ministry, or commission.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">4. Candidate Verification Responsibility</h2>
          <p>
            Official recruitment notifications, document dimensions, resolution standards, background color requirements, and file size thresholds (KB limits) are determined exclusively by official examination bodies and are subject to periodic changes without prior notice.
          </p>
          <p>
            While our team strives to maintain strictly accurate and verified presets:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
            <li>Users are strictly responsible for cross-verifying generated output files against the official notification PDF published by the examination authority for their specific recruitment cycle.</li>
            <li>Candidates must confirm image clarity, legibility of candidate names and photo dates, and signature readability before final submission on government application portals.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">5. Permitted Use & Intellectual Property</h2>
          <p>
            Users are granted a personal, non-exclusive, non-transferable, revocable license to use 20KB Photo for personal, non-commercial purposes. You may not:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
            <li>Attempt to reverse-engineer, decompile, or scrape the platform&apos;s source code or programmatic preset database for commercial distribution.</li>
            <li>Use the platform to process, display, or generate unlawful, fraudulent, defamatory, or infringing image materials.</li>
            <li>Deploy automated scripts, bots, or scrapers that cause excessive burden on our web hosting infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">6. Prohibition of Application Fraud & Impersonation</h2>
          <p>
            Candidates and users must ensure that all photographs, signatures, admit cards, and certificates formatted through 20KB Photo belong legitimately to the applying individual. Using our tools to forge signatures, impersonate another candidate, fabricate date or name overlays fraudulently, or alter official credentials constitutes a severe violation of portal guidelines and a criminal offense under the Information Technology Act, 2000 (IT Act) and the Bharatiya Nyaya Sanhita (BNS). 20KB Photo strictly condemns any form of academic or recruitment dishonesty and cooperates fully with authorized law enforcement agencies upon receipt of lawful orders.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, 20KB Photo, its founders, contributors, and operators shall not be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
            <li>Rejection, disqualification, or cancellation of any exam application or government job form submission by examination authorities or recruiting commissions.</li>
            <li>Technical failures, server downtime, browser memory crashes, network packet loss, or portal submission deadline misses.</li>
            <li>Inaccuracies, outdated notification data, or typographical discrepancies in exam preset dimensions or file size limits.</li>
            <li>Any user error occurring during file saving, file renaming, or uploading an incorrect file type to external government servers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">8. Disclaimer of Warranties</h2>
          <p>
            The services, utilities, and information provided on 20KB Photo are delivered strictly on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular examination purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that our website will be uninterrupted, error-free, completely immune from browser rendering discrepancies across all mobile or desktop operating systems, or that defects will be corrected instantaneously. Candidates must inspect their final downloaded images before official submission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless 20KB Photo, its owners, operators, developers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or legal fees arising out of or relating to your violation of these Terms of Service or your misuse of the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">10. Third-Party Advertising & External Links</h2>
          <p>
            20KB Photo displays advertisements served by third-party advertising networks (including Google AdSense and WeforAds) to fund domain maintenance and operational hosting costs. We do not endorse or assume responsibility for any third-party products, services, or websites advertised. Any interactions with advertisers found on this platform are solely between you and the respective third party.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">11. Severability & Entire Agreement</h2>
          <p>
            If any provision of these Terms of Service is deemed unlawful, void, or for any reason unenforceable by a court of competent jurisdiction, that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions. These Terms represent the entire agreement between you and 20KB Photo regarding the use of our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">12. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms of Service and any dispute or claim arising out of or related to them shall be governed by and construed in accordance with the substantive laws of India, without regard to conflict of law principles. Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively in the courts located in New Delhi, India.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">13. Modifications to Terms</h2>
          <p>
            We reserve the right to revise or replace these Terms of Service at any time. When material changes are made, the &ldquo;Last updated&rdquo; timestamp at the top of this document will be updated accordingly. Continued use of 20KB Photo following the posting of changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">14. Contact Information</h2>
          <p>
            If you have questions or concerns regarding these Terms of Service, please reach out via our{" "}
            <Link href="/contact/" className="text-indigo-600 font-semibold hover:underline">
              Contact Page
            </Link>{" "}
            or email us at <span className="text-gray-900 font-medium">support@20kbphoto.in</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
