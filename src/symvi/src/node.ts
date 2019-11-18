import {Edges} from './edges.js';

export class Node{
    circle:any;
    rad:number;
    io:boolean; // 0 output, 1 input
    edges:Edges;
    pos:any;

    constructor(_pos:any, _io:boolean, _edges:Edges){
        this.rad = 5;
        this.io = _io; 
        this.edges = _edges;
        this.pos = _pos;

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
        //console.log("setting nod pos " + pos.x + " " + pos.y);
        //this.circle.setAttributeNS(null, "transform", "translate(" + (pos.x - this.rad) + "," + pos.y + ")" );
        if(this.io){
            this.circle.setAttributeNS(null, "cx", pos.x - this.rad);
        }
        else{
            this.circle.setAttributeNS(null, "cx", pos.x + this.rad);
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
        console.log("connection started");
        if(!this.edges.connectionStarted()){
            this.edges.setConnectionStarted(true);
            this.edges.setConnectionSrc({block_id: 0, node_id: 0, pos:{x: this.pos.x, y:this.pos.y}});
        }
    }

    connectEnd(){
        console.log("End of connection");
        if(this.edges.connectionStarted()){
            this.edges.setConnectionStarted(false);
            this.edges.setConnectionTgt({block_id: 0, node_id: 0, pos:{x: this.pos.x, y:this.pos.y}});
            this.edges.addEdge();
        }
    }
}