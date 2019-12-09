from .components import Components

class Formula1D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        min = float(data['properties']['min'])
        max = float(data['properties']['max'])
        formula = data['properties']['formula']

        data_out = {"id": self.id,"min": min, "max": max, "formula": formula}

        self.setOutput(0, data_out)
        self.setExecuted()