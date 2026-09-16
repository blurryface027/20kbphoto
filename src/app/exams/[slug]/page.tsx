import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExamBySlug, getExamsByCategory, getAllSlugs, categories, exams as allExams } from '@/data/exams';
import { states, getStateBySlug, getExamsForState } from '@/data/states';
import ExamCard from '@/components/cards/ExamCard';
import ExamToolClient from '@/components/exams/ExamToolClient';
import OfficialExamGuidelines from '@/components/exams/OfficialExamGuidelines';
import ExamFAQSection from '@/components/exams/ExamFAQSection';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import AdUnit from '@/components/ads/AdUnit';
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
    const canonical = `https://20kbphoto.in/exams/${slug}`;
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
    const canonical = `https://20kbphoto.in/exams/${slug}`;
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
    const canonical = `https://20kbphoto.in/exams/${slug}`;

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

        <AdUnit className="my-10" />

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
        <h1 className="text-3xl font-bold mt-4 mb-2">{category.name} Photo & Signature Resizer</h1>
        <p className="text-gray-600 mb-8">{category.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            href: `/exams/${slug}/photo-resizer`,
            description: `Resize your ${exam.name} photo to ${exam.photo.width}×${exam.photo.height}px and ${exam.photo.minKB}-${exam.photo.maxKB}KB.`,
            icon: 'HiOutlinePhoto',
          },
          {
            name: `${exam.name} Signature Resizer`,
            href: `/exams/${slug}/signature-resizer`,
            description: `Resize your ${exam.name} signature to ${exam.signature.width}×${exam.signature.height}px and ${exam.signature.minKB}-${exam.signature.maxKB}KB.`,
            icon: 'HiOutlinePencilSquare',
          },
          {
            name: `${exam.name} Photo & Signature Resizer`,
            href: `/exams/${slug}/photo-signature-resizer`,
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
          <li>We'll compress the file to ensure it falls strictly between the required {exam.photo.minKB}–{exam.photo.maxKB}KB and {exam.signature.minKB}–{exam.signature.maxKB}KB limits.</li>
          <li>Download the final validated file, ready for upload.</li>
        </ol>
      </div>

      <AdUnit className="my-10" />

      {/* 2-Column Grid FAQ Section */}
      <ExamFAQSection exam={exam} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exam.relatedExams.map(relSlug => {
            const relExam = getExamBySlug(relSlug);
            if (!relExam) return null;
            return (
              <Link key={relSlug} href={`/exams/${relSlug}`} className="block p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition">
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
                  "item": bc.href ? `https://20kbphoto.in${bc.href}` : `https://20kbphoto.in/exams/${slug}`
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
