import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { states, getStateBySlug, getExamsForState } from '@/data/states';
import ExamCard from '@/components/cards/ExamCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdUnit from '@/components/ads/AdUnit';
import Link from 'next/link';

export function generateStaticParams() {
  return states.map(s => ({ slug: s.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stateData = getStateBySlug(slug);

  if (!stateData) {
    return {
      title: 'State Not Found - 20KB Photo',
      robots: { index: false, follow: false },
    };
  }

  const title = `${stateData.name} Exam Photo & Signature Resizers - 20KB Photo`;
  const description = `Official photo and signature requirements for ${stateData.name} competitive exams (${stateData.count}+ presets). Verified dimensions, KB limits, format rules, and resizer tools for ${stateData.name} PSC, Police, TET, and recruitment boards.`;
  const canonical = `https://20kbphoto.in/exams/state/${slug}`;

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

export default async function StateExamsPage({ params }: Props) {
  const { slug } = await params;
  const stateData = getStateBySlug(slug);

  if (!stateData) {
    notFound();
  }

  const stateExams = getExamsForState(slug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Exams', href: '/exams' },
    { label: 'State Exams', href: '/exams' },
    { label: stateData.name }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
          Verified Portal Rules • {stateExams.length} Presets Available
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {stateData.name} Exam Photo & Signature Resizers
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
          Official document specifications and instant online resizer tools for state recruitment exams in <strong className="text-gray-900 font-semibold">{stateData.name}</strong>. Auto-configured width, height, KB range, and format validation.
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

      {/* State Overview and Guidelines Box */}
      <div className="bg-gradient-to-br from-indigo-50/60 via-white to-gray-50 border border-indigo-100 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Official Application Rules for {stateData.name} Exams
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed list-disc list-inside">
          <li>Ensure photographs are taken against a light or plain white background with 70–80% face coverage.</li>
          <li>Signatures must be signed in clear running handwriting using dark blue or black ink.</li>
          <li>Double-check file sizes before uploading to state portals to prevent automatic form rejection.</li>
          <li>Use our free online tool to crop, resize, and compress your image to exact specifications instantly.</li>
        </ul>
      </div>

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
                href={`/exams/state/${s.slug}`}
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
