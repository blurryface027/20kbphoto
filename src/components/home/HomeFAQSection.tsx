import { HiChevronDown } from "react-icons/hi2";

const faqs = [
  {
    question: "Is my photo uploaded to any server?",
    answer:
      "No, never. All photo and signature resizing, cropping, and compression happen 100% locally inside your web browser using HTML5 Canvas technology. Your sensitive documents never leave your device.",
  },
  {
    question: "Which exams and recruitment boards are supported?",
    answer:
      "We support 573+ government, entrance, and competitive exams including UPSC CSE/NDA/CDS, SSC (CGL, CHSL, GD, MTS, CPO), Banking (IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B), RRB Railways (NTPC, Group D, ALP), NEET UG/PG, JEE Main, GATE, CTET, and State PSC recruitments across 30 Indian states.",
  },
  {
    question: "Does reducing file size to 20KB reduce image quality?",
    answer:
      "No. Our smart compression engine uses binary-search quantization to optimize file size to hit exact KB targets while keeping your photo and signature sharp, clear, and fully compliant with official portal DPI specifications.",
  },
  {
    question: "How do I resize my signature to 140x60 pixels?",
    answer:
      "Simply choose the Signature Resizer tool or pick the Signature 140×60 preset. Upload your signature image, and our engine automatically crops to the exact 140×60 ratio and compresses it below 20KB for instant portal acceptance.",
  },
  {
    question: "Is this tool completely free to use?",
    answer:
      "Yes, 100% free with no hidden charges, watermarks, usage limits, or account registrations required. It is built specifically for Indian students and job aspirants.",
  },
  {
    question: "Can I use 20KB Photo on my mobile phone or iPhone?",
    answer:
      "Yes! Our website is fully responsive and optimized for mobile browsers (Chrome, Safari, Firefox). You can snap a photo with your phone camera and resize it immediately in your browser memory.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG, JPEG, PNG, WEBP, and iPhone HEIC/HEIF files. Downloads are saved in standard JPG or PNG format required by government application portals.",
  },
  {
    question: "What if my specific exam is not listed?",
    answer:
      "You can use our Custom Image Resizer or Exact KB Compressors (10KB to 500KB) to set any custom width, height (in pixels or cm), and maximum file size required by your application portal.",
  },
];

export default function HomeFAQSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about resizing your exam photos and documents
          </p>
        </div>

        {/* 2-Column Grid Accordion with semantic details/summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group bg-white rounded-2xl border border-gray-200/90 hover:border-indigo-200 transition-all duration-200 overflow-hidden [&[open]]:border-indigo-300 [&[open]]:shadow-sm [&[open]]:ring-1 [&[open]]:ring-indigo-500/10"
            >
              <summary className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer list-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <span className="font-semibold text-sm sm:text-base pr-4 text-gray-900 group-hover:text-indigo-600 transition-colors group-open:text-indigo-600">
                  {faq.question}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-open:bg-indigo-50 group-open:border-indigo-200 group-open:text-indigo-600 group-open:rotate-180 transition-all">
                  <HiChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/60 mt-1">
                <p className="pt-3">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
