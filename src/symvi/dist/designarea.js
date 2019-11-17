"use strict";
class DesignArea {
    constructor() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.style.position = "absolute";
        //var rect = draw.rect(100, 100).attr({ fill: '#f06' })
    }
    create(desing_area, pos) {
        let rect = new Block(this.svg, pos);
        this.svg.appendChild(rect.get());
        let div = desing_area;
        div.appendChild(this.svg);
    }
}
