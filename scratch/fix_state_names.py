import json
import re

state_clean_map = {
    'UP': 'Uttar Pradesh',
    'MP': 'Madhya Pradesh',
    'Maha': 'Maharashtra',
    'TN': 'Tamil Nadu',
    'WB': 'West Bengal',
    'UK': 'Uttarakhand',
    'AP': 'Andhra Pradesh',
    'HP': 'Himachal Pradesh',
    'CG': 'Chhattisgarh',
    'TS': 'Telangana',
    'Raj': 'Rajasthan',
    'Har': 'Haryana',
    'Pun': 'Punjab',
    'Jhar': 'Jharkhand',
    'Kar': 'Karnataka',
    'Arunachal': 'Arunachal Pradesh'
}

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'r', encoding='utf-8') as f:
    exams_data = json.load(f)

for e in exams_data:
    st = e.get('state')
    if st in state_clean_map:
        e['state'] = state_clean_map[st]

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'w', encoding='utf-8') as out:
    json.dump(exams_data, out, indent=2)

print("Cleaned state names in scratch/generated_exams_list.json")
