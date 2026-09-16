import json
import re

with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'r', encoding='utf-8') as f:
    source_573 = json.load(f)

# Helper function to parse photo/sig dimensions into px numbers
def parse_dims(dims_str, default_w=200, default_h=230):
    if not dims_str or 'N/A' in dims_str or 'Embedded' in dims_str or 'Attached' in dims_str:
        return default_w, default_h
    
    # Check px format: e.g. "200 x 230 px", "550x550 to 1000x1000 px", "140 x 60 px"
    m_px = re.search(r'(\d+)\s*x\s*(\d+)\s*px', dims_str, re.I)
    if m_px:
        return int(m_px.group(1)), int(m_px.group(2))
    
    # Check range px format: e.g. "550x550 to 1000x1000"
    m_px_range = re.search(r'(\d+)\s*x\s*(\d+)', dims_str, re.I)

    # Check cm/mm format: e.g. "3.5 x 4.5 cm", "35 x 45 mm", "4.0 x 2.0 cm"
    m_cm = re.search(r'([\d\.]+)\s*x\s*([\d\.]+)\s*cm', dims_str, re.I)
    if m_cm:
        w_cm = float(m_cm.group(1))
        h_cm = float(m_cm.group(2))
        # 200 DPI conversion (1 cm = ~78.74 px)
        return int(round(w_cm * 78.74)), int(round(h_cm * 78.74))
    
    m_mm = re.search(r'([\d\.]+)\s*x\s*([\d\.]+)\s*mm', dims_str, re.I)
    if m_mm:
        w_mm = float(m_mm.group(1))
        h_mm = float(m_mm.group(2))
        return int(round(w_mm * 7.874)), int(round(h_mm * 7.874))
    
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

