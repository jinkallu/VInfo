import { Categories } from './categories';
export class ToolBox {
    constructor(top, width, height) {
        this.tool_box_div = document.createElement("div");
        this.tool_box_div.style.position = "absolute";
        this.tool_box_div.style.top = top;
        this.tool_box_div.style.width = width;
        this.tool_box_div.style.height = height;
        this.tool_box_div.style.background = "#DCDCDC";
        this.categories = new Categories();
        this.create();
    }
    create() {
        this.tool_box_div.appendChild(this.categories.create());
    }
    get() {
        return this.tool_box_div;
    }
}
//# sourceMappingURL=toolbox.js.map