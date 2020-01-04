export class Icon{
    icon_div: HTMLImageElement;

    constructor(img_url: string){
        this.icon_div = document.createElement("img");
        this.icon_div.src = img_url;
        this.icon_div.style.display = "block";
        this.icon_div.style.position = "relative";
        this.icon_div.style.width = "50%";
        //this.icon_div.style.height = "100%";
        //this.icon_div.style.marginRight = "3rem";
        this.icon_div.style.border = "5rem";
        //this.icon_div.style.padding = "1rem";
    }

    get(){
        return this.icon_div;
    }
}