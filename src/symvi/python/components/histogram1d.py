import ROOT

from .components import Components

class Histogram1D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        #bins = len(self.input_data[0])
        bins = int(data['properties']['bins'])
        min_0 = min(self.input_data[0]["x"])
        max_0 = max(self.input_data[0]["x"])
        
        h1 = ROOT.TH1F("", "", bins, min_0, max_0 + 1)

        for i in range(len(self.input_data[0]["x"])):
            x = self.input_data[0]["x"][i]
            w = self.input_data[0]["w"][i] # weight
            h1.Fill(x, w)

        
        self.json = ROOT.TBufferJSON.ConvertToJSON(h1)

        self.setExecuted()

    def getJson(self):
        return {"data_type": "Hist1D", "data": self.json.Data()}