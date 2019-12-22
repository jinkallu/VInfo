import JSROOT from 'JSROOT';
import {BasicThree} from './basicthree';

export class RadioactiveThree extends BasicThree{
    data_in: any;
    data_dacay: any;
    det_pos_r: number;
    i_decay: number;
    n_decay: number;
    i_step: number;
    n_step: number;
    step_size: number;
    rad: number;
    root_div: HTMLDivElement;
    hist: any;
    hist_dat_count: number;

    setDecayData(data:any, _root_div: HTMLDivElement){
        this.data_in = data;
        this.root_div = _root_div;

        let min = this.data_in["min"];
        let max = this.data_in["max"];

        min -= min / 90.;
        max += max / 90.;

        let bins = this.data_in["bins"];

        console.log("min, max, bins", min, max, bins);

        this.hist = JSROOT.CreateHistogramNew("TH1F", bins, min, max); // must change bins to variable
        //this.hist.fXmin = 4000;
        //this.hist.fXmax = 6000;
        this.hist.fLineColor = 4;
        JSROOT.draw(this.root_div.id, this.hist, "hist");

        this.step_size = 0.5;

        

        this.i_decay = 0;
        this.n_decay = this.data_in["theta_phi"].length;

        this.rad = 0;

        this.hist_dat_count = 0;


        let data_i = {"position": {"x": [0], "y": [0], "z": [0]},
                      "radius": 3,
                      "texture": "",
                      "type": "Sphere",
                      "color": 0x0000ff,
                      "transparency": true,
                      "opacity": 0.4
                    };


        let det_pos_x = data["det_pos"]["x"];
        let det_pos_y = data["det_pos"]["y"];
        let det_pos_z = data["det_pos"]["z"];

        let det_rad = data["det_rad"];

        let data_det = {"position": {"x": [det_pos_x], 
                                     "y": [det_pos_y], 
                                     "z": [det_pos_z]},
                        "radius": det_rad,
                        "texture": "",
                        "type": "Cylinder",
                        "color": 0xC0C0C0, // silver
                        
                       };


        this.det_pos_r =  Math.sqrt(det_pos_x*det_pos_x + 
                                   det_pos_y*det_pos_y +
                                   det_pos_z*det_pos_z);

        this.n_step = this.det_pos_r / this.step_size;
        this.i_step = 0;

        
        let data_decay = {"position": {"x": [0], "y": [0], "z": [0]},
                          "radius": 1,
                          "texture": "",
                          "type": "Sphere",
                          "color": 0xff0000
                         };
        this.setData([data_i, data_det, data_decay]);
    }

    updateData(){
        if(!this.data_in){
            return;
        }        

        let theta = this.data_in["theta_phi"][this.i_decay]["theta"];
        let phi = this.data_in["theta_phi"][this.i_decay]["phi"];

        if(this.data_in["theta_phi"][this.i_decay]["detected"]){
            if(this.hist_dat_count < this.data_in["x"].length)
            {
                let x = this.data_in["x"][this.hist_dat_count];
                let w = this.data_in["w"][this.hist_dat_count];
                this.hist_dat_count++;
                //console.log(x);

                this.hist.Fill(x, w);
                JSROOT.redraw(this.root_div.id, this.hist, "hist");
            }
        }


        //for(let i = 0; i < n; i++){

            let pos_x = this.rad * Math.sin(theta) * Math.cos(phi)
            let pos_y = this.rad * Math.sin(theta) * Math.sin(phi)
            let pos_z = this.rad * Math.cos(theta)

            this.mesh[2].position.x = pos_x;
            this.mesh[2].position.y = pos_y;
            this.mesh[2].position.z = pos_z;

            this.rad += this.step_size;


        this.i_step++;
        if(this.i_step >= this.n_step){
            this.rad = 0;
            this.i_step = 0;

            this.i_decay++;

            if(this.i_decay >= this.n_decay){
                this.i_decay = 0;

                this.hist_dat_count = 0;

                this.hist = null;
                this.hist = JSROOT.CreateHistogram("TH1F", 6000);
                JSROOT.redraw(this.root_div.id, this.hist, "hist");
            }
        }

        //}
    }
}