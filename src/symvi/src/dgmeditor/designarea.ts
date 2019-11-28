import {Block } from './block';
import {Edges } from './edges';
import { CategoryApi } from '../Api/categoryApi';
import { CategoryItem } from '../models/categoryItem';


export class DesignArea{
    design_area_div:HTMLDivElement;
    svg:any;
    edges:Edges;
    blocks:Block[];
    catItem:CategoryItem;

    constructor(pos:any){
        this.design_area_div = document.createElement("div");
        this.design_area_div.style.position = "absolute";
        this.design_area_div.style.border = "solid black";
        this.design_area_div.style.top = pos.top;
        this.design_area_div.style.width = pos.width;
        this.design_area_div.style.left = pos.left;
        this.design_area_div.style.height = pos.height;
        this.design_area_div.setAttribute('id','designArea');

        this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.svg.setAttribute("height", '100%');
        this.svg.setAttribute("width", '100%');
        this.svg.overflow = 'auto';
        this.svg.style.position = "absolute";

        this.blocks = [];
        this.edges = new Edges(this.svg); 

        this.svg.addEventListener("mousemove", this.mouseMove); 
        this.svg.addEventListener("contextmenu", this.contextMenu); 

        this.svg.addEventListener("dragenter", this.dragEnter);
        this.svg.addEventListener("dragover", this.dragOver);  
        this.svg.addEventListener("drop", this.drop); 

        this.create();

    }

    create(){
        this.design_area_div.appendChild(this.svg);
    }

    get(){
        return this.design_area_div;
    }

    addBlock(pos:any, inputs:number, outputs:number, name:string,itemId:string){
        let rect = new Block(this.svg, pos, inputs, outputs, this.edges, name,itemId);
        this.svg.appendChild(rect.get());
        this.blocks.push(rect);
    }

    mouseMove = (event: MouseEvent) => {
        if(this.edges.connectionStarted()){
            //console.log("moving temp");
            let ctm = this.svg.getScreenCTM();
            let x = event.clientX - ctm.e / ctm.a;
            let y = event.clientY - ctm.f / ctm.d;
            this.edges.tmp_edge.setPointTgt({x: x, y: y});
        }
    }

    contextMenu = (event: MouseEvent) => {
        if(this.edges.connectionStarted()){
            this.edges.setConnectionStarted(false);
            event.preventDefault();
        }
    }

    dragEnter = (event: MouseEvent) => {
        //console.log("Drag enter from SVG");
    }

    dragOver = (event: MouseEvent) => {
        //console.log("Drag over");
        event.preventDefault();
    }

    drop = (event: any) => {
        event.preventDefault();
        //console.log("Drop");
        //if ( event.target.className === "flex-elem" ) {
            let item_id = event.dataTransfer.getData("Text");
            console.log("item_id");
            console.log(item_id);

             let cat_item:CategoryItem = CategoryApi.getCategoryItemByItemId(item_id);
            console.log(cat_item.inputs);
            let inputs = cat_item.inputs;
            let outputs = cat_item.outputs;
            let name = cat_item.categoryName;
            let itemId=cat_item.catItemId;




            //console.log(inputs + " " + outputs);


            let ctm = this.svg.getScreenCTM();
            let x = event.clientX - ctm.e / ctm.a;
            let y = event.clientY - ctm.f / ctm.d;

            this.addBlock({ x: x, y: y }, inputs, outputs, name,itemId);
        //}
    }

    getBlocks(){
        return this.blocks;
    }

    getEdges(){
        return this.edges;
    }
}