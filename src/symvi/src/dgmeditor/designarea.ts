import {Block } from './block';
import {Edges } from './edges';
import { CategoryApi } from '../Api/categoryApi';
import { CategoryItem } from '../models/categoryItem';
import { Id } from './id';
import{Component} from '../models/component';
import{DesignApi} from '../Api/designApi';
import {Properties} from '../iopanel/properties';


export class DesignArea{
    design_area_div:HTMLDivElement;
    svg:any;
    edges:Edges;
    blocks:Block[];
    catItem:CategoryItem;
    component:Component;
    properties:Properties;
    cat_item:CategoryItem;
    itemName:string;
    body: HTMLBodyElement;

    constructor(pos:any, _body: HTMLBodyElement){
        this.body = _body;

        this.design_area_div = document.createElement("div");
        this.design_area_div.style.position = "absolute";
        this.design_area_div.style.background = "white";
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
        this.edges = new Edges(this.svg, _body); 

        this.svg.addEventListener("mousemove", this.mouseMove); 
        this.svg.addEventListener("contextmenu", this.contextMenu); 

        this.svg.addEventListener("dragenter", this.dragEnter);
        this.svg.addEventListener("dragover", this.dragOver);  
        this.svg.addEventListener("drop", this.drop); 

        this.svg.addEventListener("deleteEdge", this.deleteEdgeTrig);
        this.svg.addEventListener("deleteBlock", this.deleteBlock);

        this.create();
        this.properties=Properties.getInstance();

        this.body.addEventListener("click", this.bodyClicked);
        this.body.addEventListener("contextmenu", this.bodyClicked);

    }

    create(){
        this.design_area_div.appendChild(this.svg);
    }

    get(){
        return this.design_area_div;
    }

    addBlock(pos:any,id:number, inputs:number, outputs:number, name:string, itemId:string, url:string){
        let rect = new Block(this.svg, pos,id, inputs, outputs, this.edges, name,itemId, url, this.body);
        this.svg.appendChild(rect.get());
        this.blocks.push(rect);
        //rect.get().addEventListener("block_clicked", this.onClick);
        
        this.component = new Component(id, itemId);

        DesignApi.addComponent(this.component);
        this.itemName=name;
        this.properties.addItems(this.component.itemProps,this.itemName,id);     
        
        this.activeBlock(rect.getId());

        rect.get().addEventListener("block_clicked", this.onClick);

        return rect;
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
            console.log(event);
            let item_id = event.dataTransfer.getData("Text");
            //console.log("item_id");
            //console.log(item_id);
            let cat_item= CategoryApi.getCategoryItemByItemId(item_id);
            //console.log(cat_item.inputs);
            let inputs = cat_item.inputs;
            let outputs = cat_item.outputs;
            let name = cat_item.categoryName;
            let itemId = cat_item.catItemId;
            let url = cat_item.categoryImgURL




            //console.log(inputs + " " + outputs);


            let ctm = this.svg.getScreenCTM();
            let x = event.clientX - ctm.e / ctm.a;
            let y = event.clientY - ctm.f / ctm.d;
            

            this.addBlock({ x: x, y: y },Id.getID(), inputs, outputs, name, itemId, url);

        //}
    }

    getBlocks(){
        return this.blocks;
    }

    getEdges(){
        return this.edges;
    }

    setRight(right:number){
        let width = right - this.design_area_div.getBoundingClientRect().left;
        this.design_area_div.style.width = width + 'px';
    }

    onClick = (evt:any) => {
        this.properties.clearProps();
        let itemProps=DesignApi.getComponentByInstId(evt.detail.id).itemProps;

       
        this.properties.addItems(itemProps,evt.detail.name, evt.detail.id);
        
        this.activeBlock(evt.detail.id);

        this.design_area_div.dispatchEvent(new CustomEvent("block_clicked", {
            bubbles: true,
            detail: { id:  evt.detail.id,name:""}
          }));
        //evt.preventDefault();      
    }

    activeBlock(id: any){
        for (let block of this.blocks){
            if(id == block.getId()){
                block.setSelected();
            }
            else{
                block.setDeselected();
            }
        } 
    }

    processJSON(file:any){
        for(let block of file.blocks){
            let cat_item = CategoryApi.getCategoryItemByItemId(block.item_id);
            let inputs = cat_item.inputs;
            let outputs = cat_item.outputs;
            let name = cat_item.categoryName;
            let itemId = cat_item.catItemId;
            let url = cat_item.categoryImgURL

            let new_id = Id.getID();
            let rect = this.addBlock({ x: block.pos.x, y: block.pos.y }, new_id, inputs, outputs, name, itemId, url);

            block.new_id = new_id;
            for(let props of block.properties){
                DesignApi.addPropVal(new_id, props._propId, props._propVal);
            }

            rect.getRect().dispatchEvent(new CustomEvent("click"));
        }

        for (let edge of file.edges){
            let src_blk = null;
            let tgt_blk = null;

            for(let block of file.blocks){
                if(src_blk != null && tgt_blk != null){
                    break;
                }

                if (block.id == edge.src_blk_id){
                    src_blk = block;
                }
                else if (block.id == edge.tgt_blk_id){
                    tgt_blk = block;
                }
            }

            if(src_blk == null || tgt_blk == null){
                console.log("Internal error");
                return;
            }

            for (let block of this.blocks){
                if(block.getId() == src_blk.new_id){
                    let node = block.getOutputNode(edge.src_node_id);
                    node.get().dispatchEvent(new CustomEvent('click'));

                    break;
                }
            }

            for (let block of this.blocks){
                if(block.getId() == tgt_blk.new_id){
                    let node = block.getInputNode(edge.tgt_node_id);
                    //node.get().click();
                    node.get().dispatchEvent(new CustomEvent('click'));

                    break;
                }
            }
        } 
    }

    saveFile(){
        let out = "{\n\"blocks\": [\n";
        for(let block of this.blocks){
            console.log(block.getDataSave());
            out += JSON.stringify(block.getDataSave()) + ",\n";
        }

        out = out.replace(/,(\s+)?$/, '');
        out += "\n],\n\n";

        out += "\"edges\": [\n";
        for(let edge of this.edges.getEdges()){
            out += JSON.stringify(edge.getData()) + ",\n";
        }

        out = out.replace(/,(\s+)?$/, '');
        out += "\n]\n\n";
    
        out += "}";

        

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(out));
        element.setAttribute('download', "test");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    deleteEdgeTrig = (evt: any) => {
        this.deleteEdge(evt.detail.id);
    }

    deleteEdge(id: any){
        let edge_data = this.edges.deleteEdge(id);
        for(let block of this.blocks){
            if(edge_data.src_blk_id == block.getId()){
                block.resetNode(false, edge_data.src_node_id); // output node
            }
            else if(edge_data.tgt_blk_id == block.getId()){
                block.resetNode(true, edge_data.tgt_node_id); // input node
            }
        }
    }

    deleteBlock = (evt: any) => {
        for(let i = 0; i < this.blocks.length; i++){
            if (this.blocks[i].getId() == evt.detail.id){
                let edges_connected = this.edges.getEdgesConnectedWithBlock(this.blocks[i].getId());
                for(let edge of edges_connected){
                    this.deleteEdge(edge.getId());
                }
                
                this.svg.removeChild(this.blocks[i].get());
                this.blocks[i] = null;
                this.blocks.splice(i, 1);
            }
        }
    }

    bodyClicked = () => {
        this.edges.bodyClicked();

        for(let block of this.blocks){
            block.hideContextMenu();
        }
    }
}