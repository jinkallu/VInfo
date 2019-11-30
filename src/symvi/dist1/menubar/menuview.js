import { MenuItems } from './menuitems';
export class MenuView {
    constructor(menuele, menu_items) {
        this.menu_div = document.createElement('div');
        this.menu_div.style.position = "relative";
        this.menu_button = document.createElement('div');
        this.menu_button.textContent = menuele.menuId;
        this.menu_button.style.paddingLeft = '0.5rem';
        this.menu_button.style.paddingRight = '0.5rem';
        this.menu_button.style.background = "#E8E8E8";
        this.menu_button.style.color = "black";
        this.menu_div.appendChild(this.menu_button);
        this.menu_items = new MenuItems(menu_items);
        this.menu_div.appendChild(this.menu_items.get());
    }
    get() {
        return this.menu_div;
    }
    getButton() {
        return this.menu_button;
    }
    getItems() {
        return this.menu_items;
    }
}
//# sourceMappingURL=menuview.js.map