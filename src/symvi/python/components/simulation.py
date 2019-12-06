from .components import Components

class Simulation(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

        self.json = {"data_type": "Sim", "data": []}

    def appendData(self, data):
        self.json["data"].append(data)

    def getJson(self):
        return self.json