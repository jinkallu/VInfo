from .components import Components

class Array(Components):
    def __init__(self, no_inputs, no_outputs):
        super().__init__(no_inputs, no_outputs)

    def execute(self):
        print("Overriding from Parent")
