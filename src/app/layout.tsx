import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://20kbphoto.in"),
  title: {
    default: "20KB Photo - Resize Photos and Signatures for Applications and Exams",
    template: "%s",
  },
  description:
    "Free online tools to resize, compress, convert and prepare your photos, signatures and documents for exams, government forms, admissions and applications. 100% private - processed in your browser.",
  keywords: [
    "photo resizer",
    "signature resizer",
    "image compressor",
    "resize image to 20kb",
    "SSC CGL photo resizer",
    "UPSC photo resizer",
    "exam photo resizer",
    "government form photo",
    "passport photo maker",
    "PAN card photo resizer",
  ],
  authors: [{ name: "20KB Photo" }],
  creator: "20KB Photo",
  publisher: "20KB Photo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://20kbphoto.in",
    siteName: "20KB Photo",
    title: "20KB Photo - Resize Photos and Signatures for Applications and Exams",
    description:
      "Free online tools to resize, compress and prepare your application files in seconds. Exact size. Exact dimensions. Ready for upload.",
  },
  twitter: {
    card: "summary_large_image",
    title: "20KB Photo - Resize Photos and Signatures for Applications and Exams",
    description:
      "Free online tools to resize, compress and prepare your application files in seconds.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "20KB Photo",
              url: "https://20kbphoto.in",
              description:
                "Free online tools for preparing photos, signatures and documents for applications and forms.",
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
