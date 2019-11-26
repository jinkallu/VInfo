import { Block } from '../dgmeditor/block';
import { Edge } from '../dgmeditor/edge';
import JSROOT from 'JSROOT'

export class Run{
    run_div:HTMLDivElement;
    design_area:any;
    console_area:any;

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
        this.submit({edges: this.createEdgesData(), 
                     blocks: this.createBlocksData()});
    } 

    createEdgesData(){
        let edges:Edge[] = this.design_area.getEdges().getEdges();
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

        let blocks_data:any = [];

        let block:Block;
        for(block of blocks){
            let data:any = block.getData();
            let block_data = {
                                id: data.id,
                                type: data.type,
                                name: data.name,
                                inputs: data.inputs,
                                outputs:data.outputs 
                            };
            blocks_data.push(block_data);
            console.log(
                        data.id + " " + 
                        data.type + " " + 
                        data.name + " " +
                        data.inputs + " " + 
                        data.outputs
                        );
        }

        console.log(blocks_data);

        return blocks_data;
    }

    async submit(send_data:any) 
    {
            let response = await fetch('http://127.0.0.1:5000/api/calc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(send_data)
            });
            let data:any = await response.json();
            if (data['output'] !== null){
                let data_draw = JSROOT.parse(data['output'][0]['data']);
                JSROOT.draw("properties", data_draw, "hist");
            }
            this.console_area.innerHTML = data['message'];
                
                return data;
    }
}