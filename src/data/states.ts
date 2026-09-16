import { exams, Exam } from './exams';

export interface StateData {
  name: string;
  slug: string;
  count: number;
}

export const states: StateData[] = [
  { name: 'Uttar Pradesh', slug: 'uttar-pradesh', count: 19 },
  { name: 'Rajasthan', slug: 'rajasthan', count: 17 },
  { name: 'Bihar', slug: 'bihar', count: 16 },
  { name: 'Madhya Pradesh', slug: 'madhya-pradesh', count: 14 },
  { name: 'Odisha', slug: 'odisha', count: 14 },
  { name: 'Maharashtra', slug: 'maharashtra', count: 13 },
  { name: 'Haryana', slug: 'haryana', count: 13 },
  { name: 'Tamil Nadu', slug: 'tamil-nadu', count: 13 },
  { name: 'West Bengal', slug: 'west-bengal', count: 12 },
  { name: 'Uttarakhand', slug: 'uttarakhand', count: 12 },
  { name: 'Karnataka', slug: 'karnataka', count: 12 },
  { name: 'Punjab', slug: 'punjab', count: 11 },
  { name: 'Jharkhand', slug: 'jharkhand', count: 11 },
  { name: 'Kerala', slug: 'kerala', count: 11 },
  { name: 'Andhra Pradesh', slug: 'andhra-pradesh', count: 11 },
  { name: 'Himachal Pradesh', slug: 'himachal-pradesh', count: 10 },
  { name: 'Telangana', slug: 'telangana', count: 10 },
  { name: 'Chhattisgarh', slug: 'chhattisgarh', count: 9 },
  { name: 'Assam', slug: 'assam', count: 6 },
  { name: 'Tripura', slug: 'tripura', count: 3 },
  { name: 'Meghalaya', slug: 'meghalaya', count: 2 },
  { name: 'Nagaland', slug: 'nagaland', count: 2 },
  { name: 'Mizoram', slug: 'mizoram', count: 2 },
  { name: 'Gujarat', slug: 'gujarat', count: 1 },
  { name: 'Manipur', slug: 'manipur', count: 1 },
  { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', count: 1 },
  { name: 'Sikkim', slug: 'sikkim', count: 1 },
  { name: 'Delhi', slug: 'delhi', count: 6 },
  { name: 'Jammu & Kashmir', slug: 'jammu-kashmir', count: 3 },
  { name: 'Goa', slug: 'goa', count: 2 }
];

export function getStateBySlug(slug: string): StateData | undefined {
  return states.find(s => s.slug === slug);
}

export function getExamsForState(stateSlug: string): Exam[] {
  const stateObj = getStateBySlug(stateSlug);
  if (!stateObj) return [];
  const nameLower = stateObj.name.toLowerCase();
  
  return exams.filter(e => {
    if (e.state && e.state.toLowerCase() === nameLower) return true;
    const n = e.name.toLowerCase();
    const fn = e.fullName.toLowerCase();
    if (n.includes(nameLower) || fn.includes(nameLower)) return true;
    if (stateSlug === 'delhi' && (e.slug.includes('delhi') || e.slug.includes('dsssb'))) return true;
    if (stateSlug === 'gujarat' && (e.slug.includes('gujarat') || e.slug.includes('gpsc'))) return true;
    return false;
  });
}
