from .components import Components

class Simulate1D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent in Graph")
        data_out = []
        for i in range(len(self.input_data[0])):
            data_out.append(self.input_data[0][i])

        self.json = {"data_type": "Sim", "data": {}}
        #self.json = {"data_type": "Sim", "data": {data_out}, "axis": data['properties']['Axis']}
        #self.json = {"data_type": "Sim", "data": }
        self.json["data"]["0"] = None
        self.json["data"]["1"] = None
        self.json["data"]["2"] = None

        if data['properties']['Axis'] == "0":
            self.json["data"]["0"] = data_out
        
        elif data['properties']['Axis'] == "1":
            self.json["data"]["1"] = data_out
        
        elif data['properties']['Axis'] == "2":
            self.json["data"]["2"] = data_out
        
        else:
            self.json["data"]["0"] = data_out
        

        self.setExecuted()

    def getJson(self):
        return self.json