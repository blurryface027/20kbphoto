import json

with open('/home/alpha/Documents/examfiles/scratch/generated_exams_list.json', 'r', encoding='utf-8') as f:
    exams_data = json.load(f)

states_list = [
    {"name": "Andhra Pradesh", "slug": "andhra-pradesh"},
    {"name": "Arunachal Pradesh", "slug": "arunachal-pradesh"},
    {"name": "Assam", "slug": "assam"},
    {"name": "Bihar", "slug": "bihar"},
    {"name": "Chhattisgarh", "slug": "chhattisgarh"},
    {"name": "Delhi", "slug": "delhi"},
    {"name": "Goa", "slug": "goa"},
    {"name": "Gujarat", "slug": "gujarat"},
    {"name": "Haryana", "slug": "haryana"},
    {"name": "Himachal Pradesh", "slug": "himachal-pradesh"},
    {"name": "Jammu & Kashmir", "slug": "jammu-kashmir"},
    {"name": "Jharkhand", "slug": "jharkhand"},
    {"name": "Karnataka", "slug": "karnataka"},
    {"name": "Kerala", "slug": "kerala"},
    {"name": "Madhya Pradesh", "slug": "madhya-pradesh"},
    {"name": "Maharashtra", "slug": "maharashtra"},
    {"name": "Manipur", "slug": "manipur"},
    {"name": "Meghalaya", "slug": "meghalaya"},
    {"name": "Mizoram", "slug": "mizoram"},
    {"name": "Nagaland", "slug": "nagaland"},
    {"name": "Odisha", "slug": "odisha"},
    {"name": "Punjab", "slug": "punjab"},
    {"name": "Rajasthan", "slug": "rajasthan"},
    {"name": "Sikkim", "slug": "sikkim"},
    {"name": "Tamil Nadu", "slug": "tamil-nadu"},
    {"name": "Telangana", "slug": "telangana"},
    {"name": "Tripura", "slug": "tripura"},
    {"name": "Uttar Pradesh", "slug": "uttar-pradesh"},
    {"name": "Uttarakhand", "slug": "uttarakhand"},
    {"name": "West Bengal", "slug": "west-bengal"}
]

for st in states_list:
    st_name = st['name']
    st_slug = st['slug']

    matched_exams = [
        e for e in exams_data 
        if (e.get('state') and e.get('state').lower() == st_name.lower()) or 
           st_name.lower() in e.get('name', '').lower() or 
           st_name.lower() in e.get('fullName', '').lower() or
           (st_name == 'Delhi' and 'dsssb' in e.get('slug', '')) or
           (st_name == 'Delhi' and 'delhi' in e.get('slug', '')) or
           (st_name == 'Gujarat' and 'gpsc' in e.get('slug', ''))
    ]

    print(f"State: {st_name:20s} | Slug: {st_slug:20s} | Exams Found: {len(matched_exams)}")

