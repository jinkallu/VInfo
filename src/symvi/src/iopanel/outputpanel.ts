export class OutputPanel{
    output_panel_div: HTMLDivElement;

    constructor(){
        this.output_panel_div = document.createElement("div");
        this.output_panel_div.style.position = "absolute";
        this.output_panel_div.style.width = "100%";
        this.output_panel_div.style.height = "90%";
        this.output_panel_div.style.left = "0px";
        this.output_panel_div.style.display = "flex";
        this.output_panel_div.setAttribute('id', 'outputpanel');
    }

    get(){
        return this.output_panel_div;
    }
}