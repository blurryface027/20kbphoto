import json

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'r', encoding='utf-8') as f:
    exams_data = json.load(f)

header = """export interface ExamRequirement {
  width: number;
  height: number;
  minKB: number;
  maxKB: number;
  format: string;
  dpi?: number;
  notes?: string;
}

export interface Exam {
  name: string;
  slug: string;
  fullName: string;
  category: string;
  state?: string;
  authority: string;
  photo: ExamRequirement;
  signature: ExamRequirement;
  source: string;
  lastVerified: string;
  verificationStatus: 'verified' | 'needs-review' | 'conflicting' | 'unknown';
  relatedExams: string[];
  keywords: string[];
  priority: 'P0' | 'P1' | 'P2';
}

export const exams: Exam[] = """

footer = """
export const categories = [
  { slug: 'ssc', name: 'SSC', fullName: 'Staff Selection Commission', description: 'Central government staff selection exams', examCount: exams.filter(e => e.category === 'ssc').length },
  { slug: 'upsc', name: 'UPSC', fullName: 'Union Public Service Commission', description: 'Civil services and national defence exams', examCount: exams.filter(e => e.category === 'upsc').length },
  { slug: 'banking', name: 'Banking', fullName: 'Banking Exams (IBPS, SBI, RBI)', description: 'Bank PO, Clerk, and specialist officer exams', examCount: exams.filter(e => e.category === 'banking').length },
  { slug: 'railway', name: 'Railway', fullName: 'Railway Recruitment Board', description: 'RRB NTPC, Group D, ALP exams', examCount: exams.filter(e => e.category === 'railway').length },
  { slug: 'admissions', name: 'Admissions', fullName: 'Entrance & Admissions', description: 'NEET, JEE, and other entrance exams', examCount: exams.filter(e => e.category === 'admissions').length },
  { slug: 'defence', name: 'Defence', fullName: 'Defence Services', description: 'Army, Navy, Air Force, and Paramilitary', examCount: exams.filter(e => e.category === 'defence').length },
  { slug: 'teaching', name: 'Teaching', fullName: 'Teaching Exams', description: 'CTET, State TET, and B.Ed exams', examCount: exams.filter(e => e.category === 'teaching').length },
  { slug: 'state-psc', name: 'State PSC', fullName: 'State Public Service Commission', description: 'State-level civil services exams', examCount: exams.filter(e => e.category === 'state-psc').length },
  { slug: 'police', name: 'Police', fullName: 'State Police Exams', description: 'State police constable and SI exams', examCount: exams.filter(e => e.category === 'police').length },
  { slug: 'judicial', name: 'Judicial', fullName: 'Judicial Services', description: 'High court and district court exams', examCount: exams.filter(e => e.category === 'judicial').length },
  { slug: 'others', name: 'Others', fullName: 'Other Central/State Exams', description: 'Miscellaneous government exams', examCount: exams.filter(e => e.category === 'others').length }
];

export function getExamBySlug(slug: string): Exam | undefined {
  return exams.find((exam) => exam.slug === slug);
}

export function getExamsByCategory(category: string): Exam[] {
  return exams.filter((exam) => exam.category === category);
}

export function getExamsByState(state: string): Exam[] {
  return exams.filter((exam) => exam.state === state);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(exams.map((exam) => exam.category)));
}

export function getAllSlugs(): string[] {
  return exams.map((exam) => exam.slug);
}
"""

ts_exams_json = json.dumps(exams_data, indent=2)

full_content = header + ts_exams_json + ";" + footer

with open('/home/alpha/Documents/examfiles/src/data/exams.ts', 'w', encoding='utf-8') as f:
    f.write(full_content)

print(f"Successfully wrote {len(exams_data)} exams to src/data/exams.ts!")
