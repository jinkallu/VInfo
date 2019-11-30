from .components import Components

class Array(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

        self.min = -10
        self.max = 10
        self.size = 100

    def execute(self, data):
        print("Overriding from Parent")
        self.min = float(data['properties']['min'])
        self.max = float(data['properties']['max'])
        self.size = float(data['properties']['count'])
        print(self.min, self.max, self.size)
        data = []
        dx = (self.max - self.min) / self.size
        print('dx', dx, self.max - self.min)
        for i in range(int(self.size)):
            print(i)
            x = self.min + i * dx
            data.append(x)
            print(i, x)

        self.setOutput(0, data)
        self.setExecuted()
