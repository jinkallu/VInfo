export class Node{
    circle:any;
    rad:number;
    constructor(pos:any){
        this.rad = 5;
        this.circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        this.circle.setAttributeNS(null, "cx", pos.x - this.rad);
        this.circle.setAttributeNS(null, "cy", pos.y);
        this.circle.setAttributeNS(null, "r", this.rad);
        this.circle.setAttributeNS(null, "stroke", "black");
        this.circle.setAttributeNS(null, "fill", "white");
    }

    get(){
        return this.circle;
    }

    setPos(pos:any){
        console.log("setting nod pos " + pos.x + " " + pos.y);
        //this.circle.setAttributeNS(null, "transform", "translate(" + (pos.x - this.rad) + "," + pos.y + ")" );
        this.circle.setAttributeNS(null, "cx", pos.x - this.rad);
        this.circle.setAttributeNS(null, "cy", pos.y);
    }
}