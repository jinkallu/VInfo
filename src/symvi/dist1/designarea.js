import { Block } from './block.js';
var DesignArea = (function () {
    function DesignArea() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.style.position = "absolute";
        var rect = new Block(this.svg);
        this.svg.appendChild(rect.get());
    }
    DesignArea.prototype.create = function (desing_area) {
        var div = desing_area;
        div.appendChild(this.svg);
    };
    return DesignArea;
}());
export { DesignArea };
//# sourceMappingURL=designarea.js.map