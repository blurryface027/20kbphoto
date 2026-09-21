import { BlogPost } from "./types";

export const articlesGroup2: BlogPost[] = [
  // ARTICLE 6
  {
    slug: "jpg-vs-png-vs-webp",
    title: "JPG vs PNG vs WebP",
    description: "A practical guide comparing JPG, PNG, and WebP image formats for file size, transparency, visual quality, and online form compatibility.",
    category: "Format Conversion",
    publishedAt: "2026-09-17",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Understanding Modern Image Formats",
        paragraphs: [
          "Digital images come in various file formats, each designed for specific technological use cases. Choosing the correct format determines whether your image file will be accepted by an online application portal or rejected due to file size or compatibility issues.",
          "The three most prevalent raster image formats on the web today are JPG (JPEG), PNG, and WebP. Understanding their structural differences helps you select the right format for photos, signatures, documents, and web graphics."
        ]
      },
      {
        h2: "Technical Comparison: JPG vs PNG vs WebP",
        paragraphs: [
          "Here is how the three major image formats compare across critical parameters:"
        ],
        table: {
          caption: "Comprehensive Image Format Comparison Matrix",
          headers: ["Feature / Parameter", "JPG / JPEG", "PNG", "WebP"],
          rows: [
            ["Full Name", "Joint Photographic Experts Group", "Portable Network Graphics", "Web Picture Format (Google)"],
            ["Compression Type", "Lossy", "Lossless", "Both Lossy & Lossless"],
            ["Alpha Transparency", "No (Solid Background Only)", "Yes (Full 8-bit Alpha)", "Yes (Full 8-bit Alpha)"],
            ["Typical File Weight", "Small to Medium", "Large to Very Large", "Very Small (25-34% < JPG)"],
            ["Best Used For", "Real photos, Application forms", "Logos, Icons, Transparent signatures", "Websites, Mobile app assets"],
            ["Online Form Acceptance", "Universal (100% Portals)", "Limited (Often Rejected)", "Very Low (Not supported on forms)"]
          ]
        }
      },
      {
        h2: "Detailed Format Breakdowns",
        paragraphs: [
          "1. JPG / JPEG: Designed specifically for continuous-tone photography. JPG uses lossy Discrete Cosine Transform compression to achieve small file weights. It does not support background transparency; empty pixels are automatically rendered white.",
          "2. PNG: Designed for crisp digital graphics, logos, and line art. PNG uses lossless DEFLATE compression, preserving exact pixels. This makes PNG ideal for signature artwork but results in heavy file sizes for photographs.",
          "3. WebP: Developed by Google as a modern next-generation web format. WebP combines the best features of JPG and PNG—offering tiny file sizes with optional transparency. However, legacy government portals rarely accept .webp file uploads."
        ],
        visualChart: {
          type: "comparison",
          title: "Relative File Size Comparison for Same Photo (350x450px)",
          items: [
            { label: "PNG Format (Lossless)", sublabel: "Preserves full pixel matrix", value: "320 KB" },
            { label: "JPG Format (Standard)", sublabel: "Universal form standard", value: "45 KB", highlight: true },
            { label: "WebP Format (Modern)", sublabel: "Optimal for web loading", value: "28 KB" }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Convert Image Formats Instantly",
          text: "Convert any PNG or WebP file to standard JPG format for hassle-free form submissions.",
          toolLink: {
            label: "Open Format Converter",
            href: "/tools/image-format-converter"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Why do government exam portals prefer JPG over PNG?",
        answer: "JPG files have predictable small file sizes (under 50KB) and lack transparent background channels, preventing black background errors during admit card rendering."
      },
      {
        question: "Can I convert WebP to JPG for online forms?",
        answer: "Yes. Use an online image format converter to convert modern WebP images into standard JPG files."
      }
    ],
    relatedToolSlugs: [
      { label: "Image Format Converter", href: "/tools/image-format-converter", description: "Convert between JPG, PNG & WebP" },
      { label: "PNG to JPG", href: "/tools/png-to-jpg", description: "Convert PNG to clean JPG" },
      { label: "JPG to PNG", href: "/tools/jpg-to-png", description: "Convert JPG to PNG format" }
    ],
    relatedArticleSlugs: [
      "how-to-convert-png-to-jpg",
      "how-to-convert-jpg-to-png",
      "how-to-reduce-image-size-without-losing-quality"
    ]
  },

  // ARTICLE 7
  {
    slug: "how-to-convert-png-to-jpg",
    title: "How to Convert PNG to JPG",
    description: "Learn how to convert PNG images and signatures into crisp JPG files with solid white backgrounds to prevent form upload errors.",
    category: "Format Conversion",
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-20",
    readTime: "8 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Why PNG Files Need Conversion for Online Forms",
        paragraphs: [
          "PNG (Portable Network Graphics) is a popular image format, especially when capturing scanned documents or digital signature cutouts. However, uploading PNG files to recruitment or admission portals frequently results in errors.",
          "There are two primary reasons why PNG files fail on application servers:",
          "1. File Size Bloat: PNG's lossless compression keeps photograph files large (often 200KB to 800KB), making it impossible to satisfy 20KB or 50KB size limits.",
          "2. Transparent Background Glitches: PNG files support transparent backgrounds. When an automated exam server attempts to process a transparent PNG signature, it often turns transparent areas jet black, obscuring the signature entirely."
        ]
      },
      {
        h2: "How PNG to JPG Conversion Handles Backgrounds",
        paragraphs: [
          "JPG files do not support transparency. When you convert a PNG file to JPG using a proper converter, transparent background pixels are automatically replaced with a clean, solid white background (#FFFFFF).",
          "This ensures that signatures, passport photos, and document scans display with sharp dark text against a crisp white background."
        ],
        table: {
          caption: "PNG Source vs Converted JPG Output Comparison",
          headers: ["Property", "Original PNG File", "Converted JPG File", "Impact on Form Upload"],
          rows: [
            ["File Size", "180 KB - 650 KB", "18 KB - 45 KB", "Fits 20KB/50KB limit"],
            ["Background", "Transparent / Alpha", "Solid White Canvas", "Prevents black background bug"],
            ["Compatibility", "Partial Support", "100% Universal Support", "Accepted by all servers"],
            ["Compression", "Lossless", "Lossy (Adjustable)", "Easy to fine-tune KB"]
          ]
        }
      },
      {
        h2: "Step-by-Step Guide to Converting PNG to JPG",
        paragraphs: [
          "Convert your PNG files to JPG quickly with these steps:"
        ],
        orderedList: [
          "Select your PNG image file from your device.",
          "Upload it to our browser-based PNG to JPG converter.",
          "Ensure the converter applies a solid white background to any transparent areas.",
          "Adjust output JPEG quality setting if you need to hit a specific KB limit.",
          "Download your clean .jpg file ready for submission."
        ],
        visualChart: {
          type: "flow",
          title: "PNG to JPG Conversion Flow",
          items: [
            { label: "Transparent PNG File", sublabel: "Large file size", value: "Input" },
            { label: "Canvas Rendering", sublabel: "Flatten alpha layer", value: "Process" },
            { label: "White Background Fill", sublabel: "#FFFFFF canvas", value: "Flatten" },
            { label: "Optimized JPG Output", sublabel: "Small, compatible", value: "Output", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Convert PNG to JPG Now",
          text: "Flatten transparent PNG files and convert them into compatible JPG photos in your browser.",
          toolLink: {
            label: "Convert PNG to JPG Tool",
            href: "/tools/png-to-jpg"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Does converting PNG to JPG lose signature quality?",
        answer: "No. At 85% to 90% JPEG quality, text lines and signature ink strokes remain clear while reducing file size significantly."
      },
      {
        question: "Why can't I just rename .png to .jpg in File Explorer?",
        answer: "Renaming the file extension only changes the filename text; it does not alter internal data structure. Form servers inspect file header signatures and will flag renamed files as invalid."
      }
    ],
    relatedToolSlugs: [
      { label: "PNG to JPG Converter", href: "/tools/png-to-jpg", description: "Convert PNG to JPG instantly" },
      { label: "Image Format Converter", href: "/tools/image-format-converter", description: "Convert between all image formats" },
      { label: "Background Remover", href: "/tools/background-remover", description: "Remove & replace backgrounds" }
    ],
    relatedArticleSlugs: [
      "jpg-vs-png-vs-webp",
      "how-to-convert-jpg-to-png",
      "how-to-resize-a-signature-for-online-forms"
    ]
  },

  // ARTICLE 8
  {
    slug: "how-to-convert-jpg-to-png",
    title: "How to Convert JPG to PNG",
    description: "Learn when and how to convert JPG images to PNG format for high-clarity graphic design, document editing, and transparent background creation.",
    category: "Format Conversion",
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-20",
    readTime: "8 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "When Converting JPG to PNG Makes Sense",
        paragraphs: [
          "While JPG is the standard for continuous photographs and online recruitment forms, PNG is the preferred format for digital graphics, document templates, presentation slides, and graphic design assets.",
          "Converting a JPG photo or document scan to PNG is useful when you plan to crop out a signature or subject and make its background transparent, or when you need to perform repeated photo editing passes without cumulative JPEG compression degradation."
        ]
      },
      {
        h2: "Understanding the Conversion Mechanics",
        paragraphs: [
          "When you convert a JPG file to PNG, the converter reads the lossy JPEG pixel matrix and encapsulates it inside a lossless PNG container. It is important to note that converting JPG to PNG does not automatically create a transparent background—JPG source files possess solid backgrounds that must be isolated using a background removal tool."
        ],
        table: {
          caption: "Comparison of Conversion Properties: JPG to PNG",
          headers: ["Attribute", "Original JPG", "Converted PNG Output", "Notes"],
          rows: [
            ["Compression Mode", "Lossy (DCT)", "Lossless (Deflate)", "Prevents further editing loss"],
            ["Transparency Support", "None (Solid)", "Full Alpha Support", "Enables background isolation"],
            ["File Size", "Smaller", "Larger (1.5x - 3x)", "Normal due to PNG header overhead"],
            ["Editing Resilience", "Degrades on re-save", "Stays crisp on edits", "Ideal for multi-step edits"]
          ]
        }
      },
      {
        h2: "Step-by-Step JPG to PNG Conversion Guide",
        paragraphs: [
          "Follow these simple steps to convert JPG images to PNG format:"
        ],
        orderedList: [
          "Select your JPG photo or image file.",
          "Upload it to our browser-based JPG to PNG converter tool.",
          "Process the file instantly in browser memory.",
          "Download the converted .png file ready for graphic editing or background removal."
        ]
      },
      {
        callout: {
          type: "cta",
          title: "Convert JPG to PNG Tool",
          text: "Transform JPG photographs into lossless PNG files for design editing and document graphics.",
          toolLink: {
            label: "Convert JPG to PNG",
            href: "/tools/jpg-to-png"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Does converting JPG to PNG increase image resolution?",
        answer: "No. Converting format changes data structure, but cannot restore detail that was discarded in original JPEG compression."
      },
      {
        question: "Can I make the background transparent after converting to PNG?",
        answer: "Yes. Once in PNG format, you can use our Background Remover tool to isolate the subject and export a transparent PNG."
      }
    ],
    relatedToolSlugs: [
      { label: "JPG to PNG Converter", href: "/tools/jpg-to-png", description: "Convert JPG to PNG format" },
      { label: "Background Remover", href: "/tools/background-remover", description: "Remove background from images" },
      { label: "Image Format Converter", href: "/tools/image-format-converter", description: "Convert between image formats" }
    ],
    relatedArticleSlugs: [
      "jpg-vs-png-vs-webp",
      "how-to-convert-png-to-jpg",
      "how-to-remove-background-from-a-photo"
    ]
  },

  // ARTICLE 9
  {
    slug: "how-to-make-a-passport-size-photo",
    title: "How to Make a Passport Size Photo",
    description: "Learn how to prepare, frame, crop, and resize passport photos online to meet digital submission standards across official portals.",
    category: "Passport & Photo Tools",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "10 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Essential Requirements for Passport-Style Photos",
        paragraphs: [
          "Passport-style photographs are required for official identity cards, passports, visas, driving licenses, and application forms. While specific dimensions vary across countries and portals, fundamental framing guidelines remain consistent.",
          "Official guidelines require candidate photographs to present a clear, centered frontal view of the face with neutral facial expressions, open eyes, and no heavy shadows or reflections on spectacles."
        ]
      },
      {
        h2: "Passport Photo Dimensions across Organizations",
        paragraphs: [
          "Here is how passport photo dimensions compare across major recruitment and government portals:"
        ],
        table: {
          caption: "Passport Photo Specification Standards",
          headers: ["Portal / Purpose", "Physical Size", "Pixel Dimensions (300 DPI)", "File Size Range", "Background Color"],
          rows: [
            ["Indian Passport / Visa", "3.5 cm × 4.5 cm", "413 × 531 px", "50 KB - 200 KB", "Plain White"],
            ["SSC Recruitment Forms", "3.5 cm × 4.5 cm", "200 × 230 px", "20 KB - 50 KB", "Light / White"],
            ["UPSC Civil Services", "3.5 cm × 4.5 cm", "350 × 350 px (Square)", "20 KB - 300 KB", "Plain White"],
            ["US Visa Application", "2 in × 2 in (5x5cm)", "600 × 600 px", "100 KB - 240 KB", "Plain Off-White"],
            ["PAN Card Application", "2.5 cm × 3.5 cm", "213 × 213 px", "10 KB - 50 KB", "Light Background"]
          ]
        }
      },
      {
        h2: "Step-by-Step Workflow: Creating a Passport Photo",
        paragraphs: [
          "Follow these practical steps to create an application-compliant passport photo at home:"
        ],
        orderedList: [
          "Capture Photo: Stand 4 feet away from a smartphone camera facing even lighting against a plain wall.",
          "Remove Background: If background is uneven, use a background remover to set a clean white canvas.",
          "Frame Head & Shoulders: Crop so face occupies 70% to 80% of vertical height.",
          "Resize Dimensions: Scale to required pixel dimensions (e.g. 350 × 450 px or 200 × 230 px).",
          "Compress File Size: Adjust JPEG quality to fit under the portal limit (20KB or 50KB)."
        ],
        visualChart: {
          type: "steps",
          title: "Passport Photo Creation Flow",
          items: [
            { label: "1. Capture Photo", sublabel: "Even frontal light", value: "Source" },
            { label: "2. Clean Background", sublabel: "Set solid white", value: "Clean" },
            { label: "3. Framing Crop", sublabel: "75% head height", value: "Framed" },
            { label: "4. Resize & Compress", sublabel: "Target px & KB", value: "Ready", highlight: true }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Online Passport Photo Maker",
          text: "Create, crop, frame, and resize your passport photos automatically using our dedicated maker tool.",
          toolLink: {
            label: "Open Passport Photo Maker",
            href: "/tools/passport-photo-maker"
          }
        }
      }
    ],
    faqs: [
      {
        question: "Can I wear glasses in a passport photo?",
        answer: "Glare-free prescription glasses are permitted on some portals, but tinted glasses or sunglasses are strictly prohibited. Plain eyes without glasses are recommended to avoid rejection."
      },
      {
        question: "What background color is best for passport photos?",
        answer: "A solid white (#FFFFFF) or light grey background is universally accepted across all portals."
      }
    ],
    relatedToolSlugs: [
      { label: "Passport Photo Maker", href: "/tools/passport-photo-maker", description: "Create passport photos online" },
      { label: "Background Remover", href: "/tools/background-remover", description: "Replace background with white" },
      { label: "Image Resizer", href: "/tools/image-resizer", description: "Resize to passport pixel specs" }
    ],
    relatedArticleSlugs: [
      "how-to-make-a-passport-photo-sheet",
      "how-to-remove-background-from-a-photo",
      "how-to-resize-photos-for-online-forms"
    ]
  },

  // ARTICLE 10
  {
    slug: "how-to-make-a-passport-photo-sheet",
    title: "How to Make a Passport Photo Sheet",
    description: "Learn how to arrange multiple passport photos on 4x6 or A4 print sheets for easy printing at home or local print shops.",
    category: "Passport & Photo Tools",
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-20",
    readTime: "9 min read",
    author: {
      name: "20KB Photo Team",
      role: "Digital Document Experts"
    },
    sections: [
      {
        h2: "Why Applicants Need Passport Photo Sheets",
        paragraphs: [
          "While online forms require individual digital photo files, physical verification stages require physical printed passport photographs. Purchasing individual photos from commercial studios can be expensive.",
          "Creating a passport photo print sheet allows you to tile 6, 8, 12, or 16 passport photos onto a standard 4 × 6 inch photo paper card, allowing you to print multiple copies at a fraction of the cost."
        ]
      },
      {
        h2: "Grid Layout Specifications for Print Papers",
        paragraphs: [
          "Here is how many passport photos fit on standard printing papers:"
        ],
        table: {
          caption: "Print Sheet Paper Sizes and Photo Yields",
          headers: ["Paper Size", "Dimensions (Inches)", "DPI Resolution", "Standard Photo Yield", "Best For"],
          rows: [
            ["4 × 6 Card", "4 in × 6 in", "300 DPI (1200x1800px)", "8 Photos (2x4 Grid)", "Local photo lab printing"],
            ["5 × 7 Card", "5 in × 7 in", "300 DPI (1500x2100px)", "12 Photos (3x4 Grid)", "Medium volume prints"],
            ["A4 Paper", "8.27 in × 11.69 in", "300 DPI (2480x3508px)", "32 Photos (4x8 Grid)", "Home inkjet printers"]
          ]
        }
      },
      {
        h2: "Step-by-Step Guide to Generating a Photo Sheet",
        paragraphs: [
          "Follow these steps to arrange your passport photo sheet:"
        ],
        orderedList: [
          "Prepare Single Passport Photo: Ensure your single photo is framed and cropped to 3.5cm x 4.5cm proportion.",
          "Select Target Print Paper: Choose 4x6 photo paper for standard photo laboratory printers.",
          "Generate Grid Layout: Stitch 8 copies with cutting margins between individual photos.",
          "Export 300 DPI File: Save the layout as a high-resolution JPEG file.",
          "Print Without Scaling: Select '100% Scale' or 'Actual Size' in printer settings to maintain physical dimensions."
        ],
        visualChart: {
          type: "matrix",
          title: "4x6 Print Sheet Layout Grid (8 Copies)",
          items: [
            { label: "Photo 1", sublabel: "3.5 x 4.5 cm", value: "Row 1" },
            { label: "Photo 2", sublabel: "3.5 x 4.5 cm", value: "Row 1" },
            { label: "Photo 3", sublabel: "3.5 x 4.5 cm", value: "Row 2" },
            { label: "Photo 4", sublabel: "3.5 x 4.5 cm", value: "Row 2" }
          ]
        }
      },
      {
        callout: {
          type: "cta",
          title: "Passport Photo Maker Tool",
          text: "Use our passport tools to format photos and generate print sheets effortlessly.",
          toolLink: {
            label: "Open Passport Tool",
            href: "/tools/passport-photo-maker"
          }
        }
      }
    ],
    faqs: [
      {
        question: "What paper type is best for passport photo sheets?",
        answer: "Glossy or semi-gloss photo paper (200+ GSM weight) produces sharp prints with vibrant color reproduction."
      },
      {
        question: "Why did my printed photo turn out smaller than 3.5cm x 4.5cm?",
        answer: "Ensure your printer dialog is set to 'Actual Size' or '100% Scale' rather than 'Fit to Page', which shrinks graphics."
      }
    ],
    relatedToolSlugs: [
      { label: "Passport Photo Maker", href: "/tools/passport-photo-maker", description: "Create single & grid passport photos" },
      { label: "Image Stitcher", href: "/tools/image-stitcher", description: "Combine multiple images into grids" },
      { label: "Change Image DPI", href: "/tools/change-image-dpi", description: "Set 300 DPI resolution for print" }
    ],
    relatedArticleSlugs: [
      "how-to-make-a-passport-size-photo",
      "how-to-remove-background-from-a-photo",
      "how-to-convert-jpg-to-pdf"
    ]
  }
];
