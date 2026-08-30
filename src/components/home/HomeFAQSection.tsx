"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const faqs = [
  {
    question: "Is my photo uploaded to any server?",
    answer:
      "No, never. All photo and signature resizing, cropping, and compression happen 100% locally inside your web browser. Your sensitive documents are never uploaded to any external server.",
  },
  {
    question: "Which exams are supported?",
    answer:
      "We support 100+ government, entrance, and competitive exams including UPSC, SSC (CGL, CHSL, GD, MTS), IBPS, SBI, RRB Railways, NEET, JEE, GATE, State PSCs, and more.",
  },
  {
    question: "Does it reduce image quality?",
    answer:
      "No. Our smart compression engine optimizes file size to hit exact KB targets while keeping your photo and signature sharp, clear, and fully compliant with official guidelines.",
  },
  {
    question: "How do I resize my signature?",
    answer:
      "Simply choose the Signature Resizer tool or pick your specific exam preset. Upload your signature image, adjust dimensions or target KB, and download your final file instantly.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, 100% free with no hidden charges, watermarks, usage limits, or account sign-ups required.",
  },
  {
    question: "Can I use 20KBPhoto Resizer on my mobile phone?",
    answer:
      "Yes! Our website is fully optimized for mobile devices, iPhones, and tablets. You can snap a photo on your phone and resize it immediately in your browser.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support JPG, JPEG, PNG, WEBP, and iPhone HEIC/HEIF files. Downloads are saved in standard JPG or PNG format required by official application portals.",
  },
  {
    question: "What if my exam is not listed?",
    answer:
      "You can use our Custom Image Resizer tool to manually set any custom width, height (in pixels or cm), and maximum KB file size required for your form.",
  },
];

export default function HomeFAQSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
            Everything you need to know about resizing your exam photos
          </p>
        </div>

        {/* 2-Column Grid Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-indigo-300 shadow-sm ring-1 ring-indigo-500/10"
                    : "border-gray-200/90 hover:border-indigo-200 hover:shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-semibold text-sm sm:text-base pr-4 transition-colors ${
                      isOpen ? "text-indigo-600" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isOpen
                        ? "bg-indigo-50 border-indigo-200 text-indigo-600 rotate-180"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                    }`}
                  >
                    <HiChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/60 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
