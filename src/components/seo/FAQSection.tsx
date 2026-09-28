interface FAQSectionProps {
  faqs?: { question: string; answer: string }[];
  title?: string;
}

export default function FAQSection({ faqs = [], title = "Frequently Asked Questions" }: FAQSectionProps) {
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
        {faqs.map((faq, index) => (
          <details
            key={index}
            open={index === 0}
            className="group border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 bg-white [&[open]]:shadow-sm [&[open]]:ring-1 [&[open]]:ring-indigo-500/10"
          >
            <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
              <span className="font-medium pr-8 text-gray-900 group-hover:text-indigo-600 transition-colors group-open:text-indigo-600">
                {faq.question}
              </span>
              <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 group-hover:text-indigo-600 group-open:border-indigo-600 group-open:text-indigo-600 group-open:bg-indigo-50 transition-colors">
                <svg 
                  className="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-180" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
              <p className="pt-2">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
