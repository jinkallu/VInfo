import math

from .simulation import Simulation

class Gravity(Simulation):
    def __init__(self, id, no_inputs, no_outputs):
        Simulation.__init__(self, id, no_inputs, no_outputs)
        
        self.blocks = []
        self.x = []
        self.y = []
        self.z = []
        
        self.vx = []
        self.vy = []
        self.vz = []

        self.ax = []
        self.ay = []
        self.az = []

        self.fx = []
        self.fy = []
        self.fz = []

        self.masses = []

        self.input_size = len(self.input_data)
    
    def addBlock(self, block):
        self.blocks.append(block)

    def execute(self, data):
        self.duration = float(data['properties']['duration'])
        self.dt = 0.1#self.duration / 100

        self.initialize()

        t = 0
        while t < self.duration:
            self.calculateForce()
            self.calculateAcceleration()
            self.calculateVelocity()
            self.calculatePosition()

            t += self.dt

        self.createOutput()
        
        self.setExecuted()

    def initialize(self):
        

        #for block in self.blocks:
        for input in self.input_data:
            self.x.append([])
            self.y.append([])
            self.z.append([])

            #self.x[-1].append(float(block['properties']['Position_x']))
            self.x[-1].append(float(input['position']['x'][0]))
            self.y[-1].append(float(input['position']['y'][0]))
            self.z[-1].append(float(input['position']['z'][0]))

            self.vx.append([])
            self.vy.append([])
            self.vz.append([])

            self.vx[-1].append(float(input['velocity']['vx'][0]))
            self.vy[-1].append(float(input['velocity']['vy'][0]))
            self.vz[-1].append(float(input['velocity']['vz'][0]))

            self.masses.append(float(input['mass']))

            self.ax.append([])
            self.ay.append([])
            self.az.append([])

            self.ax[-1].append(0)
            self.ay[-1].append(0)
            self.az[-1].append(0)

            self.fx.append([])
            self.fy.append([])
            self.fz.append([])

            self.fx[-1].append(0)
            self.fy[-1].append(0)
            self.fz[-1].append(0)


    def calculatePosition(self):
        for i in range(self.input_size):
            self.x[i].append(self.x[i][-1] + self.dt * self.vx[i][-1])
            self.y[i].append(self.y[i][-1] + self.dt * self.vy[i][-1])
            self.z[i].append(self.z[i][-1] + self.dt * self.vz[i][-1])

    def calculateVelocity(self):
        for i in range(self.input_size):
            self.vx[i].append(self.vx[i][-1] + self.dt * self.ax[i][-1])
            self.vy[i].append(self.vy[i][-1] + self.dt * self.ay[i][-1])
            self.vz[i].append(self.vz[i][-1] + self.dt * self.az[i][-1])

    def calculateAcceleration(self):
        for i in range(self.input_size):
            self.ax[i].append(0)
            self.ay[i].append(0)
            self.az[i].append(0)

            if self.masses[i] == 0:
                continue

            self.ax[i][-1] = self.fx[i][-1] / self.masses[i]
            self.ay[i][-1] = self.fy[i][-1] / self.masses[i]
            self.az[i][-1] = self.fz[i][-1] / self.masses[i]

        
    
    def calculateForce(self):
        for i in range(self.input_size):
            self.fx[i].append(0)
            self.fy[i].append(0)
            self.fz[i].append(0)

            for j in range(self.input_size):
                if i == j:
                    continue

                r = math.sqrt((self.x[i][-1] - self.x[j][-1]) ** 2 + 
                         (self.y[i][-1] - self.y[j][-1]) ** 2 +  
                         (self.z[i][-1] - self.z[j][-1]) ** 2  
                        )
                if r == 0:
                    continue

                mass_ij = self.masses[i] * self.masses[j]
                r3 = r ** 3

                self.fx[i][-1] += -1 * mass_ij * self.x[i][-1] / r3
                self.fy[i][-1] += -1 * mass_ij * self.y[i][-1] / r3
                self.fz[i][-1] += -1 * mass_ij * self.z[i][-1] / r3


    def createOutput(self):
        for i in range(self.input_size):
            data_out = []
            data_out.append(self.x[i])
            data_out.append(self.y[i])
            data_out.append(self.z[i])
            
            self.appendData(data_out)
