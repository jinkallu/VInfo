import ROOT

from .components import Components

class Distribution1D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        bins = int(data['properties']['bins'])
        
        min_0 = self.input_data[0]["min"]
        max_0 = self.input_data[0]["max"]
        function = self.input_data[0]["function"]

        tf1 = ROOT.TF1(function, function, min_0, max_0)

        data_out = []
        for i in range(bins):
            res = tf1.GetRandom()
            data_out.append(res)

        self.setOutput(0, data_out)
        self.setExecuted()

    