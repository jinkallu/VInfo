from .components import Components

class Array(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self):
        print("Overriding from Parent")
