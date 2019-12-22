import ROOT
import math

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
        sigma = self.input_data[0]["sigma"]

        det_pos_x = float(self.input_data[0]["position"]["x"][0])
        det_pos_y = float(self.input_data[0]["position"]["y"][0])
        det_pos_z = float(self.input_data[0]["position"]["z"][0])

        det_rad = float(self.input_data[0]["radius"])

        det_pos_r = math.sqrt(det_pos_x * det_pos_x + 
                          det_pos_y * det_pos_y + 
                          det_pos_z * det_pos_z
                        )

        self.alpha_e = []
        self.alpha_p = []

        for i in range (len(alphas) / 2):
            self.alpha_e.append(float(alphas[2*i]))
            self.alpha_p.append(float(alphas[2*i+1]))

        rand3 = ROOT.TRandom3()
        rand3_theta = ROOT.TRandom3()
        rand3_phi = ROOT.TRandom3()

        
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

        theta_phi = []
        
        for i in range(bins):
            theta = rand3_theta.Rndm() * ROOT.TMath.Pi() # 0 <= theta <= pi
            phi = rand3_phi.Rndm() * 2 * ROOT.TMath.Pi() # 0 <= phi < 2 *pi

            theta_phi.append({"theta": theta, "phi": phi, "detected": False})
            
            decay_pos_x = det_pos_r * math.sin(theta) * math.cos(phi)
            decay_pos_y = det_pos_r * math.sin(theta) * math.sin(phi)
            decay_pos_z = det_pos_r * math.cos(theta)

            rad = math.sqrt((det_pos_x - decay_pos_x)**2 + (det_pos_y - decay_pos_y)**2)
            #print(rad)
            if rad <= det_rad:
                res = tf1.GetRandom()
                #print(res)

                
                energy_i = self.getAlphaEnergy(rand3.Rndm())
                energy = self.alpha_e[energy_i]

                data_out.append(energy + res)
                data_width.append(1)

                theta_phi[-1]["detected"] = True


        self.setOutput(0, {"x": data_out, 
                           "w": data_width, 
                           
                           "det_pos":{"x": det_pos_x, 
                                      "y": det_pos_y,
                                      "z": det_pos_z
                                     },
                           "det_rad": det_rad,
                           "theta_phi": theta_phi
                          }
                      )
        self.setExecuted()

    def getAlphaEnergy(self, prob):
        min_p = 0
        
        for i in range(len(self.alpha_p)):
            prev_p = min_p
            min_p += self.alpha_p[i] / 100

            if prob >= prev_p and prob < min_p:
                return i

        return -1

