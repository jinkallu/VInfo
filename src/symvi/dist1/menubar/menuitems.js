export class MenuItems {
    constructor(menu_items) {
        this.menu_items_div = document.createElement('div');
        this.menu_items_div.style.position = "absolute";
        this.menu_items_div.style.minWidth = "10rem";
        this.menu_items_div.style.background = "#E8E8E8";
        this.menu_items_div.style.zIndex = '1';
        this.menu_items_div.style.display = 'flex';
        this.menu_items_div.style.flexDirection = "column";
        this.menu_items_div.style.display = 'none';
        this.menu_items_div.style.border = 'solid black';
        this.menu_items_div.style.borderWidth = '1px';
        for (let menuItem of menu_items.menuItems) {
            let aele = document.createElement('a');
            aele.setAttribute('href', '#');
            aele.style.display = "block";
            aele.style.padding = "12px 16px";
            aele.style.textDecoration = 'none';
            aele.innerText = menuItem;
            this.menu_items_div.appendChild(aele);
        }
    }
    get() {
        return this.menu_items_div;
    }
}
//# sourceMappingURL=menuitems.js.map