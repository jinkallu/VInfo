import { Block } from '../block';

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
            console.log(block.id + " " + block.name);
        }
    } 
}