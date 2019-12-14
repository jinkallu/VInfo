from .components import Components

class ReadFile(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent")
        data_out = data['properties']['data']

        #data_out[0] = [float(i) for i in data[0]]
        data_width = []


        for i in range(len(data_out[0])):
            data_out[0][i] = float(data_out[0][i])
            data_width.append(1)

        self.setOutput(0, {"x": data_out[0], "w": data_width})
        self.setExecuted()
