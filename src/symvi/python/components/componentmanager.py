from .array import Array
from .formula1d import Formula1D
from .graph import Graph
from .duplicate import Duplicate
from .graphingcalculator1d import GraphingCalculator1D
from .simulate1D import Simulate1D
from .simulate2D import Simulate2D
from .motion import Motion
from .gravity import Gravity
from .position import Position
from .velocity import Velocity
from .sphere import Sphere
from .function1d import Function1D
from .random1d import Random1D
from .histogram1d import Histogram1D
from .fitting1d import Fitting1D
from .fixed1d import Fixed1D
from .function2d import Function2D
from .graphingcalculator2d import GraphingCalculator2D
from .readfile import ReadFile
from .nucleus import Nucleus
from .radioactivity import Radioactivity
from .detector import Detector
from .radioactivelab import RadioactiveLab
from .simulatedecay import SimulateDecay

class ComponentManager:
    def __init__(self):
        self.components = []
        self.cmp_output = []


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

    def addFormula1D(self, block):
        self.components.append(Formula1D(block['id'], block['inputs'], block['outputs']))
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

    def addGraphingCalculator1D(self, block):
        self.components.append(GraphingCalculator1D(block['id'], block['inputs'], block['outputs']))
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

    def addPosition(self, block):
        self.components.append(Position(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addVelocity(self, block):
        self.components.append(Velocity(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addSphere(self, block):
        self.components.append(Sphere(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addFunction1D(self, block):
        self.components.append(Function1D(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addRandom1D(self, block):
        self.components.append(Random1D(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addHistogram1D(self, block):
        self.components.append(Histogram1D(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addFitting1D(self, block):
        self.components.append(Fitting1D(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addFixed1D(self, block):
        self.components.append(Fixed1D(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addFunction2D(self, block):
        self.components.append(Function2D(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]
        
    def addGraphingCalculator2D(self, block):
        self.components.append(GraphingCalculator2D(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addReadFile(self, block):
        self.components.append(ReadFile(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addNucleus(self, block):
        self.components.append(Nucleus(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addRadioactivity(self, block):
        self.components.append(Radioactivity(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addDetector(self, block):
        self.components.append(Detector(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addRadioactiveLab(self, block):
        self.components.append(RadioactiveLab(block['id'], block['inputs'], block['outputs']))
        return self.components[-1]

    def addSimulateDecay(self, block):
        self.components.append(SimulateDecay(block['id'], block['inputs'], block['outputs']))
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