import {Node } from './node.js';

export class Block{
    rect:any;
    drag_started:boolean;
    svg:any;
    ctm:any;
    inputs:number;
    outputs:number;
    constructor(svg:any, pos:any, _inputs:number, _outputs:number){
        this.inputs = _inputs;
        this.outputs = _outputs;

        this.svg = svg;

        this.rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.rect.setAttribute("width", "10%");
        this.rect.setAttribute("height", "6%");
        this.rect.setAttribute("fill", "white");
        this.rect.setAttribute("stroke", "red");
        this.rect.setAttribute("x", pos.x);
        this.rect.setAttribute("y", pos.y);

        this.rect.addEventListener("mousedown", this.dragStart); 
        this.rect.addEventListener("mousemove", this.dragging); 
        this.rect.addEventListener("mouseup", this.dragStop);
        this.rect.addEventListener("mouseleave", this.dragStop); 

        //this.rect.onmousedown = this.dragStart;
        //this.rect.onmousemove = this.dragging;

        this.drag_started = false;

        this.addInputs();
    }

    get(){
        return this.rect;
    }

    addInputs(){
        let x = this.rect.getAttribute("x");
        let y = this.rect.getAttribute("y");
        let width = parseInt(this.rect.getAttribute("width"));
        let height = parseInt(this.rect.getAttribute("height"));

        let parent_width = parseInt(this.svg.getAttribute("width"));
        let parent_height = parseInt(this.svg.getAttribute("height"));

        let xpos = x;
        let ypos = y + parent_height * height / 100 / 2;

        console.log('width ' + width);


        let node = new Node({x: xpos, y: ypos});
        this.svg.appendChild(node.get());
    }

    dragStart = (event: MouseEvent) => {
        console.log("Drag Start" + event.pageX + " " + event.pageY);
        this.drag_started = true;
    }

    dragStop = (event: MouseEvent) => {
        //console.log("Drag Start" + event.pageX + " " + event.pageY);
        if(this.drag_started){
            this.drag_started = false;
        } 
    }

    setPosition(x:any, y:any):void{
        if(x < 0 || y < 0){
            return;
        }
        
        this.rect.setAttributeNS(null, "x", x);
        this.rect.setAttributeNS(null, "y", y);
    }

    dragging = (event: MouseEvent) => {
        if(this.drag_started){
            let pos = this.getMousePosition(event);
            this.setPosition(pos.x, pos.y);
        }
    }

    getMousePosition(event:any) {
        if(this.ctm === undefined){
            this.ctm = this.rect.getScreenCTM();
        }

        return {
            x : (event.clientX - this.ctm.e) / this.ctm.a - this.rect.width.baseVal.value / 2,
            y : (event.clientY - this.ctm.f) / this.ctm.d - this.rect.height.baseVal.value / 2
        };
    }
}