from .components import Components

class Function1D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        min = float(data['properties']['min'])
        max = float(data['properties']['max'])
        function = data['properties']['function']

        data_out = {"id": self.id,"min": min, "max": max, "function": function}

        self.setOutput(0, data_out)
        self.setExecuted()