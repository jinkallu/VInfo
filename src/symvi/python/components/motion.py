from .simulation import Simulation

class Motion(Simulation):
    def __init__(self, id, no_inputs, no_outputs):
        Simulation.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):

        x_0 = float(data['properties']['Position_x'])
        y_0 = float(data['properties']['Position_y'])
        z_0 = float(data['properties']['Position_z'])

        vx_0 = float(data['properties']['Velocity_x'])
        vy_0 = float(data['properties']['Velocity_y'])
        vz_0 = float(data['properties']['Velocity_z'])

        duration = float(data['properties']['duration'])

        data_out = []
        data_out_x = []
        data_out_y = []
        data_out_z = []

        dt = duration / 100

        t = 0
        while t < duration:
            x = x_0 + t * vx_0
            data_out_x.append(x)

            y = y_0 + t * vy_0
            data_out_y.append(y)

            z = z_0 + t * vz_0
            data_out_z.append(z)

            t += dt

        data_out = {"position": {"x": None, "y": None, "z": None}}
        data_out["position"]["x"] = data_out_x
        data_out["position"]["y"] = data_out_y
        data_out["position"]["z"] = data_out_z
        
        self.appendData(data_out)

        #self.json["data"]["0"] = data_out_x
        #self.json["data"]["1"] = data_out_y
        #self.json["data"]["2"] = data_out_z
        

        self.setExecuted()