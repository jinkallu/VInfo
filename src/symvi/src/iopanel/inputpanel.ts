import { Properties } from './properties';

export class InputPanel{
    input_panel_div: HTMLDivElement;

    constructor(){
        this.input_panel_div = document.createElement("div");
        this.input_panel_div.style.width = "100%";
        this.input_panel_div.style.left = "0px";

        this.createProperties();
    }

    get(){
        return this.input_panel_div;
    }

    createProperties(){
        let property:Properties=Properties.getInstance();
        this.input_panel_div.appendChild(property.create() );
    }
}