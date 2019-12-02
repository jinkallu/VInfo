import { Block } from '../dgmeditor/block';
import { Edge } from '../dgmeditor/edge';
import JSROOT from 'JSROOT'
import { IOControl } from '../iopanel/iocontrol';
import { DesignApi } from '../Api/designApi';
import { Edges } from '../dgmeditor/edges';
import { BasicThree } from '../threejsanim/basicthree'


export class Run{
    run_div:HTMLDivElement;
    design_area:any;
    console_area:any;
    iocontrol: IOControl;

    constructor(_design_area:any, _console:any){
        this.design_area = _design_area;
        this.console_area = _console;

        this.run_div = document.createElement("div");
        this.run_div.innerHTML = 'Run';
        this.run_div.style.background = 'red';
        this.run_div.style.color = 'white';
        this.run_div.style.display = 'inline-block';

        this.run_div.addEventListener("click", this.execute);

        
    }

    get(){
        return this.run_div;
    }

    execute = () => {
        let edges = this.createEdgesData();
        let blocks = this.createBlocksData();

        if(blocks === null){
            let console_data = this.console_area.get().innerHTML;
            console_data += "<br><font color='red'>No blocks to run </font>";
            this.console_area.get().innerHTML = console_data;
            return;
        }
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
            prop_data[key] = prop.propVal;
        }

        return prop_data;
    }

    async submit(send_data:any) 
    {
        console.log("Send data " , send_data);
            //let response = await fetch('http://34.65.89.94:5000/api/calc', {
            let response = await fetch('http://127.0.0.1:5000/api/calc', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(send_data)
            });
            let msg;
            let data:any = await response.json();
            if (data['output'] !== null){
                let data_draw = JSROOT.parse(data['output'][0]['data']);
                if(this.iocontrol !== null){
                    this.iocontrol.getIoButtonOutput().emulateClick();
                    let output_panel = this.iocontrol.getOuputPanel();
                    output_panel.innerHTML = "";
                    JSROOT.draw(output_panel.id, data_draw, "ACP");
                }
                msg = "<br><font color='green'>" + data['message'] + "</font>";
            }
            else{
                msg = "<br><font color='red'>" + data['message'] + "</font>";
            }

            let console_data = this.console_area.get().innerHTML;
            console_data += msg
            this.console_area.get().innerHTML = console_data;
                
            return data;
    }

    setIOControl(ioc:IOControl, pos:any){
        this.iocontrol = ioc;

        // to remove
        let output_div = this.iocontrol.getOuputPanel();
        let three = new BasicThree(pos);
        output_div.appendChild(three.get());
    }
}