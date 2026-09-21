import Link from "next/link";
import { BlogSection } from "@/data/blog/types";
import VisualDiagram from "./VisualDiagram";
import { HiOutlineLightBulb, HiOutlineExclamationTriangle, HiOutlineInformationCircle, HiOutlineWrenchScrewdriver } from "react-icons/hi2";

interface ArticleContentProps {
  sections: BlogSection[];
}

export default function ArticleContent({ sections }: ArticleContentProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-10 text-gray-800 text-base sm:text-lg leading-relaxed">
      {sections.map((section, idx) => (
        <section key={idx} className="space-y-4">
          {/* H2 Heading */}
          {section.h2 && (
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight pt-4 border-t border-gray-100 first:border-t-0 first:pt-0">
              {section.h2}
            </h2>
          )}

          {/* H3 Subheading */}
          {section.h3 && (
            <h3 className="text-xl font-bold text-gray-900 tracking-tight pt-2">
              {section.h3}
            </h3>
          )}

          {/* Paragraphs */}
          {section.paragraphs &&
            section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} className="text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}

          {/* Bullet List */}
          {section.list && (
            <ul className="space-y-2.5 my-4 pl-2 text-gray-700">
              {section.list.map((item, lIdx) => (
                <li key={lIdx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Ordered List */}
          {section.orderedList && (
            <ol className="space-y-3 my-4 pl-1 text-gray-700">
              {section.orderedList.map((item, oIdx) => (
                <li key={oIdx} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shrink-0 mt-0.5">
                    {oIdx + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          )}

          {/* Visual Chart / Diagram */}
          {section.visualChart && <VisualDiagram chart={section.visualChart} />}

          {/* Data Table */}
          {section.table && (
            <div className="my-6 overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
              <table className="w-full text-left border-collapse text-sm">
                {section.table.caption && (
                  <caption className="p-3 text-xs font-bold text-gray-500 bg-gray-50 border-b border-gray-200 text-left">
                    {section.table.caption}
                  </caption>
                )}
                <thead>
                  <tr className="bg-gray-100/80 border-b border-gray-200">
                    {section.table.headers.map((header, hIdx) => (
                      <th key={hIdx} className="p-3.5 font-bold text-gray-900 whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {section.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-indigo-50/30 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3.5 text-gray-700 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Callout Box */}
          {section.callout && (
            <div className="my-6 p-6 rounded-2xl border bg-indigo-50/60 border-indigo-200/80 text-gray-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-indigo-900 text-base">
                <HiOutlineLightBulb className="w-5 h-5 text-indigo-600" />
                <span>{section.callout.title || "Pro Tip & Helpful Tool"}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {section.callout.text}
              </p>
              {section.callout.toolLink && (
                <div className="pt-2">
                  <Link
                    href={section.callout.toolLink.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md"
                  >
                    <HiOutlineWrenchScrewdriver className="w-4 h-4" />
                    <span>{section.callout.toolLink.label}</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
