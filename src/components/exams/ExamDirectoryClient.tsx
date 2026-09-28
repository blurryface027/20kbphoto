'use client';

import { useState, useMemo, useEffect } from 'react';
import ExamCard from '@/components/cards/ExamCard';

export interface CompactExam {
  name: string;
  slug: string;
  category: string;
  photo: { width: number; height: number; minKB: number; maxKB: number; format: string };
  signature: { width: number; height: number; minKB: number; maxKB: number; format: string };
  verificationStatus: string;
}

interface ExamDirectoryClientProps {
  initialExams: CompactExam[];
}

export default function ExamDirectoryClient({ initialExams }: ExamDirectoryClientProps) {
  const [exams, setExams] = useState<CompactExam[]>(initialExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Lazily hydrate full exam list in background so SSR Flight payload stays ultra-lightweight
    import('@/data/exams').then(({ exams: fullExams }) => {
      const fullCompact: CompactExam[] = fullExams.map((e) => ({
        name: e.name,
        slug: e.slug,
        category: e.category,
        photo: {
          width: e.photo.width,
          height: e.photo.height,
          minKB: e.photo.minKB,
          maxKB: e.photo.maxKB,
          format: e.photo.format,
        },
        signature: {
          width: e.signature.width,
          height: e.signature.height,
          minKB: e.signature.minKB,
          maxKB: e.signature.maxKB,
          format: e.signature.format,
        },
        verificationStatus: e.verificationStatus,
      }));
      setExams(fullCompact);
    });

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) setSearchTerm(q);
    }
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(exams.map((e) => e.category));
    return ['all', ...Array.from(cats)];
  }, [exams]);

  const filteredExams = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term && selectedCategory === 'all') return exams;

    return exams.filter((exam) => {
      const nameMatch = exam.name.toLowerCase().includes(term);
      const slugMatch = exam.slug.toLowerCase().includes(term);
      const categoryMatch = (exam.category || '').toLowerCase().includes(term);
      const photoMatch = `${exam.photo.width}x${exam.photo.height} ${exam.photo.maxKB}kb`.toLowerCase().includes(term);
      const sigMatch = `${exam.signature.width}x${exam.signature.height} ${exam.signature.maxKB}kb`.toLowerCase().includes(term);

      const matchesSearch =
        !term ||
        nameMatch ||
        slugMatch ||
        categoryMatch ||
        photoMatch ||
        sigMatch;

      const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [exams, searchTerm, selectedCategory]);

  const [visibleCount, setVisibleCount] = useState(36);

  const displayedExams = useMemo(() => {
    return filteredExams.slice(0, visibleCount);
  }, [filteredExams, visibleCount]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search exams, requirements (e.g. SSC CGL, UPSC, 20KB, 140x60)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(36);
            }}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-gray-900 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(36);
            }}
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
              setVisibleCount(36);
            }}
            className="mt-3 text-xs text-indigo-600 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedExams.map((exam) => (
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

          {filteredExams.length > visibleCount && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 36)}
                className="px-6 py-3 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold text-sm rounded-xl shadow-xs transition-colors"
              >
                Load More Exams ({filteredExams.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
