from .components import Components
from math import sin


class Formula(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self):
        print("Overriding from Parent")
        data = []
        for i in range(len(self.input_data[0])):
            x = self.input_data[0][i]
            y = sin(x) 
            data.append(y)
            print(x, y)
        
        self.setOutput(0, data)
        self.setOutputReady()
