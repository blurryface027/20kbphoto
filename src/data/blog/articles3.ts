import { BlogPost } from "./types";

export const articlesGroup3: BlogPost[] = [
  // ARTICLE 11
  {
    slug: "how-to-resize-photos-for-online-forms",
    title: "How to Resize Photos for Online Forms",
    description: "A complete practical guide to preparing candidate photos for state, central, and entrance exam forms without upload errors.",
    category: "Form Preparation",
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Understanding Online Form Image Constraints",
        paragraphs: [
          "Submitting photos to online recruitment and entrance application portals requires satisfying multiple automated validation checks simultaneously. If an uploaded photo fails even a single validation parameter—such as pixel width, height, aspect ratio, file size in KB, or file extension—the portal blocks registration.",
          "Understanding how automated portal scripts evaluate uploaded image files helps you prepare compliant files on your first try."
        ]
      },
      {
        h2: "The 4 Core Validation Layers",
        paragraphs: [
          "Automated application servers inspect four primary layers when evaluating candidate uploads:"
        ],
        list: [
          "1. File Format Layer: Verifies that the file header matches allowed extensions (e.g. .jpg or .jpeg).",
          "2. File Weight (KB) Layer: Confirms file size sits strictly within minimum and maximum thresholds (e.g. 20KB to 50KB).",
          "3. Pixel Dimension Layer: Validates that exact width and height pixels match portal guidelines (e.g. 200 × 230 px).",
          "4. Aspect Ratio & Framing: Ensures candidate face features are framed correctly without distortion."
        ],
        table: {
          caption: "Photo Specifications Across Popular National Portals",
          headers: ["Exam / Board", "Photo Dimensions", "File Size Limit", "Allowed Formats", "Special Notes"],
          rows: [
            ["SSC (CGL, CHSL, GD)", "200 × 230 px", "20 KB - 50 KB", "JPG / JPEG", "Name & date overlay if required"],
            ["UPSC CSE / NDA", "350 × 350 px", "20 KB - 300 KB", "JPG / JPEG", "Square aspect ratio mandatory"],
            ["IBPS (PO, Clerk)", "200 × 230 px", "20 KB - 50 KB", "JPG / JPEG", "Light background"],
            ["RRB Railway Exams", "320 × 240 px", "20 KB - 50 KB", "JPG / JPEG", "Clear face without cap"],
            ["NEET / NTA Exams", "350 × 450 px", "10 KB - 200 KB", "JPG / JPEG", "Postcard photo option required"]
          ]
        }
      },
      {
        h2: "Step-by-Step Photo Preparation Pipeline",
        paragraphs: [
          "Follow this sequence to ensure your candidate photo passes portal validation:"
        ],
        orderedList: [
          "Crop Extra Space: Crop unnecessary margins above head and below shoulders.",
          "Clean Background: Ensure solid light or white background canvas.",
          "Resize Dimensions: Input exact pixel dimensions mandated in official guidelines.",
          "Compress File Weight: Tune compression percentage to hit the exact target KB range.",
          "Rename File Correctly: Use simple alphanumeric filenames like photo.jpg without special characters."
        ],
        visualChart: {
          type: "flow",
          title: "Online Form Photo Preparation Pipeline",
          items: [
            { label: "Original Camera Capture", sublabel: "Raw 5MB file", value: "Step 1" },
            { label: "Crop & Framing", sublabel: "3.5:4.5 ratio", value: "Step 2" },
            { label: "Dimension Resizing", sublabel: "Set exact px", value: "Step 3" },
            { label: "File Compression", sublabel: "Target KB range", value: "Step 4", highlight: true },
            { label: "Final Pre-flight Check", sublabel: "Ready for upload", value: "Pass" }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Resize Photo for Online Forms",
          text: "Use our versatile photo resizer tool to adjust width, height, and file weight for any portal.",
          toolLink: {
            label: "Open Photo Resizer Tool",
            href: "/tools/photo-resizer"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Why does the portal say 'Dimension mismatch' when file size is correct?",
        answer: "Portals check pixel width and height independently of file weight. Use an exact dimension resizer to adjust width and height."
      },
      {
        question: "Should I add name and date to my photo?",
        answer: "Check current official guidelines. If required, use our photo date overlay tools to add applicant name and photograph date clearly."
      }
    ],
    relatedToolSlugs: [
      { label: "Photo Resizer", href: "/tools/photo-resizer", description: "Resize photos for online applications" },
      { label: "Image Compressor", href: "/tools/image-compressor", description: "Compress photo file size" },
      { label: "Background Remover", href: "/tools/background-remover", description: "Clean photo background" }
    ],
    relatedArticleSlugs: [
      "how-to-resize-a-signature-for-online-forms",
      "how-to-fix-photo-upload-size-errors",
      "how-to-prepare-photos-for-online-forms"
    ]
  },

  // ARTICLE 12
  {
    slug: "how-to-resize-a-signature-for-online-forms",
    title: "How to Resize a Signature for Online Forms",
    description: "Learn how to capture, crop, clean, resize, and compress signature images for official exam and recruitment applications.",
    category: "Form Preparation",
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Special Rules for Digital Signature Uploads",
        paragraphs: [
          "Signature uploads follow stricter validation rules than candidate photographs. Because signatures consist of thin dark ink lines against a white paper background, poor lighting, shadow cast, or transparent background glitches can render them illegible.",
          "Most recruitment guidelines require signatures to be signed in black or dark blue ink on clean white unlined paper, cropped tightly in a landscape aspect ratio, and saved under 20KB."
        ]
      },
      {
        h2: "Common Signature Specifications Across Exams",
        paragraphs: [
          "Here are standard signature image requirements across major boards:"
        ],
        table: {
          caption: "Signature Dimension & KB Specs Across Official Portals",
          headers: ["Recruitment Board", "Required Dimensions", "File Size Range", "Ink Color Rule", "Aspect Ratio"],
          rows: [
            ["SSC (CGL, CHSL, MTS)", "140 × 60 px", "10 KB - 20 KB", "Black or Dark Blue", "7 : 3 Landscape"],
            ["IBPS (PO, Clerk, RRB)", "140 × 60 px", "10 KB - 20 KB", "Black Ink Preferred", "7 : 3 Landscape"],
            ["UPSC CSE", "350 × 350 px or 140 × 60 px", "20 KB - 300 KB", "Black Ink", "Square / Landscape"],
            ["SBI PO / Clerk", "140 × 60 px", "10 KB - 20 KB", "Black Ink Only", "7 : 3 Landscape"],
            ["State PSCs", "140 × 60 px to 200 × 80 px", "10 KB - 20 KB", "Dark Ink", "Landscape"]
          ]
        }
      },
      {
        h2: "Step-by-Step Signature Preparation Guide",
        paragraphs: [
          "Follow these steps to turn a paper signature into an application-compliant image file:"
        ],
        orderedList: [
          "Sign on Unlined Paper: Use a dark black gel or ballpoint pen on plain white paper.",
          "Capture Under Good Light: Take a clear photo using your smartphone without casting hand shadows.",
          "Crop Tightly: Remove extra paper margins, leaving a narrow white border around ink strokes.",
          "Resize to Exact Pixels: Set width to 140px and height to 60px (or target specs).",
          "Compress Under 20KB: Tune JPEG compression so file weight sits between 10KB and 20KB."
        ],
        visualChart: {
          type: "steps",
          title: "Signature Preparation Workflow",
          items: [
            { label: "1. Ink on Paper", sublabel: "Black ink on white paper", value: "Capture" },
            { label: "2. Tight Crop", sublabel: "Remove margins", value: "Crop" },
            { label: "3. Set 140x60px", sublabel: "Landscape grid", value: "Resize", highlight: true },
            { label: "4. Target < 20KB", sublabel: "Compressed JPEG", value: "Output", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Instant Signature Resizer Tool",
          text: "Crop, resize, and compress your signature to 140x60 pixels and under 20KB in seconds.",
          toolLink: {
            label: "Open Signature Resizer",
            href: "/tools/signature-resizer"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Can I sign using a blue pen?",
        answer: "Dark blue ink is accepted on most portals, but black ink provides higher contrast and is universally recommended."
      },
      {
        question: "Why did my signature background turn grey or yellow?",
        answer: "Shadows during photo capture cause grey backgrounds. Use our crop and contrast tools to boost white background brightness."
      }
    ],
    relatedToolSlugs: [
      { label: "Signature Resizer", href: "/tools/signature-resizer", description: "Resize signature to exact pixels" },
      { label: "140x60 Signature Tool", href: "/signature-resizer-140x60", description: "Instant 140x60 signature resizer" },
      { label: "Signature Compressor", href: "/tools/signature-compressor", description: "Compress signature to under 20KB" }
    ],
    relatedArticleSlugs: [
      "how-to-resize-photos-for-online-forms",
      "how-to-reduce-photo-size-to-20kb",
      "how-to-convert-png-to-jpg"
    ]
  },

  // ARTICLE 13
  {
    slug: "how-to-remove-background-from-a-photo",
    title: "How to Remove Background From a Photo",
    description: "Learn how to isolate subjects and replace busy image backgrounds with solid white or transparent canvases for official application photos.",
    category: "Image Editing",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Why Clean Backgrounds Are Mandatory for ID Photos",
        paragraphs: [
          "Official application guidelines for passports, visas, and recruitment examinations strictly prohibit busy, patterned, or dark backgrounds. Uploading a photograph taken in front of curtains, doors, or outdoor foliage usually results in application rejection.",
          "Background removal technology isolates the candidate's portrait from background elements and renders a crisp, solid white or light neutral canvas."
        ]
      },
      {
        h2: "Transparent PNG vs Solid White JPG",
        paragraphs: [
          "When removing backgrounds, it is crucial to understand the output format requirements:"
        ],
        list: [
          "Transparent PNG Export: Useful for graphic design, badges, and document composition where the image is placed over existing artwork.",
          "Solid White JPG Export: Required for official application forms. Replacing background pixels with solid white (#FFFFFF) and exporting as JPG ensures universal form portal acceptance."
        ],
        table: {
          caption: "Background Removal Canvas Options",
          headers: ["Export Choice", "Canvas Result", "File Format", "Form Submission Suitability"],
          rows: [
            ["Solid White Canvas", "#FFFFFF White Fill", "JPG / JPEG", "100% Mandatory for application forms"],
            ["Transparent Canvas", "Alpha Channel", "PNG", "Graphics design & document templates"],
            ["Light Grey Canvas", "#E5E7EB Light Grey", "JPG / JPEG", "Accepted on select passport portals"]
          ]
        }
      },
      {
        h2: "Step-by-Step Background Removal Process",
        paragraphs: [
          "Follow these steps to clean your photograph background:"
        ],
        orderedList: [
          "Upload Photo: Select your portrait photograph.",
          "Automatic Edge Detection: The browser engine detects subject contours and isolates hair and shoulders.",
          "Choose Background Fill: Select Solid White (#FFFFFF) for official application forms.",
          "Crop & Center Portrait: Adjust framing so head occupies ~75% of vertical space.",
          "Export as Optimized JPG: Save your compliant photo."
        ],
        visualChart: {
          type: "flow",
          title: "Background Removal Workflow",
          items: [
            { label: "Original Portrait", sublabel: "Uneven background", value: "Input" },
            { label: "Subject Isolation", sublabel: "Contour detection", value: "Process" },
            { label: "Solid White Fill", sublabel: "#FFFFFF canvas", value: "Canvas", highlight: true },
            { label: "Application Photo", sublabel: "Compliant JPG", value: "Output", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Remove Photo Background Online",
          text: "Isolate your portrait and generate a clean white background photo directly in your web browser.",
          toolLink: {
            label: "Open Background Remover",
            href: "/tools/background-remover"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Does background removal work on mobile camera photos?",
        answer: "Yes. Browser-based background removal works cleanly across desktop computers and mobile devices."
      },
      {
        question: "Will my uploaded photo be stored on a server?",
        answer: "No. Our tools process images 100% locally inside your browser memory for maximum privacy."
      }
    ],
    relatedToolSlugs: [
      { label: "Background Remover", href: "/tools/background-remover", description: "Remove & replace image backgrounds" },
      { label: "Passport Photo Maker", href: "/tools/passport-photo-maker", description: "Create passport photos" },
      { label: "Image Format Converter", href: "/tools/image-format-converter", description: "Convert image formats" }
    ],
    relatedArticleSlugs: [
      "how-to-make-a-passport-size-photo",
      "how-to-convert-png-to-jpg",
      "how-to-prepare-photos-for-online-forms"
    ]
  },

  // ARTICLE 14
  {
    slug: "how-to-convert-jpg-to-pdf",
    title: "How to Convert JPG to PDF",
    description: "Learn how to convert single or multiple JPG images into clean, formatted PDF documents for official submissions.",
    category: "PDF & Document Tools",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "8 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Why Application Forms Require PDF Documents",
        paragraphs: [
          "While photo and signature uploads require JPG image files, identity proofs (Aadhar card, PAN card), academic marksheets, degree certificates, and experience letters usually require PDF document format.",
          "PDF (Portable Document Format) preserves page orientation, multi-page layout structure, and document scaling across all operating systems and devices, preventing layout shifting during portal review."
        ]
      },
      {
        h2: "Single Page vs Multi-Page PDF Conversion",
        paragraphs: [
          "Depending on document type, you may need single-page or multi-page PDF files:"
        ],
        table: {
          caption: "PDF Document Preparation Guidelines",
          headers: ["Document Type", "Page Structure", "Target PDF Size", "Recommended Layout"],
          rows: [
            ["Single Marksheet / Certificate", "1 Page PDF", "100 KB - 500 KB", "Portrait A4 Layout"],
            ["Aadhar Card (Front & Back)", "1 Page or 2 Page PDF", "200 KB - 1 MB", "Portrait / Landscape Fit"],
            ["Semester Marksheets (Multiple)", "Multi-Page PDF", "500 KB - 2 MB", "Sequential Multi-Page"]
          ]
        }
      },
      {
        h2: "Step-by-Step JPG to PDF Conversion Guide",
        paragraphs: [
          "Follow these steps to convert JPG images to PDF format:"
        ],
        orderedList: [
          "Select JPG Files: Choose your document photograph or scan files.",
          "Arrange Page Order: Drag files into logical reading sequence.",
          "Select Page Size & Margins: Choose A4 paper format or Fit to Image dimensions.",
          "Apply Compression: Ensure total PDF size stays under required portal thresholds.",
          "Generate & Download PDF: Save your compiled PDF file."
        ],
        visualChart: {
          type: "flow",
          title: "JPG to PDF Conversion Flow",
          items: [
            { label: "JPG Document Images", sublabel: "Single or multiple", value: "Input" },
            { label: "Sequence & Alignment", sublabel: "Page ordering", value: "Arrange" },
            { label: "PDF Page Rendering", sublabel: "A4 formatting", value: "Compile" },
            { label: "Formatted PDF Document", sublabel: "Ready for upload", value: "PDF Output", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Convert JPG to PDF Online",
          text: "Convert your document images into a formatted PDF file instantly inside your browser.",
          toolLink: {
            label: "Open JPG to PDF Tool",
            href: "/tools/jpg-to-pdf"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Can I combine front and back of an ID card into one PDF?",
        answer: "Yes. You can upload both JPG images and compile them into a single 2-page or 1-page combined PDF document."
      },
      {
        question: "How do I compress PDF file size?",
        answer: "Resize and compress input JPG images before generating the PDF file to keep final PDF file weight small."
      }
    ],
    relatedToolSlugs: [
      { label: "JPG to PDF", href: "/tools/jpg-to-pdf", description: "Convert JPG images to PDF file" },
      { label: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert any image format to PDF" },
      { label: "Photos to PDF", href: "/tools/photos-to-pdf", description: "Combine photo batches into PDF" }
    ],
    relatedArticleSlugs: [
      "how-to-convert-pdf-to-jpg",
      "how-to-combine-images-into-one-pdf",
      "how-to-scan-documents-with-your-phone"
    ]
  },

  // ARTICLE 15
  {
    slug: "how-to-convert-pdf-to-jpg",
    title: "How to Convert PDF to JPG",
    description: "Learn how to extract high-resolution JPG image files from single or multi-page PDF documents online.",
    category: "PDF & Document Tools",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "8 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Why Convert PDF Documents to JPG Images?",
        paragraphs: [
          "While PDF is a standard document distribution format, application form fields frequently demand JPG or PNG image files for document previewing.",
          "Converting PDF pages back into JPG images allows you to extract individual certificates, passport scans, or marksheet pages so they can be cropped, resized, and uploaded into image-only form fields."
        ]
      },
      {
        h2: "Resolution & DPI Choices for PDF Extraction",
        paragraphs: [
          "When extracting JPG images from PDF files, selecting correct rendering resolution prevents text blurriness:"
        ],
        table: {
          caption: "Resolution Presets for PDF Page Rendering",
          headers: ["Rendering Resolution", "Output Dimensions", "File Size Range", "Best Used For"],
          rows: [
            ["150 DPI (Standard)", "~1240 × 1754 px", "150 KB - 400 KB", "General form previews & document fields"],
            ["300 DPI (High Quality)", "~2480 × 3508 px", "800 KB - 2.5 MB", "Print reproduction & detailed certificates"],
            ["72 DPI (Low Res)", "~595 × 842 px", "40 KB - 100 KB", "Small web thumbnail previews"]
          ]
        }
      },
      {
        h2: "Step-by-Step PDF to JPG Extraction Guide",
        paragraphs: [
          "Follow these steps to extract JPG images from your PDF files:"
        ],
        orderedList: [
          "Upload PDF Document: Select your PDF file.",
          "Select Target Pages: Choose to extract specific pages or all pages.",
          "Select Rendering Resolution: Choose 150 DPI or 300 DPI for sharp text.",
          "Render Canvas & Download: Save extracted high-clarity JPG images."
        ]
      },
      {
        callout: {
          type: "cta",
          title: "Convert PDF to JPG Online",
          text: "Extract sharp, clear JPG images from your PDF documents in seconds without server uploads.",
          toolLink: {
            label: "Open PDF to JPG Tool",
            href: "/tools/pdf-to-jpg"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Will extracting JPG from PDF make text blurry?",
        answer: "Selecting 150 DPI or 300 DPI rendering ensures text lines remain crisp and readable."
      },
      {
        question: "Can I convert password-protected PDF files?",
        answer: "You must unlock the PDF file by entering its password before rendering images."
      }
    ],
    relatedToolSlugs: [
      { label: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF pages to JPG images" },
      { label: "PDF to Image", href: "/tools/pdf-to-image", description: "Extract images from PDF files" },
      { label: "Document Scanner", href: "/tools/document-scanner", description: "Enhance scanned document photos" }
    ],
    relatedArticleSlugs: [
      "how-to-convert-jpg-to-pdf",
      "how-to-combine-images-into-one-pdf",
      "how-to-scan-documents-with-your-phone"
    ]
  }
];
