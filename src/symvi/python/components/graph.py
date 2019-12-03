from .components import Components
import ROOT

class Graph(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent in Graph")
        len_0 = len(self.input_data[0])
        min_0 = min(self.input_data[0])
        max_0 = max(self.input_data[0])

        len_1 = len(self.input_data[1])
        min_1 = min(self.input_data[1])
        max_1 = max(self.input_data[1])

        print(type(self.input_data[0]))

        self.g = ROOT.TGraph(len_0)
        self.g.SetMarkerStyle(20)
        self.g.SetMarkerColor(2)
        for i in range(min(len_0, len_1)):
            self.g.SetPoint(i, self.input_data[0][i], self.input_data[1][i])

        self.json = ROOT.TBufferJSON.ConvertToJSON(self.g)

        self.setExecuted()

    def getJson(self):
        return {"data_type": "Graph", "data": self.json.Data()}