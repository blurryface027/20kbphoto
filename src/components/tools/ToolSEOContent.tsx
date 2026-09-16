import React from "react";
import Link from "next/link";
import { getToolConfig } from "@/lib/toolConfig";
import {
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineQuestionMarkCircle,
  HiOutlineExclamationTriangle,
  HiOutlineLightBulb,
  HiOutlineBuildingLibrary,
} from "react-icons/hi2";

export interface ToolSEOData {
  title: string;
  subtitle: string;
  overview: string[];
  specs: { label: string; value: string }[];
  steps: { title: string; desc: string }[];
  tips: string[];
  troubleshooting: { issue: string; fix: string }[];
  faqs: { question: string; answer: string }[];
  related: { name: string; href: string; desc: string }[];
}

const TOOL_SEO_DATABASE: Record<string, ToolSEOData> = {
  "background-remover": {
    title: "Background Remover Online",
    subtitle: "Instantly remove image backgrounds in your browser and export transparent PNGs or solid color portrait photos.",
    overview: [
      "Removing backgrounds from official photographs, signatures, or document scans is a critical requirement for Indian government job applications, entrance examinations, and passport processing.",
      "Our 100% browser-based Background Remover uses smart color-distance and edge-detection algorithms to isolate foreground subjects without uploading your personal photos to external servers. Easily export transparent PNG files or swap backgrounds to official solid white, light blue, or gray."
    ],
    specs: [
      { label: "Supported Input Formats", value: "JPG, JPEG, PNG, WEBP, BMP" },
      { label: "Output Formats", value: "Transparent PNG, Solid White JPG, Light Blue JPG" },
      { label: "Max File Upload Size", value: "15 MB" },
      { label: "Processing Mechanism", value: "Local HTML5 Canvas & Alpha Channel Masking" },
      { label: "Privacy Guarantee", value: "100% Client-Side (No Server Uploads)" }
    ],
    steps: [
      { title: "Upload Photograph", desc: "Select your photo or drag it directly into the upload area above." },
      { title: "Select Background Mode", desc: "Choose Auto-Detect, White Background Removal, or Custom Color thresholding." },
      { title: "Adjust Tolerance", desc: "Fine-tune the removal sensitivity slider to clean up border edges smoothly." },
      { title: "Choose Output Fill", desc: "Select Transparent PNG or fill with solid White or Light Blue for official exam portals." },
      { title: "Download Result", desc: "Click Download Transparent PNG or Solid Photo to save the processed file instantly." }
    ],
    tips: [
      "For passport photos, use a solid light blue or white background to comply with SSC, UPSC, and NTA guidelines.",
      "If border edges appear pixelated, slightly decrease the removal tolerance slider.",
      "PNG format preserves 100% transparent backgrounds, while JPG converts transparent areas to solid color."
    ],
    troubleshooting: [
      { issue: "Parts of the subject are missing", fix: "Lower the tolerance percentage slider so the algorithm does not erase similar shade clothing or hair." },
      { issue: "Background is not completely removed", fix: "Increase the tolerance slider slightly or select Custom Color mode to target specific background shades." }
    ],
    faqs: [
      { question: "Is background removal free?", answer: "Yes, 100% free with unlimited photo background removals." },
      { question: "Are my photos uploaded to a server?", answer: "No. All background removal calculations run locally inside your web browser memory for absolute privacy." },
      { question: "Can I use the output photo for SSC or UPSC forms?", answer: "Yes! Choose the Solid White or Light Blue background fill option to match official SSC CGL and UPSC application photo standards." }
    ],
    related: [
      { name: "Passport Photo Maker", href: "/tools/passport-photo-maker", desc: "Format photos to exact passport dimensions" },
      { name: "Image Cropper", href: "/tools/image-cropper", desc: "Crop photos to 1:1 or 3.5x4.5cm aspect ratio" },
      { name: "Blur Image", href: "/tools/blur-image", desc: "Blur sensitive details in documents" }
    ]
  },

  "image-cropper": {
    title: "Image Cropper Online",
    subtitle: "Crop photos and document scans to exact aspect ratios (1:1, 4:5, 16:9, 9:16) or custom dimensions.",
    overview: [
      "Correct image aspect ratio is essential when uploading photographs and signatures to online recruitment portals like SSC, UPSC, IBPS, NTA, and State PSCs.",
      "Our online Image Cropper allows you to interactively crop, zoom, and frame your photos to exact application proportions without quality loss."
    ],
    specs: [
      { label: "Supported Ratios", value: "1:1, 4:5, 16:9, 9:16, 3.5:4.5 (Passport), Free Crop" },
      { label: "Export Formats", value: "JPG, PNG, WEBP" },
      { label: "Max Dimensions", value: "Up to 5000 × 5000 pixels" },
      { label: "Processing Type", value: "Client-Side HTML5 Canvas" }
    ],
    steps: [
      { title: "Select Image", desc: "Upload your photo or signature file." },
      { title: "Choose Aspect Ratio", desc: "Select 1:1 Square, 4:5, or 3.5:4.5 Passport ratio." },
      { title: "Frame the Subject", desc: "Drag the crop handles to align the face or signature inside the guidelines." },
      { title: "Export Cropped Image", desc: "Click Download to save the cropped file in high quality." }
    ],
    tips: [
      "Position your face in the center 70-80% of the crop box for passport photos.",
      "Ensure signature crops leave 5px white margin around handwritten letters."
    ],
    troubleshooting: [
      { issue: "Cropped image looks blurry", fix: "Always upload high resolution original photos before cropping." }
    ],
    faqs: [
      { question: "Can I crop signatures?", answer: "Yes, use the Free Crop or Signature preset to crop white space around signatures." }
    ],
    related: [
      { name: "Passport Photo Maker", href: "/tools/passport-photo-maker", desc: "Create passport size photos" },
      { name: "Image Resizer", href: "/tools/image-resizer", desc: "Resize dimensions in pixels" }
    ]
  },

  "blur-image": {
    title: "Blur Image / Face Blur Tool",
    subtitle: "Selectively blur sensitive details, faces, roll numbers, or personal text in photographs and documents.",
    overview: [
      "Protecting sensitive personal data like Aadhar numbers, signatures, marks, addresses, and candidate faces before sharing document screenshots online is vital for privacy.",
      "Our interactive Blur Image tool lets you drag and select specific rectangular areas to apply smooth Gaussian blurring or blur the entire image."
    ],
    specs: [
      { label: "Blur Methods", value: "Interactive Rectangular Region Blur & Full Image Blur" },
      { label: "Blur Intensity", value: "Adjustable 3px to 50px SVG Gaussian Filter" },
      { label: "Export Quality", value: "High Quality JPG / PNG" }
    ],
    steps: [
      { title: "Upload Image", desc: "Select the photo or screenshot needing redaction." },
      { title: "Set Blur Mode", desc: "Choose Manual Region Selector or Full Image Blur." },
      { title: "Select Regions", desc: "Click and drag over sensitive text, faces, or numbers to blur them." },
      { title: "Adjust Strength", desc: "Slide the intensity bar for stronger blurring." },
      { title: "Download Photo", desc: "Save your redacted, privacy-protected photo." }
    ],
    tips: [
      "Use region blur to hide Aadhar card numbers while keeping the name readable.",
      "Always check blurred text preview to ensure text cannot be deciphered."
    ],
    troubleshooting: [
      { issue: "Blur is too light", fix: "Increase the blur intensity slider to 25px or higher for total obscuration." }
    ],
    faqs: [
      { question: "Can blurred text be reversed?", answer: "No. Once downloaded, the pixels are permanently overwritten with Gaussian blur data." }
    ],
    related: [
      { name: "EXIF Metadata Viewer", href: "/tools/image-metadata", desc: "Remove camera & location tags" },
      { name: "Document Scanner", href: "/tools/document-scanner", desc: "Scan and enhance documents" }
    ]
  },

  "image-stitcher": {
    title: "Image Stitcher Online",
    subtitle: "Merge multiple images side-by-side or stacked top-to-bottom into a single combined photo.",
    overview: [
      "Many online application forms require submitting combined front & back sides of ID cards (Aadhar, PAN) or multi-page certificates in a single image file.",
      "Use our Image Stitcher to combine two or more photos vertically or horizontally with customizable spacing and background colors."
    ],
    specs: [
      { label: "Layout Modes", value: "Vertical (Top-to-Bottom) & Horizontal (Side-by-Side)" },
      { label: "Spacing & Gaps", value: "0px to 50px customizable padding" },
      { label: "Background Colors", value: "White, Black, Slate Gray" }
    ],
    steps: [
      { title: "Upload Photos", desc: "Select two or more photos (e.g. Aadhar front and back)." },
      { title: "Select Orientation", desc: "Choose Vertical or Horizontal layout." },
      { title: "Reorder & Adjust Gap", desc: "Move items up or down and adjust spacing." },
      { title: "Download Combined Image", desc: "Click Download to export the single stitched file." }
    ],
    tips: [
      "Use Vertical stitching for document front & back sides for form portals.",
      "Set spacing to 10px with white background for a clean document presentation."
    ],
    troubleshooting: [
      { issue: "Images are different sizes", fix: "The stitcher automatically aligns images while preserving individual aspect ratios." }
    ],
    faqs: [
      { question: "How many images can I combine?", answer: "You can combine up to 20 images into one single image file." }
    ],
    related: [
      { name: "JPG to PDF", href: "/tools/jpg-to-pdf", desc: "Convert images to multi-page PDF" },
      { name: "Bulk Resizer", href: "/tools/bulk-image-resizer", desc: "Resize multiple images" }
    ]
  },

  "jpg-to-pdf": {
    title: "JPG to PDF Converter",
    subtitle: "Convert one or multiple JPG images into a single formatted PDF document.",
    overview: [
      "Government exam portals, universities, and job applications frequently require document scans to be submitted as PDF files.",
      "Our browser-based JPG to PDF tool allows you to convert single or multiple JPG images into a clean, standardized PDF document with page size (A4, Letter, Fit), orientation, and margin settings."
    ],
    specs: [
      { label: "Supported Input", value: "JPG, JPEG, PNG, WEBP" },
      { label: "Page Sizes", value: "Standard A4 (210×297mm), US Letter, Fit to Image" },
      { label: "Margin Options", value: "None (0mm), Small (5mm), Medium (10mm)" },
      { label: "PDF Engine", value: "Client-Side jsPDF Engine" }
    ],
    steps: [
      { title: "Select JPG Files", desc: "Upload one or multiple JPG images from your device." },
      { title: "Arrange Sequence", desc: "Drag or use Up/Down controls to set exact page order." },
      { title: "Configure Layout", desc: "Choose A4 or Letter page size, auto orientation, and margins." },
      { title: "Generate & Download", desc: "Click Create PDF and download your PDF file instantly." }
    ],
    tips: [
      "Choose 'Fit Page to Image Size' to keep PDF dimensions identical to your scans.",
      "Combine marksheets and certificates in sequential page order before uploading."
    ],
    troubleshooting: [
      { issue: "PDF file size is large", fix: "Compress images using Bulk Compressor before converting to PDF." }
    ],
    faqs: [
      { question: "Is there a limit on number of pages?", answer: "No, you can convert dozens of images into a single PDF document." }
    ],
    related: [
      { name: "PDF to JPG", href: "/tools/pdf-to-jpg", desc: "Convert PDF pages back into images" },
      { name: "Document Scanner", href: "/tools/document-scanner", desc: "Scan documents to PDF" }
    ]
  },

  "pdf-to-jpg": {
    title: "PDF to JPG / Image Converter",
    subtitle: "Extract all pages from a PDF file into high resolution JPG or PNG images.",
    overview: [
      "When online forms require image uploads (JPG/PNG) instead of PDF documents, extracting pages becomes necessary.",
      "Our PDF to JPG converter renders every PDF page into sharp images in your browser. Download individual page images or all pages bundled in a ZIP archive."
    ],
    specs: [
      { label: "Input Format", value: "PDF Documents (.pdf)" },
      { label: "Output Formats", value: "JPG (JPEG) & PNG" },
      { label: "Render DPI", value: "100 DPI, 150 DPI (High Res), 200 DPI (Print Quality)" },
      { label: "Export Mode", value: "Single Image & Batch ZIP Download" }
    ],
    steps: [
      { title: "Upload PDF", desc: "Select your PDF file from your phone or computer." },
      { title: "Choose Output Format", desc: "Select JPG or PNG format." },
      { title: "Set Resolution", desc: "Choose 150 DPI or 200 DPI for ultra clear text." },
      { title: "Download Images", desc: "Download individual page images or click 'Download All as ZIP'." }
    ],
    tips: [
      "Select PNG format for document scans containing fine text or signatures.",
      "Use 150 DPI for standard form uploads to balance high clarity with small file size."
    ],
    troubleshooting: [
      { issue: "PDF is password protected", fix: "Remove PDF password before uploading to the converter." }
    ],
    faqs: [
      { question: "Are my PDF files stored online?", answer: "No. PDF rendering happens 100% locally in your browser memory." }
    ],
    related: [
      { name: "JPG to PDF", href: "/tools/jpg-to-pdf", desc: "Convert images into PDF" },
      { name: "PDF to Image", href: "/tools/pdf-to-image", desc: "Extract PDF pages to PNG/JPG" }
    ]
  },

  "image-to-pdf": {
    title: "Image to PDF Converter",
    subtitle: "Convert JPG, PNG, and WebP images into a single organized PDF document.",
    overview: [
      "Easily convert all image formats (JPG, PNG, WebP) into structured PDF files for application submissions, admissions, and exam forms."
    ],
    specs: [
      { label: "Supported Formats", value: "JPG, PNG, WEBP, BMP" },
      { label: "Output Format", value: "PDF Document (.pdf)" }
    ],
    steps: [
      { title: "Upload Images", desc: "Select any JPG, PNG, or WebP files." },
      { title: "Reorder Pages", desc: "Arrange page order." },
      { title: "Download PDF", desc: "Click Create PDF to export." }
    ],
    tips: ["Use PNG for scanned certificates for crisp text."],
    troubleshooting: [{ issue: "Page order incorrect", fix: "Use Up/Down arrows to sequence pages before downloading." }],
    faqs: [{ question: "Is this tool free?", answer: "Yes, 100% free with no limits." }],
    related: [{ name: "JPG to PDF", href: "/tools/jpg-to-pdf", desc: "JPG to PDF Converter" }]
  },

  "pdf-to-image": {
    title: "PDF to Image Converter",
    subtitle: "Extract PDF pages into JPG or PNG images with customizable resolution.",
    overview: [
      "Extract every page of a PDF document as high quality JPG or PNG files for easy sharing and portal uploads."
    ],
    specs: [{ label: "Input", value: "PDF File" }, { label: "Output", value: "JPG / PNG" }],
    steps: [
      { title: "Upload PDF", desc: "Select your PDF file." },
      { title: "Choose Format", desc: "Select JPG or PNG." },
      { title: "Download", desc: "Download page images or ZIP." }
    ],
    tips: ["Download ZIP to get all pages at once."],
    troubleshooting: [{ issue: "Encrypted PDF", fix: "Unlock PDF first." }],
    faqs: [{ question: "Can I extract specific pages?", answer: "Yes, preview allows downloading any page individually." }],
    related: [{ name: "PDF to JPG", href: "/tools/pdf-to-jpg", desc: "PDF to JPG Tool" }]
  },

  "document-scanner": {
    title: "Online Document Scanner",
    subtitle: "Scan document photos with B&W & grayscale enhancement filters and export to PDF.",
    overview: [
      "Transform phone photos of Aadhar cards, PAN cards, marksheets, certificates, and receipts into crisp, professional scanned document PDFs with high contrast B&W filters."
    ],
    specs: [
      { label: "Enhancement Filters", value: "Magic B&W Scanner, Grayscale, Contrast Boost, Magic Color" },
      { label: "Output Options", value: "Multi-Page PDF & Clean Scanned Images" }
    ],
    steps: [
      { title: "Upload Photos", desc: "Upload document photos taken from your camera or phone." },
      { title: "Apply Scan Filter", desc: "Select 'Magic B&W Scanner' to clean up shadows and background." },
      { title: "Generate PDF", desc: "Click 'Generate Scanned PDF Document' to export." }
    ],
    tips: ["Magic B&W Scanner filter removes grey paper shadows automatically."],
    troubleshooting: [{ issue: "Document looks dark", fix: "Use Contrast Boost or Magic B&W filter to brighten document background." }],
    faqs: [{ question: "Does it work on mobile?", answer: "Yes, take a photo on mobile and scan directly in your browser." }],
    related: [{ name: "JPG to PDF", href: "/tools/jpg-to-pdf", desc: "Convert images to PDF" }]
  },

  "photos-to-pdf": {
    title: "Photos to PDF Converter",
    subtitle: "Combine multiple photos into one organized PDF document for job and admission applications.",
    overview: ["Combine student marksheets, degree certificates, and ID photos into one clean PDF document for application forms."],
    specs: [{ label: "Input Formats", value: "JPG, PNG, WEBP" }, { label: "Output", value: "Single Multi-Page PDF" }],
    steps: [
      { title: "Upload Photos", desc: "Select all photo files." },
      { title: "Order Pages", desc: "Set sequential order." },
      { title: "Create PDF", desc: "Export as PDF." }
    ],
    tips: ["Order marksheets chronologically."],
    troubleshooting: [{ issue: "Wrong page order", fix: "Reorder list items before export." }],
    faqs: [{ question: "Is registration required?", answer: "No registration required." }],
    related: [{ name: "JPG to PDF", href: "/tools/jpg-to-pdf", desc: "JPG to PDF Tool" }]
  },

  "bulk-image-compressor": {
    title: "Bulk Image Compressor",
    subtitle: "Compress multiple images in batch to specific KB sizes with single ZIP download.",
    overview: [
      "Save time by batch compressing up to 20+ photos simultaneously to exact target file sizes in KB (e.g. 20KB, 50KB, 100KB) for online form requirements."
    ],
    specs: [
      { label: "Batch Capacity", value: "Multiple images in one batch" },
      { label: "Compression Engine", value: "Target KB Iterative Quantization" },
      { label: "Download Mode", value: "ZIP Archive & Individual Downloads" }
    ],
    steps: [
      { title: "Select Batch Files", desc: "Upload multiple photos at once." },
      { title: "Set Target KB", desc: "Type 20, 50, or 100 KB target." },
      { title: "Compress All", desc: "Click Compress All Files." },
      { title: "Download ZIP", desc: "Download all compressed photos in a single ZIP file." }
    ],
    tips: ["Check table breakdown to verify file size savings for each file."],
    troubleshooting: [{ issue: "File still larger than target", fix: "Lower target KB or resize image dimensions slightly." }],
    faqs: [{ question: "Can I download all at once?", answer: "Yes, click Download All ZIP." }],
    related: [{ name: "Image Compressor", href: "/tools/image-compressor", desc: "Single Image Compressor" }]
  },

  "bulk-image-resizer": {
    title: "Bulk Image Resizer",
    subtitle: "Resize multiple images simultaneously by width, height, or percentage with ZIP export.",
    overview: ["Resize large batches of photographs, signatures, or document scans to exact width/height dimensions or percentage scale in seconds."],
    specs: [{ label: "Modes", value: "Percentage Scale (%) & Target Pixels" }, { label: "Export", value: "ZIP Archive" }],
    steps: [
      { title: "Upload Batch", desc: "Select multiple images." },
      { title: "Set Dimensions", desc: "Choose scale percentage or pixel width." },
      { title: "Resize & Download ZIP", desc: "Click Batch Resize and save ZIP." }
    ],
    tips: ["Lock aspect ratio to prevent stretching."],
    troubleshooting: [{ issue: "Stretched images", fix: "Enable Keep Aspect Ratio option." }],
    faqs: [{ question: "Is batch resizing fast?", answer: "Yes, processes dozens of photos per second in browser." }],
    related: [{ name: "Image Resizer", href: "/tools/image-resizer", desc: "Single Image Resizer" }]
  },

  "passport-photo-maker": {
    title: "Passport Photo Maker",
    subtitle: "Create standard passport size photos (3.5×4.5cm, 2×2in) and 4×6 inch 6-photo printable sheets.",
    overview: [
      "Prepare official passport size photographs for Indian Passport, US Visa, UK/EU, SSC, UPSC, IBPS, and State PSC application forms.",
      "Includes background color replacement (Solid White / Light Blue) and a **4×6 inch printable photo sheet generator** containing 6 passport photo copies ready to print at home or studio."
    ],
    specs: [
      { label: "Presets Included", value: "India Passport (3.5x4.5cm / 413x531px), US Visa (2x2in / 600x600px), UK (35x45mm), PAN Card (213x213px)" },
      { label: "Print Sheet Generator", value: "4x6 Inch Grid (6 Passport Copies at 300 DPI)" },
      { label: "Background Replacer", value: "White, Light Blue, Light Gray" }
    ],
    steps: [
      { title: "Upload Photo", desc: "Upload a clear headshot photo." },
      { title: "Select Country Preset", desc: "Choose India Passport, US Visa, or Exam preset." },
      { title: "Choose Background Tint", desc: "Select Solid White or Light Blue." },
      { title: "Download Photo / Print Sheet", desc: "Download single photo or 4x6 6-photo print sheet." }
    ],
    tips: ["Print 4x6 photo sheet on glossy photo paper at any local printing shop."],
    troubleshooting: [{ issue: "Background tint not clean", fix: "Ensure original photo was taken against a plain light wall." }],
    faqs: [{ question: "Are these dimensions accepted by SSC & UPSC?", answer: "Yes, 3.5×4.5 cm (413×531 px) complies with official SSC and UPSC photo specifications." }],
    related: [{ name: "Background Remover", href: "/tools/background-remover", desc: "Remove photo background" }]
  },

  "image-format-converter": {
    title: "Image Format Converter",
    subtitle: "Convert between JPG, PNG, and WebP formats seamlessly while preserving high quality.",
    overview: ["Convert any image between JPG, PNG, and WebP formats instantly for form compliance and web optimization."],
    specs: [{ label: "Formats Supported", value: "JPG (JPEG), PNG, WEBP" }],
    steps: [
      { title: "Upload Photo", desc: "Select JPG, PNG, or WebP file." },
      { title: "Select Output Format", desc: "Choose target format." },
      { title: "Download File", desc: "Save converted file." }
    ],
    tips: ["Converting PNG to JPG adds a clean white background automatically."],
    troubleshooting: [{ issue: "Lost transparency", fix: "JPG does not support transparency; convert to PNG or WebP to keep transparent background." }],
    faqs: [{ question: "Is quality lost during conversion?", answer: "No, conversions use high quality 0.95 quantization encoding." }],
    related: [{ name: "Image to JPG", href: "/tools/image-to-jpg", desc: "Convert to JPG format" }]
  },

  "image-upscaler": {
    title: "Image Upscaler Online",
    subtitle: "Upscale image resolution by 2x or 4x with bicubic interpolation and edge sharpening.",
    overview: ["Increase low-resolution photograph and document scan dimensions by 200% or 400% with sharp clarity for form uploads."],
    specs: [{ label: "Upscale Ratios", value: "2x (200%) & 4x (400%)" }, { label: "Enhancement", value: "Edge Sharpening Filter" }],
    steps: [
      { title: "Upload Image", desc: "Select low resolution photo." },
      { title: "Choose Scale", desc: "Select 2x or 4x." },
      { title: "Download", desc: "Save high resolution photo." }
    ],
    tips: ["Use 2x for small signatures to meet minimum pixel dimension rules."],
    troubleshooting: [{ issue: "Output looks grainy", fix: "Slightly reduce the edge sharpening filter slider." }],
    faqs: [{ question: "Can it make blurry photos clear?", answer: "Upscaling increases pixel count and sharpens edges significantly." }],
    related: [{ name: "Image Resizer", href: "/tools/image-resizer", desc: "Resize dimensions" }]
  },

  "image-metadata": {
    title: "Image Metadata & EXIF Viewer",
    subtitle: "Inspect camera info, ISO, shutter, date, GPS coordinates, and strip metadata for privacy.",
    overview: ["View detailed EXIF metadata tags inside photos and strip hidden location/camera data before sharing documents online."],
    specs: [{ label: "Tags Read", value: "Dimensions, File Size, Camera Make/Model, ISO, Shutter, GPS Lat/Long" }, { label: "Privacy Action", value: "1-Click Metadata Stripping & Clean Export" }],
    steps: [
      { title: "Upload Photo", desc: "Select photo file." },
      { title: "Inspect EXIF Data", desc: "View camera, date, and GPS location tags." },
      { title: "Strip Metadata", desc: "Click 'Download Cleaned Photo' to remove all tags." }
    ],
    tips: ["Strip GPS tags before uploading personal photos to public forums."],
    troubleshooting: [{ issue: "No EXIF data shown", fix: "Screenshots and messaging app photos have EXIF stripped automatically by apps." }],
    faqs: [{ question: "Does stripping EXIF alter image visual quality?", answer: "No, visual pixel quality remains 100% identical." }],
    related: [{ name: "Blur Image", href: "/tools/blur-image", desc: "Blur sensitive details" }]
  }
};

