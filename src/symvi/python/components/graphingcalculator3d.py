from .components import Components
import ROOT


class GraphingCalculator3D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent")
        self.x_min = float(data['properties']['x_min'])
        self.x_max = float(data['properties']['x_max'])
        self.y_min = float(data['properties']['y_min'])
        self.y_max = float(data['properties']['y_max'])
        self.z_min = float(data['properties']['z_min'])
        self.z_max = float(data['properties']['z_max'])
        #self.size = float(data['properties']['count'])
        self.formula = data['properties']['formula']

        self.tf3 = ROOT.TF3(self.formula, self.formula, self.x_min, self.x_max, self.y_min, self.y_max, self.z_min, self.z_max)
        self.th3 = ROOT.TH3F(self.formula, self.formula, 100, self.x_min, self.x_max, 100, self.y_min, self.y_max, 100, self.z_min, self.z_max)
        x, y, z = ROOT.Double(), ROOT.Double(), ROOT.Double()
        for i in range(10000):
            self.tf3.GetRandom3(x, y, z)
            self.th3.Fill(x, y, z, 1)

        self.json = ROOT.TBufferJSON.ConvertToJSON(self.th3)

        self.setExecuted()

    def getJson(self):
        return {"data_type": "TF2", "data": self.json.Data()}
