import json
import re

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

parsed_rows = []

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line_no, line in enumerate(f):
        if 'SSC CGL' in line:
            data = json.loads(line)
            # Recursively search for string fields containing table rows
            def search_dict_or_str(obj):
                if isinstance(obj, str):
                    for row in obj.split('\n'):
                        r = row.strip()
                        if r.startswith('|') and '|' in r[1:]:
                            parts = [p.strip() for p in r.split('|')[1:-1]]
                            if len(parts) >= 10 and parts[0].isdigit():
                                parsed_rows.append({
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
                elif isinstance(obj, dict):
                    for v in obj.values():
                        search_dict_or_str(v)
                elif isinstance(obj, list):
                    for item in obj:
                        search_dict_or_str(item)

            search_dict_or_str(data)
            if len(parsed_rows) >= 500:
                print(f"Found {len(parsed_rows)} rows in line {line_no}")
                break

# Deduplicate by ID
unique_rows = {}
for r in parsed_rows:
    unique_rows[r['id']] = r

final_list = [unique_rows[i] for i in sorted(unique_rows.keys())]
print(f"Total unique parsed rows: {len(final_list)}")

if len(final_list) > 0:
    print("Min ID:", final_list[0]['id'], final_list[0]['exam'])
    print("Max ID:", final_list[-1]['id'], final_list[-1]['exam'])
    with open('/home/alpha/Documents/examfiles/scratch/exams_573_parsed.json', 'w', encoding='utf-8') as out:
        json.dump(final_list, out, indent=2)
    print("Saved to scratch/exams_573_parsed.json")
