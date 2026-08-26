'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Exam } from '@/data/exams';
import ExamCard from '@/components/cards/ExamCard';

interface ExamDirectoryClientProps {
  exams: Exam[];
}

export default function ExamDirectoryClient({ exams }: ExamDirectoryClientProps) {
  const searchParams = useSearchParams();
  const qParam = searchParams ? searchParams.get('q') || '' : '';
  const [searchTerm, setSearchTerm] = useState(qParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (qParam) {
      setSearchTerm(qParam);
    }
  }, [qParam]);

  const categories = useMemo(() => {
    const cats = new Set(exams.map((e) => e.category));
    return ['all', ...Array.from(cats)];
  }, [exams]);

  const filteredExams = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term && selectedCategory === 'all') return exams;

    return exams.filter((exam) => {
      const nameMatch = exam.name.toLowerCase().includes(term);
      const fullNameMatch = (exam.fullName || '').toLowerCase().includes(term);
      const slugMatch = exam.slug.toLowerCase().includes(term);
      const categoryMatch = (exam.category || '').toLowerCase().includes(term);
      const keywordMatch = (exam.keywords || []).some((k) => k.toLowerCase().includes(term));
      const photoMatch = `${exam.photo.width}x${exam.photo.height} ${exam.photo.maxKB}kb`.toLowerCase().includes(term);
      const sigMatch = `${exam.signature.width}x${exam.signature.height} ${exam.signature.maxKB}kb`.toLowerCase().includes(term);

      const matchesSearch =
        !term ||
        nameMatch ||
        fullNameMatch ||
        slugMatch ||
        categoryMatch ||
        keywordMatch ||
        photoMatch ||
        sigMatch;

      const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [exams, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search exams, requirements (e.g. SSC CGL, UPSC, 20KB, 140x60)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-gray-900 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredExams.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-2xl">
          <p className="text-gray-600 font-medium">No exams found matching &ldquo;{searchTerm}&rdquo;</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-indigo-600 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
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
      )}
    </div>
  );
}
