import json
import re

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'r', encoding='utf-8') as f:
    exams_data = json.load(f)

states_map = {}
for e in exams_data:
    st = e.get('state')
    if st:
        states_map[st] = states_map.get(st, 0) + 1

print("Unique states with exam counts:")
for st, count in sorted(states_map.items(), key=lambda x: x[1], reverse=True):
    print(f"  - {st}: {count} exams")

print(f"\nTotal state-specific exams: {sum(states_map.values())}")
