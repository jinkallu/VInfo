from .simulation import Simulation

class Simulate2D(Simulation):
    def __init__(self, id, no_inputs, no_outputs):
        Simulation.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        data_out = []
        data_out_x = None
        data_out_y = None
        data_out_z = None

        data_out_x = self.input_data[0]
        data_out_y = self.input_data[1]
        

        data_out.append(data_out_x)
        data_out.append(data_out_y)
        data_out.append(data_out_z)
        
        self.appendData(data_out)


        self.setExecuted()

    def getJson(self):
        return self.json