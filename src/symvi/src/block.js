"use strict";
exports.__esModule = true;
var Block = /** @class */ (function () {
    function Block() {
        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.rect.setAttribute("width", "10%");
        this.rect.setAttribute("height", "4%");
        this.rect.setAttribute("fill", "red");
    }
    Block.prototype.get = function () {
        return this.rect;
    };
    return Block;
}());
exports.Block = Block;
