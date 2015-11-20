import csv, json

with open('KNMI_20101231.txt', 'r') as f:
    content = f.readlines()[12:]

jsonList = []

for row in content:
    date = row.split(",")[1]
    year = date[:4]
    month = date[4:6]
    day = date[6:8]
    date = year + "/" + month + "/" + day
    temp = row.split(",")[2].strip()
    jsonList.append([date, temp])

output = json.dumps(jsonList)
print output

with open('data.txt', 'w') as outfile:
    json.dump(output, outfile)
