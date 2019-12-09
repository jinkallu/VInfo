from .components import Components
import ROOT


class GraphingCalculator2D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent")
        self.x_min = float(data['properties']['x_min'])
        self.x_max = float(data['properties']['x_max'])
        self.y_min = float(data['properties']['y_min'])
        self.y_max = float(data['properties']['y_max'])
        #self.size = float(data['properties']['count'])
        self.formula = data['properties']['formula']

        self.tf2 = ROOT.TF2(self.formula, self.formula, self.x_min, self.x_max, self.y_min, self.y_max)
        
        self.json = ROOT.TBufferJSON.ConvertToJSON(self.tf2)

        self.setExecuted()

    def getJson(self):
        return {"data_type": "TF2", "data": self.json.Data()}
