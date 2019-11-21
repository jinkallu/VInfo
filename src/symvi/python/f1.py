import ROOT

def getF1():
    f1 = ROOT.TF1("fa1","sin(x)/x",-10,10)
    json = ROOT.TBufferJSON.ConvertToJSON(f1)

    return json.Data()