import { Run } from './run'
import { IOControl } from '../iopanel/iocontrol';

export class ToolBar{
    tool_bar_div:HTMLDivElement;
    run:Run;
    constructor(width:any, top:any, height:any, design_area:any, console:any){
        this.tool_bar_div = document.createElement("div");
        this.tool_bar_div.style.width = width;
        this.tool_bar_div.style.top = top;
        this.tool_bar_div.style.height = height;
        this.tool_bar_div.style.background = "#C0C0C0";
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

    setIOControl(ioc:IOControl){
        this.run.setIOControl(ioc);
    }
}