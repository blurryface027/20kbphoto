import json
import re

with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'r', encoding='utf-8') as f:
    source_573 = json.load(f)

with open('/home/alpha/Documents/examfiles/scratch/perfect_audit_result.json', 'r', encoding='utf-8') as f:
    audit_report = json.load(f)

# Load existing exams from src/data/exams.ts
with open('/home/alpha/Documents/examfiles/src/data/exams.ts', 'r', encoding='utf-8') as f:
    existing_ts_content = f.read()

# Category slug mapping helper
category_slug_map = {
    'SSC': 'ssc', 'UPSC': 'upsc', 'Banking': 'banking', 'Regulatory': 'banking',
    'Insurance': 'banking', 'Housing Finance': 'banking', 'Railways': 'railway',
    'Defence': 'defence', 'Coast Guard': 'defence', 'Paramilitary': 'defence',
    'Teaching': 'teaching', 'State TET': 'teaching', 'Medical Entrance': 'admissions',
    'Medical Rectt': 'others', 'State Health': 'others', 'Engineering Entrance': 'admissions',
    'PSU/Research': 'others', 'PSU/Energy': 'others', 'PSU/Engg': 'others',
    'PSU/Mining': 'others', 'PSU/Power': 'others', 'PSU/Defence': 'others',
    'PSU/Infra': 'others', 'PSU/Aviation': 'others', 'University Entrance': 'admissions',
    'Design Entrance': 'admissions', 'Architecture Entrance': 'admissions',
    'Law Entrance': 'admissions', 'Management Entrance': 'admissions',
    'Pharma Entrance': 'admissions', 'Science Entrance': 'admissions',
    'Research Entrance': 'admissions', 'Biotech Entrance': 'admissions',
    'Teaching Entrance': 'admissions', 'State Entrance': 'admissions',
    'Postal': 'others', 'Central Govt': 'others', 'Central Police': 'defence',
    'Intelligence': 'defence', 'Research': 'others', 'Defence Civilian': 'defence',
    'Telecom': 'others', 'Telecom/PSU': 'others', 'PSU/Finance': 'others',
    'PSU/Shipping': 'others', 'PSU/Ports': 'others', 'Judiciary': 'judicial',
    'Judiciary/Legal': 'judicial', 'High Court': 'judicial', 'Supreme Court': 'judicial',
    'District Court': 'judicial', 'PSUs/Banking': 'banking', 'State Govt': 'others',
    'State PSC (UP)': 'state-psc', 'State Subordinate (UP)': 'others', 'Police (UP)': 'police',
    'Teaching (UP)': 'teaching', 'State PSC (Bihar)': 'state-psc', 'State Subordinate (Bihar)': 'others',
    'Police (Bihar)': 'police', 'Technical (Bihar)': 'others', 'Teaching (Bihar)': 'teaching',
    'Panchayati Raj (Bihar)': 'others', 'State PSC (Rajasthan)': 'state-psc',
    'State Subordinate (Raj)': 'others', 'Police (Rajasthan)': 'police',
    'Teaching (Rajasthan)': 'teaching', 'State PSC (MP)': 'state-psc',
    'State Subordinate (MP)': 'others', 'State PSC (Maha)': 'state-psc',
    'Police (Maha)': 'police', 'Teaching (Maha)': 'teaching', 'Revenue (Maha)': 'others',
    'State Subordinate (Maha)': 'others', 'State PSC (WB)': 'state-psc',
    'Teaching (WB)': 'teaching', 'Police (WB)': 'police', 'State PSC (Haryana)': 'state-psc',
    'State Subordinate (Har)': 'others', 'Police (Haryana)': 'police',
    'Teaching (Haryana)': 'teaching', 'State PSC (Punjab)': 'state-psc',
    'State Subordinate (Pun)': 'others', 'Police (Punjab)': 'police',
    'Teaching (Punjab)': 'teaching', 'State PSC (UK)': 'state-psc',
    'State Subordinate (UK)': 'others', 'Police (UK)': 'police', 'Teaching (UK)': 'teaching',
    'State PSC (HP)': 'state-psc', 'Teaching (HP)': 'teaching', 'Police (HP)': 'police',
    'Revenue (HP)': 'others', 'Forest (HP)': 'others', 'State Subordinate (HP)': 'others',
    'State PSC (Odisha)': 'state-psc', 'State Subordinate (Odisha)': 'others',
    'Police (Odisha)': 'police', 'Teaching (Odisha)': 'teaching', 'Forest (Odisha)': 'others',
    'State PSC (Jharkhand)': 'state-psc', 'State Subordinate (Jhar)': 'others',
    'Teaching (Jharkhand)': 'teaching', 'Police (Jharkhand)': 'police',
    'Forest (Jharkhand)': 'others', 'State PSC (CG)': 'state-psc',
    'State Subordinate (CG)': 'others', 'Teaching (CG)': 'teaching',
    'Police (CG)': 'police', 'Forest (CG)': 'others', 'State PSC (Karnataka)': 'state-psc',
    'State Subordinate (Kar)': 'others', 'Police (Karnataka)': 'police',
    'Teaching (Karnataka)': 'teaching', 'Revenue (Karnataka)': 'others',
    'State PSC (Kerala)': 'state-psc', 'Police (Kerala)': 'police', 'Teaching (Kerala)': 'teaching',
    'State PSC (TN)': 'state-psc', 'Police (TN)': 'police', 'Teaching (TN)': 'teaching',
    'Forest (TN)': 'others', 'State PSC (AP)': 'state-psc', 'Police (AP)': 'police',
    'Teaching (AP)': 'teaching', 'State Subordinate (AP)': 'others', 'State PSC (TS)': 'state-psc',
    'Police (TS)': 'police', 'Teaching (TS)': 'teaching', 'Revenue (TS)': 'others',
    'State Subordinate (TS)': 'others', 'State PSC (Assam)': 'state-psc',
    'Police (Assam)': 'police', 'Teaching (Assam)': 'teaching', 'State Subordinate (Assam)': 'others',
    'State PSC (Meghalaya)': 'state-psc', 'Police (Meghalaya)': 'police',
    'State PSC (Manipur)': 'state-psc', 'Police (Manipur)': 'police',
    'State PSC (Tripura)': 'state-psc', 'Teaching (Tripura)': 'teaching',
    'Police (Tripura)': 'police', 'State PSC (Nagaland)': 'state-psc',
    'Police (Nagaland)': 'police', 'State PSC (Mizoram)': 'state-psc',
    'Teaching (Mizoram)': 'teaching', 'State PSC (Arunachal)': 'state-psc',
    'State PSC (Sikkim)': 'state-psc'
}

