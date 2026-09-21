"use client";

import { useState, useTransition, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BlogPost } from "@/data/blog/types";
import BlogCard from "@/components/blog/BlogCard";
import { HiOutlineSparkles, HiOutlineXMark } from "react-icons/hi2";

interface BlogFilterSectionProps {
  articles: BlogPost[];
  categories: string[];
}

export default function BlogFilterSection({
  articles,
  categories,
}: BlogFilterSectionProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (initialCategory) {
      const match = categories.find(
        (c) => c.toLowerCase() === initialCategory.toLowerCase()
      );
      if (match) return match;
    }
    return "All";
  });

  const [, startTransition] = useTransition();

  const handleCategorySelect = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
      // Update URL query without full page reload
      const url = new URL(window.location.href);
      if (category === "All") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", category);
      }
      window.history.replaceState(null, "", url.pathname + url.search);
    });
  };

  const filteredArticles = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") {
      return articles;
    }
    return articles.filter(
      (article) =>
        article.category.trim().toLowerCase() ===
        selectedCategory.trim().toLowerCase()
    );
  }, [articles, selectedCategory]);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div
        className="flex items-center justify-center flex-wrap gap-2 pt-2"
        role="tablist"
        aria-label="Filter blog articles by category"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border border-indigo-600 scale-[1.02]"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/40"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filter Status / Reset bar when filtered */}
      {selectedCategory !== "All" && (
        <div className="flex items-center justify-between bg-indigo-50/70 border border-indigo-100 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-indigo-900 animate-fade-in">
          <div className="flex items-center gap-2">
            <HiOutlineSparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              Showing{" "}
              <strong className="font-bold text-indigo-700">
                {filteredArticles.length}
              </strong>{" "}
              {filteredArticles.length === 1 ? "article" : "articles"} in{" "}
              <strong className="font-bold text-indigo-700">
                &ldquo;{selectedCategory}&rdquo;
              </strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCategorySelect("All")}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white hover:bg-indigo-100/60 border border-indigo-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <HiOutlineXMark className="w-3.5 h-3.5" />
            <span>Show All</span>
          </button>
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Featured Card */}
          {featuredArticle && (
            <BlogCard
              article={featuredArticle}
              featured={selectedCategory === "All" || filteredArticles.length > 1}
            />
          )}

          {/* Remaining Cards */}
          {remainingArticles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white border border-gray-200 rounded-2xl space-y-4">
          <p className="text-base text-gray-600 font-medium">
            No articles found in category &ldquo;{selectedCategory}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => handleCategorySelect("All")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            View All Articles
          </button>
        </div>
      )}
    </div>
  );
}
