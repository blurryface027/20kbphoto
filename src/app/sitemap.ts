import { MetadataRoute } from "next";
import { exams } from "@/data/exams";
import { tools, exactKBTools, dimensionTools } from "@/data/tools";

export const dynamic = "force-static";

const BASE_URL = "https://20kbphoto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/exams/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}${tool.path}/`,
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
  const categories = ["ssc", "upsc", "banking", "railway", "police", "defence", "state-psc", "teaching", "judicial", "admissions"];
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/exams/${cat}/`,
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

  // Special pages
  const specialPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/add-name-and-date-to-photo/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/add-name-to-photo/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/pan-card-photo-resizer/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/passport-photo-maker/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  return [
    ...staticPages,
    ...toolPages,
    ...kbPages,
    ...dimPages,
    ...sigDimPages,
    ...categoryPages,
    ...examHubPages,
    ...examPhotoPages,
    ...examSigPages,
    ...specialPages,
  ];
}
