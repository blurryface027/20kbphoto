import { exams } from '@/data/exams';
import { tools, exactKbs, dimensions } from '@/data/tools';

export interface SearchResult {
  type: 'exam' | 'tool' | 'kb-tool' | 'dimension-tool';
  title: string;
  description: string;
  url: string;
  meta?: string;
  priority: number;
}

export function searchAll(query: string): SearchResult[] {
  if (!query || !query.trim()) return [];

  // Normalize query: e.g. "50 KB image" -> "50kb image", "140 x 60" -> "140x60"
  const rawQ = query.toLowerCase().trim();
  const normalizedQ = rawQ
    .replace(/(\d+)\s*kb/gi, '$1kb')
    .replace(/(\d+)\s*[x×*]\s*(\d+)/gi, '$1x$2');

  const tokens = normalizedQ.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  // 1. Exact KB check (e.g. 50kb, 20kb, 100kb, "50 kb image", "20kb photo")
  const kbMatch = normalizedQ.match(/(\d+)\s*kb/i);
  const numberOnlyMatch = normalizedQ.match(/\b(\d{2,3})\b/);
  const targetKB = kbMatch ? parseInt(kbMatch[1], 10) : numberOnlyMatch ? parseInt(numberOnlyMatch[1], 10) : null;

  if (targetKB) {
    for (const kbTool of exactKbs || []) {
      if (kbTool.kb === targetKB) {
        results.push({
          type: 'kb-tool',
          title: kbTool.title,
          description: kbTool.description,
          url: `/resize-image-to-${kbTool.kb}kb`,
          meta: `${kbTool.kb} KB`,
          priority: 120,
        });
      }
    }
  }

  // 2. Exact Dimension check (e.g. 140x60, 200x230, "140 x 60 signature")
  const dimMatch = normalizedQ.match(/(\d+)\s*x\s*(\d+)/i);
  if (dimMatch) {
    const w = parseInt(dimMatch[1], 10);
    const h = parseInt(dimMatch[2], 10);
    for (const dimTool of dimensions || []) {
      if (dimTool.width === w && dimTool.height === h) {
        const url =
          dimTool.type === 'signature'
            ? `/signature-resizer-${dimTool.width}x${dimTool.height}`
            : `/image-resizer-${dimTool.width}x${dimTool.height}`;
        results.push({
          type: 'dimension-tool',
          title: dimTool.title,
          description: dimTool.description,
          url: url,
          meta: `${dimTool.width}×${dimTool.height} px`,
          priority: 120,
        });
      }
    }
  }

  // 3. Search Exams
  for (const exam of exams || []) {
    const nameLower = exam.name.toLowerCase();
    const fullNameLower = (exam.fullName || '').toLowerCase();
    const catLower = (exam.category || '').toLowerCase();
    const keywords = exam.keywords ? exam.keywords.map((k) => k.toLowerCase()) : [];

    let score = 0;

    if (nameLower === normalizedQ || nameLower === rawQ) score += 100;
    else if (fullNameLower === normalizedQ) score += 90;
    else if (normalizedQ.includes(nameLower)) score += 80;
    else if (nameLower.includes(normalizedQ) || rawQ.includes(nameLower)) score += 70;
    else if (fullNameLower.includes(normalizedQ)) score += 60;
    else if (catLower.includes(normalizedQ)) score += 40;
    else if (keywords.some((k) => k.includes(normalizedQ) || normalizedQ.includes(k))) score += 50;

    // Token matches
    if (score === 0 && tokens.length > 0) {
      const matchCount = tokens.filter(
        (t) =>
          nameLower.includes(t) ||
          fullNameLower.includes(t) ||
          catLower.includes(t) ||
          keywords.some((k) => k.includes(t))
      ).length;
      if (matchCount > 0) {
        score += matchCount * 25;
      }
    }

    if (score > 0) {
      results.push({
        type: 'exam',
        title: `${exam.name} ${exam.fullName ? `(${exam.fullName})` : ''}`,
        description: `Photo: ${exam.photo.width}x${exam.photo.height} | Max ${exam.photo.maxKB}KB. Sig: ${exam.signature.width}x${exam.signature.height} | Max ${exam.signature.maxKB}KB.`,
        url: `/exams/${exam.slug}`,
        meta: (exam.category || 'EXAM').toUpperCase(),
        priority: score,
      });
    }
  }

  // 4. Search Standard Tools
  for (const tool of tools || []) {
    const nameLower = tool.name.toLowerCase();
    const descLower = (tool.description || '').toLowerCase();
    const keywords = tool.keywords ? tool.keywords.map((k) => k.toLowerCase()) : [];

    let score = 0;
    if (nameLower === normalizedQ || nameLower === rawQ) score += 95;
    else if (nameLower.includes(normalizedQ)) score += 65;
    else if (descLower.includes(normalizedQ)) score += 45;
    else if (keywords.some((k) => k.includes(normalizedQ) || normalizedQ.includes(k))) score += 55;

    // Token matches
    if (score === 0 && tokens.length > 0) {
      const matchCount = tokens.filter(
        (t) => nameLower.includes(t) || descLower.includes(t) || keywords.some((k) => k.includes(t))
      ).length;
      if (matchCount > 0) {
        score += matchCount * 20;
      }
    }

    if (score > 0) {
      results.push({
        type: 'tool',
        title: tool.name,
        description: tool.description,
        url: tool.path,
        meta: (tool.category || 'TOOL').toUpperCase(),
        priority: score,
      });
    }
  }

  // Deduplicate results by URL
  const seenUrls = new Set<string>();
  const uniqueResults: SearchResult[] = [];
  for (const r of results.sort((a, b) => b.priority - a.priority)) {
    if (!seenUrls.has(r.url)) {
      seenUrls.add(r.url);
      uniqueResults.push(r);
    }
  }

  return uniqueResults.slice(0, 20);
}
