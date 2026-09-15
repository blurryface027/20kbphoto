import { exams, categories } from '../data/exams';
import { exactKBTools, dimensionTools } from '../data/tools';

console.log('=== RUNNING COMPREHENSIVE SEO METADATA AUDIT ===\n');

const titleMap = new Map<string, string>(); // title -> route
const categoryWords = ['Exams', 'Tools', 'Admissions', 'Government Exams', 'Police', 'Banking', 'State PSC', 'Others'];
let totalPagesAudited = 0;
let pipeErrorCount = 0;
let categoryErrorCount = 0;
let duplicateErrorCount = 0;

function checkMetadata(route: string, title: string, description: string) {
  totalPagesAudited++;

  // 1. Check for pipe symbol "|"
  if (title.includes('|')) {
    console.error(`[PIPE ERROR] Route ${route} has '|' in title: "${title}"`);
    pipeErrorCount++;
  }

  // 2. Check for em-dash "—" in title (should use "-")
  if (title.includes('—')) {
    console.error(`[EM-DASH ERROR] Route ${route} has '—' in title: "${title}"`);
    pipeErrorCount++;
  }

  // 3. Check for internal category names unnecessarily placed in title
  // Exception: category index pages like /exams/ssc where category name is part of the page content
  const isCategoryIndex = categories.some(c => route === `/exams/${c.slug}`);
  if (!isCategoryIndex) {
    categoryWords.forEach(cat => {
      // Check if title has pattern "- CategoryName -" or "CategoryName Exam" unnecessarily
      if (title.includes(` - ${cat} - `) || title.includes(` - ${cat}`)) {
        console.error(`[CATEGORY ERROR] Route ${route} contains category name "${cat}" in title: "${title}"`);
        categoryErrorCount++;
      }
    });
  }

  // 4. Check for duplicate titles
  if (titleMap.has(title)) {
    console.error(`[DUPLICATE ERROR] Route ${route} has same title as ${titleMap.get(title)}: "${title}"`);
    duplicateErrorCount++;
  } else {
    titleMap.set(title, route);
  }
}

// 1. Audit Categories
categories.forEach(c => {
  const route = `/exams/${c.slug}`;
  const title = `${c.name} Photo & Signature Resizer - 20KB Photo`;
  const desc = `Check photo and signature requirements for ${c.name} exams. Resize application photos and signatures online to exact pixel dimensions and file size limits.`;
  checkMetadata(route, title, desc);
});

// 2. Audit Exams (4 pages per exam: main, photo-resizer, signature-resizer, photo-signature-resizer)
exams.forEach(exam => {
  const p = exam.photo;
  const s = exam.signature;

  // Main Page
  const mainRoute = `/exams/${exam.slug}`;
  const mainTitle = `${exam.name} Photo & Signature Resizer - Requirements & Tool`;
  const mainDesc = `Official photo and signature requirements for ${exam.name} applications. View required dimensions (${p.width}x${p.height}px photo, ${s.width}x${s.height}px signature), file size limits (${p.minKB}-${p.maxKB}KB photo, ${s.minKB}-${s.maxKB}KB signature), format, and online resizer tools for ${exam.fullName}.`;
  checkMetadata(mainRoute, mainTitle, mainDesc);

  // Photo Resizer Page
  const photoRoute = `/exams/${exam.slug}/photo-resizer`;
  const photoTitle = `${exam.name} Photo Resizer - ${p.width}x${p.height}px, ${p.minKB}-${p.maxKB}KB - 20KB Photo`;
  const photoDesc = `Resize the photo required for ${exam.name} applications to ${p.width}x${p.height}px and ${p.minKB}-${p.maxKB}KB ${p.format} format online. Free resizer tool for ${exam.fullName} online forms.`;
  checkMetadata(photoRoute, photoTitle, photoDesc);

  // Signature Resizer Page
  const sigRoute = `/exams/${exam.slug}/signature-resizer`;
  const sigTitle = `${exam.name} Signature Resizer - ${s.width}x${s.height}px, ${s.minKB}-${s.maxKB}KB - 20KB Photo`;
  const sigDesc = `Resize the signature required for ${exam.name} applications to ${s.width}x${s.height}px and ${s.minKB}-${s.maxKB}KB ${s.format} format online. Free signature resizer for ${exam.fullName} forms.`;
  checkMetadata(sigRoute, sigTitle, sigDesc);

  // Photo & Signature Resizer Page
  const comboRoute = `/exams/${exam.slug}/photo-signature-resizer`;
  const comboTitle = `${exam.name} Photo and Signature Resizer - 20KB Photo`;
  const comboDesc = `Resize the photo and signature required for ${exam.name} applications online. Format both documents to official pixel dimensions and file size limits for ${exam.fullName}.`;
  checkMetadata(comboRoute, comboTitle, comboDesc);
});

// 3. Audit Exact KB Pages
exactKBTools.forEach(kb => {
  const route = `/resize-image-to-${kb.slug}`;
  const title = `Resize Image to ${kb.kb}KB Online - 20KB Photo`;
  const desc = `Compress and resize any photo or signature image to under ${kb.kb}KB for online exam applications and recruitment forms.`;
  checkMetadata(route, title, desc);
});

// 4. Audit Dimension Pages
dimensionTools.forEach(d => {
  const isSig = d.type === 'signature';
  const route = `/${isSig ? 'signature' : 'image'}-resizer-${d.slug}`;
  const title = `Resize ${isSig ? 'Signature' : 'Image'} to ${d.width}x${d.height}px Online - 20KB Photo`;
  const desc = `Resize and crop your ${isSig ? 'signature' : 'image'} to exact ${d.width}x${d.height} pixels online for exam and form applications.`;
  checkMetadata(route, title, desc);
});

console.log('--- AUDIT RESULTS ---');
console.log(`Total Pages Audited: ${totalPagesAudited}`);
console.log(`Pipes / Em-dash Violations: ${pipeErrorCount}`);
console.log(`Category Name Violations: ${categoryErrorCount}`);
console.log(`Duplicate Title Violations: ${duplicateErrorCount}`);

if (pipeErrorCount > 0 || categoryErrorCount > 0 || duplicateErrorCount > 0) {
  console.error('\nSEO Audit Failed!');
  process.exitCode = 1;
} else {
  console.log('\n✓ ALL SEO METADATA CHECKS PASSED PERFECTLY!');
}
