#!/usr/bin/env python
import sys 
import xml.etree.ElementTree as ET

xml = ''
for word in sys.argv[1:]:
    xml += word + ' '

root = ET.fromstring(xml)
for child in root.iter():
    print child.tag, child.attrib
