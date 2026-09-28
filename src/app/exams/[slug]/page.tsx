import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExamBySlug, getExamsByCategory, getAllSlugs, categories } from '@/data/exams';
import { states, getStateBySlug, getExamsForState } from '@/data/states';
import ExamCard from '@/components/cards/ExamCard';
import ExamToolClient from '@/components/exams/ExamToolClient';
import OfficialExamGuidelines from '@/components/exams/OfficialExamGuidelines';
import ExamFAQSection from '@/components/exams/ExamFAQSection';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import { WeforAdsHeader, WeforAdsInContent } from '@/components/ads';
import Link from 'next/link';

export function generateStaticParams() {
  const examSlugs = getAllSlugs().map(slug => ({ slug }));
  const categorySlugs = categories.map(c => ({ slug: c.slug }));
  const stateSlugs = states.map(s => ({ slug: s.slug }));
  return [...categorySlugs, ...stateSlugs, ...examSlugs];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Check state slug
  const stateData = getStateBySlug(slug);
  if (stateData) {
    const title = `${stateData.name} Exam Photo & Signature Resizers - 20KB Photo`;
    const description = `Official photo and signature requirements for ${stateData.name} competitive exams (${stateData.count}+ presets). Verified dimensions, KB limits, format rules, and resizer tools for ${stateData.name} PSC, Police, TET, and recruitment boards.`;
    const canonical = `https://20kbphoto.in/exams/${slug}/`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: '20KB Photo',
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  // Check category slug
  const category = categories.find(c => c.slug === slug);
  if (category) {
    const title = `${category.name} Photo & Signature Resizer - 20KB Photo`;
    const description = `Check photo and signature requirements for ${category.name} exams. View official pixel dimensions, file size limits in KB, accepted formats, and resize tools online.`;
    const canonical = `https://20kbphoto.in/exams/${slug}/`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: '20KB Photo',
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  // Check exam slug
  const exam = getExamBySlug(slug);
  if (exam) {
    const photo = exam.photo;
    const signature = exam.signature;
    const title = `${exam.name} Photo & Signature Resizer - Requirements & Tool`;
    const description = `Official photo and signature requirements for ${exam.name} applications. Verified dimensions (${photo.width}x${photo.height}px photo, ${signature.width}x${signature.height}px signature), file size range (${photo.minKB}-${photo.maxKB}KB photo, ${signature.minKB}-${signature.maxKB}KB signature), format rules, and instant browser resizer tools for ${exam.fullName}.`;
    const canonical = `https://20kbphoto.in/exams/${slug}/`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: '20KB Photo',
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  return {
    title: 'Not Found - 20KB Photo',
    robots: { index: false, follow: false },
  };
}

export default async function ExamHubPage({ params }: Props) {
  const { slug } = await params;

  // 1. Check state slug
  const stateData = getStateBySlug(slug);
  if (stateData) {
    const stateExams = getExamsForState(slug);
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Exams', href: '/exams' }, { label: stateData.name }]} />
        <div className="mt-6 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
            Verified Portal Rules • {stateExams.length} Presets Available
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {stateData.name} Exam Photo & Signature Resizers
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
            Official document specifications and instant online resizer tools for competitive exams and recruitment boards in <strong className="text-gray-900 font-semibold">{stateData.name}</strong>.
          </p>
        </div>

        <WeforAdsHeader className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stateExams.map((exam) => (
            <ExamCard
              key={exam.slug}
              name={exam.name}
              slug={exam.slug}
              category={exam.category}
              photo={exam.photo}
              signature={exam.signature}
              verificationStatus={exam.verificationStatus}
            />
          ))}
        </div>

        <WeforAdsInContent className="my-10" />

        {/* State Exam Specifications Table */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden mb-12">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <h2 className="font-extrabold text-sm sm:text-base">
              {stateData.name} Competitive Exam Specifications Matrix
            </h2>
            <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-indigo-200">
              Official Portal Standards
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                  <th className="py-3 px-4">Examination</th>
                  <th className="py-3 px-4">Photo Dimensions</th>
                  <th className="py-3 px-4">Photo Size (KB)</th>
                  <th className="py-3 px-4">Signature Dimensions</th>
                  <th className="py-3 px-4">Signature Size (KB)</th>
                  <th className="py-3 px-4">Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                {stateExams.map((ex) => (
                  <tr key={ex.slug} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <Link href={`/exams/${ex.slug}`} className="hover:text-indigo-600 transition-colors">
                        {ex.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-indigo-600 font-semibold">{ex.photo.width}×{ex.photo.height} px</td>
                    <td className="py-3 px-4">{ex.photo.minKB}–{ex.photo.maxKB} KB</td>
                    <td className="py-3 px-4 text-indigo-600 font-semibold">{ex.signature.width}×{ex.signature.height} px</td>
                    <td className="py-3 px-4">{ex.signature.minKB}–{ex.signature.maxKB} KB</td>
                    <td className="py-3 px-4 font-mono text-gray-700">{ex.photo.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* State Guidelines Box */}
        <section className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 mb-12 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Document Preparation Guidelines for {stateData.name} Recruitment Portals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="space-y-2 bg-white p-5 rounded-2xl border border-gray-200/80">
              <h3 className="font-bold text-gray-900 text-sm">Photograph Rules:</h3>
              <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                <li>Photograph must be recently taken against a plain white or light-colored background.</li>
                <li>Full frontal face view is mandatory with both ears clearly visible.</li>
                <li>Face coverage must occupy at least 70% to 80% of the photograph.</li>
                <li>Do not wear dark goggles, caps, sunglasses, or masks in your application photo.</li>
              </ul>
            </div>
            <div className="space-y-2 bg-white p-5 rounded-2xl border border-gray-200/80">
              <h3 className="font-bold text-gray-900 text-sm">Signature Rules:</h3>
              <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                <li>Sign on clean, unruled white paper using a dark blue or black ink ballpoint pen.</li>
                <li>Signature must be in your natural running handwriting. Block/capital letters are rejected.</li>
                <li>Crop closely around the signature letters without excessive empty white margin.</li>
                <li>Ensure the file is saved strictly within the required KB range before uploading.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* State FAQs */}
        <section className="space-y-4 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Frequently Asked Questions: {stateData.name} Exams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <details open className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-5 transition-all">
              <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-indigo-600">
                <span>What are the standard photo specifications for {stateData.name} exams?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                Most recruitment boards in {stateData.name} require candidate photographs between 20 KB and 50 KB in JPG format, with dimensions typically around 200×230 pixels or 3.5×4.5 cm.
              </p>
            </details>
            <details className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-5 transition-all">
              <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-indigo-600">
                <span>Are my uploaded documents stored on your servers?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                No. 20KB Photo operates 100% locally inside your web browser. All resizing, cropping, and compression happen in device memory without sending any images to external servers.
              </p>
            </details>
          </div>
        </section>

        {/* Explore Other States */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore Exams in Other States</h2>
          <div className="flex flex-wrap gap-2">
            {states
              .filter((s) => s.slug !== slug)
              .slice(0, 15)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/exams/${s.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                >
                  {s.name} ({s.count})
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }
  
  // 2. Check category slug
  const category = categories.find(c => c.slug === slug);
  if (category) {
    const categoryExams = getExamsByCategory(slug);
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Exams', href: '/exams' }, { label: category.name }]} />
        <div className="mt-6 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
            Verified Portal Rules • {categoryExams.length} Presets Available
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {category.name} Photo & Signature Resizer
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
            {category.description} Find official pixel dimensions, file size limits in KB, accepted formats, and instant online tools for all examinations conducted under {category.name}.
          </p>
        </div>
        
        <WeforAdsHeader className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryExams.map(exam => (
            <ExamCard
              key={exam.slug}
              name={exam.name}
              slug={exam.slug}
              category={exam.category}
              photo={exam.photo}
              signature={exam.signature}
              verificationStatus={exam.verificationStatus}
            />
          ))}
        </div>

        <WeforAdsInContent className="my-10" />

        {/* Category Exam Specifications Table */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden mb-12">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <h2 className="font-extrabold text-sm sm:text-base">
              {category.name} Document Specifications Reference Matrix
            </h2>
            <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-indigo-200">
              Official Notification Standards
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                  <th className="py-3 px-4">Examination</th>
                  <th className="py-3 px-4">Photo Dimensions</th>
                  <th className="py-3 px-4">Photo Size (KB)</th>
                  <th className="py-3 px-4">Signature Dimensions</th>
                  <th className="py-3 px-4">Signature Size (KB)</th>
                  <th className="py-3 px-4">Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                {categoryExams.map((ex) => (
                  <tr key={ex.slug} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <Link href={`/exams/${ex.slug}`} className="hover:text-indigo-600 transition-colors">
                        {ex.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-indigo-600 font-semibold">{ex.photo.width}×{ex.photo.height} px</td>
                    <td className="py-3 px-4">{ex.photo.minKB}–{ex.photo.maxKB} KB</td>
                    <td className="py-3 px-4 text-indigo-600 font-semibold">{ex.signature.width}×{ex.signature.height} px</td>
                    <td className="py-3 px-4">{ex.signature.minKB}–{ex.signature.maxKB} KB</td>
                    <td className="py-3 px-4 font-mono text-gray-700">{ex.photo.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Category Guidelines */}
        <section className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 mb-12 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            How to Prepare Documents for {category.name} Online Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="space-y-2 bg-white p-5 rounded-2xl border border-gray-200/80">
              <h3 className="font-bold text-gray-900 text-sm">Photo Requirements:</h3>
              <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                <li>Ensure recent portrait with neutral facial expression and eyes open.</li>
                <li>Background must be plain light or white without shadows or borders.</li>
                <li>Both ears must be clearly visible in the photograph frame.</li>
                <li>Keep resolution sharp (200 to 300 DPI) for facial recognition verification.</li>
              </ul>
            </div>
            <div className="space-y-2 bg-white p-5 rounded-2xl border border-gray-200/80">
              <h3 className="font-bold text-gray-900 text-sm">Signature Requirements:</h3>
              <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                <li>Sign in natural flowing cursive handwriting using black or blue ink.</li>
                <li>Block letters or capital letters are disqualified across portals.</li>
                <li>Crop closely to signature bounds without excessive blank background.</li>
                <li>File size must strictly conform to the portal KB parameters above.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Category FAQs */}
        <section className="space-y-4 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {category.name} Document Upload FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <details open className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-5 transition-all">
              <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-indigo-600">
                <span>What are the standard photo specifications for {category.name}?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                Most exams under {category.name} require photos to be formatted between 20 KB and 50 KB in JPG format with dimensions of roughly 200×230 pixels or 3.5×4.5 cm. Check the specific exam row in the table above for exact numbers.
              </p>
            </details>
            <details className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-5 transition-all">
              <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-indigo-600">
                <span>Why is signature in capital letters rejected?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                Official notifications across all examination authorities explicitly state that signatures in CAPITAL or BLOCK letters are invalid and lead to immediate application rejection. Always sign in your normal cursive handwriting.
              </p>
            </details>
          </div>
        </section>
      </div>
    );
  }

  // 3. Check exam slug
  const exam = getExamBySlug(slug);
  if (!exam) {
    notFound();
  }

  const categoryData = categories.find(c => c.slug === exam.category);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Exams', href: '/exams' },
    { label: categoryData?.name || exam.category, href: `/exams/${exam.category}` },
    { label: `${exam.name} Resizer` }
  ];

  const faqs = [
    {
      question: `What is the official ${exam.name} photo size?`,
      answer: `The official photo requirement for ${exam.name} is ${exam.photo.width}x${exam.photo.height} pixels (${exam.photo.minKB}KB to ${exam.photo.maxKB}KB in ${exam.photo.format} format).`
    },
    {
      question: `What is the official ${exam.name} signature size?`,
      answer: `The official signature requirement for ${exam.name} is ${exam.signature.width}x${exam.signature.height} pixels (${exam.signature.minKB}KB to ${exam.signature.maxKB}KB in ${exam.signature.format} format).`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mt-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">{exam.name} Photo & Signature Resizer</h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Official photo and signature requirements for {exam.name} ({exam.fullName}) online applications • {exam.authority} • Verified specifications: {exam.lastVerified}
        </p>
      </div>

      <WeforAdsHeader className="mb-6" />

      <div className="mb-12">
        <ExamToolClient exam={exam} type="photo" allowDocTypeToggle={true} />
      </div>

      {/* Official Requirements Section */}
      <OfficialExamGuidelines exam={exam} />

      <RelatedTools
        title={`${exam.name} Photo & Signature Tools`}
        tools={[
          {
            name: `${exam.name} Photo Resizer`,
            href: `/exams/${slug}/photo-resizer/`,
            description: `Resize your ${exam.name} photo to ${exam.photo.width}×${exam.photo.height}px and ${exam.photo.minKB}-${exam.photo.maxKB}KB.`,
            icon: 'HiOutlinePhoto',
          },
          {
            name: `${exam.name} Signature Resizer`,
            href: `/exams/${slug}/signature-resizer/`,
            description: `Resize your ${exam.name} signature to ${exam.signature.width}×${exam.signature.height}px and ${exam.signature.minKB}-${exam.signature.maxKB}KB.`,
            icon: 'HiOutlinePencilSquare',
          },
          {
            name: `${exam.name} Photo & Signature Resizer`,
            href: `/exams/${slug}/photo-signature-resizer/`,
            description: `Prepare both your ${exam.name} photo and signature for online application requirements.`,
            icon: 'HiOutlineIdentification',
          },
        ]}
      />

      <div className="mt-8 sm:mt-10 mb-12">
        <div className="bg-indigo-50/70 border border-indigo-100 p-4.5 rounded-xl text-indigo-900 text-sm leading-relaxed">
          <p>
            <strong className="font-bold text-indigo-950">Disclaimer:</strong> This is an independent tool to help candidates format their documents. 
            We are not affiliated with {exam.authority} or any government body. Always cross-check with the official notification.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">How to resize your {exam.name} documents</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed text-sm sm:text-base">
          <li>Select the specific document type (Photo or Signature) from above.</li>
          <li>Upload your original scanned image or photo.</li>
          <li>Our tool will automatically crop and resize to the required dimensions.</li>
          <li>We&apos;ll compress the file to ensure it falls strictly between the required {exam.photo.minKB}–{exam.photo.maxKB}KB and {exam.signature.minKB}–{exam.signature.maxKB}KB limits.</li>
          <li>Download the final validated file, ready for upload.</li>
        </ol>
      </div>

      <WeforAdsInContent className="my-10" />

      {/* 2-Column Grid FAQ Section */}
      <ExamFAQSection exam={exam} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exam.relatedExams.map(relSlug => {
            const relExam = getExamBySlug(relSlug);
            if (!relExam) return null;
            return (
              <Link key={relSlug} href={`/exams/${relSlug}/`} className="block p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition">
                <h3 className="font-semibold text-indigo-600">{relExam.name}</h3>
                <p className="text-sm text-gray-500">{relExam.category}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((bc, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": bc.label,
                  "item": bc.href ? `https://20kbphoto.in${bc.href.endsWith('/') ? bc.href : bc.href + '/'}` : `https://20kbphoto.in/exams/${slug}/`
                }))
              },
              {
                "@type": "WebApplication",
                "name": `${exam.name} Photo & Signature Tool`,
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Any"
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              }
            ]
          })
        }}
      />
    </div>
  );
}
