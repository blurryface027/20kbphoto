import json

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        data = json.loads(line)
        print(f"Line {i}: step_index={data.get('step_index')}, type={data.get('type')}, source={data.get('source')}")
        content = data.get('content', '')
        if '573' in str(content):
            print(f"  Found '573' in content, length={len(str(content))}")
            # Find table lines
            lines = str(content).split('\n')
            table_lines = [l for l in lines if l.strip().startswith('|') and len(l.split('|')) > 5]
            print(f"  Table lines count: {len(table_lines)}")
