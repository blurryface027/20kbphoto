import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ArticleContent from "@/components/blog/ArticleContent";
import BlogCard from "@/components/blog/BlogCard";
import FAQSection from "@/components/seo/FAQSection";
import RelatedTools from "@/components/seo/RelatedTools";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/data/blog";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineUser, HiOutlineWrenchScrewdriver, HiOutlineArrowLeft } from "react-icons/hi2";
import { WeforAdsHeader } from "@/components/ads";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Article Not Found - 20KB Photo",
    };
  }

  const title = `${article.title} - 20KB Photo`;
  const description = article.description;
  const canonical = `https://20kbphoto.in/blog/${resolvedParams.slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "20KB Photo",
      locale: "en_IN",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.relatedArticleSlugs);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: article.title },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author.name,
      url: "https://20kbphoto.in/",
    },
    publisher: {
      "@type": "Organization",
      name: "20KB Photo",
      url: "https://20kbphoto.in/",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://20kbphoto.in/blog/${article.slug}/`,
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Schema LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Navigation & Breadcrumbs */}
      <div className="space-y-4">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>Back to All Blog Articles</span>
        </Link>
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Article Header */}
      <header className="space-y-4 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
            {article.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed font-medium">
          {article.description}
        </p>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-gray-500 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <HiOutlineUser className="w-4 h-4 text-indigo-600" />
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineCalendar className="w-4 h-4 text-gray-400" />
            <span>Updated {article.updatedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineClock className="w-4 h-4 text-gray-400" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Header Leaderboard Ad */}
      <WeforAdsHeader className="my-8" />

      {/* Main Body Content */}
      <ArticleContent sections={article.sections} />

      {/* FAQ Section */}
      {article.faqs && article.faqs.length > 0 && (
        <FAQSection faqs={article.faqs} title="Frequently Asked Questions" />
      )}

      {/* Tool CTA Banner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-8 my-12 border border-indigo-800 space-y-4 shadow-lg text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">Ready to Prepare Your Photo?</h3>
          <p className="text-xs sm:text-sm text-indigo-200">
            Use 20KB Photo online tools to resize and compress photos directly in your browser.
          </p>
        </div>
        <Link
          href="/tools/image-resizer/"
          className="px-6 py-3 bg-white hover:bg-indigo-50 text-indigo-900 font-bold rounded-xl text-sm transition-all shadow-md shrink-0 inline-flex items-center justify-center gap-2"
        >
          <HiOutlineWrenchScrewdriver className="w-4 h-4 text-indigo-700" />
          <span>Use Resizer Tool Now</span>
        </Link>
      </div>

      {/* Related Tools Section */}
      {article.relatedToolSlugs && article.relatedToolSlugs.length > 0 && (
        <RelatedTools
          tools={article.relatedToolSlugs.map((t) => ({
            name: t.name || t.label || "",
            href: t.href,
            description: t.description,
            icon: t.icon,
          }))}
          title="Relevant 20KB Photo Tools"
        />
      )}

      {/* Related Articles Section */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="pt-10 border-t border-gray-200 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relArticle) => (
              <BlogCard key={relArticle.slug} article={relArticle} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
