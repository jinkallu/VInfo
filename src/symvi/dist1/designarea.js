import { Block } from './block.js';
import { Edges } from './edges.js';
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
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.overflow = 'auto';
        this.svg.style.position = "absolute";
        this.edges = new Edges(this.svg);
        this.svg.addEventListener("mousemove", this.mouseMove);
        this.svg.addEventListener("contextmenu", this.contextMenu);
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