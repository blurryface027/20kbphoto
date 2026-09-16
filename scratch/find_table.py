import json

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'SSC CGL' in line and 'Sikkim PSC' in line:
            print(f"Found on line {idx}, length {len(line)}")
            data = json.loads(line)
            # Find markdown table
            text = str(data)
            lines = text.split('\\n')
            rows = [l for l in lines if l.strip().startswith('|') and len(l.split('|')) > 8]
            print(f"  Extracted table rows: {len(rows)}")
            
            parsed = []
            for r in rows:
                p = [x.strip() for x in r.split('|')[1:-1]]
                if p and p[0].isdigit():
                    parsed.append(p)
            print(f"  Parsed valid rows: {len(parsed)}")
            if len(parsed) > 0:
                print(f"  First: {parsed[0]}")
                print(f"  Last: {parsed[-1]}")
            
            with open('/home/alpha/Documents/examfiles/scratch/parsed_573.json', 'w') as out:
                json.dump(parsed, out, indent=2)
            break
