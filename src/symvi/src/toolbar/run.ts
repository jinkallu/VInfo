import { Block } from '../dgmeditor/block';
import { Edge } from '../dgmeditor/edge';
import JSROOT from 'JSROOT';
import { IOControl } from '../iopanel/iocontrol';
import { DesignApi } from '../Api/designApi';
import { Edges } from '../dgmeditor/edges';
import { BasicThree } from '../threejsanim/basicthree';
import {RadioactiveThree} from '../threejsanim/radioactivethree';
import * as MATH from 'mathjs';
import {FileIO} from './fileio';
import {Icon} from './icon';


export class Run{
    run_div:HTMLDivElement;
    design_area:any;
    console_area:any;
    iocontrol: IOControl;
    three: BasicThree;
    radioactiveThree: RadioactiveThree;
    root_divs: HTMLDivElement[];
    

    constructor(_design_area:any, _console:any){
        this.design_area = _design_area;
        this.console_area = _console;

        this.run_div = document.createElement("div");
        //this.run_div.innerHTML = 'Run';
        //this.run_div.style.background = 'green';
        //this.run_div.style.backgroundImage = "url('/static/images/run.png')";
        this.run_div.style.color = 'white';
        this.run_div.style.display = 'block';
        //this.run_div.style.position = "absolute";
        this.run_div.style.cursor = "pointer";
        //this.run_div.style.margin = "0.1rem";
        this.run_div.style.width = "3rem";
        this.run_div.style.height = "100%";

        let icon = new Icon('/static/images/run.png'); 

        this.run_div.appendChild(icon.get());

        this.run_div.addEventListener("click", this.execute);
        this.root_divs = [];
    }

    get(){
        return this.run_div;
    }

    execute = () => {

        //resize io panel...
        let designArea=document.getElementById('designArea');        
        let consoleArea=document.getElementById('console');        
        let iopanelArea=document.getElementById('iopanel');       
        consoleArea.style.display='none';
        designArea.style.display='none';
        iopanelArea.style.left="19%";
        iopanelArea.style.top="13%";
        iopanelArea.style.width="79%";


        let edges = this.createEdgesData();
        let blocks = this.createBlocksData();



        if(blocks === null){
            let console_data = this.console_area.get().innerHTML;
            console_data += "<br><font color='red'>No blocks to run </font>";
            this.console_area.get().innerHTML = console_data;
            return;
        }

        console.log("Value of PI from mathjs is ", MATH.pi);

        this.submit({edges: edges, 
                     blocks: blocks});
    } 

    createEdgesData(){
        let edges:Edge[] = this.design_area.getEdges().getEdges();
        if(edges.length < 1){
            return null;
        }
        let edge:Edge;
        let edges_data:any = [];

        for(edge of edges){
            let data:any = edge.getData();
            let edge_data = {
                                id: data.id,
                                type: data.type,
                                src_blk_id: data.src_blk_id,
                                src_node_id: data.src_node_id,
                                tgt_blk_id: data.tgt_blk_id,
                                tgt_node_id: data.tgt_node_id
                            };
            edges_data.push(edge_data);
            console.log(
                            data.id + ' ' + 
                            data.type + ' ' +
                            data.src_blk_id + ' ' + 
                            data.src_node_id + ' ' + 
                            data.tgt_blk_id + ' ' + 
                            data.tgt_node_id
                        );
        }
        console.log(edges_data);

        return edges_data;
    }

    createBlocksData(){
        let blocks = this.design_area.getBlocks();
        if(blocks.length < 1){
            return null;
        }

        let blocks_data:any = [];

        let block:Block;
        for(block of blocks){
            let data:any = block.getData();
            let properties = this.createPropertiesData(data.id);
            let block_data = {
                                id: data.id,
                                type: data.type,
                                name: data.name,
                                inputs: data.inputs,
                                outputs:data.outputs,
                                properties: properties 
                            };
            blocks_data.push(block_data);
            console.log(
                        data.id + " " + 
                        data.type + " " + 
                        data.name + " " +
                        data.inputs + " " + 
                        data.outputs
                        );

            //console.log('Properties ', properties.itemProps);
        }

        console.log(blocks_data);

        return blocks_data;
    }

    createPropertiesData(id:number){
        let properties = DesignApi.getComponentByInstId(id);
        let prop_data:any = {};
        for(let prop of properties.itemProps){
            let key = prop.propName;
            if(key === "fileinput"){
                let fileIO: FileIO = new FileIO();
                fileIO.processFileData(prop.propVal);
                let data = fileIO.get();
                prop_data["data"] = data;
            }
            prop_data[key] = prop.propVal;
        }

        

        return prop_data;
    }

