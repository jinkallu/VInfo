#!/usr/bin/env python
import sys 
import xml.etree.ElementTree as ET

##############################
# tree
class Tree(object):
    def __init__(self):
        self.child = []
        self.data = None
##############################

xml = ''
for word in sys.argv[1:]:
    xml += word + ' '

root = ET.fromstring(xml)

##############################################################
# create tree from xml tree for getting the connection flow
# from first block(s) to the last one
# 1. Find the edges
edges = []
for child in root.iter():
    #print child.tag
    #print child.attrib
    for key in child.attrib:
        if key == 'edge':
            edges.append(child.attrib)

# tree
tree = Tree()

# find the id of first node, the initial nodes are 
# considered as the ones which only present in the souce , not in target,

src_nodes = []
for edge1 in edges:
    flag = False
    for edge2 in edges:
        if edge1['source'] == edge2['target']:
            flag = True
    if flag == False:
        if edge1['source'] not in src_nodes:
            src_nodes.append(edge1['source'])
# src_nodes containes the id of initial src
# now find the vetex with the ids, these vertex will be teh first children
for src in src_nodes:
    for child in root.iter():
        if 'id' in child.attrib:
            if child.attrib['id'] == src:
                tree.child.append(Tree())
                tree.child[-1].data = child.attrib
                break
            
#We have now the first children
# now recurse over all tree find the next nodes and add it as child
def find_targets(tree_child):
    for edge in edges:
        if edge['source'] == tree_child.data['id']:
            for child in root.iter():
                if 'id' in child.attrib:
                    if edge['target'] == child.attrib['id']:
                        tree_child.child.append(Tree())
                        tree_child.child[-1].data = child.attrib
                        find_targets(tree_child.child[-1])
                        break

for child in tree.child:
    find_targets(child)


def print_recurse(tree_child, level):
    print 'level ' , level
    print tree_child.data
    for child in tree_child.child:
        print_recurse(child, level + 1)

print_recurse(tree, 0)