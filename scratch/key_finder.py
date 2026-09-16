import json

transcript_path = '/home/alpha/.gemini/antigravity/brain/ce8c577f-6c16-4f50-890f-459fbc414b9b/.system_generated/logs/transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if '| 1 | SSC CGL |' in line:
            print(f"Found line {idx}")
            data = json.loads(line)
            # print all keys and types
            print(data.keys())
            # print where '| 1 | SSC CGL |' is located inside data
            def find_key(obj, path=""):
                if isinstance(obj, str):
                    if '| 1 | SSC CGL |' in obj:
                        print(f"  Match at {path}: length={len(obj)}")
                elif isinstance(obj, dict):
                    for k, v in obj.items():
                        find_key(v, f"{path}.{k}")
                elif isinstance(obj, list):
                    for i, item in enumerate(obj):
                        find_key(item, f"{path}[{i}]")
            find_key(data)
            break
