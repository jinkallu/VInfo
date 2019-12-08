import ROOT

from .components import Components

class Fitting1D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        #bins = len(self.input_data[0])
        bins = int(data['properties']['bins'])

        min_0 = min(self.input_data[1]["x"])
        max_0 = max(self.input_data[1]["x"])
        function = self.input_data[0]["function"]

        
        h1 = ROOT.TH1F("", "", bins, min_0, max_0)

        for i in range(len(self.input_data[1]["x"])):
            x = self.input_data[1]["x"][i]
            w = self.input_data[1]["w"][i] # weight
            h1.Fill(x, w)

        tf1 = ROOT.TF1("tf1", function, min_0, max_0, 2)
        tf1.SetParameters(1, 0, 2)

        h1.Fit(tf1, "N")



        
        self.json = {"h1": ROOT.TBufferJSON.ConvertToJSON(h1).Data(),
                     "f1": ROOT.TBufferJSON.ConvertToJSON(tf1).Data()
                     }

        self.setExecuted()

    def getJson(self):
        return {"data_type": "Fit1D", "data": self.json}