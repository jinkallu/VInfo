import ROOT
from .components import Components

class SaveFile(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        
        self.x = self.input_data[0]["x"]

        self.setExecuted()

    def getJson(self):
        return {"data_type": "SaveFile", "data": self.x}