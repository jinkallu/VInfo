from .components import Components

class Simulate2D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent in Graph")
        data_out_0 = []
        for i in range(len(self.input_data[0])):
            data_out_0.append(self.input_data[0][i])

        data_out_1 = []
        for i in range(len(self.input_data[1])):
            data_out_1.append(self.input_data[1][i])

        self.json = {"data_type": "Sim", "data": {}}
        #self.json = {"data_type": "Sim", "data": {data_out}, "axis": data['properties']['Axis']}
        #self.json = {"data_type": "Sim", "data": }
        self.json["data"]["0"] = data_out_0
        self.json["data"]["1"] = data_out_1
        self.json["data"]["2"] = None
        

        self.setExecuted()

    def getJson(self):
        return self.json