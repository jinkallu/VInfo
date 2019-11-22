import { Edge } from './edge';
export class Edges {
    constructor(_svg) {
        this.edges = [];
        this.svg = _svg;
        this.connection_started = false;
    }
    addEdge() {
        this.edges.push(new Edge(this.connection_src, this.connection_tgt));
        this.svg.appendChild(this.edges[this.edges.length - 1].getPolyLine());
        return this.edges[this.edges.length - 1];
    }
    setEdgeForSrc(edge) {
        this.connection_src.src_node.setEdge(edge);
    }
    connectionStarted() {
        return this.connection_started;
    }
    setConnectionStarted(flag) {
        this.connection_started = flag;
        if (!flag) {
            this.removeTempEdge();
        }
    }
    setConnectionSrc(src) {
        this.connection_src = src;
        this.tmp_edge = null;
        this.tmp_edge = new Edge(this.connection_src, this.connection_src);
        this.svg.appendChild(this.tmp_edge.getPolyLine());
    }
    getConnectionSrc() {
        return this.connection_src;
    }
    setConnectionTgt(tgt) {
        this.connection_tgt = tgt;
    }
    removeTempEdge() {
        this.tmp_edge.getPolyLine().parentNode.removeChild(this.tmp_edge.getPolyLine());
        this.tmp_edge = null;
    }
    getConnectioTgt() {
        return this.connection_tgt;
    }
}
//# sourceMappingURL=edges.js.map