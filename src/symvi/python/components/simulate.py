from .components import Components

class Simulate(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent in Graph")
        data_out = []
        for i in range(len(self.input_data[0])):
            data_out.append(self.input_data[0][i])
        self.json = {"data_type": "Sim", "data": data_out}

        self.setExecuted()

    def getJson(self):
        return self.json