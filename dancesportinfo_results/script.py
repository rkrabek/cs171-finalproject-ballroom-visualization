#!/usr/bin/python
from __future__ import print_function
import os
for file in os.listdir("../dancesportinfo_results"):
    if file.endswith(".json"):
        print(file)
#var allComps = {};
