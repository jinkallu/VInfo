from .simulation import Simulation

class Gravity(Simulation):
    def __init__(self, id, no_inputs, no_outputs):
        Simulation.__init__(self, id, no_inputs, no_outputs)
        
        self.blocks = []
    
    def addBlock(self, block):
        self.blocks.append(block)

    def execute(self, data):
        for block in self.blocks:
            x_0 = float(block['properties']['Position_x'])
            y_0 = float(block['properties']['Position_y'])
            z_0 = float(block['properties']['Position_z'])

            vx_0 = float(block['properties']['Velocity_x'])
            vy_0 = float(block['properties']['Velocity_y'])
            vz_0 = float(block['properties']['Velocity_z'])

            duration = float(block['properties']['duration'])

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

            data_out.append(data_out_x)
            data_out.append(data_out_y)
            data_out.append(data_out_z)
            
            self.appendData(data_out)
        
        self.setExecuted()

