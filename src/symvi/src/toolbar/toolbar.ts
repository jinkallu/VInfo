import { Run } from './run'
import { IOControl } from '../iopanel/iocontrol';

export class ToolBar{
    tool_bar_div:HTMLDivElement;
    run:Run;
    constructor(pos:any, design_area:any, console:any){
        this.tool_bar_div = document.createElement("div");
        this.tool_bar_div.style.width = pos.width;
        this.tool_bar_div.style.top = pos.top;
        this.tool_bar_div.style.height = pos.height;
        //this.tool_bar_div.style.background = "#C0C0C0";
        this.tool_bar_div.style.borderBottom = "solid #C0C0C0";
        this.tool_bar_div.style.position = "absolute";

        this.run = new Run(design_area, console);

        this.create();
    }

    create(){
        this.tool_bar_div.appendChild(this.run.get());
    }

    get(){
        return this.tool_bar_div;
    }

    setIOControl(ioc:IOControl){//}, pos:any){
        this.run.setIOControl(ioc);//, pos);
    }
}