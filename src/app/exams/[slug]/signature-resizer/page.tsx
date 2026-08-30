import { notFound } from "next/navigation";
import { HiOutlineLockClosed } from "react-icons/hi2";
import type { Metadata } from "next";
import { exams, getExamBySlug, getAllSlugs } from "@/data/exams";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ExamToolClient from "@/components/exams/ExamToolClient";
import OfficialExamGuidelines from "@/components/exams/OfficialExamGuidelines";
import ExamFAQSection from "@/components/exams/ExamFAQSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) return { title: "Exam Not Found - 20KB Photo" };

  const { signature } = exam;
  const title = `${exam.name} Signature Resizer - ${signature.width}x${signature.height}px, ${signature.minKB}-${signature.maxKB}KB - 20KB Photo`;
  const description = `Resize the signature required for ${exam.name} applications to ${signature.width}x${signature.height}px and ${signature.minKB}-${signature.maxKB}KB ${signature.format} format online. Free signature resizer for ${exam.fullName} forms.`;
  const canonical = `https://20kbphoto.in/exams/${slug}/signature-resizer`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '20KB Photo',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ExamSignatureResizerPage({ params }: Props) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Exams", href: "/exams" },
    { label: exam.name, href: `/exams/${exam.slug}` },
    { label: "Signature Resizer" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {exam.name} Signature Resizer
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
          Resize your signature to exactly{" "}
          <strong>
            {exam.signature.width}×{exam.signature.height} pixels
          </strong>{" "}
          and{" "}
          <strong>
            {exam.signature.minKB}–{exam.signature.maxKB} KB
          </strong>{" "}
          in {exam.signature.format.toUpperCase()} format for {exam.fullName} ({exam.authority}).
        </p>

        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
          <HiOutlineLockClosed className="w-4 h-4 text-emerald-600 shrink-0" /> Your signature is processed locally and never uploaded
        </div>
      </div>

      <ExamToolClient
        exam={JSON.parse(JSON.stringify(exam))}
        type="signature"
      />

      {/* Official Guidelines Section */}
      <OfficialExamGuidelines exam={exam} />

      {/* FAQ Section */}
      <ExamFAQSection exam={exam} />

      {/* Disclaimer */}
      <div className="mt-12 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 leading-relaxed">
        <strong>Disclaimer:</strong> This is an independent tool and is not affiliated with{" "}
        {exam.authority} or any government organization. Always verify the latest requirements from
        the official notification before uploading your application.
      </div>
    </div>
  );
}
