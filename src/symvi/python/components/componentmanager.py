from .array import Array
from .formula import Formula
from .graph import Graph
from .duplicate import Duplicate
from .graphingcalculator import GraphingCalculator
from .simulate1D import Simulate1D
from .simulate2D import Simulate2D
from .motion import Motion
from .gravity import Gravity
from .position import Position
from .velocity import Velocity
from .sphere import Sphere

class ComponentManager:
    def __init__(self):
        self.components = []
        self.cmp_output = []

        self.flag_gravity = False


    def addComponent(self, block):
        component = self.getComponentWithBlockId(block['id'])
        if component != None:
            return component

        method_name = 'add' + block['name'].replace(" ", "")
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

    def addDuplicate(self, block):
        self.components.append(Duplicate(block['id'], block['inputs'], block['outputs']))
        print ("Duplicate component added")
        return self.components[-1]

    def addGraphingCalculator(self, block):
        self.components.append(GraphingCalculator(block['id'], block['inputs'], block['outputs']))
        print ("GraphingCalculator component added")
        return self.components[-1]

    def addSimulate1D(self, block):
        self.components.append(Simulate1D(block['id'], block['inputs'], block['outputs']))
        print ("Simulate1D component added")
        return self.components[-1]

    def addSimulate2D(self, block):
        self.components.append(Simulate2D(block['id'], block['inputs'], block['outputs']))
        print ("Simulate2D component added")
        return self.components[-1]

    def addMotion(self, block):
        self.components.append(Motion(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addGravity(self, block):
        self.components.append(Gravity(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]
        #if not self.flag_gravity:
        #    self.components.append(Gravity(block['id'], block['inputs'], block['outputs']))
        #    self.idx_gravity = len(self.components) - 1
        #    self.flag_gravity = True

        #self.components[self.idx_gravity].addBlock(block)

        #return self.components[self.idx_gravity]

    def addPosition(self, block):
        self.components.append(Position(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addVelocity(self, block):
        self.components.append(Velocity(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addSphere(self, block):
        self.components.append(Sphere(block['id'], block['inputs'], block['outputs']))
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