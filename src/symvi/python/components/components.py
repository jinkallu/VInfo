class Components:
    def __init__(self, id, no_inputs, no_outputs):
        self.id = id
        self.no_inputs = no_inputs
        self.no_outputs = no_outputs
        self.fillled_inputs = 0

        self.input_data = no_inputs * [None]
        self.output_data = no_outputs * [None]

        self.flag_executed = False
        self.connections_map = {k: None for k in range(no_inputs)}

    def getNoInputs(self):
        return self.no_inputs

    def getNoOutputs(self):
        return self.no_outputs

    def filledInputs(self):
        return self.fillled_inputs

    def incFilledInputs(self):
        self.fillled_inputs += 1

    def execute(self, data):
        print ('Must override this function in child')
        self.setExecuted()

    def setInput(self, index, data):
        if index < self.no_inputs:
            self.input_data[index] = data
            self.incFilledInputs()
        else:
            print("Error! index > no_inputs, must handle this")

    def setOutput(self, index, data):
        if index < self.no_outputs:
            self.output_data[index] = data
        else:
            print("Error! index > no_outputs, must handle this")

    def getOutput(self, index):
        if index < self.no_outputs:
            return self.output_data[index]
        else:
            print("Error! index > no_outputs, must handle this")

    def setExecuted(self):
        self.flag_executed = True

    def executed(self):
        return self.flag_executed

    def getId(self):
        return self.id

    def setConnectionsMap(self, map):
        self.connections_map[map['src_node_id']] = map['tgt_node_id']

    def getConnectionMap(self, index):
        return self.connections_map[index]
