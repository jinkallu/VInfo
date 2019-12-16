import ROOT

from .components import Components

class Radioactivity(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        #bins = int(data['properties']['bins'])
        
        z = self.input_data[0]["z"]
        a = self.input_data[0]["a"]
        mass = self.input_data[0]["mass"]
        halflife = self.input_data[0]["halflife"]

        formula = str(mass) + " * exp(-x * log2(2) / " + str(halflife) + ")"
        min_0 = 0
        max_0 = 100
        bins = int(mass)

        tf1 = ROOT.TF1(formula, formula, min_0, max_0)

        ROOT.gRandom.SetSeed(0)
        data_out = []
        data_width = []
        for i in range(bins):
            res = tf1.GetRandom()
            data_out.append(res)
            data_width.append(1)

        self.setOutput(0, {"x": data_out, "w": data_width})
        self.setExecuted()

    