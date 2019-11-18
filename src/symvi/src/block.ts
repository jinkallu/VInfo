import {Node } from './node.js';

export class Block{
    rect:any;
    drag_started:boolean;
    svg:any;
    group:any;
    ctm:any;
    inputs:number;
    outputs:number;
    constructor(svg:any, pos:any, _inputs:number, _outputs:number){
        this.inputs = _inputs;
        this.outputs = _outputs;

        this.svg = svg;

        this.group = document.createElementNS("http://www.w3.org/2000/svg","g");

        this.rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.rect.setAttribute("width", "60");
        this.rect.setAttribute("height", "40");
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

        this.group.appendChild(this.rect);

        this.drag_started = false;

        this.addInputs();
    }

    get(){
        return this.group;
    }

    nodePos(){
        let x = this.rect.getAttribute("x");
        let y = this.rect.getAttribute("y");
        let width = parseInt(this.rect.width.baseVal.value);
        let height = parseInt(this.rect.height.baseVal.value);

        console.log(y);
        
        let xpos = +x; // +unary operator, convert string to number
        let ypos = +y + +height / 2;

        return {x: xpos, y:ypos};
    }

    addInputs(){
        let node = new Node(this.nodePos());
        this.group.appendChild(node.get());
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
        console.log("Set pos");

        //this.group.setAttributeNS(null, "x", x);
        //this.group.setAttributeNS(null, "y", y);

        //let transform = this.group.transform.baseVal.getItem(0);   
        //let mat = transform.matrix;   

        //mat = mat.translate( x, y );  
        //transform.setMatrix( mat );
        this.group.setAttributeNS(null, "transform", "translate(" + x + "," + y + ")" );
        //this.group.transform.baseVal.appendItem(this.svg.createSVGTransformFromMatrix(this.svg.createSVGMatrix().translate(x,y)));
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
            x : (event.clientX - this.ctm.e / this.ctm.a) - this.rect.width.baseVal.value / 2,
            y : (event.clientY - this.ctm.f / this.ctm.d) - this.rect.height.baseVal.value / 2
        };
    }
}