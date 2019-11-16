"use strict";
class Menu {
    constructor(menu, menuitems) {
        this.menu_div = document.createElement("div");
        this.menu_items = menuitems;
        if (this.menu_items.length > 0) {
            this.button = document.createElement("button");
            this.button.innerHTML = menu;
            this.menu_div.appendChild(this.button);
            let menuItemsDiv = document.createElement("div");
            this.menuitemElm = [];
            for (var i = 0; i < this.menu_items.length; i++) {
                this.menuitemElm.push(document.createElement("a"));
                this.menuitemElm[i].href = this.menu_items[i];
                this.menuitemElm[i].innerHTML = this.menu_items[i];
                menuItemsDiv.appendChild(this.menuitemElm[i]);
            }
            this.menu_div.appendChild(menuItemsDiv);
        }
    }
    get() {
        return this.menu_div;
    }
}
