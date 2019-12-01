from .components import Components
import ROOT


class GraphingCalculator(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent")
        self.min = float(data['properties']['min'])
        self.max = float(data['properties']['max'])
        #self.size = float(data['properties']['count'])
        self.formula = data['properties']['Formula']

        self.tf1 = ROOT.TF1(self.formula, self.formula, self.min, self.max)
        
        self.json = ROOT.TBufferJSON.ConvertToJSON(self.tf1)

        self.setExecuted()

    def getJson(self):
        return self.json.Data()
