export interface BlogTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface BlogVisualChart {
  type: 'flow' | 'comparison' | 'matrix' | 'steps';
  title: string;
  description?: string;
  items: {
    label: string;
    sublabel?: string;
    value?: string;
    highlight?: boolean;
    color?: string;
  }[];
}

export interface BlogSection {
  id?: string;
  h2?: string;
  h3?: string;
  paragraphs?: string[];
  list?: string[];
  orderedList?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'info' | 'cta';
    title?: string;
    text: string;
    toolLink?: {
      label: string;
      href: string;
    };
  };
  table?: BlogTable;
  visualChart?: BlogVisualChart;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  sections: BlogSection[];
  faqs: BlogFAQ[];
  relatedToolSlugs: { name?: string; label?: string; href: string; description: string; icon?: string }[];
  relatedArticleSlugs: string[];
}
