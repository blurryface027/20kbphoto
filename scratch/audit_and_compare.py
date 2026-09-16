import json
import re

# Load 573 rows
with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'r', encoding='utf-8') as f:
    source_573 = json.load(f)

# Load existing exams from exams.ts
with open('/home/alpha/Documents/examfiles/src/data/exams.ts', 'r', encoding='utf-8') as f:
    content = f.read()

exam_blocks = re.findall(r'\{\s*name:\s*[\'"]([^\'"]+)[\'"],\s*slug:\s*[\'"]([^\'"]+)[\'"],\s*fullName:\s*[\'"]([^\'"]+)[\'"],\s*category:\s*[\'"]([^\'"]+)[\'"]', content)

existing_by_slug = {}
existing_by_norm_name = {}

for name, slug, fullName, category in exam_blocks:
    item = {'name': name, 'slug': slug, 'fullName': fullName, 'category': category}
    existing_by_slug[slug] = item
    norm = re.sub(r'[^a-z0-9]', '', name.lower())
    existing_by_norm_name[norm] = item

print(f"Loaded {len(source_573)} source rows.")
print(f"Loaded {len(existing_by_slug)} existing exams from exams.ts.")

# Mapping logic
exact_matches = []
equivalent_matches = []
duplicate_or_special_rows = []
new_exams_to_add = []

for row in source_573:
    rid = row['id']
    name = row['exam']
    instructions = row['instructions']
    photo_type = row['photo_type']

    norm_name = re.sub(r'[^a-z0-9]', '', name.lower())
    
    # Check special status first
    if photo_type in ['Abolished', 'Deputation', 'Offline'] or 'Merged' in instructions or 'Abolished' in instructions or 'deputation' in instructions or name in ['AP Grama Sachivalayam', 'TNPSC VAO', 'TN VAO Special']:
        duplicate_or_special_rows.append({
            'row': row,
            'reason': f"Special status: photo_type='{photo_type}', instructions='{instructions}'"
        })
        continue

    # 1. Direct Slug or Normalized Name Match
    # Formulate proposed slug
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

    matched = None
    match_type = None

    if slug in existing_by_slug:
        matched = existing_by_slug[slug]
        match_type = 'exact_slug'
    elif norm_name in existing_by_norm_name:
        matched = existing_by_norm_name[norm_name]
        match_type = 'exact_norm_name'
    else:
        # Check equivalent matches
        # e.g., 'CTET Paper I' -> 'ctet', 'DSSSB PRT' -> 'dsssb', 'UPSC CSE (IAS/IFS)' -> 'upsc-cse', 'Indian Army Agniveer' -> 'agniveer-army'
        for e_slug, e_item in existing_by_slug.items():
            e_norm = re.sub(r'[^a-z0-9]', '', e_item['name'].lower())
            if e_norm in norm_name or norm_name in e_norm:
                # Check for strong match
                matched = e_item
                match_type = 'equivalent'
                break

    if matched:
        if match_type in ['exact_slug', 'exact_norm_name']:
            exact_matches.append({'row': row, 'matched': matched})
        else:
            equivalent_matches.append({'row': row, 'matched': matched})
    else:
        new_exams_to_add.append({'row': row, 'proposed_slug': slug})

print(f"\n--- AUDIT RESULTS ---")
print(f"Total Source Rows: {len(source_573)}")
print(f"Existing Exact Matches: {len(exact_matches)}")
print(f"Existing Equivalent Matches: {len(equivalent_matches)}")
print(f"Special / Skipped / Duplicate / Abolished / Deputation / Offline Rows: {len(duplicate_or_special_rows)}")
print(f"Genuinely NEW Exams to Add: {len(new_exams_to_add)}")

# Print sample new exams
print("\nSample Genuinely New Exams (First 15):")
for item in new_exams_to_add[:15]:
    r = item['row']
    print(f"  ID {r['id']:3d}: [{item['proposed_slug']}] {r['exam']} (Cat: {r['category']}, Photo: {r['photo_dims']} | {r['photo_size']})")
