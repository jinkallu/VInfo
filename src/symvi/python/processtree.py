from .components.componentmanager import ComponentManager

class ProcessTree:
    def __init__(self):
        self.componentManager = ComponentManager()

    def process(self, tree):
        print('Processing')
        self.addComponent(tree)
        flag = False
        while not flag:
            self.componentManager.run(tree)
            flag = self.componentManager.executedAll(tree)

        return self.componentManager.getOutputData()

        

    def addComponent(self, tree):
        for child in tree.child:
            #print(child.data['name'])
            cmp = self.componentManager.addComponent(child.data)
            if child.connection != None:
                #print(child.connection['src_node_id'], child.connection['tgt_node_id'])
                cmp.setConnectionsMap(child.connection)

            child.component = cmp
            #print (cmp.getId())
            self.addComponent(child)
        
        