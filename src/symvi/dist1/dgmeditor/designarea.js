import { Block } from './block';
import { Edges } from './edges';
import { CategoryApi } from '../Api/categoryApi';
export class DesignArea {
    constructor(pos) {
        this.mouseMove = (event) => {
            if (this.edges.connectionStarted()) {
                let ctm = this.svg.getScreenCTM();
                let x = event.clientX - ctm.e / ctm.a;
                let y = event.clientY - ctm.f / ctm.d;
                this.edges.tmp_edge.setPointTgt({ x: x, y: y });
            }
        };
        this.contextMenu = (event) => {
            if (this.edges.connectionStarted()) {
                this.edges.setConnectionStarted(false);
                event.preventDefault();
            }
        };
        this.dragEnter = (event) => {
        };
        this.dragOver = (event) => {
            event.preventDefault();
        };
        this.drop = (event) => {
            event.preventDefault();
            let item_id = event.dataTransfer.getData("Text");
            let cat_item = CategoryApi.getCategoryItemByItemId(item_id);
            let inputs = cat_item._inputs;
            let outputs = cat_item._outputs;
            let name = cat_item._catItemName;
            let ctm = this.svg.getScreenCTM();
            let x = event.clientX - ctm.e / ctm.a;
            let y = event.clientY - ctm.f / ctm.d;
            this.addBlock({ x: x, y: y }, inputs, outputs, name);
        };
        this.design_area_div = document.createElement("div");
        this.design_area_div.style.position = "absolute";
        this.design_area_div.style.border = "solid black";
        this.design_area_div.style.top = pos.top;
        this.design_area_div.style.width = pos.width;
        this.design_area_div.style.left = pos.left;
        this.design_area_div.style.height = pos.height;
        this.design_area_div.setAttribute('id', 'designArea');
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.overflow = 'auto';
        this.svg.style.position = "absolute";
        this.blocks = [];
        this.edges = new Edges(this.svg);
        this.svg.addEventListener("mousemove", this.mouseMove);
        this.svg.addEventListener("contextmenu", this.contextMenu);
        this.svg.addEventListener("dragenter", this.dragEnter);
        this.svg.addEventListener("dragover", this.dragOver);
        this.svg.addEventListener("drop", this.drop);
        this.create();
    }
    create() {
        this.design_area_div.appendChild(this.svg);
    }
    get() {
        return this.design_area_div;
    }
    addBlock(pos, inputs, outputs, name) {
        let rect = new Block(this.svg, pos, inputs, outputs, this.edges, name);
        this.svg.appendChild(rect.get());
        this.blocks.push(rect);
    }
    getBlocks() {
        return this.blocks;
    }
    getEdges() {
        return this.edges;
    }
}
//# sourceMappingURL=designarea.js.map