# must npm install couchdbkit before running the script
import couchdbkit
import csv
import json

cloudantUsername = 'bsp'
cloudantPassword = 'demoPass'
dbName = 'july08'
csvFileName = 'DATA_2015_2_2.csv'

# open csv with data (will be a HTTP call to GPAC in the future)
f = open(csvFileName, 'rU'	)
csv_f = csv.reader(f)

# get field names from first row of csv file
fieldnames = csv_f.next()

# establish the array to hold the bulk load documents
docs = [[]]

# establish counters to break up the loads into smaller chunks
arrayCounter = 0
docsCounter = 0

# set the fieldnames as the dictionary keys
reader = csv.DictReader(f, fieldnames)

# for every row, extract the relevant data and add it jsonDocument to be bulkloaded
for row in reader:
    jsonDocument = {}
    if 'Log_Level' in row:
    	jsonDocument["Log_Level"] = row["Log_Level"]
    if 'Timestamp' in row:
    	jsonDocument["Timestamp"] = row["Timestamp"]
    if 'Value' in row:
    	jsonDocument["Value"] = row["Value"]
    if 'Device_Name' in row:
    	jsonDocument["Device_Name"] = row["Device_Name"]
    if 'Environment' in row:
    	jsonDocument["Environment"] = row["Environment"]
    if 'Unit' in row:
    	jsonDocument["Unit"] = row["Unit"]
    if 'Action' in row:
    	jsonDocument["Action"] = row["Action"]

   	# append the jsonDocument to the array of json docs
    docs[arrayCounter].append(jsonDocument)
    docsCounter += 1

    # if the number of docs get's larger than the bulk_load size, break into a new chunk
    if docsCounter > 999:
    	arrayCounter += 1
    	docsCounter = 0
    	docs.append([])

# connect to cloudant
server = couchdbkit.Server('https://'+cloudantUsername+':'+cloudantPassword+'@'+cloudantUsername+'.cloudant.com')
db = server.get_or_create_db(dbName)

# bulk load the documents to Cloudant
arrayCounter = 0
for bulkDocs in docs:
	db.bulk_save(docs[arrayCounter])
	arrayCounter += 1