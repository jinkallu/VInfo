import {IOPanel} from '../iopanel/iopanel';

export class ResizeOutput{
    resize_output_div:HTMLDivElement;
    output_panel: HTMLDivElement;
    normal_width:any;
    normal_left:any;  

    constructor(_output_panel: HTMLDivElement){
        this.output_panel = _output_panel;
        this.normal_width = this.output_panel.style.width;
        this.normal_left = this.output_panel.style.left;


        this.resize_output_div = document.createElement("div");
        this.resize_output_div.innerHTML = 'Resize';
        this.resize_output_div.style.background = 'green';
        this.resize_output_div.style.color = 'white';
        this.resize_output_div.style.display = 'inline-block';
        this.resize_output_div.style.cursor = "pointer";
        this.resize_output_div.style.margin = "0.2rem";

        this.resize_output_div.addEventListener("click", this.resize);
    }

    get(){
        return this.resize_output_div;
    }

    resize = () => {
        console.log("Resizing output");
        console.log(this.output_panel.style.width);

        if(this.output_panel.style.width !== '100%'){
            this.output_panel.style.left = '0px';
            this.output_panel.style.width = '100%';
        }
        else{
            console.log(this.output_panel.style.left);
            this.output_panel.style.left = this.normal_left;
            this.output_panel.style.width = this.normal_width;
        }
    }
}