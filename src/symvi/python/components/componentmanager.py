from .array import Array
from .formula import Formula
from .graph import Graph

class ComponentManager:
    def __init__(self):
        self.components = []
        self.cmp_output = []


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
            if cmp.getNoInputs() == cmp.filledInputs() and not cmp.executed():
                # execute the code for component
                cmp.execute(child.data)
                if cmp.getNoOutputs() == 0:
                    self.cmp_output.append(cmp)
                if cmp.executed():
                    for child_of_child in child.child:
                        #print(child_of_child.connection)
                        data = cmp.getOutput(child_of_child.connection['src_node_id'])
                        child_of_child.component.setInput(child_of_child.connection['tgt_node_id'], data)

            self.run(child)

    def executedAll(self, tree):
        flag = True
        for child in tree.child:
            cmp = child.component
            if(cmp.executed() == False):
                return False
            else:
                flag = flag and self.executedAll(child)

        return flag

    def getOutputData(self):
        out_data = []
        for cmp in self.cmp_output:
            out_data.append({'id': cmp.getId(), 'data': cmp.getJson()})

        return out_data