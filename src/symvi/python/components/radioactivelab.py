import ROOT

from .components import Components

class RadioactiveLab(Components):
    def __init__(self, id, no_inputs, no_outputs):
        Components.__init__(self, id, no_inputs, no_outputs)

    def execute(self, data):
        #bins = int(data['properties']['bins'])
        
        z = self.input_data[1]["z"]
        a = self.input_data[1]["a"]
        mass = self.input_data[1]["mass"]
        halflife = self.input_data[1]["halflife"]
        alphas = self.input_data[1]["alphas"]
        alphas = alphas.split()
        sigma = self.input_data[0]["fwhm"]

        self.alpha_e = []
        self.alpha_p = []

        for i in range (len(alphas) / 2):
            self.alpha_e.append(float(alphas[2*i]))
            self.alpha_p.append(float(alphas[2*i+1]))

        rand3 = ROOT.TRandom3()

        
        #for i in range(len(alpha_e)):
        #    print(alpha_e[i], alpha_p[i])

        formula = "1 / (" + str(sigma) + " * sqrt(2 * pi)) * exp(-1.0/2 * ((x /" + str(sigma) + ")^2))"
        #formula = "exp(-(1.0 / 2) * (x/" + str(sigma) + ")^2)"
        print(formula)
        min_0 = 0
        max_0 = 100
        bins = int(mass)

        tf1 = ROOT.TF1(formula, formula, -5 * float(sigma), 5 * float(sigma))

        ROOT.gRandom.SetSeed(0)
        data_out = []
        data_width = []
        for i in range(bins):
            res = tf1.GetRandom()
            #print(res)

            
            energy_i = self.getAlphaEnergy(rand3.Rndm())
            energy = self.alpha_e[energy_i]

            data_out.append(energy + res)
            data_width.append(1)


        self.setOutput(0, {"x": data_out, "w": data_width})
        self.setExecuted()

    def getAlphaEnergy(self, prob):
        min_p = 0
        
        for i in range(len(self.alpha_p)):
            prev_p = min_p
            min_p += self.alpha_p[i] / 100

            if prob >= prev_p and prob < min_p:
                return i

        return -1

