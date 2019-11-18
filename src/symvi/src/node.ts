export class Node{
    circle:any;
    constructor(pos:any){
        let rad = 5;
        this.circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        this.circle.setAttribute("cx", pos.x - rad);
        this.circle.setAttribute("cy", pos.y);
        this.circle.setAttribute("r", rad);
        this.circle.setAttribute("stroke", "black");
        this.circle.setAttribute("fill", "white");
    }

    get(){
        return this.circle;
    }
}