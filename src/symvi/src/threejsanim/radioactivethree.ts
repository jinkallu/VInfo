import {BasicThree} from './basicthree';

export class RadioactiveThree extends BasicThree{
    setDecayData(data:any){
        let data_i = {"position": {"x": [0], "y": [0], "z": [0]},
                      "radius": 1,
                      "texture": ""
                    };
        let data_decay = {"position": {"x": [0], "y": [10, 60], "z": [0]},
                          "radius": 10,
                          "texture": ""
                         };
        this.setData([data_i, data_decay]);
    }
}