    async submit(send_data:any) 
    {
        console.log("Send data " , send_data);
            //let response = await fetch('http://34.65.124.34:5000/api/calc', {
            let response = await fetch('http://127.0.0.1:5000/api/calc', {

                method: 'POST',
        
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(send_data)
            });
            let msg;
            let data:any = await response.json();

            if (data['output'] !== null && this.iocontrol !== null){
                this.iocontrol.getIoButtonOutput().emulateClick();
                let output_panel = this.iocontrol.getOuputPanel();
                this.iocontrol.get().parentNode.addEventListener("resize", this.outputResize);
                //output_panel.innerHTML = "";
                while (output_panel.firstChild) {
                    let child_div:any = output_panel.firstChild;
                    if(child_div.id.startsWith("root_")){
                        JSROOT.cleanup(child_div.id);
                    }
                    output_panel.removeChild(child_div);
                }
                let root_count = 0;
                this.root_divs = [];
                for(let i = 0; i < data['output'].length; i++){
                    console.log("## ", i);
                    let data_draw = data['output'][i]['data'];
                    //if(this.iocontrol !== null){
                        
                        if(data_draw['data_type'] === "Sim"){ // must be replaced 
                            let rect = output_panel.getBoundingClientRect();
                            // to remove
                            //let three = new BasicThree(pos);
                            this.three = new BasicThree({"width": rect.width, "height": rect.height});
                            console.log("## 2");
                            this.three.setData(data_draw['data']);
                            console.log("## 3");
                            //this.three.resize(pos);
                            output_panel.appendChild(this.three.get());
                            //this.setIOControl(this.iocontrol, {"width": rect.width, "height": rect.height});
                        }
                        else if(data_draw['data_type'] === "SimDecay"){ // must be replaced 
                            let rect = output_panel.getBoundingClientRect();
                            
                            let root_div = document.createElement("div");
                            root_div.setAttribute("id", "root_" + root_count);
                            root_div.style.display = "block";
                            root_div.style.width = "100%";
                            root_div.style.height = "100%";

                            root_count++;

                            output_panel.appendChild(root_div);
                            this.root_divs.push(root_div);

                            this.radioactiveThree = new RadioactiveThree({"width": rect.width, "height": rect.height});
                            this.radioactiveThree.setDecayData(data_draw['data'], root_div);
                            output_panel.appendChild(this.radioactiveThree.get());
                        }
                        else{
                            let root_div = document.createElement("div");
                            root_div.setAttribute("id", "root_" + root_count);
                            root_div.style.display = "block";
                            root_div.style.width = "100%";
                            root_div.style.height = "100%";

                            //JSROOT.RegisterForResize(root_div.id);

                            root_count++;

                            output_panel.appendChild(root_div);
                            this.root_divs.push(root_div);

                            if(data_draw['data_type'] === "Graph"){
                                let dat = JSROOT.parse(data_draw["data"]);
                                JSROOT.draw(root_div.id, dat, "ACP");
                            }
                            else if(data_draw['data_type'] === "Hist1D"){
                                let dat = JSROOT.parse(data_draw["data"]);
                                JSROOT.draw(root_div.id, dat, "hist");
                            }
                            else if(data_draw['data_type'] === "TF2"){
                                let dat = JSROOT.parse(data_draw["data"]);
                                JSROOT.draw(root_div.id, dat, "L");
                            }
                            else if(data_draw['data_type'] === "Fit1D"){
                                let dat_h = JSROOT.parse(data_draw["data"]["h1"]);
                                JSROOT.draw(root_div.id, dat_h, "hist");
                                
                                let dat_f = JSROOT.parse(data_draw["data"]["f1"]);
                                JSROOT.draw(root_div.id, dat_f, "ACP");
                            }
                            
                        }
                    //}
                }
                msg = "<br><font color='green'>" + data['message'] + "</font><br>";
                //this.run_div.dispatchEvent(new CustomEvent("resize", {
                //    bubbles: true
                //  }));
            }
            else{
                msg = "<br><font color='red'>" + data['message'] + "</font><br>";
            }

            let console_data = this.console_area.get().innerHTML;
            msg += console_data
            this.console_area.get().innerHTML = msg;
                
            return data;
    }

    setIOControl(ioc:IOControl){
        this.iocontrol = ioc;

        
    }

    outputResize = (evt:any) => {
        for(let root_div of this.root_divs){
            JSROOT.resize(root_div.id);
        }
        //this.three.resize( {width: evt.target.getBoundingClientRect().width, 
         //   height: evt.target.getBoundingClientRect().height});
    }
}