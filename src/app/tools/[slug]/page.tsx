import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolPageClient from "@/components/tools/ToolPageClient";
import { getToolConfig, getAllToolSlugs } from "@/lib/toolConfig";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const config = getToolConfig(resolvedParams?.slug);

  let formattedTitle = config.title;
  if (!formattedTitle.includes("Online") && !formattedTitle.includes("Converter") && !formattedTitle.includes("Maker") && !formattedTitle.includes("Compressor") && !formattedTitle.includes("Resizer")) {
    formattedTitle = `${config.title} Online`;
  }
  const title = `${formattedTitle} - 20KB Photo`;
  const description = config.subtitle;
  const canonical = `https://20kbphoto.in/tools/${resolvedParams.slug}`;

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
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) {
    notFound();
  }

  return <ToolPageClient slug={resolvedParams.slug} />;
}
