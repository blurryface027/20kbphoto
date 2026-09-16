import json
import re

file_path = '/home/alpha/Downloads/20kbphoto-claude-prompt-all-573-exams.md'

rows = []
with open(file_path, 'r', encoding='utf-8') as f:
    for line in f:
        line_s = line.strip()
        if line_s.startswith('|') and not line_s.startswith('| ID') and not line_s.startswith('|---') and not line_s.startswith('|:---'):
            parts = [p.strip() for p in line_s.split('|')[1:-1]]
            if len(parts) >= 10 and parts[0].isdigit():
                rows.append({
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

print(f"Total parsed rows from 20kbphoto-claude-prompt-all-573-exams.md: {len(rows)}")
if rows:
    print("First row:", rows[0])
    print("Last row:", rows[-1])
    with open('/home/alpha/Documents/examfiles/scratch/parsed_573_exams.json', 'w', encoding='utf-8') as out:
        json.dump(rows, out, indent=2)
    print("Successfully saved to scratch/parsed_573_exams.json")
