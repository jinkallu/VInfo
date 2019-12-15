from .components import Components

class Nucleus(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        z = float(data['properties']['Z'])
        a = float(data['properties']['A'])
        mass = float(data['properties']['mass'])
        halflife = float(data['properties']['halflife'])


        data_out = {
                    "id": self.id,
                    "position": None, 
                    "velocity": None,
                    "z": z,
                    "a": a,
                    "mass": mass,
                    "halflife": halflife
                    }

        self.setOutput(0, data_out)
        self.setExecuted()