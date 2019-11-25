from .tree import Tree

class ModelTree:
    def __init__(self, req):
        self.req = req
        self.tree = Tree()

        self.makeTree()

    def makeTree(self):
        self.firstChildren(self.req['blocks'])

        for child in self.tree.child:
            self.findNextNode(child, self.req)

        #self.print_recurse(self.tree, 0)

    # now find the first children of th tree from the blocks and fill the tree  
    def firstChildren(self, blocks):
        for block in blocks:
            if block['inputs'] == 0:
                self.tree.child.append(Tree())
                self.tree.child[-1].data = block

    #We have now the first children
    # now recurse over all tree find the next nodes and add it as child
    def findNextNode(self, child, req):
        for edge in req['edges']:
            if edge['src_blk_id'] == child.data['id']:
                for block in req['blocks']:
                    if edge['tgt_blk_id'] == block['id']:
                        child.child.append(Tree())
                        child.child[-1].data = block
                        child.child[-1].connection = edge
                        self.findNextNode(child.child[-1], req)
                        break

    def getTree(self):
        return self.tree

    def print_recurse(self, tree_child, level):
        print ('level ' , level)
        print (tree_child.data)
        for child in tree_child.child:
            self.print_recurse(child, level + 1)
            