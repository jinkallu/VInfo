export class Icon{
    icon_div: HTMLImageElement;

    constructor(img_url: string){
        this.icon_div = document.createElement("img");
        this.icon_div.src = img_url;
        this.icon_div.style.display = "block";
        //this.icon_div.style.position = "absolute";
        this.icon_div.style.width = "100%";
        this.icon_div.style.height = "80%";
        this.icon_div.style.marginRight = "3rem";
    }

    get(){
        return this.icon_div;
    }
}