class ProcessTree:
    #def __init__(self, tree):
        #self.tree = tree

    def process(self, tree):
        print('Processing')
        for child in tree.child:
            print(child.data['name'])
            self.process(child)