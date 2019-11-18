export class Node{
    circle:any;
    rad:number;
    io:boolean; // 0 output, 1 input
    constructor(pos:any, _io:boolean){
        this.rad = 5;
        this.io = _io; 
        this.circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        //this.circle.setAttributeNS(null, "cx", pos.x - this.rad);
        //this.circle.setAttributeNS(null, "cy", pos.y);
        this.setPos(pos);
        this.circle.setAttributeNS(null, "r", this.rad);
        this.circle.setAttributeNS(null, "stroke", "black");
        this.circle.setAttributeNS(null, "fill", "white");

        this.circle.addEventListener("click", this.connectStart); 
        this.circle.addEventListener("click", this.connectEnd); 

    }

    get(){
        return this.circle;
    }

    setPos(pos:any){
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

    connectStart(){

    }

    connectEnd(){

    }
}