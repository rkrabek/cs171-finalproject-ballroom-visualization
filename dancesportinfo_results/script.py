#!/usr/bin/python
from __future__ import print_function
import os
import json
from pprint import pprint

result = []

#pprint(data)
for file in os.listdir("../dancesportinfo_results"):
	if file.endswith(".json"):
		with open(file) as data_file:
			result.append(json.load(data_file))

with open('combined2.json', 'w') as outfile:
	json.dump(result, outfile)
#var allComps = {};

#pprint(data)

