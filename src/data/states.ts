export interface State {
  name: string;
  slug: string;
  examSlugs: string[];
}

export const states: State[] = [
  { name: 'Andhra Pradesh', slug: 'andhra-pradesh', examSlugs: ['appsc', 'ap-tet', 'ap-police'] },
  { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', examSlugs: ['appsc-arunachal', 'arunachal-police'] },
  { name: 'Assam', slug: 'assam', examSlugs: ['apsc', 'assam-tet', 'assam-police'] },
  { name: 'Bihar', slug: 'bihar', examSlugs: ['bpsc', 'bssc', 'bihar-police'] },
  { name: 'Chhattisgarh', slug: 'chhattisgarh', examSlugs: ['cgpsc', 'cg-vyapam', 'cg-police'] },
  { name: 'Goa', slug: 'goa', examSlugs: ['gpsc', 'goa-police'] },
  { name: 'Gujarat', slug: 'gujarat', examSlugs: ['gpsc-gujarat', 'gsssb', 'gujarat-police'] },
  { name: 'Haryana', slug: 'haryana', examSlugs: ['hpsc', 'hssc', 'haryana-police'] },
  { name: 'Himachal Pradesh', slug: 'himachal-pradesh', examSlugs: ['hppsc', 'hpsssb', 'hp-police'] },
  { name: 'Jharkhand', slug: 'jharkhand', examSlugs: ['jpsc', 'jssc', 'jharkhand-police'] },
  { name: 'Karnataka', slug: 'karnataka', examSlugs: ['kpsc', 'karnataka-police', 'ktet'] },
  { name: 'Kerala', slug: 'kerala', examSlugs: ['kerala-psc', 'ktet-kerala', 'kerala-police'] },
  { name: 'Madhya Pradesh', slug: 'madhya-pradesh', examSlugs: ['mppsc', 'mp-peb', 'mp-police'] },
  { name: 'Maharashtra', slug: 'maharashtra', examSlugs: ['mpsc', 'mahatet', 'maharashtra-police'] },
  { name: 'Odisha', slug: 'odisha', examSlugs: ['opsc', 'osssc', 'odisha-police'] },
  { name: 'Punjab', slug: 'punjab', examSlugs: ['ppsc', 'psssb', 'punjab-police'] },
  { name: 'Rajasthan', slug: 'rajasthan', examSlugs: ['rpsc', 'rsmssb', 'rajasthan-police'] },
  { name: 'Tamil Nadu', slug: 'tamil-nadu', examSlugs: ['tnpsc', 'tntet', 'tamil-nadu-police'] },
  { name: 'Telangana', slug: 'telangana', examSlugs: ['tspsc', 'ts-tet', 'telangana-police'] },
  { name: 'Uttar Pradesh', slug: 'uttar-pradesh', examSlugs: ['uppsc', 'upsssc', 'up-police'] },
  { name: 'Uttarakhand', slug: 'uttarakhand', examSlugs: ['ukpsc', 'uksssc', 'uttarakhand-police'] },
  { name: 'West Bengal', slug: 'west-bengal', examSlugs: ['wbpsc', 'wbp-police', 'wbtet'] },
  { name: 'Delhi', slug: 'delhi', examSlugs: ['dsssb', 'delhi-police'] }
];
