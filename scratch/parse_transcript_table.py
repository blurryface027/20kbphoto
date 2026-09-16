import json
import re

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

user_prompt_text = ""
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'USER_INPUT':
            user_prompt_text = data.get('content', '')
            break

print(f"User prompt text length: {len(user_prompt_text)}")

# Extract table rows
# Format: | ID | Exam | Category | Photo type | Photo dimensions | Photo size | Signature dimensions | Signature size | Format | Instructions |
rows = []
for line in user_prompt_text.split('\n'):
    line = line.strip()
    if line.startswith('|') and not line.startswith('| ID') and not line.startswith('|---'):
        parts = [p.strip() for p in line.split('|')[1:-1]]
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

print(f"Total parsed rows from 573 exam table: {len(rows)}")
if rows:
    print(f"First row: {rows[0]}")
    print(f"Last row: {rows[-1]}")
