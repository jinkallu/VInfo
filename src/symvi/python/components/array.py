from .components import Components

class Array(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

        self.min = -10
        self.max = 10
        self.size = 100

    def execute(self):
        print("Overriding from Parent")
        data = []
        dx = 0.2 #(self.max - self.min) / self.size
        print('dx', dx, self.max - self.min)
        for i in range(self.size):
            x = self.min + i * dx
            data.append(x)
            print(i, x)

        self.setOutput(0, data)
        self.setOutputReady()
