export class CategoryItem{
    cat_item_img:HTMLImageElement;
    drag_start:boolean;

    constructor(cat_item_data:any){
        this.cat_item_img = document.createElement('img');
        this.cat_item_img.setAttribute('src', cat_item_data.categoryImgURL);
        this.cat_item_img.setAttribute("class", "flex-elem");
        this.cat_item_img.setAttribute('title', cat_item_data.categoryName);
        this.cat_item_img.setAttribute('id', cat_item_data.catItemId);
        this.cat_item_img.setAttribute('border', "1rem solid black");
        this.cat_item_img.style.position = "relative";

        this.cat_item_img.draggable = true;
        this.cat_item_img.addEventListener("dragstart", this.dragStart); 

        this.drag_start = false;
    }

    dragStart = (event:any) => {
        event.dataTransfer.setData("Text", event.target.id);
        console.log(event.target.id);
    }

    dragStop = (event: MouseEvent) => {
        if(this.drag_start){
            console.log("Drop");
            this.drag_start = false;
        }
    }

    create(){
        return this.cat_item_img; 
    }
}