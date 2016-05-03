# -*- coding: utf-8 -*-
"""
Created on Sat Apr 23 13:26:11 2016

@author: Rollin
Performs a call to Factual API from an http link to Factual. 
Writes to a file named "test"
"""
# Load Json into a Python ob
import urllib
import json
import codecs

reader = codecs.getreader("utf-8")

req = urllib.request.Request("http://api.v3.factual.com/t/restaurants-us?&filters={%22$and%22:[{%22locality%22:%22south%20boston%22},{%22region%22:%22ma%22}]}&KEY=Ak3H7pWvViUPukitvE3SMyA8u885mtpCIc6gOeNT&limit=50")
opener = urllib.request.build_opener()
f = opener.open(req)
data = json.load(reader(f))

#print(data)

# Open a file for writing
out_file = open("test.json","w")

# Save the dictionary into this file
json.dump(data, out_file)                                    

# Close the file
out_file.close()
