import json
import re

with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'r', encoding='utf-8') as f:
    source_573 = json.load(f)

with open('/home/alpha/Documents/examfiles/src/data/exams.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all existing exams from exams.ts
pattern = r'\{\s*name:\s*[\'"]([^\'"]+)[\'"],\s*slug:\s*[\'"]([^\'"]+)[\'"],\s*fullName:\s*[\'"]([^\'"]+)[\'"],\s*category:\s*[\'"]([^\'"]+)[\'"]'
exam_blocks = re.findall(pattern, content)

existing_exams = []
for name, slug, fullName, category in exam_blocks:
    existing_exams.append({
        'name': name,
        'slug': slug,
        'fullName': fullName,
        'category': category
    })

existing_slugs = {e['slug']: e for e in existing_exams}
existing_names = {e['name'].lower(): e for e in existing_exams}

# Audit arrays
exact_matches = []
special_rows = []
new_exams = []

# Detailed mapping
for row in source_573:
    rid = row['id']
    name = row['exam']
    photo_type = row['photo_type']
    instructions = row['instructions']
    cat = row['category']
    photo_dims = row['photo_dims']
    photo_size = row['photo_size']
    sig_dims = row['sig_dims']
    sig_size = row['sig_size']
    fmt = row['format']

    # Generate standardized slug
    clean_name = re.sub(r'[\(\)/]+', ' ', name)
    clean_name = re.sub(r'\s+', '-', clean_name.strip()).lower()
    clean_name = re.sub(r'[^a-z0-9\-]', '', clean_name).strip('-')

    # Special row checks:
    # 1. Abolished
    if photo_type == 'Abolished' or 'abolished' in instructions.lower():
        special_rows.append({'row': row, 'status': 'Abolished', 'details': 'Cadre abolished by state/gov authority'})
        continue
    # 2. Deputation
    if photo_type == 'Deputation' or 'deputation' in instructions.lower():
        special_rows.append({'row': row, 'status': 'Deputation', 'details': 'Deputation only; no direct recruitment'})
        continue
    # 3. Offline
    if photo_type == 'Offline' or 'hardcopy' in fmt.lower() or 'offline' in instructions.lower():
        special_rows.append({'row': row, 'status': 'Offline', 'details': 'Offline submission via physical post/form'})
        continue
    # 4. Merged / Duplicate
    if 'merged into' in instructions.lower() or name in ['AP Grama Sachivalayam', 'TNPSC VAO', 'TN VAO Special', 'ICAR AIEEA']:
        special_rows.append({'row': row, 'status': 'Merged/Duplicate', 'details': instructions})
        continue

    # Check exact slug or exact name
    matched = existing_slugs.get(clean_name) or existing_names.get(name.lower())
    if matched:
        exact_matches.append({'row': row, 'matched': matched})
    else:
        # Check if name is equivalent to an existing exam
        matched_eq = None
        norm_row = re.sub(r'[^a-z0-9]', '', name.lower())
        for ex in existing_exams:
            norm_ex = re.sub(r'[^a-z0-9]', '', ex['name'].lower())
            if norm_ex == norm_row:
                matched_eq = ex
                break
        
        if matched_eq:
            exact_matches.append({'row': row, 'matched': matched_eq})
        else:
            new_exams.append({'row': row, 'slug': clean_name})

print("="*60)
print("COMPREHENSIVE 573 EXAMS AUDIT SUMMARY")
print("="*60)
print(f"Total Source Dataset Rows:                     {len(source_573)}")
print(f"Existing Website Exams (in src/data/exams.ts): {len(existing_exams)}")
print(f"Existing Matches (Exact & Direct Equivalent):  {len(exact_matches)}")
print(f"Special/Merged/Abolished/Offline/Deputation:  {len(special_rows)}")
print(f"Genuinely NEW Exams to Add:                   {len(new_exams)}")
print("="*60)

# Output summary by Category for Genuinely New Exams
cat_counts = {}
for ne in new_exams:
    c = ne['row']['category']
    cat_counts[c] = cat_counts.get(c, 0) + 1

print("\nGENUINELY NEW EXAMS BREAKDOWN BY CATEGORY:")
for c, count in sorted(cat_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  - {c}: {count} new exams")

audit_data = {
    'total_source_rows': len(source_573),
    'existing_exams_count': len(existing_exams),
    'exact_matches_count': len(exact_matches),
    'special_rows_count': len(special_rows),
    'new_exams_count': len(new_exams),
    'exact_matches': exact_matches,
    'special_rows': special_rows,
    'new_exams': new_exams
}

with open('/home/alpha/Documents/examfiles/scratch/audit_report_full.json', 'w', encoding='utf-8') as f:
    json.dump(audit_data, f, indent=2)

print("\nSaved full audit report to scratch/audit_report_full.json")
