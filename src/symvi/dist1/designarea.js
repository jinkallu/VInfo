import { Block } from './block.js';
export class DesignArea {
    constructor() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.style.position = "absolute";
        let rect = new Block(this.svg);
        this.svg.appendChild(rect.get());
    }
    create(desing_area) {
        let div = desing_area;
        div.appendChild(this.svg);
    }
}
//# sourceMappingURL=designarea.js.map