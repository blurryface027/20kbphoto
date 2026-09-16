import json

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'SSC CGL' in line and 'Sikkim PSC' in line:
            obj = json.loads(line)
            # print structure of obj
            print("Keys:", obj.keys())
            if 'tool_calls' in obj:
                print("Tool calls count:", len(obj['tool_calls']))
                for tc in obj['tool_calls']:
                    print("  Tool call:", tc.get('name'))
            print("Sample text substring:", line[:500])
