"use strict";
exports.__esModule = true;
var Block = /** @class */ (function () {
    function Block(svg) {
        var _this = this;
        this.dragStart = function (event) {
            console.log("Drag Start" + event.pageX + " " + event.pageY);
            _this.drag_started = true;
        };
        this.dragStop = function (event) {
            //console.log("Drag Start" + event.pageX + " " + event.pageY);
            if (_this.drag_started) {
                _this.drag_started = false;
            }
        };
        this.dragging = function (event) {
            if (_this.drag_started) {
                var pos = _this.getMousePosition(event);
                _this.setPosition(pos.x, pos.y);
            }
        };
        this.svg = svg;
        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.rect.setAttribute("width", "10%");
        this.rect.setAttribute("height", "6%");
        this.rect.setAttribute("fill", "red");
        this.rect.addEventListener("mousedown", this.dragStart);
        this.rect.addEventListener("mousemove", this.dragging);
        this.rect.addEventListener("mouseup", this.dragStop);
        this.rect.addEventListener("mouseleave", this.dragStop);
        //this.rect.onmousedown = this.dragStart;
        //this.rect.onmousemove = this.dragging;
        this.drag_started = false;
    }
    Block.prototype.get = function () {
        return this.rect;
    };
    Block.prototype.setPosition = function (x, y) {
        if (x < 0 || y < 0) {
            return;
        }
        this.rect.setAttributeNS(null, "x", x);
        this.rect.setAttributeNS(null, "y", y);
    };
    Block.prototype.getMousePosition = function (event) {
        if (this.ctm === undefined) {
            this.ctm = this.rect.getScreenCTM();
        }
        return {
            x: (event.clientX - this.ctm.e) / this.ctm.a - this.rect.width.baseVal.value / 2,
            y: (event.clientY - this.ctm.f) / this.ctm.d - this.rect.height.baseVal.value / 2
        };
    };
    return Block;
}());
exports.Block = Block;
