import json
import re

with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'r', encoding='utf-8') as f:
    source_573 = json.load(f)

with open('/home/alpha/Documents/examfiles/src/data/exams.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'\{\s*name:\s*[\'"]([^\'"]+)[\'"],\s*slug:\s*[\'"]([^\'"]+)[\'"],\s*fullName:\s*[\'"]([^\'"]+)[\'"],\s*category:\s*[\'"]([^\'"]+)[\'"]'
exam_blocks = re.findall(pattern, content)

existing_exams = [{'name': name, 'slug': slug, 'fullName': fullName, 'category': category} for name, slug, fullName, category in exam_blocks]

# Mapping dictionary for known equivalents
known_equivalents = {
    'SSC CGL': 'ssc-cgl',
    'SSC CHSL': 'ssc-chsl',
    'SSC MTS': 'ssc-mts',
    'SSC GD Constable': 'ssc-gd',
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
    'Tripura Police': 'tripura-police'
}

exact_existing = []
equivalent_existing = []
special_skipped = []
genuinely_new = []

for row in source_573:
    rid = row['id']
    name = row['exam']
    photo_type = row['photo_type']
    instructions = row['instructions']

    # Check special status first
    if photo_type in ['Abolished', 'Deputation', 'Offline'] or 'Merged' in instructions or 'Abolished' in instructions or 'deputation' in instructions or name in ['AP Grama Sachivalayam', 'TNPSC VAO', 'TN VAO Special', 'ICAR AIEEA']:
        special_skipped.append({'row': row, 'reason': f"Type: {photo_type} | Notes: {instructions}"})
        continue

    # Check known equivalent or direct slug match
    matched_slug = known_equivalents.get(name)
    if matched_slug:
        equivalent_existing.append({'row': row, 'matched_slug': matched_slug})
    else:
        # Check direct slug match
        clean_name = re.sub(r'[\(\)/]+', ' ', name)
        clean_slug = re.sub(r'\s+', '-', clean_name.strip()).lower()
        clean_slug = re.sub(r'[^a-z0-9\-]', '', clean_slug).strip('-')

        matched = next((e for e in existing_exams if e['slug'] == clean_slug or e['name'].lower() == name.lower()), None)
        if matched:
            exact_existing.append({'row': row, 'matched_slug': matched['slug']})
        else:
            genuinely_new.append({'row': row, 'proposed_slug': clean_slug})

print("="*70)
print("ACCURATE 573 EXAMS AUDIT BREAKDOWN")
print("="*70)
print(f"Total Dataset Rows:                            {len(source_573)}")
print(f"Existing Website Exams (in src/data/exams.ts): {len(existing_exams)}")
print(f"Direct Exact Matches in Website:              {len(exact_existing)}")
print(f"Equivalent Matches in Existing Website Exams:  {len(equivalent_existing)}")
print(f"Special / Abolished / Deputation / Merged / Offline Rows: {len(special_skipped)}")
print(f"Genuinely NEW Exams to Add:                   {len(genuinely_new)}")
print("="*70)

# Detail special skipped rows
print("\nSPECIAL / SKIPPED / MANUAL REVIEW ROWS:")
for item in special_skipped:
    r = item['row']
    print(f"  ID {r['id']:3d}: {r['exam']:30s} | {item['reason']}")

# Save json for detailed implementation plan
report = {
    'total_source_rows': len(source_573),
    'existing_exams_count': len(existing_exams),
    'exact_existing_count': len(exact_existing),
    'equivalent_existing_count': len(equivalent_existing),
    'special_skipped_count': len(special_skipped),
    'genuinely_new_count': len(genuinely_new),
    'exact_existing': exact_existing,
    'equivalent_existing': equivalent_existing,
    'special_skipped': special_skipped,
    'genuinely_new': genuinely_new
}

with open('/home/alpha/Documents/examfiles/scratch/audit_report_final.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2)

print("\nSaved accurate report to scratch/audit_report_final.json")
