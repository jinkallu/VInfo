from .components import Components

class Velocity(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        vx = float(data['properties']['Velocity_x'])
        vy = float(data['properties']['Velocity_y'])
        vz = float(data['properties']['Velocity_z'])

        avx = [vx]
        avy = [vy]
        avz = [vz]

        data_out = {"id": self.id,"vx": avx, "vy": avy, "vz": avz}

        self.setOutput(0, data_out)
        self.setExecuted()