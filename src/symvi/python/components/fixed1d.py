import ROOT

from .components import Components

class Fixed1D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        bins = int(data['properties']['bins'])
        
        min_0 = self.input_data[0]["min"]
        max_0 = self.input_data[0]["max"]
        function = self.input_data[0]["function"]

        tf1 = ROOT.TF1(function, function, min_0, max_0)

        dx = (max_0 - min_0) / bins
        x = min_0
        data_out = []
        data_width = []

        for i in range(bins):
            res = tf1.Eval(x)
            data_out.append(x)
            data_width.append(res)
            x += dx

        self.setOutput(0, {"x": data_out, "w": data_width})
        self.setExecuted()

    