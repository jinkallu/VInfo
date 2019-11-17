export class Block {
    constructor(svg) {
        this.dragStart = (event) => {
            console.log("Drag Start" + event.pageX + " " + event.pageY);
            this.drag_started = true;
        };
        this.dragStop = (event) => {
            if (this.drag_started) {
                this.drag_started = false;
            }
        };
        this.dragging = (event) => {
            if (this.drag_started) {
                let pos = this.getMousePosition(event);
                this.setPosition(pos.x, pos.y);
            }
        };
        this.svg = svg;
        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.rect.setAttribute("width", "10%");
        this.rect.setAttribute("height", "6%");
        this.rect.setAttribute("fill", "white");
        this.rect.setAttribute("stroke", "red");
        this.rect.addEventListener("mousedown", this.dragStart);
        this.rect.addEventListener("mousemove", this.dragging);
        this.rect.addEventListener("mouseup", this.dragStop);
        this.rect.addEventListener("mouseleave", this.dragStop);
        this.drag_started = false;
    }
    get() {
        return this.rect;
    }
    setPosition(x, y) {
        if (x < 0 || y < 0) {
            return;
        }
        this.rect.setAttributeNS(null, "x", x);
        this.rect.setAttributeNS(null, "y", y);
    }
    getMousePosition(event) {
        if (this.ctm === undefined) {
            this.ctm = this.rect.getScreenCTM();
        }
        return {
            x: (event.clientX - this.ctm.e) / this.ctm.a - this.rect.width.baseVal.value / 2,
            y: (event.clientY - this.ctm.f) / this.ctm.d - this.rect.height.baseVal.value / 2
        };
    }
}
//# sourceMappingURL=block.js.map