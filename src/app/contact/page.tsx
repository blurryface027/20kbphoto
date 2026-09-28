import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ContactClient from "@/components/contact/ContactClient";
import {
  HiOutlineEnvelope,
  HiOutlineClock,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineBugAnt,
  HiOutlineSparkles,
} from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Contact Us - 20KB Photo Support & Preset Feedback",
  description:
    "Get in touch with the 20KB Photo team for feedback, feature requests, bug reports, or to submit updated exam photo and signature preset specifications.",
  alternates: { canonical: "https://20kbphoto.in/contact/" },
  openGraph: {
    title: "Contact Us - 20KB Photo Support & Preset Feedback",
    description:
      "Get in touch with the 20KB Photo team for feedback, feature requests, bug reports, or to submit updated exam photo and signature preset specifications.",
    url: "https://20kbphoto.in/contact/",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - 20KB Photo Support & Preset Feedback",
    description:
      "Get in touch with the 20KB Photo team for feedback, feature requests, bug reports, or to submit updated exam photo and signature preset specifications.",
  },
};

const supportFaqs = [
  {
    question: "How long does it take for the 20KB Photo support team to respond?",
    answer:
      "Our team typically reviews and replies to all user feedback, bug reports, and exam preset update requests within 24 to 48 business hours.",
  },
  {
    question: "How can I request a new exam preset to be added?",
    answer:
      "Select 'Request New Tool / Exam Preset' in the contact form topic above. Provide the official exam name (e.g. state police, high court, university admission), conducting authority, and if possible, a link to the official notification PDF detailing the photo and signature specifications.",
  },
  {
    question: "What should I include when reporting a bug or image processing error?",
    answer:
      "To help us troubleshoot effectively, please mention your device type (Mobile/Desktop), operating system (Android, iOS, Windows, macOS), web browser (Chrome, Safari, Firefox), and the approximate size and format of the image you tried to process.",
  },
  {
    question: "Why was my photo rejected by the official examination portal?",
    answer:
      "Common reasons include not strictly meeting required pixel dimensions (e.g. 200×230 px), having file size outside the allowed KB bounds, using a colored or textured background instead of plain white, or uploading a blurry image. Check our verified preset specs before re-uploading.",
  },
  {
    question: "What should I do if my iPhone HEIC photo fails to load?",
    answer:
      "Modern iPhones capture photos in HEIC format by default. Our tools include an automated client-side HEIC decoder. If your browser restricts HEIC decoding, change your iPhone camera settings to 'Most Compatible' (Settings > Camera > Formats) or use our Image to JPG tool first.",
  },
  {
    question: "Why does the image download not trigger on some mobile browsers?",
    answer:
      "On certain mobile browsers (such as in-app browsers inside Instagram, Telegram, or Facebook), file downloads via blob URLs may be restricted. Always open 20KB Photo directly in Google Chrome, Safari, or Samsung Internet for smooth one-tap downloads.",
  },
  {
    question: "How do I verify if the generated image strictly meets portal requirements?",
    answer:
      "Every tool on 20KB Photo includes live validation badges that compare the generated output file against width, height, minimum KB, maximum KB, format, and DPI criteria in real time before you download. A green checkmark confirms full compliance.",
  },
  {
    question: "Can commercial cyber cafes, coaching institutes, or internet centers use 20KB Photo?",
    answer:
      "Yes! Cyber cafe operators, computer centers, and coaching institutions across India can freely use 20KB Photo to help candidates format and compress application documents without any licensing fees or subscriptions.",
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: supportFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <HiOutlineSparkles className="w-4 h-4 text-indigo-600" />
          Candidate Support & Feedback
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Contact Us & Support
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Have feedback, need a new exam preset added, or noticed a portal specification update? We are dedicated to keeping our tools 100% accurate, free, and helpful for candidates across India.
        </p>
      </div>

      {/* Support Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <HiOutlineEnvelope className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Direct Email</h3>
          <p className="text-xs text-gray-500">support@20kbphoto.in</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <HiOutlineClock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Response Time</h3>
          <p className="text-xs text-gray-500">Within 24 – 48 business hours</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <HiOutlineDocumentMagnifyingGlass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Preset Updates</h3>
          <p className="text-xs text-gray-500">Verified against latest notifications</p>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <ContactClient />

      {/* Guidelines on Submitting Preset Changes */}
      <section className="bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          How to Submit an Exam Preset Update or New Tool Request
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            Government examination boards (such as SSC, UPSC, IBPS, State PSCs, or NTA) occasionally revise photo dimensions, file size limits, live camera capture requirements, or signature background guidelines in their fresh recruitment notifications.
          </p>
          <p>
            If you notice any updated specifications for an ongoing exam or want to see a new central or state exam added to our directory, please share:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 font-medium text-gray-700">
            <li>The full name of the examination and recruiting agency.</li>
            <li>The URL to the official notification document or advertisement PDF.</li>
            <li>The exact page number or clause specifying document upload dimensions and file size limits (KB).</li>
            <li>Any specific rules regarding date-on-photo, name overlay, or ink color requirements.</li>
          </ul>
        </div>
      </section>

      {/* Candidate Self-Service Troubleshooting Guide */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Candidate Self-Service Troubleshooting Guide
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Before submitting a support ticket, check these quick solutions to common document preparation hurdles:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-1.5">
            <strong className="text-gray-900 font-bold block">1. File Size Exceeds Maximum Permitted KB</strong>
            <p className="text-gray-600 leading-relaxed">
              If an official application gateway rejects your file for exceeding its limit (e.g. 50.2 KB when max is 50.0 KB), set the target KB slider in our tool to 2 to 3 KB below the absolute ceiling (e.g. set to 47 KB). This creates a safe buffer that guarantees acceptance.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-1.5">
            <strong className="text-gray-900 font-bold block">2. Portal Error: &ldquo;Invalid Image Dimensions&rdquo;</strong>
            <p className="text-gray-600 leading-relaxed">
              Many portals (like SSC, IBPS, and SBI) validate exact width and height pixels rather than just aspect ratio. Ensure you enter the exact required width (e.g. 200 px) and height (e.g. 230 px) under the Custom Dimensions tab before downloading.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-1.5">
            <strong className="text-gray-900 font-bold block">3. Photo Captured Sideways on Smartphone</strong>
            <p className="text-gray-600 leading-relaxed">
              Smartphone camera sensors embed EXIF orientation tags that some older government portals fail to read correctly. Use our integrated Rotate &amp; Flip controls to permanently rotate the image to upright orientation before export.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-1.5">
            <strong className="text-gray-900 font-bold block">4. Browser Tab Freezing on Ultra-High Resolution Photos</strong>
            <p className="text-gray-600 leading-relaxed">
              If your phone camera captures images at 50 to 108 Megapixels (15MB+), your device browser may throttle canvas memory. Downscale the photo slightly or take a normal camera screenshot before loading it into the compressor.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Correction Workflow */}
      <section className="bg-gradient-to-br from-indigo-50/50 via-white to-gray-50 p-6 sm:p-8 rounded-2xl border border-indigo-100 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Reporting Notification Updates & Preset Corrections
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            Recruitment agencies and state selection boards periodically revise their photo submission parameters. For instance, an exam board may transition from an older 20KB–50KB bracket to a 50KB–100KB bracket, or introduce mandatory live webcam capture with date-stamping requirements.
          </p>
          <p>
            If you encounter an exam notification with revised specifications that differs from our current preset catalog, please notify us immediately with:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li><strong>Official Notification Link or PDF:</strong> Direct link to the recruitment bulletin on the official .gov.in or .nic.in domain.</li>
            <li><strong>Page and Clause Reference:</strong> The specific paragraph number outlining photo, signature, or certificate upload instructions.</li>
            <li><strong>Specific Recruitment Year / Cycle:</strong> Advertisement number (e.g., Advt No. 01/2026) to avoid mixing historic guidelines with active recruitment windows.</li>
          </ul>
          <p>
            Our verification desk reviews reported changes against primary documents within 24 to 48 hours and deploys corrections across the tool directory and exam preset hubs.
          </p>
        </div>
      </section>

      {/* Contact & Support FAQ */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Quick solutions to common candidate inquiries and support questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportFaqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-5 transition-all [&[open]]:shadow-xs"
            >
              <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-indigo-600 transition-colors">
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
