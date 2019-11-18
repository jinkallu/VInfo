import { Block } from './block.js';
import { Edges } from './edges.js';
export class DesignArea {
    constructor() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.style.position = "absolute";
        this.edges = new Edges(this.svg);
    }
    create(desing_area) {
        let div = desing_area;
        div.appendChild(this.svg);
    }
    addBlock(pos, inputs, outputs) {
        let rect = new Block(this.svg, pos, inputs, outputs, this.edges);
        this.svg.appendChild(rect.get());
    }
}
//# sourceMappingURL=designarea.js.map