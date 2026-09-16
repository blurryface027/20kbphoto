import re
import json

# Parse existing exams from src/data/exams.ts
exams_ts_path = '/home/alpha/Documents/examfiles/src/data/exams.ts'
with open(exams_ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract existing exam objects from exams.ts using regex or JS parsing logic
# We can extract slug, name, fullName, category
existing_exams = []
exam_blocks = re.findall(r'\{\s*name:\s*[\'"]([^\'"]+)[\'"],\s*slug:\s*[\'"]([^\'"]+)[\'"],\s*fullName:\s*[\'"]([^\'"]+)[\'"],\s*category:\s*[\'"]([^\'"]+)[\'"]', content)

for name, slug, fullName, category in exam_blocks:
    existing_exams.append({
        'name': name,
        'slug': slug,
        'fullName': fullName,
        'category': category
    })

print(f"Total existing exams in exams.ts: {len(existing_exams)}")
for e in existing_exams:
    print(f"  - [{e['slug']}] {e['name']} ({e['fullName']})")
