import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExamBySlug, getAllSlugs, categories } from '@/data/exams';
import ExamToolClient from '@/components/exams/ExamToolClient';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  
  if (!exam) return { title: 'Not Found - 20KB Photo' };

  const title = `${exam.name} Photo and Signature Resizer - 20KB Photo`;
  const description = `Resize the photo and signature required for ${exam.name} applications online. Format both documents to official pixel dimensions and file size limits for ${exam.fullName}.`;
  const canonical = `https://20kbphoto.in/exams/${slug}/photo-signature-resizer`;

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

export default async function CombinedResizerPage({ params }: Props) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  
  if (!exam) {
    notFound();
  }

  const categoryData = categories.find(c => c.slug === exam.category);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Exams', href: '/exams' },
    { label: categoryData?.name || exam.category, href: `/exams/${exam.category}` },
    { label: exam.name, href: `/exams/${slug}` },
    { label: 'Photo & Signature Resizer' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mt-6 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{exam.name} Photo & Signature Resizer</h1>
        <p className="text-gray-600">
          Prepare all documents for your {exam.authority} application in one go.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Photo Resizer</h2>
          <ExamToolClient exam={exam} type="photo" />
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Signature Resizer</h2>
          <ExamToolClient exam={exam} type="signature" />
        </div>
      </div>
      
      <div className="mt-12 text-sm text-gray-500 text-center">
        <p>Disclaimer: This is an independent tool. Not affiliated with {exam.authority}.</p>
      </div>
    </div>
  );
}
