from .components import Components

class Detector(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        fwhm = float(data['properties']['fwhm'])
        
        position = self.input_data[0]

        data_out = {
                    "id": self.id,
                    "position": position, 
                    "fwhm": fwhm
                    }

        self.setOutput(0, data_out)
        self.setExecuted()