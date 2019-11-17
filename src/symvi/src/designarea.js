"use strict";
exports.__esModule = true;
var block_1 = require("./block");
var DesignArea = /** @class */ (function () {
    function DesignArea() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.style.position = "absolute";
        /*let rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
        rect.setAttribute("width", "80%");
        rect.setAttribute("height", "80%");
        rect.setAttribute("fill", "red");*/
        var rect = new block_1.Block();
        this.svg.appendChild(rect.get());
        //var rect = draw.rect(100, 100).attr({ fill: '#f06' })
    }
    DesignArea.prototype.create = function (desing_area) {
        var div = desing_area;
        div.appendChild(this.svg);
    };
    return DesignArea;
}());
exports.DesignArea = DesignArea;
