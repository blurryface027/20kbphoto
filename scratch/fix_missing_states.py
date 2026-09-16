import json

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'r', encoding='utf-8') as f:
    exams_data = json.load(f)

for e in exams_data:
    name = e['name'].lower()
    slug = e['slug'].lower()

    if 'goa' in name or 'goa' in slug:
        e['state'] = 'Goa'
    elif 'gujarat' in name or 'gpsc' in slug:
        e['state'] = 'Gujarat'
    elif 'jk' in name or 'jk' in slug or 'jammu' in name:
        e['state'] = 'Jammu & Kashmir'

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'w', encoding='utf-8') as out:
    json.dump(exams_data, out, indent=2)

print("Updated Goa, Gujarat, and J&K states in scratch/generated_exams_list.json")
