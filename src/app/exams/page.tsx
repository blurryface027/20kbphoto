import { Metadata } from 'next';
import { Suspense } from 'react';
import { exams } from '@/data/exams';
import ExamDirectoryClient from '@/components/exams/ExamDirectoryClient';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'All Exam Photo and Signature Tools - 20KB Photo',
  description: 'Find photo and signature resizer tools for all major Indian exams including SSC, UPSC, Banking, and State exams.',
  alternates: { canonical: 'https://20kbphoto.in/exams' },
  openGraph: {
    title: 'All Exam Photo and Signature Tools - 20KB Photo',
    description: 'Find photo and signature resizer tools for all major Indian exams including SSC, UPSC, Banking, and State exams.',
    url: 'https://20kbphoto.in/exams',
    siteName: '20KB Photo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Exam Photo and Signature Tools - 20KB Photo',
    description: 'Find photo and signature resizer tools for all major Indian exams including SSC, UPSC, Banking, and State exams.',
  },
};

export default function ExamsDirectoryPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Exams' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="text-3xl font-bold mt-4 mb-2">All Exam Photo & Signature Tools</h1>
      <p className="text-gray-600 mb-8">
        Search and filter to find the exact photo and signature requirements for your upcoming exam.
      </p>

      <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading exams...</div>}>
        <ExamDirectoryClient exams={exams} />
      </Suspense>
    </div>
  );
}
