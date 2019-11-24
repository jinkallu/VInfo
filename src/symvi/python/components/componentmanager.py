from .array import Array
from .formula import Formula
from .graph import Graph

class ComponentManager:
    def __init__(self):
        self.components = []
        self.cmp_output = None


    def addComponent(self, block):
        component = self.getComponentWithBlockId(block['id'])
        if component != None:
            return component

        method_name = 'add' + block['name']
        # Get the method from 'self'. Default to a lambda.
        method = getattr(self, method_name)
        # Call the method as we return it
        return method(block)

    def getComponentWithBlockId(self, id):
        for component in self.components:
            if component.getId() == id:
                return component

        return None

    def addArray(self, block):
        self.components.append(Array(block['id'], block['inputs'], block['outputs']))
        print ("Array component added")
        return self.components[-1]

    def addFormula(self, block):
        self.components.append(Formula(block['id'], block['inputs'], block['outputs']))
        print ("Formula component added")
        return self.components[-1]

    def addGraph(self, block):
        self.components.append(Graph(block['id'], block['inputs'], block['outputs']))
        print ("Graph component added")
        return self.components[-1]


    def run(self, tree):
        print("Run tree")
        for child in tree.child:
            cmp = child.component
            print(cmp.getNoInputs(), cmp.filledInputs())
            if cmp.getNoInputs() == cmp.filledInputs() and not cmp.outputReady():
                # execute the code for component
                cmp.execute()
                if cmp.getNoOutputs() == 0:
                    self.cmp_output = cmp
                if cmp.outputReady():
                    for child_of_child in child.child:
                        print(child_of_child.connection)
                        data = cmp.getOutput(child_of_child.connection['src_node_id'])
                        child_of_child.component.setInput(child_of_child.connection['tgt_node_id'], data)

            self.run(child)
        

