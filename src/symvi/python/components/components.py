class Components:
    def __init__(self, id, no_inputs, no_outputs):
        self.id = id
        self.no_inputs = no_inputs
        self.no_outputs = no_outputs
        self.fillled_inputs = 0

        self.input_data = no_inputs * [None]
        self.output_data = no_outputs * [None]

        self.output_ready = False


    def filledInputs(self):
        return self.fillled_inputs

    def incFilledInputs(self):
        self.fillled_inputs += 1

    def execute(self):
        print ('Must override this function in child')

    def setInput(self, index, data):
        if index < self.no_inputs:
            self.input_data[index] = data
        else:
            print("Error! index > no_inputs, must handle this")

    def setOutput(self, index, data):
        if index < self.no_outputs:
            self.output_data[index] = data
        else:
            print("Error! index > no_outputs, must handle this")

    def setOutputReady(self):
        self.output_ready = True

    def outputReady(self):
        return self.output_ready

    def getId(self):
        return self.id
