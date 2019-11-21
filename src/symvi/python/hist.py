import ROOT

def getHist():
    h1 = ROOT.TH1I("h1", "title", 100, 0, 10)
    h1.FillRandom("gaus",10000)
    json = ROOT.TBufferJSON.ConvertToJSON(h1)

    return json.Data()