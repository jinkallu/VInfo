class Menu{
    constructor(menu, menuitems){
        this.menu = document.createElement("div");
        this.menuitems = menuitems;

        if(this.menuitems.length > 0){
            this.button = document.createElement("button");
            this.button.innerHTML = menu;

            this.menu.appendChild(this.button);
            this.menuItemsDiv = document.createElement("div");

            this.menuitemElm = [];

            for(var i = 0; i < menuitems.length; i++){
                this.menuitemElm.push(document.createElement("a"));
                this.menuitemElm[i].href = this.menuitems[i]; 
                this.menuitemElm[i].innerHTML = this.menuitems[i]; 
                this.menuItemsDiv.appendChild(this.menuitemElm[i]);
            }
            this.menu.appendChild(this.menuItemsDiv);
        }
    }

    get(){
        return this.menu;
    }
}