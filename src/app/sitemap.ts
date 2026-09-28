import { MetadataRoute } from "next";
import { exams } from "@/data/exams";
import { states } from "@/data/states";
import { tools, exactKBTools, dimensionTools } from "@/data/tools";
import { getAllArticles } from "@/data/blog";

export const dynamic = "force-static";

const BASE_URL = "https://20kbphoto.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tools/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/exams/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms-of-service/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/disclaimer/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Blog article pages
  const blogArticlePages: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}/`,
    lastModified: article.updatedAt ? new Date(article.updatedAt).toISOString() : now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}${tool.path.replace(/\/+$/, '')}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: tool.priority === "P0" ? 0.8 : 0.6,
  }));

  // Exact KB pages
  const kbPages: MetadataRoute.Sitemap = exactKBTools.map((kb) => ({
    url: `${BASE_URL}/resize-image-to-${kb.kb}kb/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: kb.priority === "P0" ? 0.8 : 0.6,
  }));

  // Dimension pages
  const dimPages: MetadataRoute.Sitemap = dimensionTools
    .filter((d) => d.type === "image")
    .map((d) => ({
      url: `${BASE_URL}/image-resizer-${d.width}x${d.height}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: d.priority === "P0" ? 0.7 : 0.5,
    }));

  // Signature dimension pages
  const sigDimPages: MetadataRoute.Sitemap = dimensionTools
    .filter((d) => d.type === "signature")
    .map((d) => ({
      url: `${BASE_URL}/signature-resizer-${d.width}x${d.height}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: d.priority === "P0" ? 0.7 : 0.5,
    }));

  // Exam category pages
  const categories = ["ssc", "upsc", "banking", "railway", "police", "defence", "state-psc", "teaching", "judicial", "admissions", "others"];
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/exams/${cat}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // State pages
  const statePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${BASE_URL}/exams/state/${s.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Exam hub pages
  const examHubPages: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${BASE_URL}/exams/${exam.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: exam.priority === "P0" ? 0.8 : exam.priority === "P1" ? 0.6 : 0.5,
  }));

  // Exam photo pages
  const examPhotoPages: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${BASE_URL}/exams/${exam.slug}/photo-resizer/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: exam.priority === "P0" ? 0.7 : 0.5,
  }));

  // Exam signature pages
  const examSigPages: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${BASE_URL}/exams/${exam.slug}/signature-resizer/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: exam.priority === "P0" ? 0.7 : 0.5,
  }));

  // Exam photo & signature pages
  const examPhotoSigPages: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${BASE_URL}/exams/${exam.slug}/photo-signature-resizer/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: exam.priority === "P0" ? 0.7 : 0.5,
  }));

  // Special pages (unique standalone tools not under /tools/)
  const specialPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/add-name-and-date-to-photo/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/add-name-to-photo/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/pan-card-photo-resizer/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  return [
    ...staticPages,
    ...blogArticlePages,
    ...toolPages,
    ...kbPages,
    ...dimPages,
    ...sigDimPages,
    ...categoryPages,
    ...statePages,
    ...examHubPages,
    ...examPhotoPages,
    ...examSigPages,
    ...specialPages,
  ];
}

