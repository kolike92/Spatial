# -*- coding: utf-8 -*-
"""
Rollin Lau
CS411
Manipulating Factual API JSON data

Some style drawn from: 
http://stackoverflow.com/questions/2835559/parsing-values-from-a-json-file-in-python

Writes parsed data into a csv called 'data.csv'
"""
import csv
import json
from pprint import pprint

#def timeValue(data):

#Example call used        
#C:\\Users\\Rollin\\Desktop\\CS411 Boston Building Data\\AverageJSON\\WestRoxbury2.json
with open('INPUT DATA PATH', encoding='utf-8') as data_file:
    data = json.loads(data_file.read())
    
#print(data)

#data["version"]
#print(data["version"])
#print(data["status"])
data2 = data["response"]

names = []

samples = (data2["data"])
# Normally 50. Limited by Factual for number of rows within a single call
print(len(samples))

# open a file to write to
f = open('data.csv', 'a')
X = csv.writer(f, delimiter = ',')

# iterate through file data
for i in range(0, len(samples)):
    dataBiz = samples[i]
    a = False
    b = False
    c = False
    d = False
    if "name" in dataBiz:
        name = dataBiz["name"]
        a = True
    if "tel" in dataBiz:
        tel = dataBiz["tel"]
        b = True
    if "address" in dataBiz:
        address = dataBiz["address"]
        c = True
    if "hours_display" in dataBiz: 
        display = dataBiz["hours_display"]
        d = True

'''
Selecting relevant data from potential returns from Factual
Switch cases would be implemented if desire for total JSON data
'''    
        
    if (b == True and c == False and d == True):
        row = [dataBiz["name"] , dataBiz["tel"] ,[], dataBiz["hours_display"]]
    if (b == True and c == True and d == False):
        row = [dataBiz["name"] , dataBiz["tel"] , dataBiz["address"]]
    if (b == True and c == False and d == False):
        row = [dataBiz["name"] , dataBiz["tel"]]
    if (b == False and c == True and d == True):
        row = [dataBiz["name"] ,[], dataBiz["address"] , dataBiz["hours_display"]]
    if (b == False and c == False and d == True):
        row = [dataBiz["name"] ,[],[], dataBiz["hours_display"]]
    if (b == False and c == True and d == False):
        row = [dataBiz["name"], [], dataBiz["address"],[]]
    if (b == True and c == True and d == True):
        row = [dataBiz["name"] , dataBiz["tel"] , dataBiz["address"] , dataBiz["hours_display"]]
    #row = [dataBiz["name"] , dataBiz["tel"] , dataBiz["address"] , dataBiz["hours_display"]]
    X.writerow(row)
  
f.close()

# for debugging and initial testing
'''
#dataBiz = samples[48]
  
# json format   
print(dataBiz)

# specific data
print(dataBiz["name"])
print(dataBiz["tel"])
print(dataBiz["address"])
#print(dataBiz["hours"])
#print(dataBiz["hours_display"])

# classify hour segment
if "hours" in dataBiz:
    openTimes = dataBiz["hours"]

    if "monday" in openTimes:
        print(openTimes["monday"])
    if "tuesday" in openTimes:
        print(openTimes["tuesday"])
    if "wednesday" in openTimes:
        print(openTimes["wednesday"])
    if "thursday" in openTimes:
        print(openTimes["thursday"])
    if "friday" in openTimes:
        print(openTimes["friday"])
    if "saturday" in openTimes:
        print(openTimes["saturday"])
    if "sunday" in openTimes:
        print(openTimes["sunday"])

'''
