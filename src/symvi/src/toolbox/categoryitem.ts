export class CategoryItem{
    cat_item_img:HTMLImageElement;
    drag_start:boolean;

    constructor(cat_item_data:any){
        this.cat_item_img = document.createElement('img');
        this.cat_item_img.setAttribute('src', 'https://www.w3schools.com/howto/img_snow.jpg');
        this.cat_item_img.setAttribute("class", "flex-elem");
        this.cat_item_img.setAttribute('title', cat_item_data.categoryName);
        this.cat_item_img.setAttribute('id', cat_item_data.catItemId);

        this.cat_item_img.draggable = true;
        this.cat_item_img.addEventListener("ondrop", this.dragStart); 
        this.cat_item_img.addEventListener("ondragstart", this.dragStop); 

        this.drag_start = false;
    }

    dragStart = (event: MouseEvent) => {
        this.drag_start = true;
    }

    dragging = (event: MouseEvent) => {
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