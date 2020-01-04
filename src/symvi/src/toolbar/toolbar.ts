import { Run } from './run'
import { IOControl } from '../iopanel/iocontrol';
import {ResizeOutput} from './resizeoutput';

export class ToolBar{
    tool_bar_div:HTMLDivElement;
    run:Run;
    resize_output: ResizeOutput;

    constructor(pos:any, design_area:any, console:any, iopanel:any){
        this.tool_bar_div = document.createElement("div");
        this.tool_bar_div.style.display = "flex";
        this.tool_bar_div.setAttribute("justify-content", "space-between");
        this.tool_bar_div.style.width = pos.width;
        this.tool_bar_div.style.top = pos.top;
        this.tool_bar_div.style.height = pos.height;
        //this.tool_bar_div.style.background = "#C0C0C0";
        this.tool_bar_div.style.borderBottom = "solid #C0C0C0";
        this.tool_bar_div.style.borderBottomWidth = "thin";
        this.tool_bar_div.style.position = "absolute";

        this.run = new Run(design_area, console);
        this.resize_output = new ResizeOutput(iopanel.get());
        this.resize_output.get().addEventListener("click", this.resizingOutput);

        this.run.get().addEventListener("full_output", this.showFullOutput);
        this.create();
    }

    create(){
        this.tool_bar_div.appendChild(this.run.get());

        this.tool_bar_div.appendChild(this.resize_output.get());
    }

    get(){
        return this.tool_bar_div;
    }

    setIOControl(ioc:IOControl){//}, pos:any){
        this.run.setIOControl(ioc);//, pos);
    }

    resizingOutput = () => {
        this.run.outputResize();
    }

    showFullOutput = () => {
        this.resize_output.showFullOutput();
    }
}