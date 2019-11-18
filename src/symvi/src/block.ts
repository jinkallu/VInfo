import {Node } from './node.js';

export class Block{
    rect:any;
    drag_started:boolean;
    svg:any;
    group:any;
    ctm:any;
    inputs:number;
    outputs:number;
    nodes:any[];
    constructor(svg:any, pos:any, _inputs:number, _outputs:number){
        this.inputs = _inputs;
        this.outputs = _outputs;

        this.svg = svg;

        this.nodes = [];

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

    calculateNodePos(){
        let y:number = +this.rect.getAttribute("y"); // + convert string to number
        let x:number = +this.rect.getAttribute("x");

        console.log("rect " + x + " " + y);

        let width:number = +parseInt(this.rect.width.baseVal.value);
        let height:number = +parseInt(this.rect.height.baseVal.value);

        
       
        let dy_init:number = height / this.inputs;
        let dy:number = (height - dy_init) / this.inputs;
        let y_start:number = y + dy_init / 2;

        return {x: x, y: y_start, dy: dy};
    }

    setNodPos(){
        if(this.nodes.length < 1){
            return;
        }

        let node_pos = this.calculateNodePos();

        for (let i = 0; i <  this.nodes.length; i++){
            let y_i = node_pos.y + i * node_pos.dy;
            console.log("Pos before " + node_pos.x + " " + y_i);
            this.nodes[i].setPos({x: node_pos.x, y: y_i});
        }
    }

    addInputs(){
        if(this.inputs < 1){
            return;
        }

        let node_pos = this.calculateNodePos();

        for (let i = 0; i <  this.inputs; i++){
            let y_i = node_pos.y + i * node_pos.dy;
            let node = new Node({x: node_pos.x, y: y_i});
            this.nodes.push(node);
            this.group.appendChild(node.get());    
        }
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

        this.rect.setAttributeNS(null, "x", x);
        this.rect.setAttributeNS(null, "y", y);

        //let transform = this.group.transform.baseVal.getItem(0);   
        //let mat = transform.matrix;   

        //mat = mat.translate( x, y );  
        //transform.setMatrix( mat );
        //this.rect.setAttributeNS(null, "transform", "translate(" + x + "," + y + ")" );
        this.setNodPos();
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