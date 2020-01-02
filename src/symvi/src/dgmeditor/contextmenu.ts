export class ContextMenu{
    menu_div: HTMLDivElement;
    constructor(){
        this.menu_div = document.createElement("div");
        this.menu_div.style.position = "absolute";
        this.menu_div.style.display = "none";
        this.menu_div.style.zIndex = "1";
        this.menu_div.style.width = "10rem";
        this.menu_div.style.height = "10rem"; // change to the number of menu items
        this.menu_div.style.background = "white";
        this.menu_div.style.borderStyle = "solid";
        this.menu_div.style.borderColor = "grey";
        this.addMenuItems();
    }

    addMenuItems(){
        let menu_item = document.createElement("div");
        menu_item.style.width = "100%";
        menu_item.style.height = "2rem";

        menu_item.innerHTML = "Delete";

        this.menu_div.appendChild(menu_item);
        menu_item.addEventListener("mouseover", this.mouseOver);
        menu_item.addEventListener("mouseout", this.mouseOut);
        menu_item.addEventListener("click", this.deleteClicked);

    }

    get(){
        return this.menu_div;
    }

    display(x: any, y: any){
        this.menu_div.style.left = x + 'px';
        this.menu_div.style.top = y + 'px';
        this.menu_div.style.display = "flex";

        console.log("Displaying");
    }

    hide(){
        this.menu_div.style.display = "none";
    }

    deleteClicked = (evt:any) => {
        evt.target.dispatchEvent(new CustomEvent("delete", {
            bubbles: true
            //detail: { id:  this.id}
          }));
          this.hide();
    }

    mouseOver = (evt:any) => {
        evt.target.style.background = "grey";
    }

    mouseOut = (evt:any) => {
        evt.target.style.background = "white";
    }
}