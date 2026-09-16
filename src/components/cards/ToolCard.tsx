import Link from "next/link";
import {
  HiOutlinePhoto,
  HiOutlineArchiveBox,
  HiOutlinePencilSquare,
  HiOutlineCamera,
  HiOutlineArrowPath,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineScissors,
  HiOutlineUser,
  HiOutlineArrowDownRight,
  HiOutlineDocumentText,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

const iconMap: Record<string, React.ReactNode> = {
  HiOutlinePhoto: <HiOutlinePhoto className="w-6 h-6 text-indigo-600" />,
  HiOutlineArchiveBox: <HiOutlineArchiveBox className="w-6 h-6 text-indigo-600" />,
  HiOutlinePencilSquare: <HiOutlinePencilSquare className="w-6 h-6 text-indigo-600" />,
  HiOutlineCamera: <HiOutlineCamera className="w-6 h-6 text-indigo-600" />,
  HiOutlineArrowPath: <HiOutlineArrowPath className="w-6 h-6 text-indigo-600" />,
  HiOutlineAdjustmentsHorizontal: <HiOutlineAdjustmentsHorizontal className="w-6 h-6 text-indigo-600" />,
  HiOutlineScissors: <HiOutlineScissors className="w-6 h-6 text-indigo-600" />,
  HiOutlineIdentification: <HiOutlineUser className="w-6 h-6 text-indigo-600" />,
  HiOutlineArrowDownRight: <HiOutlineArrowDownRight className="w-6 h-6 text-indigo-600" />,
  HiOutlineDocumentText: <HiOutlineDocumentText className="w-6 h-6 text-indigo-600" />,
};

interface ToolCardProps {
  name: string;
  description: string;
  href: string;
  icon?: string;
  category?: string;
}

export default function ToolCard({ name, description, href, icon, category }: ToolCardProps) {
  const renderedIcon = (icon && iconMap[icon]) || <HiOutlineWrenchScrewdriver className="w-6 h-6 text-indigo-600" />;

  return (
    <Link href={href} className="group block h-full">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shrink-0">
            {renderedIcon}
          </div>
          {category && (
            <span className="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-100">
              {category}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-grow">{description}</p>
      </div>
    </Link>
  );
}