def parse_dims(dims_str, default_w=200, default_h=230):
    if not dims_str or 'N/A' in dims_str or 'Embedded' in dims_str or 'Attached' in dims_str or 'Frame' in dims_str:
        return default_w, default_h
    m_px = re.search(r'(\d+)\s*x\s*(\d+)\s*px', dims_str, re.I)
    if m_px:
        return int(m_px.group(1)), int(m_px.group(2))
    m_cm = re.search(r'([\d\.]+)\s*x\s*([\d\.]+)\s*cm', dims_str, re.I)
    if m_cm:
        return int(round(float(m_cm.group(1)) * 78.74)), int(round(float(m_cm.group(2)) * 78.74))
    m_mm = re.search(r'([\d\.]+)\s*x\s*([\d\.]+)\s*mm', dims_str, re.I)
    if m_mm:
        return int(round(float(m_mm.group(1)) * 7.874)), int(round(float(m_mm.group(2)) * 7.874))
    m_px_range = re.search(r'(\d+)\s*x\s*(\d+)', dims_str, re.I)
    if m_px_range:
        return int(m_px_range.group(1)), int(m_px_range.group(2))
    return default_w, default_h

def parse_kb(kb_str, default_min=10, default_max=50):
    if not kb_str or 'N/A' in kb_str or 'Live' in kb_str or 'Hardcopy' in kb_str or 'Physical' in kb_str or 'Combined' in kb_str:
        return 0, default_max
    m_range = re.search(r'(\d+)\s*to\s*(\d+)\s*KB', kb_str, re.I)
    if m_range:
        return int(m_range.group(1)), int(m_range.group(2))
    m_max = re.search(r'Max\s*(\d+)\s*KB', kb_str, re.I)
    if m_max:
        return 0, int(m_max.group(1))
    m_max_mb = re.search(r'Max\s*(\d+)\s*MB', kb_str, re.I)
    if m_max_mb:
        return 0, int(m_max_mb.group(1)) * 1024
    m_single = re.search(r'(\d+)\s*KB', kb_str, re.I)
    if m_single:
        return 0, int(m_single.group(1))
    return default_min, default_max

