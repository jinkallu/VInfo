import { Block } from './block';
import { Edges } from './edges';
import { CategoryApi } from '../Api/categoryApi';
export class DesignArea {
    constructor() {
        this.mouseMove = (event) => {
            if (this.edges.connectionStarted()) {
                console.log("moving temp");
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
            console.log("Drag enter from SVG");
        };
        this.dragOver = (event) => {
            console.log("Drag over");
            event.preventDefault();
        };
        this.drop = (event) => {
            event.preventDefault();
            let item_id = event.dataTransfer.getData("Text");
            let cat_item = CategoryApi.getCategoryItemByItemId(item_id);
            console.log(cat_item);
            let inputs = cat_item._inputs;
            let outputs = cat_item._outputs;
            let name = cat_item._catItemName;
            console.log(inputs + " " + outputs);
            let ctm = this.svg.getScreenCTM();
            let x = event.clientX - ctm.e / ctm.a;
            let y = event.clientY - ctm.f / ctm.d;
            this.addBlock({ x: x, y: y }, inputs, outputs, name);
        };
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
    }
    create(desing_area) {
        let div = desing_area;
        div.appendChild(this.svg);
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