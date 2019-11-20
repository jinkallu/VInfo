import { Node } from './node';
export class Block {
    constructor(svg, pos, _inputs, _outputs, _edges) {
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
        this.inputs = _inputs;
        this.outputs = _outputs;
        this.svg = svg;
        this.edges = _edges;
        this.input_nodes = [];
        this.output_nodes = [];
        this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.rect.setAttribute("width", "60");
        this.rect.setAttribute("height", "40");
        this.rect.setAttribute("fill", "white");
        this.rect.setAttribute("stroke", "red");
        this.rect.setAttribute("x", pos.x);
        this.rect.setAttribute("y", pos.y);
        this.rect.addEventListener("mousedown", this.dragStart);
        this.rect.addEventListener("mousemove", this.dragging);
        this.rect.addEventListener("mouseup", this.dragStop);
        this.rect.addEventListener("mouseleave", this.dragStop);
        this.group.appendChild(this.rect);
        this.drag_started = false;
        this.addInputs();
        this.addOutputs();
    }
    get() {
        return this.group;
    }
    calculateNodePos(io) {
        let ios = 0;
        if (io) {
            ios = this.inputs;
        }
        else {
            ios = this.outputs;
        }
        let y = +this.rect.getAttribute("y");
        let x = +this.rect.getAttribute("x");
        console.log("rect " + x + " " + y);
        let height = +parseInt(this.rect.height.baseVal.value);
        let dy_init = height / ios;
        let dy = (height - dy_init) / ios;
        let y_start = y + dy_init / 2;
        return { x: x, y: y_start, dy: dy };
    }
    setOutNodesPos() {
        if (this.output_nodes.length < 1) {
            return;
        }
        let node_pos = this.calculateNodePos(false);
        let width = +parseInt(this.rect.width.baseVal.value);
        node_pos.x += width;
        for (let i = 0; i < this.output_nodes.length; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            this.output_nodes[i].setPos({ x: node_pos.x, y: y_i });
        }
    }
    setInputNodesPos() {
        if (this.input_nodes.length < 1) {
            return;
        }
        let node_pos = this.calculateNodePos(true);
        for (let i = 0; i < this.input_nodes.length; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            this.input_nodes[i].setPos({ x: node_pos.x, y: y_i });
        }
    }
    setNodPos() {
        this.setInputNodesPos();
        this.setOutNodesPos();
    }
    addInputs() {
        if (this.inputs < 1) {
            return;
        }
        let node_pos = this.calculateNodePos(true);
        for (let i = 0; i < this.inputs; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            let node = new Node({ x: node_pos.x, y: y_i }, true, this.edges);
            this.input_nodes.push(node);
            this.group.appendChild(node.get());
        }
    }
    addOutputs() {
        if (this.outputs < 1) {
            return;
        }
        let node_pos = this.calculateNodePos(false);
        let width = +parseInt(this.rect.width.baseVal.value);
        node_pos.x += width;
        for (let i = 0; i < this.outputs; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            let node = new Node({ x: node_pos.x, y: y_i }, false, this.edges);
            this.output_nodes.push(node);
            this.group.appendChild(node.get());
        }
    }
    setPosition(x, y) {
        if (x < 0 || y < 0) {
            return;
        }
        console.log("Set pos");
        this.rect.setAttributeNS(null, "x", x);
        this.rect.setAttributeNS(null, "y", y);
        this.setNodPos();
    }
    getMousePosition(event) {
        this.ctm = this.svg.getScreenCTM();
        return {
            x: (event.clientX - this.ctm.e / this.ctm.a) - this.rect.width.baseVal.value / 2,
            y: (event.clientY - this.ctm.f / this.ctm.d) - this.rect.height.baseVal.value / 2
        };
    }
}
//# sourceMappingURL=block.js.map