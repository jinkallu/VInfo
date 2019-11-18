import {Edge } from './edge.js';

export class Edges{
    edges:any[];
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
    }

    connectionStarted(){
        return this.connection_started;
    }

    setConnectionStarted(flag:boolean){
        this.connection_started = flag;
    }

    setConnectionSrc(src:any){
        this.connection_src = src;
    }

    setConnectionTgt(tgt:any){
        this.connection_tgt = tgt;
    }
}