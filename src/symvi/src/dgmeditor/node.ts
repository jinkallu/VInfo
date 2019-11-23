import {Edges} from './edges';
import { Edge } from './edge';

export class Node{
    circle:any;
    rad:number;
    io:boolean; // 0 output, 1 input
    edges:Edges;
    pos:any;
    edge:Edge;

    constructor(_pos:any, _io:boolean, _edges:Edges){
        this.rad = 5;
        this.io = _io; 
        this.edges = _edges;
        this.pos = _pos;
        this.edge = undefined;

        this.circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        //this.circle.setAttributeNS(null, "cx", pos.x - this.rad);
        //this.circle.setAttributeNS(null, "cy", pos.y);
        this.setPos(this.pos);
        this.circle.setAttributeNS(null, "r", this.rad);
        this.circle.setAttributeNS(null, "stroke", "black");
        this.circle.setAttributeNS(null, "fill", "white");

        this.circle.addEventListener("click", this.connecting); 
    }

    get(){
        return this.circle;
    }

    setPos(pos:any){
        this.pos = pos;
        if(this.io === true){
            this.circle.setAttributeNS(null, "cx", pos.x - this.rad)

            if(this.edge){
                if(this.edge.active){
                    this.edge.setPointTgt(pos);
                }
            }
        }
        else{
            this.circle.setAttributeNS(null, "cx", pos.x + this.rad);
            if(this.edge){
                if(this.edge.active){
                    this.edge.setPointSrc(pos);
                }
            }
        }
        this.circle.setAttributeNS(null, "cy", pos.y);
    }

    connecting = () => {
        if(this.io){
            this.connectEnd();
        }
        else{
            this.connectStart();
        }
    }

    connectStart(){
        if(!this.edges.connectionStarted()){
            this.edges.setConnectionStarted(true);
            this.edges.setConnectionSrc({src_node: this, block_id: 0, node_id: 0, pos:{x: this.pos.x, y:this.pos.y}});
        }
    }

    connectEnd(){
        if(this.edges.connectionStarted()){
            this.edges.setConnectionTgt({block_id: 0, node_id: 0, pos:{x: this.pos.x, y:this.pos.y}});
            this.edge = this.edges.addEdge();
            this.edges.setEdgeForSrc(this.edge);
            this.edges.setConnectionStarted(false);
        }
    }

    setEdge(_edge:Edge){
        this.edge = _edge;
    }
}