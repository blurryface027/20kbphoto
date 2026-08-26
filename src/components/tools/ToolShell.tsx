import Breadcrumbs from '../layout/Breadcrumbs';
import FAQSection from '../seo/FAQSection';
import RelatedTools from '../seo/RelatedTools';

interface ToolShellProps {
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; href?: string }[];
  children: React.ReactNode;
  faqs?: { question: string; answer: string }[];
  relatedTools?: { name: string; href: string; description: string; icon: string }[];
  structuredData?: object;
  privacyNote?: boolean;
}

export default function ToolShell({
  title,
  subtitle,
  breadcrumbs,
  children,
  faqs,
  relatedTools,
  structuredData,
  privacyNote = true
}: ToolShellProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
        
        {privacyNote && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-sm font-medium rounded-full border border-emerald-100">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Processed locally in your browser
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-12">
        {children}
      </div>
      
      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}
      
      {relatedTools && relatedTools.length > 0 && <RelatedTools tools={relatedTools} />}
    </div>
  );
}
