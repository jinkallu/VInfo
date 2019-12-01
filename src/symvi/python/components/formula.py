from .components import Components
import ROOT


class Formula(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        print("Overriding from Parent")
        formula = data['properties']['Formula']
        self.f1 = ROOT.TFormula(formula, formula)
        data_out = []
        for i in range(len(self.input_data[0])):
            x = float(self.input_data[0][i])
            y = self.f1.Eval(x) 
            data_out.append(y)
            #print(x, y)
        
        self.setOutput(0, data_out)
        self.setExecuted()
