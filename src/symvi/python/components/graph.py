from .components import Components
import ROOT

class Graph(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self):
        print("Overriding from Parent")
        self.h1 = ROOT.TH1F("h1", "title", 100, -10, 10)
        for i in range(len(self.input_data[1])):
            print(i, self.input_data[1][i])
            self.h1.SetBinContent(i, self.input_data[0][i])
        self.json = ROOT.TBufferJSON.ConvertToJSON(self.h1)

    def getJson(self):
        return self.json.Data()