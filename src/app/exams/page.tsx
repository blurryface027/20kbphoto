import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { exams, categories } from '@/data/exams';
import { states } from '@/data/states';
import ExamDirectoryClient from '@/components/exams/ExamDirectoryClient';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineShieldCheck } from 'react-icons/hi2';

export const metadata: Metadata = {
  title: 'All Exam Photo and Signature Tools - 20KB Photo',
  description: 'Find official photo and signature resizer tools for 570+ Indian exams including SSC, UPSC, Banking, Railways, Defence, and State PSCs with verified dimensions and KB limits.',
  alternates: { canonical: 'https://20kbphoto.in/exams/' },
  openGraph: {
    title: 'All Exam Photo and Signature Tools - 20KB Photo',
    description: 'Find official photo and signature resizer tools for 570+ Indian exams including SSC, UPSC, Banking, Railways, Defence, and State PSCs with verified dimensions and KB limits.',
    url: 'https://20kbphoto.in/exams/',
    siteName: '20KB Photo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Exam Photo and Signature Tools - 20KB Photo',
    description: 'Find official photo and signature resizer tools for 570+ Indian exams including SSC, UPSC, Banking, Railways, Defence, and State PSCs with verified dimensions and KB limits.',
  },
};

const popularExamRules = [
  { exam: 'SSC CGL / CHSL / GD', photoDim: 'Live / 200×230 px', photoSize: '20 – 50 KB', sigDim: '140×60 px', sigSize: '10 – 20 KB', format: 'JPG/JPEG' },
  { exam: 'UPSC CSE / NDA / CDS', photoDim: '350×350 to 1000×1000 px', photoSize: '20 – 300 KB', sigDim: '350×350 to 1000×1000 px', sigSize: '20 – 300 KB', format: 'JPG' },
  { exam: 'IBPS PO / Clerk / SO', photoDim: '200×230 px (4.5×3.5 cm)', photoSize: '20 – 50 KB', sigDim: '140×60 px', sigSize: '10 – 20 KB', format: 'JPG/JPEG' },
  { exam: 'SBI PO / Clerk', photoDim: '200×230 px', photoSize: '20 – 50 KB', sigDim: '140×60 px', sigSize: '10 – 20 KB', format: 'JPG/JPEG' },
  { exam: 'RRB NTPC / Group D', photoDim: '200×230 px', photoSize: '20 – 50 KB', sigDim: '140×60 px', sigSize: '10 – 20 KB', format: 'JPG' },
  { exam: 'NEET UG / JEE Main (NTA)', photoDim: '100×100 to 400×400 px', photoSize: '10 – 200 KB', sigDim: '100×100 to 200×200 px', sigSize: '4 – 30 KB', format: 'JPG' },
];

const examFaqs = [
  {
    question: "Why do Indian government exam forms reject photos?",
    answer: "The top reasons for application photo rejection are: incorrect pixel dimensions (e.g. not matching 200×230 px for SSC or IBPS), file size exceeding maximum KB or below minimum KB, non-white or busy backgrounds, wearing caps/dark spectacles, and tilted face angles. Our tools automatically conform to verified notification rules."
  },
  {
    question: "What is the standard photo and signature size for SSC exams?",
    answer: "For Staff Selection Commission (SSC) portals, photographs must be between 20 KB and 50 KB with dimensions of roughly 3.5 cm × 4.5 cm (200×230 px or live web capture specifications). Signatures must strictly be between 10 KB and 20 KB with dimensions of 140×60 pixels in JPG format."
  },
  {
    question: "What is the signature requirement for UPSC online applications?",
    answer: "UPSC portals require both photograph and signature images to have equal pixel dimensions (between 350×350 pixels and 1000×1000 pixels) with file sizes strictly between 20 KB and 300 KB in JPG format. The candidate's name and photo date must be clearly formatted when required."
  },
  {
    question: "Are signatures in capital letters allowed on government job forms?",
    answer: "No. All major exam conducting authorities (SSC, UPSC, IBPS, Railways, NTA) explicitly state in their official notifications that signatures in CAPITAL or BLOCK letters will result in immediate disqualification and application rejection. Always sign in your natural cursive handwriting."
  },
  {
    question: "Are my uploaded photos and signatures saved on your servers?",
    answer: "No. 20KB Photo operates with a 100% client-side zero-upload architecture. All resizing, cropping, and compression calculations execute directly inside your browser memory using HTML5 Canvas. No image data is ever transferred to or saved on external servers."
  }
];

