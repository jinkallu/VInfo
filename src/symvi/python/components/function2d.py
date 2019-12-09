from .components import Components
import ROOT


class Function2D(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent")
        function = data['properties']['function']
        self.f1 = ROOT.TFormula(function, function)
        data_out = []
        len_x = len(self.input_data[0])
        len_y = len(self.input_data[1])
        for i in range(min(len_x, len_y)):
            x = float(self.input_data[0][i])
            y = float(self.input_data[1][i])
            res = self.f1.Eval(x, y) 
            data_out.append(res)
            #print(x, y)
        
        self.setOutput(0, data_out)
        self.setExecuted()
