import { Run } from './run';
export class ToolBar {
    constructor(design_area) {
        this.tool_bar_div = document.createElement("div");
        this.tool_bar_div.style.width = "100%";
        this.tool_bar_div.style.top = "10%";
        this.tool_bar_div.style.height = "8%";
        this.tool_bar_div.style.border = "solid black";
        this.tool_bar_div.style.position = "absolute";
        this.run = new Run(design_area);
    }
    create() {
        this.tool_bar_div.appendChild(this.run.get());
        return this.tool_bar_div;
    }
}
//# sourceMappingURL=toolbar.js.map