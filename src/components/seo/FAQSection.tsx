'use client';

import { useState } from 'react';

interface FAQSectionProps {
  faqs?: { question: string; answer: string }[];
  title?: string;
}

export default function FAQSection({ faqs = [], title = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? 'bg-white shadow-sm ring-1 ring-indigo-500/10' : 'bg-gray-50/50 hover:bg-white'}`}
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                aria-expanded={isOpen}
              >
                <span className={`font-medium pr-8 ${isOpen ? 'text-indigo-600' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-gray-200 text-gray-500'}`}>
                  <svg 
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ overflow: 'hidden' }}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
