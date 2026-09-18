import Breadcrumbs from '../layout/Breadcrumbs';
import FAQSection from '../seo/FAQSection';
import RelatedTools from '../seo/RelatedTools';
import AdUnit from '../ads/AdUnit';
import WhatsAppChannelCTA from './WhatsAppChannelCTA';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        
        {privacyNote && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Processed locally in your browser</span>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 lg:p-7 mb-8">
        {children}
      </div>

      <WhatsAppChannelCTA toolName={title} className="mb-8" />

      <AdUnit className="my-8" />
      
      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}
      
      {relatedTools && relatedTools.length > 0 && <RelatedTools tools={relatedTools} />}
    </div>
  );
}
