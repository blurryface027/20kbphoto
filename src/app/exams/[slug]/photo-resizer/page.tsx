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
  
  if (!exam) return { title: 'Not Found' };

  return {
    title: `${exam.name} Photo Resizer | 20KB Photo`,
    description: `Resize your photo exactly to ${exam.photo.width}x${exam.photo.height} pixels and between ${exam.photo.minKB}-${exam.photo.maxKB}KB for ${exam.fullName}.`,
    alternates: { canonical: `/exams/${slug}/photo-resizer` }
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
        <h1 className="text-3xl font-bold mb-2">{exam.name} Photo Resizer</h1>
        <p className="text-gray-600">
          Auto-formats to {exam.photo.width}x{exam.photo.height}px, {exam.photo.minKB}-{exam.photo.maxKB}KB
        </p>
      </div>

      <ExamToolClient exam={exam} type="photo" />
      
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Disclaimer: This is an independent tool. Not affiliated with {exam.authority}.</p>
      </div>
    </div>
  );
}
