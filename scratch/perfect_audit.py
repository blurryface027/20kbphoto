import json
import re

with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'r', encoding='utf-8') as f:
    source_573 = json.load(f)

with open('/home/alpha/Documents/examfiles/src/data/exams.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'\{\s*name:\s*[\'"]([^\'"]+)[\'"],\s*slug:\s*[\'"]([^\'"]+)[\'"],\s*fullName:\s*[\'"]([^\'"]+)[\'"],\s*category:\s*[\'"]([^\'"]+)[\'"]'
exam_blocks = re.findall(pattern, content)

existing_exams = [{'name': name, 'slug': slug, 'fullName': fullName, 'category': category} for name, slug, fullName, category in exam_blocks]
existing_slugs = {e['slug']: e for e in existing_exams}

def get_clean_slug(name):
    s = name.lower()
    s = re.sub(r'\(.*?\)', '', s)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

exact_existing = []
equivalent_rows = []
special_rows = []
genuinely_new_rows = []

manual_aliases = {
    'SSC CGL': 'ssc-cgl',
    'SSC CHSL': 'ssc-chsl',
    'SSC MTS': 'ssc-mts',
    'SSC GD Constable': 'ssc-gd',
    'SSC Stenographer C': 'ssc-stenographer',
    'SSC Stenographer D': 'ssc-stenographer',
    'SSC Selection Post': 'ssc-selection-post',
    'UPSC CSE (IAS/IFS)': 'upsc-cse',
    'UPSC NDA & NA': 'upsc-nda',
    'UPSC CAPF (AC)': 'upsc-capf',
    'IBPS PO': 'ibps-po',
    'IBPS Clerk': 'ibps-clerk',
    'SBI PO': 'sbi-po',
    'SBI Clerk': 'sbi-clerk',
    'RBI Grade B': 'rbi-grade-b',
    'RBI Assistant': 'rbi-assistant',
    'SBI CBO': 'sbi-cbo',
    'RRB NTPC Graduate': 'rrb-ntpc',
    'RRB NTPC UG': 'rrb-ntpc',
    'RRB Group D (Level-1)': 'rrb-group-d',
    'RRB ALP': 'rrb-alp',
    'Indian Army Agniveer': 'agniveer-army',
    'Indian Navy SSR': 'agniveer-navy',
    'Indian Navy MR': 'agniveer-navy',
    'CRPF Constable': 'crpf',
    'CRPF Head Constable': 'crpf',
    'CRPF Sub-Inspector': 'crpf',
    'CTET Paper I': 'ctet',
    'CTET Paper II': 'ctet',
    'NEET UG': 'neet-ug',
    'JEE Main': 'jee-main',
    'India Post GDS': 'india-post-gds',
    'UPPSC PCS': 'uppsc',
    'BPSC CCE': 'bpsc',
    'RPSC RAS': 'rpsc',
    'MPPSC State Service': 'mppsc',
    'MPSC State Services': 'mpsc',
    'WBCS': 'wbcs',
    'OPSC OCS': 'opsc',
    'APSC CCE': 'apsc',
    'JPSC Civil Services': 'jpsc',
    'TNPSC Group 1': 'tnpsc',
    'TSPSC Group 1': 'tspsc',
    'APPSC Group 1': 'appsc',
    'HPSC HCS': 'hpsc',
    'PPSC PCS': 'ppsc',
    'UKPSC PCS': 'ukpsc',
    'HPAS': 'hppsc',
    'KPSC KAS': 'kpsc',
    'Kerala PSC Degree': 'kpsc-kerala',
    'West Bengal Police': 'wb-police',
    'Haryana Police': 'haryana-police',
    'Rajasthan Police': 'rajasthan-police',
    'Maharashtra Police': 'maharashtra-police',
    'UP Police Constable': 'up-police',
    'UP Police SI': 'up-police',
    'Tamil Nadu Police': 'tn-police',
    'Kerala Police': 'kerala-police',
    'Bihar Police Constable': 'bihar-police',
    'Bihar Police SI': 'bihar-police',
    'Assam Police': 'assam-police',
    'Madhya Pradesh Police': 'mp-police',
    'Karnataka Police': 'karnataka-police',
    'Telangana Police': 'telangana-police',
    'Gujarat Police': 'gujarat-police',
    'Jammu & Kashmir Police': 'jk-police',
    'SSC Delhi Police Const': 'delhi-police',
    'Punjab Police Constable': 'punjab-police',
    'Himachal Pradesh Police': 'hp-police',
    'Uttarakhand Police': 'uk-police',
    'Odisha Police': 'odisha-police',
    'Chhattisgarh Police': 'cg-police',
    'Goa Police': 'goa-police',
    'Meghalaya Police': 'meghalaya-police',
    'Manipur Police': 'manipur-police',
    'Tripura Police': 'tripura-police',
    'Delhi Judicial Service': 'delhi-judicial',
    'Patna High Court Stenographer': 'patna-hc-steno',
    'Bombay High Court Clerk': 'bombay-hc-clerk',
    'Himachal Pradesh High Court Stenographer': 'hp-hc-steno',
    'Gauhati High Court Clerk': 'gauhati-hc-clerk',
    'Maharashtra Judicial Service': 'maharashtra-judicial',
    'Chhattisgarh Judicial Service': 'cg-judicial',
    'Rajasthan Judicial Service': 'rajasthan-judicial',
    'Karnataka Judicial Service': 'karnataka-judicial',
    'West Bengal Judicial Service': 'wb-judicial',
    'State CET Generic': 'polytechnic',
    'State MO Generic': 'others',
    'State Nursing Generic': 'others',
    'State Pharmacist Generic': 'others',
    'State ANM Generic': 'others',
    'State GNM Generic': 'others',
    'State Lab Tech Generic': 'others'
}

for row in source_573:
    rid = row['id']
    name = row['exam']
    photo_type = row['photo_type']
    instructions = row['instructions']

    # 1. Special Status Check
    if photo_type == 'Abolished' or 'abolished' in instructions.lower():
        special_rows.append({'row': row, 'reason': 'Abolished Cadre'})
        continue
    if photo_type == 'Deputation' or 'deputation' in instructions.lower():
        special_rows.append({'row': row, 'reason': 'Deputation Only'})
        continue
    if photo_type == 'Offline' or 'hardcopy' in row['format'].lower() or 'offline' in instructions.lower():
        special_rows.append({'row': row, 'reason': 'Offline Form / Hardcopy Submission'})
        continue
    if name in ['AP Grama Sachivalayam', 'TNPSC VAO', 'TN VAO Special', 'ICAR AIEEA']:
        special_rows.append({'row': row, 'reason': 'Merged / Internal Duplicate Row'})
        continue

    # 2. Check manual aliases or direct slug match
    matched_slug = manual_aliases.get(name)
    clean_s = get_clean_slug(name)

    if matched_slug and matched_slug in existing_slugs:
        equivalent_rows.append({'row': row, 'matched_slug': matched_slug, 'matched_name': existing_slugs[matched_slug]['name']})
    elif clean_s in existing_slugs:
        exact_existing.append({'row': row, 'matched_slug': clean_s, 'matched_name': existing_slugs[clean_s]['name']})
    else:
        # Genuinely new exam
        genuinely_new_rows.append({'row': row, 'slug': clean_s})

print("="*70)
print("FINAL PERFECT AUDIT SUMMARY FOR 573 EXAMS DATASET")
print("="*70)
print(f"Total Source Dataset Rows:                         {len(source_573)}")
print(f"Existing Exams in Website (src/data/exams.ts):     {len(existing_exams)}")
print(f"Direct Exact Matches with Existing Website:        {len(exact_existing)}")
print(f"Equivalent Matches covered by Existing Website:    {len(equivalent_rows)}")
print(f"Special Rows (Abolished / Deputation / Offline / Merged): {len(special_rows)}")
print(f"Genuinely NEW Exams to Add:                       {len(genuinely_new_rows)}")
print("="*70)

total_accounted = len(exact_existing) + len(equivalent_rows) + len(special_rows) + len(genuinely_new_rows)
print(f"Checksum verification: {total_accounted} == {len(source_573)} ({total_accounted == len(source_573)})")

result_json = {
    'total_source_rows': len(source_573),
    'existing_exams_in_site': len(existing_exams),
    'exact_existing_matches': len(exact_existing),
    'equivalent_existing_matches': len(equivalent_rows),
    'special_skipped_rows': len(special_rows),
    'genuinely_new_exams': len(genuinely_new_rows),
    'exact_matches_list': exact_existing,
    'equivalent_matches_list': equivalent_rows,
    'special_rows_list': special_rows,
    'new_exams_list': genuinely_new_rows
}

with open('/home/alpha/Documents/examfiles/scratch/perfect_audit_result.json', 'w', encoding='utf-8') as f:
    json.dump(result_json, f, indent=2)

print("\nSaved perfect audit report to scratch/perfect_audit_result.json")
