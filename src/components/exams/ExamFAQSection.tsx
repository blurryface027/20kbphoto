"use client";

import { useState } from "react";
import { Exam } from "@/data/exams";
import { HiChevronDown } from "react-icons/hi2";

interface ExamFAQSectionProps {
  exam: Exam;
}

export default function ExamFAQSection({ exam }: ExamFAQSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      question: `Is my ${exam.name} photo uploaded to any server?`,
      answer: `No, never. All photo and signature resizing, cropping, and compression for ${exam.name} happen 100% locally inside your web browser. Your sensitive documents never leave your device.`,
    },
    {
      question: `What are the required photo dimensions and file size for ${exam.name}?`,
      answer: `According to the official notification, your photograph for ${exam.name} must be exactly ${exam.photo.width} × ${exam.photo.height} pixels. The file size must strictly be between ${exam.photo.minKB} KB and ${exam.photo.maxKB} KB in ${exam.photo.format} format.`,
    },
    {
      question: `What is the required signature size and dimension for ${exam.name}?`,
      answer: `The official signature image requirement for ${exam.name} is ${exam.signature.width} × ${exam.signature.height} pixels, formatted as JPEG/JPG, with a file size strictly between ${exam.signature.minKB} KB and ${exam.signature.maxKB} KB.`,
    },
    {
      question: `What background is acceptable for ${exam.name} photos?`,
      answer: `A plain white or light-colored background is required. The photograph should show a clear frontal view of your face with both ears visible and eyes open looking straight at the camera.`,
    },
    {
      question: `Can I sign in all capital letters for ${exam.name}?`,
      answer: `No. Signature in capital letters or block letters is strictly prohibited by official application portals and will lead to form rejection. Always sign in your natural running handwriting using a black or dark blue ink pen.`,
    },
    {
      question: `Does resizing for ${exam.name} reduce image quality?`,
      answer: `No. Our smart image engine optimizes file size to hit the required ${exam.photo.minKB}–${exam.photo.maxKB} KB range while preserving full clarity, sharpness, and 300 DPI resolution.`,
    },
  ];

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
    <section className="py-12 sm:py-16 bg-gray-50/60 border-t border-gray-200/80 my-10 rounded-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Common queries about {exam.name} photo and signature requirements
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
                    className={`font-bold text-sm sm:text-base pr-4 transition-colors ${
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
