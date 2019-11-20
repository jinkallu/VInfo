import {Node } from './node';
import {Edges } from './edges';


export class Block{
    rect:any;
    drag_started:boolean;
    svg:any;
    group:any;
    ctm:any;
    inputs:number;
    outputs:number;
    input_nodes:any[];
    output_nodes:any[];
    edges:Edges;

    constructor(svg:any, pos:any, _inputs:number, _outputs:number, _edges:Edges){
        this.inputs = _inputs;
        this.outputs = _outputs;

        this.svg = svg;

        this.edges = _edges;

        this.input_nodes = [];
        this.output_nodes = [];

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
        this.addOutputs();
    }

    get(){
        return this.group;
    }

    calculateNodePos(io:boolean){
        let ios:number = 0;
        if(io){
            ios = this.inputs;
        }
        else{
            ios = this.outputs;
        }

        let y:number = +this.rect.getAttribute("y"); // + convert string to number
        let x:number = +this.rect.getAttribute("x");

        console.log("rect " + x + " " + y);

        let height:number = +parseInt(this.rect.height.baseVal.value);

        
       
        let dy_init:number = height / ios;
        let dy:number = (height - dy_init) / ios;
        let y_start:number = y + dy_init / 2;

        return {x: x, y: y_start, dy: dy};
    }

    setOutNodesPos(){
        if(this.output_nodes.length < 1){
            return;
        }

        let node_pos = this.calculateNodePos(false);
        let width:number = +parseInt(this.rect.width.baseVal.value);
        node_pos.x += width;

        for (let i = 0; i <  this.output_nodes.length; i++){
            let y_i = node_pos.y + i * node_pos.dy;
            //console.log("Pos before " + node_pos.x + " " + y_i);
            this.output_nodes[i].setPos({x: node_pos.x, y: y_i});
        }
    }

    setInputNodesPos(){
        if(this.input_nodes.length < 1){
            return;
        }

        let node_pos = this.calculateNodePos(true);

        for (let i = 0; i <  this.input_nodes.length; i++){
            let y_i = node_pos.y + i * node_pos.dy;
            //console.log("Pos before " + node_pos.x + " " + y_i);
            this.input_nodes[i].setPos({x: node_pos.x, y: y_i});
        }
    }

    setNodPos(){
        this.setInputNodesPos();
        this.setOutNodesPos();
    }

    addInputs(){
        if(this.inputs < 1){
            return;
        }

        let node_pos = this.calculateNodePos(true);

        for (let i = 0; i <  this.inputs; i++){
            let y_i = node_pos.y + i * node_pos.dy;
            let node = new Node({x: node_pos.x, y: y_i}, true, this.edges);
            this.input_nodes.push(node);
            this.group.appendChild(node.get());    
        }
    }

    addOutputs(){
        if(this.outputs < 1){
            return;
        }

        let node_pos = this.calculateNodePos(false);
        let width:number = +parseInt(this.rect.width.baseVal.value);
        node_pos.x += width;

        for (let i = 0; i <  this.outputs; i++){
            let y_i = node_pos.y + i * node_pos.dy;
            let node = new Node({x: node_pos.x, y: y_i}, false, this.edges);
            this.output_nodes.push(node);
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
        //if(this.ctm === undefined){
            this.ctm = this.svg.getScreenCTM();
        //}

        return {
            x : (event.clientX - this.ctm.e / this.ctm.a) - this.rect.width.baseVal.value / 2,
            y : (event.clientY - this.ctm.f / this.ctm.d) - this.rect.height.baseVal.value / 2
        };
    }
}