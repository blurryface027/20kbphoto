import type { Exam } from '@/data/exams';
import type { Tool } from '@/data/tools';

export function generateBreadcrumbs(path: string): { name: string; url: string }[] {
  const parts = path.split('/').filter(Boolean);
  const breadcrumbs = [];
  let currentPath = '';
  
  breadcrumbs.push({ name: 'Home', url: '/' });
  
  for (const part of parts) {
    currentPath += `/${part}`;
    const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({ name, url: currentPath });
  }
  
  return breadcrumbs;
}

export function generateExamFAQ(exam: Exam): { question: string; answer: string }[] {
  return [
    {
      question: `What are the photo requirements for ${exam.name}?`,
      answer: `The official photo requirements for ${exam.name} are: Dimensions should be ${exam.photo?.width || 0}x${exam.photo?.height || 0} pixels, and file size must be between ${exam.photo?.minKB || 0}KB and ${exam.photo?.maxKB || 0}KB.`
    },
    {
      question: `How to resize photo for ${exam.name} online?`,
      answer: `You can use our free online tool to automatically resize and compress your photo to the exact requirements for ${exam.name} without losing quality.`
    },
    {
      question: `What is the signature file size for ${exam.name}?`,
      answer: `The signature file size for ${exam.name} must be between ${exam.signature?.minKB || 0}KB and ${exam.signature?.maxKB || 0}KB, with dimensions of ${exam.signature?.width || 0}x${exam.signature?.height || 0} pixels.`
    },
    {
      question: `Does ${exam.name} photo need name and date?`,
      answer: `Please refer to the official ${exam.name} notification. If required, our tool allows you to easily add your name and date at the bottom of the photo.`
    },
    {
      question: `Can I compress my image to ${exam.photo?.maxKB || 50}KB for ${exam.name} on mobile?`,
      answer: `Yes, our ${exam.name} photo maker tool is 100% mobile-friendly and processes the image directly in your browser without uploading it to any server.`
    }
  ];
}

export function generateToolFAQ(toolName: string, category: string): { question: string; answer: string }[] {
  return [
    {
      question: `Is this ${toolName} free to use?`,
      answer: `Yes, our ${toolName} is completely free and works directly in your browser.`
    },
    {
      question: `Is my data safe when using the ${category} tool?`,
      answer: `Absolutely. All processing happens locally on your device. We do not upload your images to any server, ensuring 100% privacy.`
    },
    {
      question: `Can I use this on my smartphone?`,
      answer: `Yes, the tool is fully responsive and works perfectly on Android and iOS devices.`
    },
    {
      question: `Will the image quality be preserved?`,
      answer: `Our advanced algorithms ensure that your image maintains the highest possible quality while meeting your strict requirements.`
    }
  ];
}

export function generateKBFAQ(kb: number): { question: string; answer: string }[] {
  return [
    {
      question: `How can I compress an image to exactly ${kb}KB?`,
      answer: `Using our dedicated ${kb}KB compressor, simply select your image and our tool will automatically adjust the quality and format to reach the target size.`
    },
    {
      question: `Will compressing to ${kb}KB reduce quality?`,
      answer: `We use smart compression techniques to minimize quality loss. However, significantly reducing file size may introduce some artifacts depending on the original image.`
    },
    {
      question: `What format is best for a ${kb}KB image?`,
      answer: `JPEG is usually the most efficient format for achieving a specific file size like ${kb}KB while preserving photographic detail.`
    },
    {
      question: `Can I compress multiple images to ${kb}KB at once?`,
      answer: `Currently, our tool optimizes one image at a time to ensure the best possible results for each specific photo.`
    }
  ];
}

export function generateExamStructuredData(exam: Exam): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${exam.name} Photo and Signature Maker`,
    "description": `Free online tool to resize and compress photos for ${exam.name}.`
  };
}

export function generateToolStructuredData(tool: Tool): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any"
  };
}

export function generateFAQStructuredData(faqs: { question: string; answer: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((bc, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": bc.name,
      "item": `https://20kbphoto.in${bc.url}`
    }))
  };
}
