import Link from "next/link";
import Logo from "@/components/layout/Logo";

const footerLinks = {
  "Photo & Editing": [
    { label: "Image Resizer", href: "/tools/image-resizer" },
    { label: "Background Remover", href: "/tools/background-remover" },
    { label: "Image Cropper", href: "/tools/image-cropper" },
    { label: "Blur Image / Face Blur", href: "/tools/blur-image" },
    { label: "Image Stitcher", href: "/tools/image-stitcher" },
    { label: "Passport Photo Maker", href: "/tools/passport-photo-maker" },
    { label: "Image Upscaler", href: "/tools/image-upscaler" },
    { label: "EXIF Metadata Viewer", href: "/tools/image-metadata" },
  ],
  "Document & PDF Tools": [
    { label: "JPG to PDF", href: "/tools/jpg-to-pdf" },
    { label: "PDF to JPG", href: "/tools/pdf-to-jpg" },
    { label: "Image to PDF", href: "/tools/image-to-pdf" },
    { label: "PDF to Image", href: "/tools/pdf-to-image" },
    { label: "Document Scanner", href: "/tools/document-scanner" },
    { label: "Photos to PDF", href: "/tools/photos-to-pdf" },
  ],
  "Signature & Bulk": [
    { label: "Signature Resizer", href: "/tools/signature-resizer" },
    { label: "Signature Compressor", href: "/tools/signature-compressor" },
    { label: "Bulk Image Compressor", href: "/tools/bulk-image-compressor" },
    { label: "Bulk Image Resizer", href: "/tools/bulk-image-resizer" },
    { label: "Signature 140×60", href: "/signature-resizer-140x60" },
    { label: "Signature 200×80", href: "/signature-resizer-200x80" },
  ],
  "Popular Sizes": [
    { label: "Resize Image to 20KB", href: "/resize-image-to-20kb" },
    { label: "Resize Image to 30KB", href: "/resize-image-to-30kb" },
    { label: "Resize Image to 50KB", href: "/resize-image-to-50kb" },
    { label: "Resize Image to 100KB", href: "/resize-image-to-100kb" },
    { label: "Resize Image to 200KB", href: "/resize-image-to-200kb" },
  ],
  "Converters & Format": [
    { label: "Image Format Converter", href: "/tools/image-format-converter" },
    { label: "Image to JPG", href: "/tools/image-to-jpg" },
    { label: "PNG to JPG", href: "/tools/png-to-jpg" },
    { label: "WebP to JPG", href: "/tools/webp-to-jpg" },
    { label: "JPG to PNG", href: "/tools/jpg-to-png" },
    { label: "JPG to WebP", href: "/tools/jpg-to-webp" },
  ],
};

const popularExams = [
  { label: "SSC CGL", href: "/exams/ssc-cgl" },
  { label: "SSC CHSL", href: "/exams/ssc-chsl" },
  { label: "SSC GD", href: "/exams/ssc-gd" },
  { label: "UPSC CSE", href: "/exams/upsc-cse" },
  { label: "IBPS PO", href: "/exams/ibps-po" },
  { label: "SBI PO", href: "/exams/sbi-po" },
  { label: "SBI Clerk", href: "/exams/sbi-clerk" },
  { label: "RBI Grade B", href: "/exams/rbi-grade-b" },
  { label: "RRB NTPC", href: "/exams/rrb-ntpc" },
  { label: "NEET UG", href: "/exams/neet-ug" },
  { label: "JEE Main", href: "/exams/jee-main" },
  { label: "India Post GDS", href: "/exams/india-post-gds" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Popular Exams Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Popular Exam Presets
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularExams.map((exam) => (
              <Link
                key={exam.href}
                href={exam.href}
                className="px-3 py-1 text-xs font-medium bg-gray-800/60 hover:bg-indigo-600 hover:text-white border border-gray-700/60 rounded-full transition-colors"
              >
                {exam.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-3">
                <Logo size="sm" dark />
                <span className="text-xs text-gray-500 border-l border-gray-800 pl-3">
                  © {new Date().getFullYear()} 20KB Photo. 100% Client-Side Privacy.
                </span>
              </div>
              <a
                href="https://www.producthunt.com/products/20kb-photo?utm_source=badge-follow&utm_medium=badge&utm_source=badge-20kb-photo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-80 transition-opacity sm:border-l sm:border-gray-800 sm:pl-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="20KB Photo - Resize and compress images to exact file sizes online | Product Hunt"
                  src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1306761&theme=light"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-4 text-center sm:text-left leading-relaxed">
            20KB Photo is an independent utility platform and is not affiliated with SSC, UPSC, IBPS, NTA, or any government authority. Always check official exam notifications for updated specifications.
          </p>
        </div>
      </div>
    </footer>
  );
}
