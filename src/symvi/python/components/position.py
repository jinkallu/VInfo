from .components import Components

class Position(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        x = float(data['properties']['Position_x'])
        y = float(data['properties']['Position_y'])
        z = float(data['properties']['Position_z'])

        rx = [x]
        ry = [y]
        rz = [z]

        data_out = {"id": self.id,"x": rx, "y": ry, "z": rz}

        self.setOutput(0, data_out)
        self.setExecuted()