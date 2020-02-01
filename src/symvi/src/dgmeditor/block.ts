import { Node } from './node';
import { Edges } from './edges';
import { DesignApi } from '../Api/designApi';
import { Component } from '../models/component';
import {Properties} from '../iopanel/properties';
import { ContextMenu } from './contextmenu';

// import { Script } from 'vm';


export class Block {
    id: number;
    rect: any;
    drag_started: boolean;
    svg: any;
    group: any;
    ctm: any;
    inputs: number;
    outputs: number;
    input_nodes: any[];
    output_nodes: any[];
    edges: Edges;
    text: any;
    name: string;
    type: string;
    itemId: string;
    component: Component;
    property:Properties;

    context_menu: ContextMenu;


    constructor(svg: any, pos: any,_id:number, _inputs: number, _outputs: number, _edges: Edges, _name: string, itemId: string, url:string, body: HTMLBodyElement) {
        this.id = _id;
        this.type = 'Block';

        this.inputs = _inputs;
        this.outputs = _outputs;

        this.svg = svg;

        this.edges = _edges;

        this.input_nodes = [];
        this.output_nodes = [];

        this.name = _name;
        this.itemId = itemId;
        // this.component = new Component(this.id, this.itemId);
        this.property=Properties.getInstance();

        this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");

        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.rect.setAttribute("width", "60");
        this.rect.setAttribute("height", "40");
        //this.rect.setAttribute("fill", "white");
        this.rect.setAttribute("stroke", "red");
        this.rect.setAttribute("x", pos.x - 30);
        this.rect.setAttribute("y", pos.y - 20);

        if (navigator.userAgent.indexOf("Chrome") > 0) { // check if the browser is chrome
            this.rect.setAttribute("href", '/symvi' + url);
        }
        this.rect.setAttribute("style",  "outline: 0.05rem solid red;");

        /*let pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        pattern.setAttribute("id", "img1");
        pattern.setAttribute("patternUnits", "userSpaceOnUse");
        pattern.setAttribute("width", "100%");
        pattern.setAttribute("height", "100%");

        let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttribute("xlink:href", url);
        image.style.width = "100%";
        image.style.height = "100%";
        image.setAttribute("x", "0");
        image.setAttribute("y", "0");

        pattern.appendChild(image);

        this.svg.appendChild(pattern);

        this.rect.setAttribute("fill", "url(#img1)");*/
        //let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        //let pattern = svg.pattern(defs, "imgPattern", 0, 0, 100, 100, 0, 0, 10, 10, 
        //              {patternUnits: "userSpaceOnUse"});
        //let img = svg.image( pattern, 100, 50, 200, 200, url);
        //this.rect.setAttribute("fill", "url(#imgPattern)");

        // text
        this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.text.textContent = _name;
        this.text.setAttribute("x", pos.x - 30);
        this.text.setAttribute("y", pos.y - 20 - 10);
        this.text.setAttribute("pointer-events", "none");

        this.rect.addEventListener("mousedown", this.dragStart);
        this.rect.addEventListener("mousemove", this.dragging);
        this.rect.addEventListener("mouseup", this.dragStop);
        this.rect.addEventListener("mouseleave", this.dragStop);

        this.rect.addEventListener("click", this.onClick);
        this.rect.addEventListener("contextmenu", this.contextMenu); 


        
        
        // console.log(this.component);
        
        
        
        //this.rect.onmousedown = this.dragStart;
        //this.rect.onmousemove = this.dragging;
        
        this.group.appendChild(this.rect);
        this.group.appendChild(this.text);
        
        this.drag_started = false;
        
        this.addInputs();
        this.addOutputs();

        this.context_menu = new ContextMenu();

        body.appendChild(this.context_menu.get());
        this.context_menu.get().addEventListener("delete", this.delete);

        // this.rect.addEventListener("click", this.onClick);
    }

   

    get() {
        return this.group;
    }

    getRect(){
        return this.rect;
    }

    getId(){
        return this.id;
    }

    setSelected(){
        this.rect.setAttribute("stroke", "blue");
        this.rect.setAttribute("style",  "outline: 0.05rem dashed blue;");
    }

    setDeselected(){
        this.rect.setAttribute("stroke", "red");
        this.rect.setAttribute("style",  "outline: 0.05rem solid red;");
    }

    onClick = (evt:any) => {
        evt.preventDefault();
        this.rect.dispatchEvent(new CustomEvent("block_clicked", {
            bubbles: true,
            detail: { id:  this.id,name:this.name}
          }));
    }

    calculateNodePos(io: boolean) {
        let ios: number = 0;
        if (io) {
            ios = this.inputs;
        }
        else {
            ios = this.outputs;
        }

        let y: number = +this.rect.getAttribute("y"); // + convert string to number
        let x: number = +this.rect.getAttribute("x");

        let height: number = +parseInt(this.rect.height.baseVal.value);



        let dy_init: number = height / ios;
        let dy: number = (height - dy_init) / ios;
        let y_start: number = y + dy_init / 2;

        return { x: x, y: y_start, dy: dy };
    }

