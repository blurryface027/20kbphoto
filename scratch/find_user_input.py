import json

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        data = json.loads(line)
        if data.get('source') == 'USER_EXPLICIT':
            print(f"User line {idx}: content len={len(data.get('content', ''))}")
            # print sample
            print(data.get('content', '')[:300])
