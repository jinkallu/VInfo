from .components import Components
import ROOT

class Graph(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent in Graph")
        print(len(self.input_data[0]), len(self.input_data[1]))
        self.h2 = ROOT.TH2F("h2", "", len(self.input_data[0]), self.input_data[0], len(self.input_data[1]), self.input_data[1])
        #for i in range(len(self.input_data[1])):
            #print(i, self.input_data[1][i])
        #    self.h2.SetBinContent(i, self.input_data[1][i])
        #self.h2.FillN(len(self.input_data[0]), self.input_data[0], self.input_data[1])
        self.json = ROOT.TBufferJSON.ConvertToJSON(self.h2)

        self.setExecuted()

    def getJson(self):
        return self.json.Data()