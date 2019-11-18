import {Block } from './block.js';
import {Edges } from './edges.js';

export class DesignArea{
    svg:any;
    edges:Edges;

    constructor(){
        this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.style.position = "absolute";

        this.edges = new Edges(this.svg); 
        this.edges.addEdge({block_id: 0, node_id: 0, pos:{x: 0, y:100}}, 
            {block_id: 1, node_id: 0, pos:{x: 100, y:100}});       
         
        //var rect = draw.rect(100, 100).attr({ fill: '#f06' })
    }

    create(desing_area:any){
        let div:HTMLDivElement = desing_area;
        div.appendChild(this.svg);
    }

    addBlock(pos:any, inputs:number, outputs:number){
        let rect = new Block(this.svg, pos, inputs, outputs, this.edges);
        this.svg.appendChild(rect.get());
    }
}