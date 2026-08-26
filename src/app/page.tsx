import Link from "next/link";
import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import PopularTools from "@/components/home/PopularTools";
import PopularExams from "@/components/home/PopularExams";
import BrowseCategories from "@/components/home/BrowseCategories";
import WhyUseSection from "@/components/home/WhyUseSection";

export const metadata: Metadata = {
  title: "20KB Photo — Resize Photos & Signatures for Applications & Exams",
  description:
    "Free online tools to resize, compress, convert and prepare your photos, signatures and documents for exams, government forms, admissions and applications. 100% private — processed in your browser.",
  alternates: { canonical: "https://20kbphoto.in" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PopularTools />
      <PopularExams />
      <BrowseCategories />
      <WhyUseSection />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "20KB Photo",
            url: "https://20kbphoto.in",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "All",
            browserRequirements: "Requires JavaScript",
            description:
              "Free online tools to resize, compress and prepare photos, signatures and documents for applications and forms.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
          }),
        }}
      />
    </>
  );
}