interface ToolSEOContentProps {
  slug: string;
}

export default function ToolSEOContent({ slug }: ToolSEOContentProps) {
  const config = getToolConfig(slug);
  const data: ToolSEOData = TOOL_SEO_DATABASE[slug] || {
    title: `Complete Guide to ${config.title}`,
    subtitle: config.subtitle,
    overview: [
      `Preparing photos, signatures, and document scans for official Indian recruitment exams (SSC CGL, UPSC, IBPS, NTA NEET/JEE, Railway RRB) requires strict compliance with dimensions, resolution, and KB file size rules.`,
      `Our 100% browser-based ${config.title} allows you to format your files instantly with zero server uploads and 100% data privacy.`
    ],
    specs: [
      { label: "Tool Name", value: config.title },
      { label: "Target Specs", value: config.defaultWidth && config.defaultHeight ? `${config.defaultWidth} × ${config.defaultHeight} px` : config.presetKBs ? `Target ${config.presetKBs[0]} KB` : "Customizable Settings" },
      { label: "Supported Formats", value: "JPG, JPEG, PNG, WEBP, HEIC, BMP" },
      { label: "Processing Type", value: "Local HTML5 Canvas & Web API Engine" },
      { label: "Privacy Guarantee", value: "100% Client-Side (No Server Uploads)" }
    ],
    steps: [
      { title: "Select File", desc: `Upload your photograph, signature, or document scan for ${config.title}.` },
      { title: "Adjust Parameters", desc: config.defaultWidth && config.defaultHeight ? `Set target width to ${config.defaultWidth}px and height to ${config.defaultHeight}px.` : config.presetKBs ? `Adjust compression target slider to ${config.presetKBs[0]}KB.` : "Adjust crop bounds, rotation, DPI, format, or compression level." },
      { title: "Download Result", desc: "Click Download to export your compliant file instantly." }
    ],
    tips: [
      "Always check the official exam notification PDF for exact file size limits in KB and pixel dimensions.",
      "Ensure photos are well lit with a plain white or light blue background.",
      "Keep signatures signed clearly on plain white paper using black or blue ink."
    ],
    troubleshooting: [
      { issue: "File size exceeds portal limit", fix: "Use the target KB slider to reduce file size under the maximum allowed threshold." },
      { issue: "Image appears stretched", fix: "Enable 'Keep Aspect Ratio' option or crop the photo before resizing." }
    ],
    faqs: [
      { question: `Is ${config.title} free to use?`, answer: "Yes, 100% free with unlimited photo processing." },
      { question: "Are my uploaded photos safe?", answer: "Yes! All calculations run strictly inside your local web browser memory. No photos are ever uploaded to external servers." }
    ],
    related: [
      { name: "Image Resizer", href: "/tools/image-resizer", desc: "Resize pixel dimensions" },
      { name: "Image Compressor", href: "/tools/image-compressor", desc: "Compress file size in KB" },
      { name: "Passport Photo Maker", href: "/tools/passport-photo-maker", desc: "Format passport photos" }
    ]
  };

  return (
    <section className="mt-14 pt-10 border-t border-slate-200/90 space-y-10">
      {/* Overview */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {data.title}
        </h2>
        {data.overview.map((paragraph, idx) => (
          <p key={idx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Specifications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden max-w-4xl mx-auto">
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <h3 className="font-extrabold text-sm sm:text-base">
            Technical Specifications & Compliance Matrix
          </h3>
          <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-indigo-200">
            100% Client-Side Engine
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data.specs.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40 w-1/3">{s.label}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How To Use */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <HiOutlineCheckCircle className="w-6 h-6 text-indigo-600" />
          Step-by-Step Guide: How to Use {data.title}
        </h3>
        <ol className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
          {data.steps.map((st, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <strong className="text-slate-900 font-bold block mb-0.5">{st.title}</strong>
                <span className="text-slate-600">{st.desc}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Useful Tips */}
      {data.tips && data.tips.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 max-w-4xl mx-auto text-xs sm:text-sm text-amber-950 space-y-2">
          <h4 className="font-extrabold text-base text-amber-900 flex items-center gap-2">
            <HiOutlineLightBulb className="w-5 h-5 text-amber-600" />
            Pro-Tips for Official Portal Form Submissions
          </h4>
          <ul className="list-disc list-inside space-y-1.5 font-medium text-amber-900/90">
            {data.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Troubleshooting */}
      {data.troubleshooting && data.troubleshooting.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-4xl mx-auto space-y-4">
          <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <HiOutlineExclamationTriangle className="w-5 h-5 text-indigo-600" />
            Troubleshooting & Common Issue Fixes
          </h4>
          <div className="space-y-3 text-xs sm:text-sm">
            {data.troubleshooting.map((tr, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="font-bold text-rose-700 block mb-1">Issue: {tr.issue}</span>
                <span className="text-slate-700 font-medium">Fix: {tr.fix}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Guarantee Banner */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-6 max-w-4xl mx-auto text-xs sm:text-sm text-indigo-950 leading-relaxed">
        <h4 className="font-bold text-base mb-1.5 text-indigo-900 flex items-center gap-2">
          <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600" />
          100% Privacy Guarantee: Local Client-Side Processing
        </h4>
        <p>
          Your privacy is guaranteed. All file transformations, background removals, canvas rendering, EXIF stripping, and PDF conversions execute 100% locally inside your web browser memory using HTML5 Canvas & WebAssembly APIs. Your personal photos, signatures, and document scans are never uploaded to any remote server or stored in any database.
        </p>
      </div>
    </section>
  );
}
