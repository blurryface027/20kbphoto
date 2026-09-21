import { BlogPost } from "./types";

export const articlesGroup4: BlogPost[] = [
  // ARTICLE 16
  {
    slug: "how-to-combine-images-into-one-pdf",
    title: "How to Combine Images Into One PDF",
    description: "Learn how to merge multiple image scans into a single organized PDF document under portal file size limits.",
    category: "PDF & Document Tools",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "When You Need to Combine Multiple Images into One PDF",
        paragraphs: [
          "Online application portals often require multi-page document submissions under a single file attachment link. For example, applicants may need to upload both sides of an Aadhar card, multiple semester marksheets, or full document sets as a single PDF.",
          "Combining individual JPG or PNG photos into a single PDF document ensures all relevant pages stay bundled in correct reading sequence."
        ]
      },
      {
        h2: "Page Order & Layout Considerations",
        paragraphs: [
          "Before merging your images into a PDF file, review these layout rules:"
        ],
        table: {
          caption: "Image Combination Best Practices",
          headers: ["Document Use Case", "Number of Pages", "Recommended Orientation", "Target File Size Limit"],
          rows: [
            ["ID Proof (Aadhar/PAN)", "1 - 2 Pages", "Portrait / Fit to Canvas", "Under 500 KB"],
            ["Academic Marksheets", "3 - 8 Pages", "Standard Portrait A4", "Under 1 MB - 2 MB"],
            ["Certificates & Experience", "2 - 5 Pages", "Portrait A4", "Under 1 MB"]
          ]
        }
      },
      {
        h2: "Step-by-Step Guide: Merging Images into PDF",
        paragraphs: [
          "Follow these steps to merge multiple document images into a single PDF:"
        ],
        orderedList: [
          "Upload Document Photos: Select all JPG/PNG photo files from your device.",
          "Reorder Sequence: Drag images into logical chronological order.",
          "Select Margin & Page Size: Set A4 paper dimensions or auto-fit canvas.",
          "Set Document Compression: Keep total file size below the portal limit.",
          "Download Combined PDF: Save your single merged document."
        ],
        visualChart: {
          type: "steps",
          title: "Multi-Image PDF Combination Flow",
          items: [
            { label: "1. Select Images", sublabel: "Front & Back scans", value: "Photos" },
            { label: "2. Reorder Sequence", sublabel: "Set reading order", value: "Order" },
            { label: "3. Layout Rendering", sublabel: "A4 / Fit canvas", value: "Compile" },
            { label: "4. Unified PDF Output", sublabel: "Single downloadable file", value: "Merged PDF", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Combine Photos to PDF Online",
          text: "Combine multiple photos into a single formatted PDF document quickly in your browser.",
          toolLink: {
            label: "Open Photos to PDF Tool",
            href: "/tools/photos-to-pdf"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Can I combine images with different orientations into one PDF?",
        answer: "Yes. Our tool handles mixed portrait and landscape images cleanly within a single PDF."
      },
      {
        question: "How do I make sure the combined PDF stays under 500KB?",
        answer: "Compress your individual input images before merging them to ensure the output PDF remains lightweight."
      }
    ],
    relatedToolSlugs: [
      { label: "Photos to PDF", href: "/tools/photos-to-pdf", description: "Combine photo batches into PDF" },
      { label: "JPG to PDF", href: "/tools/jpg-to-pdf", description: "Convert JPGs to PDF" },
      { label: "Image Stitcher", href: "/tools/image-stitcher", description: "Stitch multiple images together" }
    ],
    relatedArticleSlugs: [
      "how-to-convert-jpg-to-pdf",
      "how-to-scan-documents-with-your-phone",
      "how-to-convert-pdf-to-jpg"
    ]
  },

  // ARTICLE 17
  {
    slug: "how-to-scan-documents-with-your-phone",
    title: "How to Scan Documents With Your Phone",
    description: "Learn how to turn your smartphone camera into a document scanner to create crisp, shadow-free PDF and JPG scans.",
    category: "Document Preparation",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Turning Your Smartphone into a High-Quality Scanner",
        paragraphs: [
          "Physical desktop document scanners are no longer required to produce clear digital copies of marksheets, certificates, and ID cards. Modern smartphone cameras capture exceptionally sharp images when paired with proper lighting techniques and perspective cropping."
        ]
      },
      {
        h2: "Key Factors for Sharp Document Photography",
        paragraphs: [
          "To capture professional-grade document scans with a smartphone camera, follow these core guidelines:"
        ],
        list: [
          "1. Flat Lighting: Position documents near a window with diffused daylight to eliminate dark shadows cast by your phone or hand.",
          "2. Parallel Angle: Hold your camera directly parallel (90 degrees overhead) to the paper to prevent perspective distortion.",
          "3. Background Contrast: Place light-colored certificates against a dark surface to assist automatic border detection.",
          "4. B&W / Contrast Filter: Apply black & white or document enhancement filters to whiten paper background and darken text ink."
        ],
        table: {
          caption: "Raw Camera Photo vs Enhanced Document Scan Comparison",
          headers: ["Attribute", "Raw Smartphone Camera Photo", "Processed Document Scan", "Impact on Form Verification"],
          rows: [
            ["Lighting & Shadow", "Uneven / Hand shadow cast", "Uniform / Shadow eliminated", "Passes manual inspection"],
            ["Paper Background", "Grey / Yellowish tint", "Crisp White (#FFFFFF)", "Clean professional look"],
            ["Perspective", "Trapezoidal distortion", "Squared A4 edges", "Legible & alignment checked"],
            ["File Weight", "3 MB - 8 MB (Bloated)", "100 KB - 400 KB", "Fits application submission limits"]
          ]
        }
      },
      {
        h2: "Step-by-Step Smartphone Scanning Guide",
        paragraphs: [
          "Follow these steps to scan documents using your mobile phone:"
        ],
        orderedList: [
          "Capture Photo: Place document on a flat surface in good light and photograph overhead.",
          "Upload to Document Scanner Tool: Open your photo in our web document scanner.",
          "Adjust Perspective & Crop: Drag corner handles to align document borders.",
          "Apply Document Enhancer Filter: Select B&W or Grayscale filter to sharpen text.",
          "Export as PDF or JPG: Save your clean scanned file."
        ],
        visualChart: {
          type: "flow",
          title: "Mobile Document Scanning Pipeline",
          items: [
            { label: "Overhead Camera Snap", sublabel: "Raw photo", value: "Capture" },
            { label: "Perspective Skew Fix", sublabel: "Align 4 corners", value: "Crop" },
            { label: "Grayscale / B&W Filter", sublabel: "Whiten background", value: "Filter", highlight: true },
            { label: "Sharp PDF Document", sublabel: "Ready for upload", value: "Scan", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Document Scanner Tool Online",
          text: "Scan, crop, and enhance document photos using our browser-based document scanner.",
          toolLink: {
            label: "Open Document Scanner",
            href: "/tools/document-scanner"
          }
        }
      }
    ],
    faqs: [
      {
        question: "How do I remove phone shadows from document photos?",
        answer: "Stand slightly back and zoom in 2x with your camera lens, or position lighting from the side rather than directly overhead."
      },
      {
        question: "Is a smartphone document scan accepted for government forms?",
        answer: "Yes, provided text lines are clear, borders are cropped square, and background shadows are eliminated."
      }
    ],
    relatedToolSlugs: [
      { label: "Document Scanner", href: "/tools/document-scanner", description: "Scan & enhance document photos" },
      { label: "JPG to PDF", href: "/tools/jpg-to-pdf", description: "Convert document photos to PDF" },
      { label: "Document Image Resizer", href: "/tools/document-image-resizer", description: "Resize document scans" }
    ],
    relatedArticleSlugs: [
      "how-to-combine-images-into-one-pdf",
      "how-to-convert-jpg-to-pdf",
      "how-to-fix-photo-upload-size-errors"
    ]
  },

  // ARTICLE 18
  {
    slug: "how-to-compress-photos-for-websites",
    title: "How to Compress Photos for Websites",
    description: "Learn how to optimize and compress web images to improve page load speed, Core Web Vitals, and user experience.",
    category: "Web Optimization",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Why Image Compression Matters for Web Performance",
        paragraphs: [
          "Unoptimized images are the single largest contributor to slow website page load speeds. Large image files increase bandwidth usage, slow down mobile browsing performance, and negatively impact Google Core Web Vitals metrics such as Largest Contentful Paint (LCP).",
          "Optimizing website images involves selecting modern WebP or JPEG encodings, scaling pixel dimensions to match actual display containers, and removing embedded EXIF data."
        ]
      },
      {
        h2: "Recommended Target Sizes by Web Image Type",
        paragraphs: [
          "Follow these benchmark target sizes for web performance:"
        ],
        table: {
          caption: "Web Image Optimization Targets",
          headers: ["Image Type", "Recommended Max Width", "Target File Size", "Ideal Format"],
          rows: [
            ["Hero / Banner Backgrounds", "1920 px", "120 KB - 200 KB", "WebP or Compressed JPG"],
            ["Article Body Images", "800 px", "40 KB - 80 KB", "WebP or Compressed JPG"],
            ["Card Thumbnails", "400 px", "15 KB - 30 KB", "WebP"],
            ["Icons & Logos", "200 px", "5 KB - 15 KB", "SVG or PNG"]
          ]
        }
      },
      {
        h2: "Step-by-Step Web Image Optimization Workflow",
        paragraphs: [
          "Follow this workflow to prepare images for web publication:"
        ],
        orderedList: [
          "Scale Resolution: Downscale raw camera dimensions to display container limits (e.g. 1920px or 800px).",
          "Remove EXIF Metadata: Strip camera metadata and thumbnail previews.",
          "Convert to WebP: Export as WebP format for 25% to 34% smaller file weight.",
          "Apply Quality Compression: Maintain quality around 80% for visual fidelity.",
          "Batch Process: Use bulk tools to compress image folders efficiently."
        ]
      },
      {
        callout: {
          type: "cta",
          title: "Bulk Web Image Compressor",
          text: "Compress multiple web images in batch directly in your browser with instant ZIP download.",
          toolLink: {
            label: "Open Bulk Compressor",
            href: "/tools/bulk-image-compressor"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Is WebP better than JPEG for websites?",
        answer: "Yes. WebP provides smaller file sizes at equivalent visual quality and is supported by all modern web browsers."
      },
      {
        question: "What compression quality percentage is best for web photos?",
        answer: "80% quality factor provides an optimal balance between low file size and sharp visual clarity."
      }
    ],
    relatedToolSlugs: [
      { label: "Bulk Image Compressor", href: "/tools/bulk-image-compressor", description: "Compress image batches online" },
      { label: "Image Format Converter", href: "/tools/image-format-converter", description: "Convert to WebP & JPG" },
      { label: "Bulk Image Resizer", href: "/tools/bulk-image-resizer", description: "Batch resize web images" }
    ],
    relatedArticleSlugs: [
      "jpg-vs-png-vs-webp",
      "how-to-reduce-image-size-without-losing-quality",
      "how-to-fix-photo-upload-size-errors"
    ]
  },

  // ARTICLE 19
  {
    slug: "how-to-fix-photo-upload-size-errors",
    title: "How to Fix Photo Upload Size Errors",
    description: "A comprehensive troubleshooting guide to resolving common upload error messages on online form portals.",
    category: "Troubleshooting",
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-20",
    readTime: "10 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Understanding Common Form Upload Failures",
        paragraphs: [
          "Few things are more frustrating during online form submissions than running into cryptic error popups like 'File size exceeds maximum limit', 'Dimension mismatch error', or 'Invalid file format'.",
          "Form portals use automated validation scripts to check files before saving them to application databases. Understanding what triggers each specific error message enables you to fix the underlying issue immediately."
        ]
      },
      {
        h2: "Troubleshooting Table: Errors & Instant Solutions",
        paragraphs: [
          "Use this lookup table to diagnose and resolve your upload error:"
        ],
        table: {
          caption: "Form Upload Error Diagnostics & Solutions",
          headers: ["Error Message", "Root Cause", "Corrective Action", "Recommended Tool"],
          rows: [
            ["'File size must be under 50KB'", "File weight is too high (e.g. 120KB)", "Compress JPEG quality to ~80%", "/resize-image-to-50kb"],
            ["'File size is below 10KB minimum'", "File over-compressed (e.g. 6KB)", "Increase JPEG quality to ~85%", "/tools/image-compressor"],
            ["'Width and height dimensions invalid'", "Pixel grid mismatch (e.g. 400x500 vs 200x230)", "Resize to exact requested pixels", "/tools/image-resizer"],
            ["'Invalid file format (.png uploaded)'", "Uploaded transparent or unsupported format", "Convert PNG file to standard JPG", "/tools/png-to-jpg"],
            ["'File corrupted or unreadable'", "Renamed file extension without re-encoding", "Re-export file properly via converter", "/tools/image-format-converter"]
          ]
        }
      },
      {
        h2: "Step-by-Step Error Fixing Sequence",
        paragraphs: [
          "When an upload fails, follow this diagnostic sequence:"
        ],
        orderedList: [
          "Read Exact Error Message: Note whether failure mentions file size (KB), dimensions (pixels), or file format (.jpg).",
          "Check File Format: Ensure file extension is .jpg or .jpeg. If file is .png, convert it to JPG.",
          "Verify Pixel Dimensions: Confirm image width and height match exact portal guidelines.",
          "Adjust KB Size Buffer: Aim for the middle of allowed KB ranges (e.g. 35KB for 20KB-50KB limits).",
          "Clean Filename: Rename file to simple letters like photo.jpg without spaces or symbols."
        ],
        visualChart: {
          type: "flow",
          title: "Form Upload Error Troubleshooting Flow",
          items: [
            { label: "Upload Error Popup", sublabel: "Identify error text", value: "Error" },
            { label: "Format Verification", sublabel: "Convert PNG to JPG", value: "Format" },
            { label: "Dimension Check", sublabel: "Set exact pixels", value: "Pixels" },
            { label: "File Size Check", sublabel: "Target mid KB range", value: "Size", highlight: true },
            { label: "Successful Re-upload", sublabel: "Form accepted", value: "Pass", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Fix Upload Errors Instantly",
          text: "Use 20KB Photo tools to fix format, dimensions, and KB sizes in one click.",
          toolLink: {
            label: "Open All Photo Tools",
            href: "/tools/image-resizer"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Why does my portal say 'Invalid file' when my file extension is .jpg?",
        answer: "If you simply renamed a PNG file to .jpg in File Explorer without re-encoding, internal headers remain PNG. Use our PNG to JPG converter to re-encode the file properly."
      },
      {
        question: "Can special characters in filenames cause upload errors?",
        answer: "Yes. Symbols such as #, $, %, or spaces in filenames can trigger upload script errors. Use simple filenames like photo.jpg."
      }
    ],
    relatedToolSlugs: [
      { label: "Image Compressor", href: "/tools/image-compressor", description: "Fix file size in KB" },
      { label: "Image Resizer", href: "/tools/image-resizer", description: "Fix pixel dimensions" },
      { label: "PNG to JPG Converter", href: "/tools/png-to-jpg", description: "Fix format rejection errors" }
    ],
    relatedArticleSlugs: [
      "how-to-prepare-photos-for-online-forms",
      "how-to-reduce-photo-size-to-20kb",
      "how-to-resize-photos-for-online-forms"
    ]
  },

  // ARTICLE 20
  {
    slug: "how-to-prepare-photos-for-online-forms",
    title: "How to Prepare Photos for Online Forms",
    description: "A master checklist and practical guide for preparing photos and signatures for online applications.",
    category: "Form Preparation",
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-20",
    readTime: "10 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "The Complete Master Preparation Guide",
        paragraphs: [
          "Preparing applicant photographs, signatures, and document scans for online form submissions requires systematic attention to detail. Whether applying for government recruitment exams, bank jobs, university admissions, or passport renewals, following a pre-flight checklist prevents last-minute submission failures."
        ]
      },
      {
        h2: "Master Application Checklist",
        paragraphs: [
          "Complete these verification steps before submitting your files:"
        ],
        table: {
          caption: "Pre-Flight Verification Checklist for Online Application Photos",
          headers: ["Verification Check", "Standard Specification", "Action Required", "Status"],
          rows: [
            ["1. Official Guidelines", "Read exam notification specs", "Confirm target KB & px values", "Mandatory"],
            ["2. Background Canvas", "Solid White or Light Grey", "Remove uneven background", "Mandatory"],
            ["3. Facial Alignment", "Centered portrait, 75% head space", "Crop tightly around face", "Mandatory"],
            ["4. Pixel Dimensions", "e.g. 200×230 px or 350×450 px", "Resize to exact pixel count", "Mandatory"],
            ["5. File Size Weight", "e.g. 20KB - 50KB range", "Compress JPEG quality factor", "Mandatory"],
            ["6. File Extension", ".jpg or .jpeg extension", "Convert PNG or WebP files", "Mandatory"],
            ["7. Simple Filename", "Alphanumeric (e.g. photo.jpg)", "Remove spaces and symbols", "Recommended"]
          ]
        }
      },
      {
        h2: "Step-by-Step Preparation Workflow",
        paragraphs: [
          "Follow this step-by-step pipeline from raw capture to final upload:"
        ],
        orderedList: [
          "Read Notification Specs: Identify required width, height, KB limits, and format.",
          "Capture or Select Source File: Ensure good frontal light and clear face exposure.",
          "Crop & Clean Background: Use background removal tools if necessary to set a white canvas.",
          "Resize to Target Pixels: Set exact width and height dimensions.",
          "Compress File Size: Fine-tune compression to sit comfortably inside KB limits.",
          "Perform Pre-flight Inspection: Check file properties and preview image at 100% scale before uploading."
        ],
        visualChart: {
          type: "steps",
          title: "Master Photo & Signature Preparation Pipeline",
          items: [
            { label: "1. Read Rules", sublabel: "Note px & KB specs", value: "Specs" },
            { label: "2. Clean & Crop", sublabel: "White background", value: "Crop" },
            { label: "3. Set Pixels", sublabel: "Exact dimensions", value: "Resize" },
            { label: "4. Target KB", sublabel: "Compressed JPEG", value: "Compress", highlight: true },
            { label: "5. Upload Ready", sublabel: "Passes validation", value: "Complete", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Complete 20KB Photo Suite",
          text: "Prepare all your photos, signatures, and document scans using 20KB Photo's 100% private, browser-based utility suite.",
          toolLink: {
            label: "Explore All Photo Tools",
            href: "/tools/image-resizer"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Can I prepare all application files on my phone?",
        answer: "Yes. All 20KB Photo tools run entirely in your mobile web browser without requiring app downloads or server file uploads."
      },
      {
        question: "What is the single most common reason for form photo rejection?",
        answer: "Uploading files that exceed the maximum KB size limit or fail exact pixel dimension checks."
      }
    ],
    relatedToolSlugs: [
      { label: "Photo Resizer", href: "/tools/photo-resizer", description: "Resize application photos" },
      { label: "Signature Resizer", href: "/tools/signature-resizer", description: "Resize signature images" },
      { label: "Image Compressor", href: "/tools/image-compressor", description: "Compress file weight in KB" }
    ],
    relatedArticleSlugs: [
      "how-to-fix-photo-upload-size-errors",
      "how-to-resize-photos-for-online-forms",
      "how-to-reduce-photo-size-to-20kb"
    ]
  }
];
