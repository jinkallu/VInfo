import { Block } from './block';
import { Edges } from './edges';
import { CategoryApi } from '../Api/categoryApi';
import { Id } from './id';
import { Component } from '../models/component';
import { DesignApi } from '../Api/designApi';
import { Properties } from '../iopanel/properties';
export class DesignArea {
    constructor(pos) {
        this.mouseMove = (event) => {
            if (this.edges.connectionStarted()) {
                let ctm = this.svg.getScreenCTM();
                let x = event.clientX - ctm.e / ctm.a;
                let y = event.clientY - ctm.f / ctm.d;
                this.edges.tmp_edge.setPointTgt({ x: x, y: y });
            }
        };
        this.contextMenu = (event) => {
            if (this.edges.connectionStarted()) {
                this.edges.setConnectionStarted(false);
                event.preventDefault();
            }
        };
        this.dragEnter = (event) => {
        };
        this.dragOver = (event) => {
            event.preventDefault();
        };
        this.drop = (event) => {
            event.preventDefault();
            let item_id = event.dataTransfer.getData("Text");
            console.log("item_id");
            console.log(item_id);
            let cat_item = CategoryApi.getCategoryItemByItemId(item_id);
            console.log(cat_item.inputs);
            let inputs = cat_item.inputs;
            let outputs = cat_item.outputs;
            let name = cat_item.categoryName;
            let itemId = cat_item.catItemId;
            let ctm = this.svg.getScreenCTM();
            let x = event.clientX - ctm.e / ctm.a;
            let y = event.clientY - ctm.f / ctm.d;
            this.addBlock({ x: x, y: y }, Id.getID(), inputs, outputs, name, itemId);
        };
        this.design_area_div = document.createElement("div");
        this.design_area_div.style.position = "absolute";
        this.design_area_div.style.border = "solid black";
        this.design_area_div.style.top = pos.top;
        this.design_area_div.style.width = pos.width;
        this.design_area_div.style.left = pos.left;
        this.design_area_div.style.height = pos.height;
        this.design_area_div.setAttribute('id', 'designArea');
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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
        this.properties = Properties.getInstance();
    }
    create() {
        this.design_area_div.appendChild(this.svg);
    }
    get() {
        return this.design_area_div;
    }
    addBlock(pos, id, inputs, outputs, name, itemId) {
        let rect = new Block(this.svg, pos, id, inputs, outputs, this.edges, name, itemId);
        this.svg.appendChild(rect.get());
        this.blocks.push(rect);
        this.component = new Component(id, itemId);
        DesignApi.addComponent(this.component);
        this.properties.addItems(this.component.itemProps, id);
        console.log("in addblock");
        console.log(DesignApi.getComponents());
    }
    getBlocks() {
        return this.blocks;
    }
    getEdges() {
        return this.edges;
    }
    setRight(right) {
        this.design_area_div.style.right = right.toFixed() + 'px';
        console.log("Setting design area right" + right);
    }
}
//# sourceMappingURL=designarea.js.map