    setOutNodesPos() {
        if (this.output_nodes.length < 1) {
            return;
        }

        let node_pos = this.calculateNodePos(false);
        let width: number = +parseInt(this.rect.width.baseVal.value);
        node_pos.x += width;

        for (let i = 0; i < this.output_nodes.length; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            //console.log("Pos before " + node_pos.x + " " + y_i);
            this.output_nodes[i].setPos({ x: node_pos.x, y: y_i });
        }
    }

    setInputNodesPos() {
        if (this.input_nodes.length < 1) {
            return;
        }

        let node_pos = this.calculateNodePos(true);

        for (let i = 0; i < this.input_nodes.length; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            //console.log("Pos before " + node_pos.x + " " + y_i);
            this.input_nodes[i].setPos({ x: node_pos.x, y: y_i });
        }
    }

    setNodPos() {
        this.setInputNodesPos();
        this.setOutNodesPos();
    }

    addInputs() {
        if (this.inputs < 1) {
            return;
        }

        let node_pos = this.calculateNodePos(true);

        for (let i = 0; i < this.inputs; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            let node = new Node({ x: node_pos.x, y: y_i }, true, this.edges, this.id, i);
            this.input_nodes.push(node);
            this.group.appendChild(node.get());
        }
    }

    addOutputs() {
        if (this.outputs < 1) {
            return;
        }

        let node_pos = this.calculateNodePos(false);
        let width: number = +parseInt(this.rect.width.baseVal.value);
        node_pos.x += width;

        for (let i = 0; i < this.outputs; i++) {
            let y_i = node_pos.y + i * node_pos.dy;
            let node = new Node({ x: node_pos.x, y: y_i }, false, this.edges, this.id, i);
            this.output_nodes.push(node);
            this.group.appendChild(node.get());
        }
    }

    dragStart = (event: MouseEvent) => {
        //console.log("Drag Start" + event.pageX + " " + event.pageY);
        this.drag_started = true;
    }

    dragStop = (event: MouseEvent) => {
        //console.log("Drag Start" + event.pageX + " " + event.pageY);
        if (this.drag_started) {
            this.drag_started = false;
            this.rect.dispatchEvent(new CustomEvent("block_clicked", {
                bubbles: true,
                detail: { id:  this.id}
              }));
            // console.log(this.component);
            // this.property.addItems(this.component.itemProps,this.component.instanceId);
        }
    }

    setPosition(x: any, y: any): void {
        if (x < 0 || y < 0) {
            return;
        }
        //console.log("Set pos");

        this.rect.setAttributeNS(null, "x", x);
        this.rect.setAttributeNS(null, "y", y);

        this.text.setAttribute("x", x);
        this.text.setAttribute("y", y - 10);

        //let transform = this.group.transform.baseVal.getItem(0);   
        //let mat = transform.matrix;   

        //mat = mat.translate( x, y );  
        //transform.setMatrix( mat );
        //this.rect.setAttributeNS(null, "transform", "translate(" + x + "," + y + ")" );
        this.setNodPos();
        //this.group.transform.baseVal.appendItem(this.svg.createSVGTransformFromMatrix(this.svg.createSVGMatrix().translate(x,y)));
    }

    dragging = (event: MouseEvent) => {
        if (this.drag_started) {
            let pos = this.getMousePosition(event);
            this.setPosition(pos.x, pos.y);
        }
    }

    getMousePosition(event: any) {
        //if(this.ctm === undefined){
        this.ctm = this.svg.getScreenCTM();
        //}

        return {
            x: (event.clientX - this.ctm.e / this.ctm.a) - this.rect.width.baseVal.value / 2,
            y: (event.clientY - this.ctm.f / this.ctm.d) - this.rect.height.baseVal.value / 2
        };
    }

    getData() {
        let data = {
            id: this.id,
            type: this.type,
            name: this.name,
            inputs: this.inputs,
            outputs: this.outputs
        };
        return data;
    }

    getDataSave(){
        let propsForsave=DesignApi.getPropsByInstId(this.id);
      
        let data = {
            id: this.id,
            type_id: this.type,
            item_id: this.itemId,
            pos: {
                    x: this.rect.getAttributeNS(null, "x"),
                    y: this.rect.getAttributeNS(null, "y")
                },
            name: this.name,
            inputs: this.inputs,
            outputs: this.outputs,
            properties:propsForsave
        }

        return data;
    }

    getInputNode(i:number){
        return this.input_nodes[i];
    }

    getOutputNode(i:number){
        return this.output_nodes[i];
    }

    resetNode(io: boolean, node_id: any){
        if(io){
            this.input_nodes[node_id].resetConnection();
        }
        else{
            this.output_nodes[node_id].resetConnection();
        }
    }

    delete = (event:any) => {
        event.preventDefault();
        
        this.rect.dispatchEvent(new CustomEvent("deleteBlock", {
            bubbles: true,
            detail: { id:  this.id}
          }));
    }

    contextMenu = (evt: any) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log("Clicked context menu from block ", evt.pageX, evt.pageY);
        this.context_menu.display(evt.pageX, evt.pageY);
    }

    hideContextMenu(){
        this.context_menu.hide();
    }
}