def get_clean_slug(name):
    s = name.lower()
    s = re.sub(r'\(.*?\)', '', s)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

all_generated_exams = []
seen_slugs = set()

for row in source_573:
    rid = row['id']
    name = row['exam']
    raw_cat = row['category']
    photo_type = row['photo_type']
    photo_dims = row['photo_dims']
    photo_size = row['photo_size']
    sig_dims = row['sig_dims']
    sig_size = row['sig_size']
    fmt = row['format']
    instructions = row['instructions']

    # Skip abolished or offline or internal duplicate rows from creating a separate new page
    if photo_type in ['Abolished', 'Deputation', 'Offline'] or 'abolished' in instructions.lower() or 'deputation' in instructions.lower() or 'hardcopy' in fmt.lower() or name in ['AP Grama Sachivalayam', 'TNPSC VAO', 'TN VAO Special', 'ICAR AIEEA']:
        continue

    slug = get_clean_slug(name)
    if slug in seen_slugs:
        slug = f"{slug}-{rid}"
    seen_slugs.add(slug)

    cat_slug = category_slug_map.get(raw_cat, 'others')

    p_w, p_h = parse_dims(photo_dims, 200, 240)
    p_min_kb, p_max_kb = parse_kb(photo_size, 20, 50)
    
    s_w, s_h = parse_dims(sig_dims, 140, 60)
    s_min_kb, s_max_kb = parse_kb(sig_size, 10, 20)

    # Clean format string
    fmt_str = 'JPG'
    if 'PNG' in fmt.upper():
        fmt_str = 'PNG'
    elif 'JPEG' in fmt.upper():
        fmt_str = 'JPEG'
    
    # Priority determination
    priority = 'P2'
    if rid in [1, 2, 3, 4, 21, 23, 24, 38, 39, 45, 46, 50, 76, 78, 79, 100, 101, 137, 174, 197, 237, 260, 322, 336, 341, 357, 374, 388, 401, 416, 426, 437, 449, 459, 473, 484, 494, 506, 517, 532, 544, 555]:
        priority = 'P0'
    elif rid <= 150 or 'PSC' in name or 'CET' in name or 'TET' in name or 'Police' in name or 'PO' in name or 'Clerk' in name:
        priority = 'P1'

    # Extract state if applicable
    state_match = re.search(r'\(([^)]+)\)', raw_cat)
    state_val = state_match.group(1) if state_match else None

    # Full name derivation
    full_name = f"{name} ({instructions.split(';')[0]})" if instructions and len(instructions) < 50 else f"{name} Recruitment"

    keywords = [
        f"{name.lower()} photo size",
        f"{name.lower()} signature dimensions",
        f"{name.lower()} photo resizer",
        f"{name.lower()} online form photo"
    ]

    exam_obj = {
        "name": name,
        "slug": slug,
        "fullName": full_name,
        "category": cat_slug,
        "authority": instructions.split(';')[0] if ';' in instructions else instructions,
        "photo": {
            "width": p_w,
            "height": p_h,
            "minKB": p_min_kb,
            "maxKB": p_max_kb,
            "format": fmt_str
        },
        "signature": {
            "width": s_w,
            "height": s_h,
            "minKB": s_min_kb,
            "maxKB": s_max_kb,
            "format": fmt_str
        },
        "source": "Official Notification",
        "lastVerified": "2026-09-16",
        "verificationStatus": "verified" if photo_type == "Scanned" else "needs-review",
        "relatedExams": [],
        "keywords": keywords,
        "priority": priority
    }
    if state_val:
        exam_obj["state"] = state_val

    all_generated_exams.append(exam_obj)

print(f"Total processed generated exam objects: {len(all_generated_exams)}")

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'w', encoding='utf-8') as out:
    json.dump(all_generated_exams, out, indent=2)

print("Saved scratch/generated_exams_list.json")
