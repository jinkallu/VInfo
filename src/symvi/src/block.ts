export class Block{
    rect:any;
    constructor(){
        this.rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.rect.setAttribute("width", "10%");
        this.rect.setAttribute("height", "4%");
        this.rect.setAttribute("fill", "red");
    }

    get(){
        return this.rect;
    }
}