export default function ExamsDirectoryPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Exams' }
  ];

  const compactExams = exams.map((e) => ({
    name: e.name,
    slug: e.slug,
    category: e.category,
    photo: {
      width: e.photo.width,
      height: e.photo.height,
      minKB: e.photo.minKB,
      maxKB: e.photo.maxKB,
      format: e.photo.format,
    },
    signature: {
      width: e.signature.width,
      height: e.signature.height,
      minKB: e.signature.minKB,
      maxKB: e.signature.maxKB,
      format: e.signature.format,
    },
    verificationStatus: e.verificationStatus,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": examFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <HiOutlineSparkles className="w-4 h-4 text-indigo-600" />
          570+ Verified Government Exam Presets
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          All Exam Photo & Signature Tools
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Search and find exact official photo dimensions, signature pixel specifications, and file size limits (KB) for central and state competitive exams across India.
        </p>
      </div>

      {/* Client Search & Filterable Directory */}
      <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading exam presets...</div>}>
        <ExamDirectoryClient initialExams={compactExams.slice(0, 36)} />
      </Suspense>

      {/* Official Exam Specifications Comparison Table */}
      <section className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <h2 className="font-extrabold text-base sm:text-lg">
            Quick Reference: Top Indian Examination Document Specifications
          </h2>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-indigo-200 font-semibold">
            Official Portal Rules
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                <th className="py-3 px-4">Examination Board</th>
                <th className="py-3 px-4">Photo Dimensions</th>
                <th className="py-3 px-4">Photo Size (KB)</th>
                <th className="py-3 px-4">Signature Dimensions</th>
                <th className="py-3 px-4">Signature Size (KB)</th>
                <th className="py-3 px-4">Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
              {popularExamRules.map((rule) => (
                <tr key={rule.exam} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900">{rule.exam}</td>
                  <td className="py-3 px-4 text-indigo-600 font-semibold">{rule.photoDim}</td>
                  <td className="py-3 px-4">{rule.photoSize}</td>
                  <td className="py-3 px-4 text-indigo-600 font-semibold">{rule.sigDim}</td>
                  <td className="py-3 px-4">{rule.sigSize}</td>
                  <td className="py-3 px-4 font-mono text-gray-700">{rule.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Categories & State Presets Quick Hubs */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Browse Exams by Conducting Authority
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/exams/${cat.slug}`}
              className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center group"
            >
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* State PSC Hubs */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Browse State PSC & Police Recruitment Presets
        </h2>
        <div className="flex flex-wrap gap-2">
          {states.map((st) => (
            <Link
              key={st.slug}
              href={`/exams/state/${st.slug}`}
              className="px-3.5 py-2 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-xs font-semibold text-gray-700 transition-all"
            >
              {st.name} ({st.count})
            </Link>
          ))}
        </div>
      </section>

      {/* Guidelines & Step-by-Step Instructions */}
      <section className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-200 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          How to Prepare Photos & Signatures for Online Application Portals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600" />
              Official Photo Guidelines
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure the photograph is recently taken (usually within 3 months of the notification).</li>
              <li>Use a plain white or off-white background with uniform lighting.</li>
              <li>Face must occupy roughly 70%–80% of the photograph area looking directly at the camera.</li>
              <li>Do not wear dark sunglasses, goggles, masks, or hats. Regular prescription glasses are permitted without glare.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <HiOutlineExclamationTriangle className="w-5 h-5 text-amber-600" />
              Official Signature Guidelines
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sign on a clean sheet of white unruled paper using a black or dark blue ink pen.</li>
              <li>Sign in running handwriting. NEVER sign in capital or block letters.</li>
              <li>Crop closely around the signature without leaving excessive empty white borders.</li>
              <li>Ensure the signature is sharp, high-contrast, and strictly within the portal&apos;s specified KB range.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Exam Document Formatting FAQs
          </h2>
          <p className="text-sm text-gray-600">
            Answers to common questions regarding government exam photo and signature uploads
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examFaqs.map((faq, index) => (
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
