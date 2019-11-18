import {Edge } from './edge.js';

export class Edges{
    edges:any[];
    svg:any;
    constructor(_svg:any){
        this.edges = [];
        this.svg = _svg;
    }

    addEdge(src:any, tgt:any){
        this.edges.push(new Edge(src, tgt));
        this.svg.appendChild(this.edges[this.edges.length - 1].getPolyLine());
    }
}