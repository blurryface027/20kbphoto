import Link from "next/link";
import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PopularTools from "@/components/home/PopularTools";
import PopularExams from "@/components/home/PopularExams";
import BrowseCategories from "@/components/home/BrowseCategories";
import WhyUseSection from "@/components/home/WhyUseSection";
import WhyChooseTable from "@/components/home/WhyChooseTable";
import HomeFAQSection from "@/components/home/HomeFAQSection";
import AdUnit from "@/components/ads/AdUnit";

export const metadata: Metadata = {
  title: "20KB Photo - Resize Photos and Signatures for Applications and Exams",
  description:
    "Free online tools to resize, compress, convert and prepare your photos, signatures and documents for exams, government forms, admissions and applications. 100% private - processed in your browser.",
  alternates: { canonical: "https://20kbphoto.in" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HowItWorksSection />
      <PopularTools />
      <PopularExams />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit className="my-8" />
      </div>
      <BrowseCategories />
      <WhyChooseTable />
      <WhyUseSection />
      <HomeFAQSection />

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

