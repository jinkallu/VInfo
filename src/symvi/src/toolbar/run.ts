import { Block } from '../dgmeditor/block';
import { Edge } from '../dgmeditor/edge';

export class Run{
    run_div:HTMLDivElement;
    design_area:any;

    constructor(_design_area:any){
        this.design_area = _design_area;

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
        let blocks = this.design_area.getBlocks();


        let block:Block;
        for(block of blocks){
            let data:any = block.getData();
            console.log(
                        data.id + " " + 
                        data.type + " " + 
                        data.name + " " +
                        data.inputs + " " + 
                        data.outputs
                        );
        }

        let edges:Edge[] = this.design_area.getEdges().getEdges();
        let edge:Edge;
        for(edge of edges){
            let edge_data:any = edge.getData();
            console.log(edge_data.id + ' ' + edge_data.type);
        }

    } 


}