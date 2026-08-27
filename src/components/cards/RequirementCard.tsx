import Link from 'next/link';

interface RequirementCardProps {
  title: string; // 'Photo' or 'Signature'
  width: number;
  height: number;
  minKB: number;
  maxKB: number;
  format: string;
  dpi?: number;
  notes?: string;
  ctaHref: string;
  ctaLabel: string;
}

export default function RequirementCard({
  title,
  width,
  height,
  minKB,
  maxKB,
  format,
  dpi,
  notes,
  ctaHref,
  ctaLabel
}: RequirementCardProps) {
  const isPhoto = title.toLowerCase().includes('photo');
  
  // Clean title to strictly avoid duplicate words (e.g. "Photo Requirements Requirements")
  let cardTitle = title.replace(/(requirements\s*)+/gi, 'Requirements').trim();
  if (cardTitle.toLowerCase() === 'photo' || cardTitle.toLowerCase() === 'photo requirements') {
    cardTitle = 'Photo Requirements';
  } else if (cardTitle.toLowerCase() === 'signature' || cardTitle.toLowerCase() === 'signature requirements') {
    cardTitle = 'Signature Requirements';
  } else if (!cardTitle.toLowerCase().endsWith('requirements')) {
    cardTitle = `${cardTitle} Requirements`;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
          {isPhoto ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{cardTitle}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 flex-grow">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Dimensions</div>
          <div className="text-lg font-bold text-gray-900">{width} × {height} <span className="text-sm font-normal text-gray-500">px</span></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">File Size</div>
          <div className="text-lg font-bold text-gray-900">{minKB} – {maxKB} <span className="text-sm font-normal text-gray-500">KB</span></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Format</div>
          <div className="text-lg font-bold text-gray-900">{format.toUpperCase()}</div>
        </div>
        {dpi && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Resolution</div>
            <div className="text-lg font-bold text-gray-900">{dpi} <span className="text-sm font-normal text-gray-500">DPI</span></div>
          </div>
        )}
      </div>

      {notes && (
        <div className="bg-indigo-50 text-indigo-700 p-4 rounded-xl text-sm mb-6 border border-indigo-100">
          <strong className="font-semibold block mb-1">Note:</strong>
          {notes}
        </div>
      )}

      <Link 
        href={ctaHref}
        className="w-full flex items-center justify-center px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 outline-none mt-auto"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
