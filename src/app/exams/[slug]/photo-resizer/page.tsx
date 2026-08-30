import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExamBySlug, getAllSlugs, categories } from '@/data/exams';
import ExamToolClient from '@/components/exams/ExamToolClient';
import OfficialExamGuidelines from '@/components/exams/OfficialExamGuidelines';
import ExamFAQSection from '@/components/exams/ExamFAQSection';
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

  if (!exam) {
    return {
      title: 'Not Found - 20KB Photo',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { photo } = exam;
  const title = `${exam.name} Photo Resizer - ${photo.width}x${photo.height}px, ${photo.minKB}-${photo.maxKB}KB - 20KB Photo`;
  const description = `Resize the photo required for ${exam.name} applications to ${photo.width}x${photo.height}px and ${photo.minKB}-${photo.maxKB}KB ${photo.format} format online. Free resizer tool for ${exam.fullName} online forms.`;
  const canonical = `https://20kbphoto.in/exams/${slug}/photo-resizer`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
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

export default async function PhotoResizerPage({ params }: Props) {
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
    { label: 'Photo Resizer' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="mt-6 mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-1.5">{exam.name} Photo Resizer</h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Auto-formats to {exam.photo.width}x{exam.photo.height}px, {exam.photo.minKB}-{exam.photo.maxKB}KB
        </p>
      </div>

      <ExamToolClient exam={exam} type="photo" />

      {/* Official Guidelines Section */}
      <OfficialExamGuidelines exam={exam} />

      {/* FAQ Section */}
      <ExamFAQSection exam={exam} />
      
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Disclaimer: This is an independent tool. Not affiliated with {exam.authority}.</p>
      </div>
    </div>
  );
}
