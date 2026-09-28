import { BlogPost } from "./types";

export const articlesGroup3: BlogPost[] = [
  // ==========================================
  // ARTICLE 11: How to Resize Photos for Online Forms
  // ==========================================
  {
    slug: "how-to-resize-photos-for-online-forms",
    title: "How to Resize Photos for Online Forms",
    description:
      "A comprehensive, practical guide to preparing applicant photographs for government forms, job portals, and entrance exams: meet pixel dimensions, file size limits, and formatting rules.",
    category: "Form Preparation",
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-28",
    readTime: "12 min read",
    author: {
      name: "20KB Photo Editorial Team",
      role: "Digital Document Specialists",
    },
    sections: [
      {
        h2: "Why Online Application Forms Are So Strict About Photos",
        paragraphs: [
          "Whether applying for civil service examinations (UPSC, SSC), state public service commissions, banking recruitment (IBPS, SBI), university entrance portals (JEE, NEET), or passport renewals, candidates must submit digital photographs that satisfy rigorous technical specifications.",
          "Application portal upload forms are governed by automated algorithmic validators. If a portal requires a file between 20KB and 50KB with dimensions of exactly [200 × 230 pixels](/image-resizer-200x230), an upload measuring 50.2KB or 205 × 230 pixels will be rejected instantly by backend validation scripts.",
          "These automated checks exist for concrete administrative reasons: photos are programmatically merged into admit cards, attendance registers, and biometric gate verification systems. An improperly sized photo can break automated PDF layout scripts or result in illegible prints on exam hall tickets. Mastering form photo preparation guarantees smooth, error-free registration.",
        ],
      },
      {
        h2: "The Three Core Parameters of Form Photo Compliance",
        paragraphs: [
          "Every recruitment notification defines three distinct parameters for photograph submissions:",
          "**1. File Weight (Kilobytes)**: Typically defined as an acceptable size window (e.g., '10KB to 20KB', '20KB to 50KB', or 'under 100KB'). The file must stay within both the minimum and maximum boundaries.",
          "**2. Spatial Dimensions (Pixels)**: Specifies width and height in pixels (e.g., [200 × 230 px](/image-resizer-200x230), [275 × 354 px](/image-resizer-275x354), or [350 × 450 px](/image-resizer-350x450)). Both dimensions must match the official notification.",
          "**3. Container Format**: Almost universally restricted to standard JPEG (`.jpg` or `.jpeg`). Formats like PNG, GIF, BMP, TIFF, and WebP are routinely rejected.",
        ],
        table: {
          caption: "Photo Specifications Across Leading Indian Examination Portals",
          headers: [
            "Recruitment / Exam Board",
            "Target Dimensions (Pixels)",
            "Allowed File Size (KB)",
            "Mandatory Format",
            "Background Rule",
          ],
          rows: [
            ["SSC Recruitment (CGL, CHSL, MTS)", "200 × 230 px", "20 KB to 50 KB", "JPG / JPEG", "Light / White Plain Background"],
            ["UPSC Civil Services & Engineering", "350 × 350 px (Min) - 1000px (Max)", "20 KB to 300 KB", "JPG / JPEG", "White or Plain Light Backdrop"],
            ["IBPS & SBI Banking Recruitment", "200 × 230 px", "20 KB to 50 KB", "JPG / JPEG", "White Preferred (Light plain)"],
            ["State PSC Standard Applications", "275 × 354 px", "20 KB to 50 KB", "JPG / JPEG", "Plain White Background"],
            ["Railway Recruitment Boards (RRB)", "320 × 400 px", "20 KB to 50 KB", "JPG / JPEG", "Plain White Background"],
            ["NTA Entrance Exams (NEET / JEE)", "4:5 Aspect Ratio (350x450 px)", "10 KB to 200 KB", "JPG / JPEG", "White Background with 80% Face"],
          ],
        },
      },
      {
        h2: "Step-by-Step Guide: How to Prepare Your Photo for Any Form",
        paragraphs: [
          "Follow this foolproof 5-step preparation process:",
        ],
        orderedList: [
          "**Step 1: Crop the Portrait Proportions**: Start with an [image cropper](/tools/image-cropper). Crop closely around your head and upper shoulders, leaving a clean 5% to 10% breathing space above your hair. Ensure your face occupies between 65% and 75% of the total canvas height.",
          "**Step 2: Ensure a Clean White Background**: If your photo has background shadows, furniture, or textured walls, use our [background remover](/tools/background-remover) to replace the backdrop with clean, uniform studio white.",
          "**Step 3: Resize to Required Exact Pixels**: Input the exact width and height specified in your exam notification into our [image resizer tool](/tools/image-resizer) (e.g., [200 × 230 px](/image-resizer-200x230)).",
          "**Step 4: Compress to the Safe Size Window**: Use our [50KB image compressor](/resize-image-to-50kb) or [20KB image compressor](/resize-image-to-20kb) to compress the file into the safe middle of the required window (e.g., 35KB for a 20KB-50KB limit).",
          "**Step 5: Verify Metadata and File Properties**: Before uploading, check the saved file on your device. Verify that the file name has no special characters (use simple names like `photo.jpg`) and that the file size is verified under 'Properties'.",
        ],
        visualChart: {
          type: "flow",
          title: "Online Form Photo Preparation Pipeline",
          description: "End-to-end workflow from original mobile photo to validated form upload",
          items: [
            { label: "Original Portrait", sublabel: "Clear lighting, no filters", value: "Step 1" },
            { label: "Background Check", sublabel: "Replace with solid white", value: "Step 2", highlight: true },
            { label: "Exact Resizing", sublabel: "e.g., 200x230 pixels", value: "Step 3", highlight: true },
            { label: "Compress to Window", sublabel: "e.g., 35 KB (20-50KB)", value: "Step 4" },
            { label: "Upload Verification", sublabel: "Clean upload without errors", value: "Ready" },
          ],
        },
      },
      {
        h2: "Mobile vs Desktop Preparation Workflows",
        paragraphs: [
          "Depending on your setup, the preparation workflow requires subtle adjustments:",
          "**On Mobile Smartphones**: Modern smartphone cameras automatically capture in high dynamic range (HDR) with high pixel counts (often 3000 × 4000 pixels or larger). Taking a screenshot of the photo in your gallery is a mistake: screenshots capture the entire screen resolution, introduce black letterbox bars, and save in heavy PNG format. Instead, upload your original camera file directly into our mobile-friendly [image resizer](/tools/image-resizer), which strips camera metadata, downscales canvas dimensions, and exports a lightweight JPEG directly to your downloads folder.",
          "**On Desktop (Windows & macOS)**: Desktop workflows allow you to inspect the photo at 100% zoom scale on a large monitor to confirm that facial contours, pupils, and collar edges are crisp. You can right-click the file to inspect exact byte counts in Windows Properties before uploading.",
        ],
      },
      {
        h2: "Troubleshooting Common Upload Errors",
        paragraphs: [
          "If you encounter an error when submitting your photo, use this diagnostic guide:",
        ],
        table: {
          caption: "Common Form Upload Errors and Proven Fixes",
          headers: ["Portal Error Message", "Underlying Cause", "Immediate Solution"],
          rows: [
            [
              "'File size must be between 20KB and 50KB'",
              "File is either below 20KB or over 50KB",
              "Use our 50KB compressor to target approximately 35KB",
            ],
            [
              "'Invalid dimensions: Expected 200x230 px'",
              "Width or height is off by even 1 pixel",
              "Enter exact dimensions in our 200x230 image resizer",
            ],
            [
              "'Invalid file format: Only JPG accepted'",
              "Uploaded a PNG, WebP, or renamed file",
              "Convert properly using our PNG to JPG converter",
            ],
            [
              "'File name contains invalid characters'",
              "File name has spaces, hyphens, or symbols",
              "Rename the file to a simple word like 'photo.jpg'",
            ],
          ],
        },
        callout: {
          type: "cta",
          title: "All-in-One Form Photo Resizer",
          text: "Preparing your photo for a competitive exam or job form? Use our dedicated [photo resizer tool](/tools/photo-resizer) to set dimensions, crop aspect ratios, and hit exact file size limits in one click.",
          toolLink: {
            label: "Open Photo Resizer",
            href: "/tools/photo-resizer",
          },
        },
      },
    ],
    faqs: [
      {
        question: "Can I use the same photo for multiple government exam forms?",
        answer:
          "Yes, provided the photo meets the specific dimension and file size requirements of each portal. However, many exams (like SSC and UPSC) require photographs taken within the preceding 3 months, and some require printing your name and date on the photo.",
      },
      {
        question: "How do I add my name and date of photo (DOB/DOP) to the image?",
        answer:
          "Many exams (such as SSC or state police recruitment) require the candidate's name and date of photograph to be printed at the bottom of the photo. You can use our specialized [add name and date to photo tool](/add-name-and-date-to-photo) to overlay this text cleanly.",
      },
      {
        question: "Why does the portal say my file is invalid even though it ends in .jpg?",
        answer:
          "If you manually renamed a PNG file to `.jpg` by typing a new extension, the file remains a PNG internally. The server detects the MIME type mismatch and rejects it. Convert it using an authentic [PNG to JPG converter](/tools/png-to-jpg).",
      },
      {
        question: "Can I upload a photo with spectacles?",
        answer:
          "Most major recruitment boards now prohibit spectacles because lens reflections and thick frames obscure the eyes during biometric scanning. Unless medically exempt, remove glasses before taking your photo.",
      },
      {
        question: "Is a white background mandatory for all forms?",
        answer:
          "Over 90% of exam portals mandate a plain white or very light background. Dark, patterned, or textured backdrops are common reasons for application rejection. Use our [background remover](/tools/background-remover) to ensure compliance.",
      },
      {
        question: "What is the difference between DOP and DOB on application photos?",
        answer:
          "DOB refers to your Date of Birth, whereas DOP refers to the Date of Photograph (the exact calendar day the photo was captured). Many exams (like SSC) mandate printing the DOP to confirm the picture is recent.",
      },
    ],
    relatedToolSlugs: [
      {
        name: "Photo Resizer",
        href: "/tools/photo-resizer",
        description: "Resize photos for official documents and exams with dimension and KB controls.",
        icon: "HiOutlineCamera",
      },
      {
        name: "200x230 Image Resizer",
        href: "/image-resizer-200x230",
        description: "Exact 200 × 230 pixel resizer calibrated for SSC and IBPS portals.",
        icon: "HiOutlinePhoto",
      },
      {
        name: "Add Name & Date to Photo",
        href: "/add-name-and-date-to-photo",
        description: "Add mandatory name and date of photo (DOP) text bar to your application headshot.",
        icon: "HiOutlinePencilSquare",
      },
    ],
    relatedArticleSlugs: [
      "how-to-resize-a-signature-for-online-forms",
      "how-to-prepare-photos-for-online-forms",
      "how-to-fix-photo-upload-size-errors",
      "how-to-reduce-photo-size-to-20kb",
    ],
  },

  // ==========================================
  // ARTICLE 12: How to Resize a Signature for Online Forms
  // ==========================================
  {
    slug: "how-to-resize-a-signature-for-online-forms",
    title: "How to Resize a Signature for Online Forms",
    description:
      "A step-by-step tutorial on preparing, scanning, cropping, resizing, and compressing digital signatures to meet strict online form upload criteria.",
    category: "Signature Resizing",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-28",
    readTime: "12 min read",
    author: {
      name: "20KB Photo Editorial Team",
      role: "Digital Document Specialists",
    },
    sections: [
      {
        h2: "The Unique Challenges of Digital Signature Uploads",
        paragraphs: [
          "Alongside your passport photograph, virtually every competitive examination and recruitment board requires a digital image of your physical signature. However, digital signatures pose unique challenges that differ significantly from portrait photographs.",
          "Unlike photographs, which are roughly square or portrait-oriented, digital signatures are **horizontal rectangles** (such as [140 × 60 px](/signature-resizer-140x60) or [200 × 80 px](/signature-resizer-200x80)). Furthermore, signature file size limits are remarkably strict—typically capped at **10KB to 20KB**.",
          "Candidates often struggle with signature uploads because capturing a signature with a smartphone camera produces a large, high-resolution photo with yellowish paper tones, uneven shadows, and subtle paper wrinkles. When compressed down to 10KB, the ink strokes become blurry and the background turns dark grey, causing automated portal rejections.",
        ],
      },
      {
        h2: "Common Signature Dimensions Across Portals",
        paragraphs: [
          "Official recruitment guidelines specify exact rectangular dimensions and file size windows for signatures:",
        ],
        table: {
          caption: "Digital Signature Standards for Indian Examinations",
          headers: [
            "Exam / Recruitment Portal",
            "Target Dimensions (Pixels)",
            "File Size Range",
            "Ink Color Mandate",
            "Canvas Aspect Ratio",
          ],
          rows: [
            ["SSC Recruitment (CGL, CHSL, MTS)", "140 × 60 px", "10 KB to 20 KB", "Black Ink on White Paper", "7:3 (~2.33:1)"],
            ["UPSC Civil Services & Engineering", "350 × 150 px (or 1000px Max)", "20 KB to 300 KB", "Black Ink on White Paper", "7:3 (~2.33:1)"],
            ["IBPS & SBI Banking Recruitment", "140 × 60 px", "10 KB to 20 KB", "Black Ink on White Paper", "7:3 (~2.33:1)"],
            ["State PSC Standard Forms", "200 × 80 px", "10 KB to 20 KB", "Blue or Black Ink", "5:2 (2.5:1)"],
            ["Railway Recruitment (RRB)", "240 × 80 px", "10 KB to 20 KB", "Black Ink Strictly", "3:1 (3:1)"],
            ["GATE / IIT Entrance", "280 × 80 px", "5 KB to 200 KB", "Dark Blue or Black", "7:2 (3.5:1)"],
          ],
        },
      },
      {
        h2: "Capturing a Clean Signature with Your Phone",
        paragraphs: [
          "Follow these essential best practices when taking a photo of your signature at home:",
        ],
        list: [
          "**Use Pure White Unruled Paper**: Sign strictly on a blank sheet of clean, unruled A4 printer paper. Never sign on ruled, lined, or checked notebook pages, as the background lines will cut through your signature strokes.",
          "**Use a Dark Gel or Ballpoint Pen**: Use a black ink pen with a clear, bold stroke (0.7mm or 1.0mm tip preferred). Faint or washed-out signatures fail contrast validation.",
          "**Ensure Bright, Shadow-Free Illumination**: Place the paper near a bright window or under daylight lighting. Ensure your smartphone or hand does not cast a dark silhouette over the paper.",
          "**Shoot Straight Down (90-Degree Angle)**: Hold your phone parallel to the paper. Angled shots distort the perspective, making the signature look skewed and stretched.",
        ],
        visualChart: {
          type: "steps",
          title: "Digital Signature Preparation Steps",
          description: "Follow these 4 sequential steps to prepare compliant signatures",
          items: [
            { label: "Sign on White Paper", sublabel: "Bold black pen, unruled", value: "Step 01" },
            { label: "Crop Box Tight", sublabel: "Remove outer paper margins", value: "Step 02", highlight: true },
            { label: "Boost Contrast", sublabel: "Pure white backdrop, dark ink", value: "Step 03" },
            { label: "Resize & Compress", sublabel: "140x60 px & 10-20 KB", value: "Step 04", highlight: true },
          ],
        },
      },
      {
        h2: "Step-by-Step Guide: Resizing Your Signature Online",
        paragraphs: [
          "Follow this simple workflow using our browser-based tools:",
        ],
        orderedList: [
          "**Crop Tightly Around the Signature**: Open your signature snapshot in an [image cropper](/tools/image-cropper). Crop tightly around the outer boundaries of the signature, eliminating blank paper borders.",
          "**Enhance Background Contrast**: Use our [signature resizer tool](/tools/signature-resizer) to boost contrast, turning dull grayish paper into pure solid white `#FFFFFF` while sharpening dark ink strokes.",
          "**Set Exact Rectangular Dimensions**: Input the exact pixel requirements from your notification (e.g., [140 × 60 px](/signature-resizer-140x60) or [200 × 80 px](/signature-resizer-200x80)).",
          "**Compress to the 10KB-20KB Window**: Adjust compression to target approximately 14KB to 18KB using our [signature compressor](/tools/signature-compressor). This sits safely above 10KB minimums while remaining well below the 20KB threshold.",
          "**Download and Check File Properties**: Save the file as `.jpg` and verify that the file weight is within bounds and that the signature strokes remain clean without blurry noise.",
        ],
      },
      {
        h2: "Signature Thresholding and Contrast Optimization",
        paragraphs: [
          "A major reason signature files turn dark grey when compressed is **paper luminance noise**. When you capture paper indoors, ambient light bounces unpredictably, creating subtle pixel-to-pixel color shifts across the paper surface.",
          "When an image editor applies JPEG compression to this noisy grey paper, the compression algorithm treats the subtle grain as complex visual information, eating up precious byte budget. By applying digital **threshold binarization**, our [signature resizer tool](/tools/signature-resizer) pushes all pixels brighter than a set threshold to pure white `(255, 255, 255)` while pushing pen strokes to rich dark black `(0, 0, 0)`. The resulting flat white background compresses with near-zero byte overhead, leaving 90% of your kilobyte budget dedicated to keeping the signature ink crisp and razor-sharp.",
        ],
        callout: {
          type: "cta",
          title: "Online Signature Resizer Tool",
          text: "Resize your signature to exact exam dimensions in seconds. Our [signature resizer](/tools/signature-resizer) enhances contrast, whitens backgrounds, and calibrates file size directly in your browser.",
          toolLink: {
            label: "Open Signature Resizer",
            href: "/tools/signature-resizer",
          },
        },
      },
      {
        h2: "Common Mistakes That Cause Signature Rejection",
        paragraphs: [
          "Avoid these critical pitfalls when preparing signature files:",
        ],
        list: [
          "**Signing in CAPITAL LETTERS**: Most examination notifications explicitly state: 'Signatures in CAPITAL LETTERS will not be accepted'. Always sign in your natural, flowing cursive handwriting.",
          "**Shadows on the Paper**: If half of your signature paper is shaded by your hand, threshold compression will turn the shaded half muddy grey or pitch black.",
          "**Using Blue Ink When Black Is Mandated**: Many major exams (including SSC and IBPS) strictly require **black ink**. Submitting a blue ink signature can lead to direct application rejection.",
          "**Inverting Canvas Orientation**: Uploading a vertical signature instead of horizontal creates an illegible admit card preview.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I sign with a blue pen if the exam notification says black ink?",
        answer:
          "No. When an official notification specifies black ink, automated document readers verify contrast against black ink thresholds. Blue ink signatures can fail automated scrutiny. Always use black ink when specified.",
      },
      {
        question: "Why did my signature turn into a black rectangle after upload?",
        answer:
          "This occurs when an image with transparent layers is uploaded to a server that doesn't support alpha transparency, causing transparent pixels to render black. Always save signatures as JPG with a solid white background.",
      },
      {
        question: "What is the standard pixel size for an SSC signature?",
        answer:
          "The Staff Selection Commission (SSC) standard signature requirement is exactly 140 pixels wide by 60 pixels high (140 × 60 px), with a file size between 10KB and 20KB in JPG format.",
      },
      {
        question: "Can I use an electronic digital signature pad?",
        answer:
          "Unless explicitly allowed, most recruitment boards mandate that candidates sign physically on white paper and scan or photograph that signature. Purely stylized electronic stylus signatures are frequently rejected.",
      },
      {
        question: "How do I make the paper background pure white?",
        answer:
          "Our [signature resizer tool](/tools/signature-resizer) includes automated brightness and threshold adjustment that cleans away paper grain, yellowish lighting, and subtle shadows, producing a pure white background with sharp dark ink.",
      },
      {
        question: "How do I resize a signature to 200x80 pixels?",
        answer:
          "Open our dedicated [200x80 signature resizer](/signature-resizer-200x80), upload your signature image, crop the text, and download your compliant file calibrated between 10KB and 20KB.",
      },
    ],
    relatedToolSlugs: [
      {
        name: "Signature Resizer",
        href: "/tools/signature-resizer",
        description: "Crop, enhance contrast, and resize digital signatures to official portal standards.",
        icon: "HiOutlinePencilSquare",
      },
      {
        name: "140x60 Signature Resizer",
        href: "/signature-resizer-140x60",
        description: "Preset resizer calibrated specifically for SSC, IBPS, and national exam signature boxes.",
        icon: "HiOutlineAdjustmentsHorizontal",
      },
      {
        name: "Signature Compressor",
        href: "/tools/signature-compressor",
        description: "Compress signature files cleanly into the 10KB to 20KB window.",
        icon: "HiOutlineArchiveBox",
      },
    ],
    relatedArticleSlugs: [
      "how-to-resize-photos-for-online-forms",
      "how-to-reduce-photo-size-to-20kb",
      "how-to-prepare-photos-for-online-forms",
      "how-to-remove-background-from-a-photo",
    ],
  },

  // ==========================================
  // ARTICLE 13: How to Remove Background From a Photo
  // ==========================================
  {
    slug: "how-to-remove-background-from-a-photo",
    title: "How to Remove Background From a Photo",
    description:
      "Learn how to remove backgrounds from portraits, passport photos, and product images cleanly: export transparent PNGs or replace backdrops with compliant solid white.",
    category: "Background Removal",
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-28",
    readTime: "12 min read",
    author: {
      name: "20KB Photo Editorial Team",
      role: "Digital Document Specialists",
    },
    sections: [
      {
        h2: "Why Background Removal Matters",
        paragraphs: [
          "Whether you are preparing a passport photo at home, submitting an application to a government recruitment portal, building an e-commerce product catalog, or designing a clean professional LinkedIn headshot, backgrounds can make or break an image.",
          "Casual snapshots taken against home walls frequently suffer from visual clutter: door frames, picture hooks, uneven paint, light switches, and harsh shadows. For official documents, these imperfections violate biometric uniformity rules and frequently trigger automated upload rejections.",
          "Removing a background isolates the primary subject (the person, product, or signature) from its environment, creating a clean alpha transparency layer. From there, you can either export a transparent PNG or replace the background with a uniform studio white or off-white backdrop.",
        ],
      },
      {
        h2: "Transparent PNG vs Solid White JPEG: When to Use Which",
        paragraphs: [
          "After removing a background, choosing the right export format is essential:",
          "**Transparent Background (PNG Format)**: Saves an alpha channel that lets underlying page colors, document backgrounds, or graphic layouts show through seamlessly. Ideal for digital signatures, company logos, e-commerce listings, and website design. However, **most government recruitment portals reject transparent PNG files**.",
          "**Solid White Background (JPEG Format)**: Composites the isolated subject onto a flat, pure white canvas `(RGB: 255, 255, 255)`. This is the universal standard required for **passport photos, visa submissions, and online examination forms**.",
        ],
        table: {
          caption: "Comparing Background Removal Export Formats",
          headers: [
            "Use Case / Destination",
            "Optimal Background State",
            "Optimal Format",
            "Typical File Size",
          ],
          rows: [
            ["Passport / Visa Photos", "Solid Pure White (No transparency)", "JPG / JPEG", "25 KB to 50 KB"],
            ["Exam Portal Headshots", "Solid Light / White", "JPG / JPEG", "20 KB to 50 KB"],
            ["Digital Signature Overlays", "Full Alpha Transparency", "PNG (Lossless)", "15 KB to 45 KB"],
            ["E-commerce Product Listings", "Pure White or Transparent", "JPG or WebP", "40 KB to 90 KB"],
            ["Company / Team Headshots", "Custom Color / Gradient", "JPG / WebP", "50 KB to 120 KB"],
          ],
        },
      },
      {
        h2: "Technical Quality Factors: Handling Hair, Edges, and Halos",
        paragraphs: [
          "The difference between an amateur cutout and a professional background removal comes down to three technical details:",
          "**1. Hair Strands and Fine Boundaries**: Low-quality thresholding tools treat hair like a solid geometric block, creating a plastic, helmet-like outline. High-fidelity background removal uses semantic segmentation to preserve fine hair wisps without retaining background color bleed.",
          "**2. Color Spill / Fringe Halos**: When you stand near a brightly colored wall (e.g., green or yellow), light bounces off the wall onto your ears and shoulders. Quality background removal de-saturates these edge fringe artifacts to prevent unnatural green or yellow outlines.",
          "**3. Shoulder and Neckline Sharpness**: Smooth fabrics and collar contours should retain crisp, natural contrast against the new white backdrop without jagged staircase pixelation.",
        ],
        visualChart: {
          type: "flow",
          title: "Automated Background Removal Pipeline",
          description: "From cluttered home snapshot to studio-grade white backdrop",
          items: [
            { label: "Original Snapshot", sublabel: "Cluttered home wall", value: "Input" },
            { label: "Semantic Segmentation", sublabel: "Detect subject mask", value: "Process", highlight: true },
            { label: "Edge Refinement", sublabel: "Clean hair & shoulders", value: "Refine" },
            { label: "Studio White Composite", sublabel: "Pure white backdrop", value: "Output", highlight: true },
          ],
        },
      },
      {
        h2: "International Visa Background Color Standards",
        paragraphs: [
          "Before replacing your background with white, check the exact color mandate of your destination visa authority:",
          "**Pure White (RGB 255, 255, 255)**: Mandated by India (Passport/Visa/OCI), United States (DS-160, US Visa, Diversity Visa), Canada, Australia, and New Zealand.",
          "**Light Grey or Neutral Cream**: Permitted and frequently preferred by the United Kingdom and Schengen European Union visa consulates to provide softer contrast against light skin tones.",
          "**Light Blue Backdrop**: Mandated by select Southeast Asian jurisdictions (including Malaysia and Kuwait work permits). Our [passport photo maker](/tools/passport-photo-maker) lets you toggle between white, blue, and light grey backdrops.",
        ],
      },
      {
        h2: "Step-by-Step Guide: Removing Backgrounds in Your Browser",
        paragraphs: [
          "Follow this simple procedure using our free, browser-based tools:",
        ],
        orderedList: [
          "**Upload Your Photo**: Open our [background remover tool](/tools/background-remover) in any modern browser on mobile or desktop.",
          "**Automated Subject Isolation**: Our client-side model analyzes contrast and isolates your portrait from background elements in seconds.",
          "**Select Your Output Backdrop**: For passport photos and exam forms, select 'Solid White'. For digital signatures, logos, or design graphics, select 'Transparent'.",
          "**Crop and Frame**: Use our integrated [image cropper](/tools/image-cropper) to center your face and establish proper biometric passport framing (70% to 80% face coverage).",
          "**Download the Result**: Save the file as a compliant JPEG (for forms) or transparent PNG (for digital overlays).",
        ],
        callout: {
          type: "cta",
          title: "Online Background Remover",
          text: "Remove cluttered backgrounds from your photos in seconds. Our browser-based [background remover](/tools/background-remover) runs 100% locally with zero server uploads.",
          toolLink: {
            label: "Remove Background Now",
            href: "/tools/background-remover",
          },
        },
      },
      {
        h2: "Common Mistakes to Avoid",
        paragraphs: [
          "Keep these tips in mind for clean results:",
        ],
        list: [
          "**Wearing Clothes That Match Your Wall**: If you wear a white shirt against a white wall, automated algorithms will struggle to distinguish where your shoulders end and the wall begins. Wear contrasting clothing when taking your photo.",
          "**Uploading Transparent PNGs to Form Portals**: Never upload a transparent PNG to an application portal that requires a solid background. If the server does not support transparency, it will render your background solid black, leading to immediate rejection.",
          "**Using Low-Resolution Source Photos**: Starting with a tiny 150 × 150 pixel image makes clean edge detection impossible. Always capture your photo at your phone's full camera resolution before removing the background.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does removing a background reduce image quality?",
        answer:
          "Not when done properly. The subject's original pixels (facial features, skin tones, clothing textures) remain completely untouched; only the surrounding background pixels are erased or replaced.",
      },
      {
        question: "Can I make the background pure white for an exam application?",
        answer:
          "Yes. Our [background remover](/tools/background-remover) allows you to replace any background with pure studio white `#FFFFFF`, satisfying official requirements for SSC, UPSC, and passport applications.",
      },
      {
        question: "What format should I download for online form submission?",
        answer:
          "Always select JPG/JPEG with a solid white background for official online forms. Avoid transparent PNGs, which are rejected by most government upload validators.",
      },
      {
        question: "Are my photos uploaded to a remote server during background removal?",
        answer:
          "No. Our tools process images client-side directly within your browser canvas, ensuring complete privacy with zero server storage.",
      },
      {
        question: "Can I remove the background from a signature photo?",
        answer:
          "Yes. You can isolate dark ink strokes from paper textures using our [signature resizer](/tools/signature-resizer) or background remover to create a clean, transparent digital signature.",
      },
      {
        question: "How do I fix green or yellow light reflections on my hair?",
        answer:
          "Our tool includes automated defringe suppression that neutralizes color spill from nearby painted walls before compositing onto the final white canvas.",
      },
    ],
    relatedToolSlugs: [
      {
        name: "Background Remover",
        href: "/tools/background-remover",
        description: "Erase cluttered backdrops and replace with studio white or transparency.",
        icon: "HiOutlineSparkles",
      },
      {
        name: "Passport Photo Maker",
        href: "/tools/passport-photo-maker",
        description: "Create compliant biometric passport photos with automated white backgrounds.",
        icon: "HiOutlineIdentification",
      },
      {
        name: "PNG to JPG Converter",
        href: "/tools/png-to-jpg",
        description: "Convert transparent cutouts into form-compliant JPGs with white backgrounds.",
        icon: "HiOutlineArrowPath",
      },
    ],
    relatedArticleSlugs: [
      "how-to-make-a-passport-size-photo",
      "how-to-convert-png-to-jpg",
      "how-to-resize-photos-for-online-forms",
      "how-to-resize-a-signature-for-online-forms",
    ],
  },

  // ==========================================
  // ARTICLE 14: How to Convert JPG to PDF
  // ==========================================
  {
    slug: "how-to-convert-jpg-to-pdf",
    title: "How to Convert JPG to PDF",
    description:
      "A complete guide to converting single or multiple JPG images into professional, compact PDF documents for official applications, email, and document archives.",
    category: "Document & PDF",
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-28",
    readTime: "11 min read",
    author: {
      name: "20KB Photo Editorial Team",
      role: "Digital Document Specialists",
    },
    sections: [
      {
        h2: "Why Convert JPG Images to PDF Format?",
        paragraphs: [
          "The JPEG format is the world standard for storing photographs and captured images. However, when submitting official documentation—such as academic certificates, identity cards, government correspondence, tax declarations, or multi-page applications—portals frequently mandate submissions strictly in **Portable Document Format (PDF)**.",
          "PDF offers significant advantages over raw image files for official documents:",
          "**Standardized Page Layout**: A PDF defines precise physical paper boundaries (such as standard A4 or US Letter). When an admissions officer or HR manager opens your PDF, it displays and prints with exact margins, orientation, and scaling, regardless of their screen size or operating system.",
          "**Multi-Page Document Packaging**: If you need to submit both sides of an ID card or a 5-page marks sheet, sending five separate JPEG files creates confusion. A single PDF bundles all pages into one organized, sequential file.",
          "**Integrity and Print Consistency**: Unlike raw image files that can be stretched or resized unpredictably by different image viewers, PDFs lock down aspect ratios, text clarity, and printable margins.",
        ],
      },
      {
        h2: "Page Sizing and Orientation: A4 vs US Letter vs Auto-Fit",
        paragraphs: [
          "When converting JPG images into a PDF document, selecting the proper page layout is essential:",
          "**Standard A4 (8.27 × 11.69 inches / 210 × 297 mm)**: The international standard across India, Europe, Asia, and most of the world. Ideal for official certificates, government affidavits, mark sheets, and formal applications.",
          "**US Letter (8.5 × 11.0 inches / 216 × 279 mm)**: Standard across the United States and Canada. Use this when applying to North American universities or visa authorities.",
          "**Auto-Fit / Match Image Dimensions**: Instead of embedding the photo into a standard paper page, Auto-Fit creates a custom PDF page whose boundary matches the exact pixel dimensions of your image. This is ideal when converting high-resolution infographics, architectural plans, or wide panoramic scans.",
        ],
        table: {
          caption: "Page Setup Options for JPG to PDF Conversion",
          headers: [
            "Page Standard",
            "Physical Dimensions",
            "Best Document Types",
            "Orientation Options",
          ],
          rows: [
            ["International A4", "210 × 297 mm", "Certificates, Mark Sheets, Government Forms", "Portrait (Vertical)"],
            ["A4 Landscape", "297 × 210 mm", "PAN Cards, Passbooks, Diplomas", "Landscape (Horizontal)"],
            ["US Letter", "8.5 × 11.0 inches", "US Visas, North American Universities", "Portrait / Landscape"],
            ["Fit to Image", "Variable (Exact Image Ratio)", "Custom Scans, Large Posters, Receipts", "Auto-Matched"],
          ],
        },
      },
      {
        h2: "Controlling PDF File Size During Conversion",
        paragraphs: [
          "A frequent problem applicants encounter is generating a PDF that is too large for upload portals (e.g., exceeding a 500KB or 1MB limit). This occurs when multiple uncompressed 8MB smartphone photos are embedded directly into a PDF container without optimization.",
          "To keep your final PDF compact and compliant:",
          "**1. Downscale Canvas Resolution First**: A 12MP camera photo contains far more resolution than needed for an A4 document. Downscaling images to roughly 1200 × 1600 pixels before PDF compilation maintains crisp print quality at 150 to 200 DPI while shrinking data weight by over 80%.",
          "**2. Apply Balanced JPEG Compression**: Using 75% to 80% JPEG compression inside the PDF container produces clean, sharp text and photos while keeping multi-page PDFs comfortably under 500KB.",
        ],
        visualChart: {
          type: "flow",
          title: "JPG to PDF Conversion Flow",
          description: "How image files are processed, oriented, and assembled into a clean PDF",
          items: [
            { label: "Upload Images", sublabel: "Select one or multiple JPGs", value: "Upload" },
            { label: "Page Setup", sublabel: "Choose A4, portrait/landscape", value: "Format" },
            { label: "Optimize Quality", sublabel: "Balance sharpness & file size", value: "Encode", highlight: true },
            { label: "Download PDF", sublabel: "Single clean, compliant file", value: "Ready", highlight: true },
          ],
        },
      },
      {
        h2: "Step-by-Step Guide: How to Convert JPG to PDF Online",
        paragraphs: [
          "Follow this simple workflow using our browser-based tools:",
        ],
        orderedList: [
          "**Open the JPG to PDF Tool**: Navigate to our [JPG to PDF tool](/tools/jpg-to-pdf) in any browser.",
          "**Select Your Image(s)**: Choose your single JPG image or select multiple images in the exact order you want them to appear in the PDF.",
          "**Configure Page Settings**: Select your preferred page size (e.g., A4), choose orientation (portrait for vertical documents, landscape for horizontal certificates), and adjust page margins.",
          "**Set Output Quality**: If your portal has a strict file size ceiling (e.g., under 1MB), select standard compression to keep the file lightweight.",
          "**Generate & Download PDF**: Click 'Convert to PDF'. The tool compiles the document locally in your browser, ready for immediate download.",
        ],
      },
      {
        h2: "Handling Mixed Orientations in Multi-Page Submissions",
        paragraphs: [
          "In many official submissions, your documents have different natural orientations. For instance, an academic degree certificate is vertical (portrait), while an accompanying diploma or marks sheet is horizontal (landscape).",
          "A poorly configured PDF compiler forces all images onto vertical portrait pages, causing horizontal documents to be rotated 90 degrees or shrunk down with massive white borders at the top and bottom. Our [Photos to PDF tool](/tools/photos-to-pdf) allows you to set page orientation on an individual page basis, ensuring every certificate fills the page properly and reads upright.",
        ],
        callout: {
          type: "cta",
          title: "Convert JPG to PDF Online",
          text: "Convert your JPG images into formatted PDF documents in seconds. Our [JPG to PDF tool](/tools/jpg-to-pdf) runs 100% locally in your browser with zero server uploads.",
          toolLink: {
            label: "Convert JPG to PDF Now",
            href: "/tools/jpg-to-pdf",
          },
        },
      },
    ],
    faqs: [
      {
        question: "Can I convert multiple JPGs into a single multi-page PDF?",
        answer:
          "Yes! Our [JPG to PDF tool](/tools/jpg-to-pdf) and [combine images into PDF tool](/tools/photos-to-pdf) allow you to upload multiple images, arrange their page order, and export a single organized multi-page PDF.",
      },
      {
        question: "Will converting JPG to PDF reduce document quality?",
        answer:
          "No. Our converter maintains full photographic sharpness while optimizing embedded data to prevent excessive file sizes.",
      },
      {
        question: "How do I ensure my PDF stays under 500KB?",
        answer:
          "Before compiling the PDF, resize large photos using our [image compressor](/tools/image-compressor). Using moderate JPEG compression inside the PDF ensures multi-page documents stay well under 500KB.",
      },
      {
        question: "Are my personal documents uploaded to any server?",
        answer:
          "No. All PDF generation happens entirely client-side inside your browser memory using WebAssembly and canvas rendering. Your sensitive certificates and IDs never leave your device.",
      },
      {
        question: "Can I convert images on mobile without installing an app?",
        answer:
          "Yes. Our tools work seamlessly across Chrome, Safari, and Firefox on both Android and iOS devices without requiring app store installations.",
      },
      {
        question: "What page margins should I choose for official form PDFs?",
        answer:
          "Select 'Narrow Margins' or 'No Margins' for identity cards and certificates so that text and serial numbers occupy the maximum readable canvas area.",
      },
    ],
    relatedToolSlugs: [
      {
        name: "JPG to PDF Converter",
        href: "/tools/jpg-to-pdf",
        description: "Convert single or multiple JPG images into organized, formatted PDF documents.",
        icon: "HiOutlineDocumentText",
      },
      {
        name: "Image to PDF",
        href: "/tools/image-to-pdf",
        description: "Combine JPG, PNG, and WebP images into a single clean PDF file.",
        icon: "HiOutlineDocumentText",
      },
      {
        name: "PDF to JPG Converter",
        href: "/tools/pdf-to-jpg",
        description: "Extract high-resolution JPG images from existing PDF pages.",
        icon: "HiOutlineDocumentArrowDown",
      },
    ],
    relatedArticleSlugs: [
      "how-to-convert-pdf-to-jpg",
      "how-to-combine-images-into-one-pdf",
      "how-to-scan-documents-with-your-phone",
      "how-to-resize-photos-for-online-forms",
    ],
  },

  // ==========================================
  // ARTICLE 15: How to Convert PDF to JPG
  // ==========================================
  {
    slug: "how-to-convert-pdf-to-jpg",
    title: "How to Convert PDF to JPG",
    description:
      "A complete guide to extracting and converting PDF document pages into high-resolution JPG images for online forms, photo verification, and image-only portals.",
    category: "Document & PDF",
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-28",
    readTime: "11 min read",
    author: {
      name: "20KB Photo Editorial Team",
      role: "Digital Document Specialists",
    },
    sections: [
      {
        h2: "Why Convert PDF Documents to JPG Images?",
        paragraphs: [
          "While PDF is the standard format for formal document exchange, situations frequently arise where you need your document in **JPEG (JPG)** format. Many recruitment portals, identity verification apps, and mobile form uploaders strictly require images (`.jpg` or `.jpeg`) and will reject `.pdf` files outright.",
          "Common scenarios requiring PDF to JPG conversion include:",
        ],
        list: [
          "**Extracting Photos or Signatures from Scanned PDFs**: You have an existing scanned document or old application form saved as PDF and need to extract your passport photo or signature as an individual image.",
          "**Image-Only Upload Portals**: Government registration portals often require photo ID cards (such as PAN cards or Aadhaar cards) to be uploaded strictly as JPEG files under 100KB or 200KB.",
          "**Previewing and Sharing on Social / Messaging Platforms**: PDFs require external viewer apps to inspect, whereas JPEGs render instantly inline on mobile messaging apps and social platforms.",
          "**Inserting Document Proofs into Word or Presentation Decks**: Embedding a PDF into slides often creates an ugly icon link, whereas a clean JPG embeds as a crisp visual graphic.",
        ],
      },
      {
        h2: "Rendering Resolution: Choosing the Right DPI (150 vs 300 DPI)",
        paragraphs: [
          "A PDF is essentially a vector and raster container that does not have a fixed pixel dimension until it is **rasterized** (rendered into pixels). When converting PDF pages into JPG images, the rendering resolution—measured in **DPI (Dots Per Inch)**—determines visual sharpness and output file size:",
          "**72 to 100 DPI (Screen Preview)**: Produces small images suitable for quick mobile viewing or email thumbnails. Small text on certificates may appear slightly pixelated.",
          "**150 DPI (Balanced Standard)**: The recommended setting for online form uploads. An A4 page renders at approximately **1240 × 1754 pixels**, producing crisp, readable text and clear photographs while keeping file sizes between 150KB and 350KB.",
          "**300 DPI (Archival & Print Quality)**: Renders an A4 page at **2480 × 3508 pixels**. Ideal when you need to print the extracted document or preserve micro-text, watermarks, and fine official stamps.",
        ],
        table: {
          caption: "PDF Page to JPG Rendering Metrics (Standard A4 Page)",
          headers: [
            "Rendering DPI",
            "Output Dimensions (Pixels)",
            "Text Readability",
            "Typical JPG Size (80% Quality)",
            "Recommended Use Case",
          ],
          rows: [
            ["100 DPI", "827 × 1169 px", "Acceptable for large headings", "90 KB to 160 KB", "Quick mobile previews"],
            ["150 DPI", "1240 × 1754 px", "Sharp & clear on all screens", "220 KB to 450 KB", "Online form uploads (Sweet Spot)"],
            ["200 DPI", "1654 × 2338 px", "Very sharp micro-text", "400 KB to 800 KB", "Official certificate submissions"],
            ["300 DPI", "2480 × 3508 px", "Lab-grade archival print quality", "1.2 MB to 2.5 MB", "Physical reprint & fine stamps"],
          ],
        },
      },
      {
        h2: "Step-by-Step Guide: How to Convert PDF to JPG Online",
        paragraphs: [
          "Follow this simple 4-step workflow using our browser-based tools:",
        ],
        orderedList: [
          "**Upload Your PDF File**: Open our [PDF to JPG converter](/tools/pdf-to-jpg) in your desktop or mobile browser. Drag and drop your PDF document.",
          "**Select Rendering Quality**: Choose your target DPI (150 DPI is recommended for standard application forms, while 300 DPI is best for high-resolution certificate extraction).",
          "**Choose Pages to Convert**: Convert all pages into individual JPG images or select specific individual pages (e.g., Page 1 only).",
          "**Download the Extracted Images**: Download individual JPGs directly or save all pages bundled in a single organized ZIP archive.",
        ],
        visualChart: {
          type: "steps",
          title: "PDF to JPG Conversion Process",
          description: "Follow these 4 steps to rasterize and extract clean JPG images from PDF",
          items: [
            { label: "Upload PDF File", sublabel: "Single or multi-page PDF", value: "Step 01" },
            { label: "Set Target DPI", sublabel: "150 DPI (forms) or 300 DPI", value: "Step 02", highlight: true },
            { label: "Rasterize Canvas", sublabel: "Render vector text to pixels", value: "Step 03" },
            { label: "Download JPGs", sublabel: "Individual images or ZIP", value: "Step 04", highlight: true },
          ],
        },
      },
      {
        h2: "Common Pitfalls When Converting PDF to JPG",
        paragraphs: [
          "Watch out for these common issues during conversion:",
        ],
        list: [
          "**Blurry Small Text**: If you convert a PDF at default 72 DPI, small footnote text, serial numbers, and signatures will blur. Always use at least 150 DPI when converting official certificates.",
          "**Massive Output File Sizes at 300 DPI**: Converting a 20-page PDF at 300 DPI can produce 40MB of image files. If your goal is uploading to an online form, stick to 150 DPI or compress the output using our [image compressor](/tools/image-compressor).",
          "**Taking Low-Quality Screenshots Instead**: Many users simply screenshot their computer screen while viewing a PDF. Screenshots are limited by monitor display resolution (often 72 to 96 DPI), producing fuzzy results. Dedicated PDF rasterization renders the underlying vector text directly at full resolution.",
        ],
        callout: {
          type: "cta",
          title: "Online PDF to JPG Converter",
          text: "Extract high-resolution JPG images from your PDF files in seconds. Our [PDF to JPG tool](/tools/pdf-to-jpg) runs 100% locally in your browser with zero server uploads.",
          toolLink: {
            label: "Convert PDF to JPG Now",
            href: "/tools/pdf-to-jpg",
          },
        },
      },
    ],
    faqs: [
      {
        question: "Can I convert a multi-page PDF into separate JPG images?",
        answer:
          "Yes. Our [PDF to JPG tool](/tools/pdf-to-jpg) extracts every page of your PDF into an individual high-resolution JPG image and lets you download them all in a single ZIP file.",
      },
      {
        question: "Is 150 DPI enough for official document uploads?",
        answer:
          "Yes. At 150 DPI, an A4 page measures 1240 × 1754 pixels, which provides sharp, perfectly legible text and official stamps while keeping file sizes lightweight for portal compliance.",
      },
      {
        question: "How do I extract just one image from a PDF?",
        answer:
          "Upload your PDF to our converter, select the specific page containing the image, render it at 300 DPI, and use our [image cropper](/tools/image-cropper) to isolate the required photo or signature.",
      },
      {
        question: "Are my confidential PDF documents safe?",
        answer:
          "Completely safe. All rendering is performed locally inside your browser memory using client-side WebAssembly. Your documents are never transmitted over the internet or saved to external servers.",
      },
      {
        question: "Can I convert PDF to JPG on Android or iPhone?",
        answer:
          "Yes. Our converter works directly in mobile browsers without requiring third-party app installations or account registrations.",
      },
      {
        question: "Can I convert password-protected PDFs?",
        answer:
          "If your PDF has a password (like an Aadhaar e-card), you will be prompted to enter the password in your browser so the client-side engine can decrypt and render the pages.",
      },
    ],
    relatedToolSlugs: [
      {
        name: "PDF to JPG Converter",
        href: "/tools/pdf-to-jpg",
        description: "Convert PDF document pages into high-resolution JPG or PNG images.",
        icon: "HiOutlineDocumentArrowDown",
      },
      {
        name: "PDF to Image",
        href: "/tools/pdf-to-image",
        description: "Extract pages from PDF files with custom DPI and format controls.",
        icon: "HiOutlineDocumentArrowDown",
      },
      {
        name: "Image Cropper Tool",
        href: "/tools/image-cropper",
        description: "Crop and isolate specific sections, photos, or signatures from converted pages.",
        icon: "HiOutlineScissors",
      },
    ],
    relatedArticleSlugs: [
      "how-to-convert-jpg-to-pdf",
      "how-to-combine-images-into-one-pdf",
      "how-to-scan-documents-with-your-phone",
      "how-to-resize-photos-for-online-forms",
    ],
  },
];
