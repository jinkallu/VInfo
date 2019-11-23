export class Node {
    constructor(_pos, _io, _edges, _block_id, _node_id) {
        this.connecting = () => {
            if (this.io) {
                this.connectEnd();
            }
            else {
                this.connectStart();
            }
        };
        this.block_id = _block_id;
        this.node_id = _node_id;
        this.rad = 5;
        this.io = _io;
        this.edges = _edges;
        this.pos = _pos;
        this.edge = undefined;
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.setPos(this.pos);
        this.circle.setAttributeNS(null, "r", this.rad);
        this.circle.setAttributeNS(null, "stroke", "black");
        this.circle.setAttributeNS(null, "fill", "white");
        this.circle.addEventListener("click", this.connecting);
    }
    get() {
        return this.circle;
    }
    setPos(pos) {
        this.pos = pos;
        if (this.io === true) {
            this.circle.setAttributeNS(null, "cx", pos.x - this.rad);
            if (this.edge) {
                if (this.edge.active) {
                    this.edge.setPointTgt(pos);
                }
            }
        }
        else {
            this.circle.setAttributeNS(null, "cx", pos.x + this.rad);
            if (this.edge) {
                if (this.edge.active) {
                    this.edge.setPointSrc(pos);
                }
            }
        }
        this.circle.setAttributeNS(null, "cy", pos.y);
    }
    connectStart() {
        if (!this.edges.connectionStarted()) {
            this.edges.setConnectionStarted(true);
            this.edges.setConnectionSrc({ src_node: this,
                block_id: this.block_id,
                node_id: this.node_id,
                pos: {
                    x: this.pos.x,
                    y: this.pos.y
                },
            });
        }
    }
    connectEnd() {
        if (this.edges.connectionStarted()) {
            this.edges.setConnectionTgt({
                block_id: this.block_id,
                node_id: this.node_id,
                pos: {
                    x: this.pos.x,
                    y: this.pos.y
                }
            });
            this.edge = this.edges.addEdge();
            this.edges.setEdgeForSrc(this.edge);
            this.edges.setConnectionStarted(false);
        }
    }
    setEdge(_edge) {
        this.edge = _edge;
    }
}
//# sourceMappingURL=node.js.map