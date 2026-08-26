import Link from "next/link";
import {
  HiOutlinePhoto,
  HiOutlineArchiveBox,
  HiOutlinePencilSquare,
  HiOutlineCamera,
  HiOutlineArrowPath,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineScissors,
  HiOutlineIdentification,
  HiOutlineArrowDownRight,
  HiOutlineDocumentText,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

const iconMap: Record<string, React.ReactNode> = {
  HiOutlinePhoto: <HiOutlinePhoto className="w-5 h-5 text-indigo-600" />,
  HiOutlineArchiveBox: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" />,
  HiOutlinePencilSquare: <HiOutlinePencilSquare className="w-5 h-5 text-indigo-600" />,
  HiOutlineCamera: <HiOutlineCamera className="w-5 h-5 text-indigo-600" />,
  HiOutlineArrowPath: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" />,
  HiOutlineAdjustmentsHorizontal: <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600" />,
  HiOutlineScissors: <HiOutlineScissors className="w-5 h-5 text-indigo-600" />,
  HiOutlineIdentification: <HiOutlineIdentification className="w-5 h-5 text-indigo-600" />,
  HiOutlineArrowDownRight: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" />,
  HiOutlineDocumentText: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" />,
};

interface RelatedToolsProps {
  tools?: { name: string; href: string; description: string; icon?: string }[];
  title?: string;
}

export default function RelatedTools({ tools = [], title = "Other Helpful Tools" }: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const iconNode = (tool.icon && iconMap[tool.icon]) || (
            <HiOutlineWrenchScrewdriver className="w-5 h-5 text-indigo-600" />
          );

          return (
            <Link href={tool.href} key={index} className="group">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  {iconNode}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{tool.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
