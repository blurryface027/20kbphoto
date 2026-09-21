import { BlogPost } from "./types";
import { articlesGroup1 } from "./articles1";
import { articlesGroup2 } from "./articles2";
import { articlesGroup3 } from "./articles3";
import { articlesGroup4 } from "./articles4";

export * from "./types";

export const allBlogArticles: BlogPost[] = [
  ...articlesGroup1,
  ...articlesGroup2,
  ...articlesGroup3,
  ...articlesGroup4,
];

export function getAllArticles(): BlogPost[] {
  return allBlogArticles;
}

export function getArticleBySlug(slug: string): BlogPost | undefined {
  return allBlogArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slugs: string[]): BlogPost[] {
  return allBlogArticles.filter((article) => slugs.includes(article.slug));
}

export function getArticlesByCategory(category: string): BlogPost[] {
  if (!category || category === "All") return allBlogArticles;
  return allBlogArticles.filter((article) => article.category === category);
}

export function getAllCategories(): string[] {
  const categories = Array.from(new Set(allBlogArticles.map((a) => a.category)));
  return ["All", ...categories];
}
