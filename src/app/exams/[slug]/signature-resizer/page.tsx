import { notFound } from "next/navigation";
import { HiOutlineLockClosed } from "react-icons/hi2";
import type { Metadata } from "next";
import { exams, getExamBySlug, getAllSlugs } from "@/data/exams";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ExamToolClient from "@/components/exams/ExamToolClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) return { title: "Exam Not Found" };

  return {
    title: `${exam.name} Signature Resizer — Resize Signature to ${exam.signature.width}×${exam.signature.height}`,
    description: `Resize your signature to ${exam.signature.width}×${exam.signature.height} pixels and ${exam.signature.minKB}-${exam.signature.maxKB} KB for ${exam.fullName} application. Free, instant, private.`,
    alternates: { canonical: `https://20kbphoto.com/exams/${slug}/signature-resizer/` },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-text">
          {exam.name} Signature Resizer
        </h1>
        <p className="mt-2 text-text-secondary">
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

      {/* Disclaimer */}
      <div className="mt-12 p-4 bg-bg-alt rounded-xl border border-border text-xs text-text-muted leading-relaxed">
        <strong>Disclaimer:</strong> This is an independent tool and is not affiliated with{" "}
        {exam.authority} or any government organization. Always verify the latest requirements from
        the official notification before uploading your application.
      </div>
    </div>
  );
}
