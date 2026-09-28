import { Exam } from "@/data/exams";
import { HiChevronDown } from "react-icons/hi2";

interface ExamFAQSectionProps {
  exam: Exam;
}

export default function ExamFAQSection({ exam }: ExamFAQSectionProps) {
  const faqs = [
    {
      question: `Is my ${exam.name} photo uploaded to any server?`,
      answer: `No, never. All photo and signature resizing, cropping, and compression for ${exam.name} happen 100% locally inside your web browser. Your sensitive documents never leave your device.`,
    },
    {
      question: `What are the required photo dimensions and file size for ${exam.name}?`,
      answer: `According to the official notification, your photograph for ${exam.name} must be ${exam.photo.isDimensionFlexible ? "formatted to recommended resolution of " : "exactly "}${exam.photo.width} × ${exam.photo.height} pixels${exam.photo.physicalWidthCm ? ` (${exam.photo.physicalWidthCm} cm × ${exam.photo.physicalHeightCm} cm)` : ""}. The file size must strictly be between ${exam.photo.minKB} KB and ${exam.photo.maxKB} KB in ${exam.photo.format} format.`,
    },
    {
      question: `What is the required signature size and dimension for ${exam.name}?`,
      answer: `The official signature image requirement for ${exam.name} is ${exam.signature.isDimensionFlexible ? "recommended resolution of " : "exactly "}${exam.signature.width} × ${exam.signature.height} pixels${exam.signature.physicalWidthCm ? ` (${exam.signature.physicalWidthCm} cm × ${exam.signature.physicalHeightCm} cm)` : ""}, formatted as ${exam.signature.format}, with a file size strictly between ${exam.signature.minKB} KB and ${exam.signature.maxKB} KB.`,
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

        {/* 2-Column Grid Accordion with semantic details/summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group bg-white rounded-2xl border border-gray-200/90 hover:border-indigo-200 transition-all duration-200 overflow-hidden [&[open]]:border-indigo-300 [&[open]]:shadow-sm [&[open]]:ring-1 [&[open]]:ring-indigo-500/10"
            >
              <summary className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer list-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <span className="font-bold text-sm sm:text-base pr-4 text-gray-900 group-hover:text-indigo-600 transition-colors group-open:text-indigo-600">
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
