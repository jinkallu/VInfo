from .components import Components

class Duplicate(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent")
        

        self.setOutput(0, self.input_data[0])
        self.setOutput(1, self.input_data[0])

        self.setExecuted()
