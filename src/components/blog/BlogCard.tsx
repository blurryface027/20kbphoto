import Link from "next/link";
import { BlogPost } from "@/data/blog/types";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineArrowRight } from "react-icons/hi2";

interface BlogCardProps {
  article: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ article, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 flex flex-col justify-between ${
        featured ? "lg:col-span-2 bg-gradient-to-br from-white via-white to-indigo-50/40 border-indigo-200 shadow-sm" : ""
      }`}
    >
      <div className="space-y-4">
        {/* Category & Metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
            {article.category}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <HiOutlineCalendar className="w-3.5 h-3.5 text-gray-400" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineClock className="w-3.5 h-3.5 text-gray-400" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}>
          <Link href={`/blog/${article.slug}`} className="focus:outline-none focus:underline">
            {article.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {article.description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">
          By {article.author.name}
        </span>
        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:text-indigo-700 hover:underline transition-colors"
          aria-label={`Read article: ${article.title}`}
        >
          <span>Read Article</span>
          <HiOutlineArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
