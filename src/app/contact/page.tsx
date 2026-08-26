import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | 20KB Photo",
  description:
    "Get in touch with the 20KB Photo team for feedback, feature requests, or report incorrect exam presets.",
  alternates: { canonical: "https://20kbphoto.com/contact" },
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Contact Us & Support
        </h1>
        <p className="text-base text-gray-600">
          Have feedback, need a new exam preset, or noticed a bug? We're here to help!
        </p>
      </div>

      <ContactClient />
    </div>
  );
}
