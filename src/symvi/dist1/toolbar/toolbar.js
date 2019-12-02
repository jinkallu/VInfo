import { Run } from './run';
export class ToolBar {
    constructor(pos, design_area, console) {
        this.tool_bar_div = document.createElement("div");
        this.tool_bar_div.style.width = pos.width;
        this.tool_bar_div.style.top = pos.top;
        this.tool_bar_div.style.height = pos.height;
        this.tool_bar_div.style.borderBottom = "solid #C0C0C0";
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
    setIOControl(ioc, pos) {
        this.run.setIOControl(ioc, pos);
    }
}
//# sourceMappingURL=toolbar.js.map