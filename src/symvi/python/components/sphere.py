from .components import Components

class Sphere(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        radius = float(data['properties']['radius'])
        mass = float(data['properties']['mass'])
        texture = data['properties']['texture']
        
        position = self.input_data[0]
        velocity = self.input_data[1]

        data_out = {
                    "id": self.id,
                    "position": position, 
                    "velocity": velocity,
                    "radius": radius,
                    "mass": mass,
                    "texture": texture
                    }

        self.setOutput(0, data_out)
        self.setExecuted()