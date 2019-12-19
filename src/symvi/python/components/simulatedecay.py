import ROOT

from .components import Components

class SimulateDecay(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        #bins = len(self.input_data[0])
        #bins = int(data['properties']['bins'])
        #min_0 = min(self.input_data[0]["x"])
        #max_0 = max(self.input_data[0]["x"])
        
        
        self.setExecuted()

    def getJson(self):
        return {"data_type": "SimDecay", "data": 1}