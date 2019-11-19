import {Edge } from './edge.js';

export class Edges{
    edges:Edge[];
    tmp_edge:Edge;
    svg:any;

    connection_started:boolean;
    connection_src:any;
    connection_tgt:any;

    constructor(_svg:any){
        this.edges = [];
        this.svg = _svg;

        this.connection_started = false;
    }

    addEdge(){
        this.edges.push(new Edge(this.connection_src, this.connection_tgt));
        this.svg.appendChild(this.edges[this.edges.length - 1].getPolyLine());
        return this.edges[this.edges.length - 1];
    }

    setEdgeForSrc(edge:Edge){
        this.connection_src.src_node.setEdge(edge);
    }

    connectionStarted(){
        return this.connection_started;
    }

    setConnectionStarted(flag:boolean){
        this.connection_started = flag;
        if(!flag){
            this.removeTempEdge();
        }
    }

    setConnectionSrc(src:any){
        this.connection_src = src;
        this.tmp_edge = new Edge(this.connection_src, this.connection_src);
        this.svg.appendChild(this.tmp_edge.getPolyLine());
    }

    getConnectionSrc(){
        return this.connection_src;
    }

    setConnectionTgt(tgt:any){
        this.connection_tgt = tgt;
    }

    removeTempEdge(){
        this.tmp_edge.getPolyLine().parentNode.removeChild(this.tmp_edge.getPolyLine());
        this.tmp_edge = null;
    }

    getConnectioTgt(){
        return this.connection_tgt;
    }
}