from .tree import Tree

class ModelTree:
    def __init__(self, req):
        self.req = req
        self.tree = Tree()

        self.makeTree()

    def makeTree(self):
        src_nodes = self.findSourceNodes(self.req['edges'])
        self.firstChildren(self.req['blocks'], src_nodes)

        for child in self.tree.child:
            self.findNextNode(child, self.req)

        self.print_recurse(self.tree, 0)

    # find the id of first node, the initial nodes are 
    # considered as the ones which only present in the souce , not in target,
    def findSourceNodes(self, edges):
        src_nodes = [] # src_nodes containes the id of initial srcs
        for edge1 in edges:
            flag = False
            for edge2 in edges:
                if edge1['src_blk_id'] == edge2['tgt_blk_id']:
                    flag = True
            if flag == False:
                if edge1['src_blk_id'] not in src_nodes:
                    src_nodes.append(edge1['src_blk_id'])
        
        return src_nodes

    # now find the first children of th tree from the blocks and fill the tree  
    def firstChildren(self, blocks, src_nodes):
        for src in src_nodes:
            for block in blocks:
                if block['id'] == src:
                    self.tree.child.append(Tree())
                    self.tree.child[-1].data = block
                    break

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
            