# Map raw category strings to project category slugs
category_slug_map = {
    'SSC': 'ssc',
    'UPSC': 'upsc',
    'Banking': 'banking',
    'Regulatory': 'banking',
    'Insurance': 'banking',
    'Housing Finance': 'banking',
    'Railways': 'railway',
    'Defence': 'defence',
    'Coast Guard': 'defence',
    'Paramilitary': 'defence',
    'Teaching': 'teaching',
    'State TET': 'teaching',
    'Medical Entrance': 'admissions',
    'Medical Rectt': 'others',
    'State Health': 'others',
    'Engineering Entrance': 'admissions',
    'PSU/Research': 'others',
    'PSU/Energy': 'others',
    'PSU/Engg': 'others',
    'PSU/Mining': 'others',
    'PSU/Power': 'others',
    'PSU/Defence': 'others',
    'PSU/Infra': 'others',
    'PSU/Aviation': 'others',
    'University Entrance': 'admissions',
    'Design Entrance': 'admissions',
    'Architecture Entrance': 'admissions',
    'Law Entrance': 'admissions',
    'Management Entrance': 'admissions',
    'Pharma Entrance': 'admissions',
    'Science Entrance': 'admissions',
    'Research Entrance': 'admissions',
    'Biotech Entrance': 'admissions',
    'Teaching Entrance': 'admissions',
    'State Entrance': 'admissions',
    'Postal': 'others',
    'Central Govt': 'others',
    'Central Police': 'defence',
    'Intelligence': 'defence',
    'Research': 'others',
    'Defence Civilian': 'defence',
    'Telecom': 'others',
    'Telecom/PSU': 'others',
    'PSU/Finance': 'others',
    'PSU/Shipping': 'others',
    'PSU/Ports': 'others',
    'Judiciary': 'judicial',
    'Judiciary/Legal': 'judicial',
    'High Court': 'judicial',
    'Supreme Court': 'judicial',
    'District Court': 'judicial',
    'PSUs/Banking': 'banking',
    'State Govt': 'others',
    'State PSC (UP)': 'state-psc',
    'State Subordinate (UP)': 'others',
    'Police (UP)': 'police',
    'Teaching (UP)': 'teaching',
    'State PSC (Bihar)': 'state-psc',
    'State Subordinate (Bihar)': 'others',
    'Police (Bihar)': 'police',
    'Technical (Bihar)': 'others',
    'Teaching (Bihar)': 'teaching',
    'Panchayati Raj (Bihar)': 'others',
    'State PSC (Rajasthan)': 'state-psc',
    'State Subordinate (Raj)': 'others',
    'Police (Rajasthan)': 'police',
    'Teaching (Rajasthan)': 'teaching',
    'State PSC (MP)': 'state-psc',
    'State Subordinate (MP)': 'others',
    'State PSC (Maha)': 'state-psc',
    'Police (Maha)': 'police',
    'Teaching (Maha)': 'teaching',
    'Revenue (Maha)': 'others',
    'State Subordinate (Maha)': 'others',
    'State PSC (WB)': 'state-psc',
    'Teaching (WB)': 'teaching',
    'Police (WB)': 'police',
    'State PSC (Haryana)': 'state-psc',
    'State Subordinate (Har)': 'others',
    'Police (Haryana)': 'police',
    'Teaching (Haryana)': 'teaching',
    'State PSC (Punjab)': 'state-psc',
    'State Subordinate (Pun)': 'others',
    'Police (Punjab)': 'police',
    'Teaching (Punjab)': 'teaching',
    'State PSC (UK)': 'state-psc',
    'State Subordinate (UK)': 'others',
    'Police (UK)': 'police',
    'Teaching (UK)': 'teaching',
    'State PSC (HP)': 'state-psc',
    'Teaching (HP)': 'teaching',
    'Police (HP)': 'police',
    'Revenue (HP)': 'others',
    'Forest (HP)': 'others',
    'State Subordinate (HP)': 'others',
    'State PSC (Odisha)': 'state-psc',
    'State Subordinate (Odisha)': 'others',
    'Police (Odisha)': 'police',
    'Teaching (Odisha)': 'teaching',
    'Forest (Odisha)': 'others',
    'State PSC (Jharkhand)': 'state-psc',
    'State Subordinate (Jhar)': 'others',
    'Teaching (Jharkhand)': 'teaching',
    'Police (Jharkhand)': 'police',
    'Forest (Jharkhand)': 'others',
    'State PSC (CG)': 'state-psc',
    'State Subordinate (CG)': 'others',
    'Teaching (CG)': 'teaching',
    'Police (CG)': 'police',
    'Forest (CG)': 'others',
    'State PSC (Karnataka)': 'state-psc',
    'State Subordinate (Kar)': 'others',
    'Police (Karnataka)': 'police',
    'Teaching (Karnataka)': 'teaching',
    'Revenue (Karnataka)': 'others',
    'State PSC (Kerala)': 'state-psc',
    'Police (Kerala)': 'police',
    'Teaching (Kerala)': 'teaching',
    'State PSC (TN)': 'state-psc',
    'Police (TN)': 'police',
    'Teaching (TN)': 'teaching',
    'Forest (TN)': 'others',
    'State PSC (AP)': 'state-psc',
    'Police (AP)': 'police',
    'Teaching (AP)': 'teaching',
    'State Subordinate (AP)': 'others',
    'State PSC (TS)': 'state-psc',
    'Police (TS)': 'police',
    'Teaching (TS)': 'teaching',
    'Revenue (TS)': 'others',
    'State Subordinate (TS)': 'others',
    'State PSC (Assam)': 'state-psc',
    'Police (Assam)': 'police',
    'Teaching (Assam)': 'teaching',
    'State Subordinate (Assam)': 'others',
    'State PSC (Meghalaya)': 'state-psc',
    'Police (Meghalaya)': 'police',
    'State PSC (Manipur)': 'state-psc',
    'Police (Manipur)': 'police',
    'State PSC (Tripura)': 'state-psc',
    'Teaching (Tripura)': 'teaching',
    'Police (Tripura)': 'police',
    'State PSC (Nagaland)': 'state-psc',
    'Police (Nagaland)': 'police',
    'State PSC (Mizoram)': 'state-psc',
    'Teaching (Mizoram)': 'teaching',
    'State PSC (Arunachal)': 'state-psc',
    'State PSC (Sikkim)': 'state-psc'
}

print(f"Total raw categories mapped: {len(category_slug_map)}")
