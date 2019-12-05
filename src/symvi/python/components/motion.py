from .components import Components

class Motion(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):

        x_0 = float(data['properties']['Position_x'])
        y_0 = float(data['properties']['Position_y'])
        z_0 = float(data['properties']['Position_z'])

        vx_0 = float(data['properties']['Velocity_x'])
        vy_0 = float(data['properties']['Velocity_y'])
        vz_0 = float(data['properties']['Velocity_z'])

        duration = float(data['properties']['duration'])

        data_out_0 = []
        data_out_1 = []
        data_out_2 = []

        for i in range(len(self.input_data[0])):
            data_out_0.append(self.input_data[0][i])

        
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