import { Run } from './run';
export class ToolBar {
    constructor(width, top, height, design_area, console) {
        this.tool_bar_div = document.createElement("div");
        this.tool_bar_div.style.width = width;
        this.tool_bar_div.style.top = top;
        this.tool_bar_div.style.height = height;
        this.tool_bar_div.style.background = "#696969";
        this.tool_bar_div.style.position = "absolute";
        this.run = new Run(design_area, console);
        this.create();
    }
    create() {
        this.tool_bar_div.appendChild(this.run.get());
    }
    get() {
        return this.tool_bar_div;
    }
}
//# sourceMappingURL=toolbar.js.map