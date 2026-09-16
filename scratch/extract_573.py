import json
import re

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

full_text = ""
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        content_str = str(data.get('content', ''))
        if '| 573 |' in content_str:
            full_text = content_str
            break

print(f"Found block with 573 table, length={len(full_text)}")

# Extract table lines: e.g. "| 1 | SSC CGL | ..."
table_rows = []
for line in full_text.split('\n'):
    line = line.strip()
    if line.startswith('|') and '|' in line[1:]:
        parts = [p.strip() for p in line.split('|')[1:-1]]
        if len(parts) >= 10 and parts[0].isdigit():
            table_rows.append({
                'id': int(parts[0]),
                'exam': parts[1],
                'category': parts[2],
                'photo_type': parts[3],
                'photo_dims': parts[4],
                'photo_size': parts[5],
                'sig_dims': parts[6],
                'sig_size': parts[7],
                'format': parts[8],
                'instructions': parts[9]
            })

print(f"Successfully extracted {len(table_rows)} table rows!")
if len(table_rows) > 0:
    print(f"Row 1: {table_rows[0]}")
    print(f"Row 573: {table_rows[-1]}")
    
    with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'w', encoding='utf-8') as f:
        json.dump(table_rows, f, indent=2)
    print("Saved to scratch/parsed_573_exams.json")
