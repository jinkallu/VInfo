import { MenuApi } from '../Api/menuApi';
import { MenuView } from './menuview';
export class MenuBar {
    constructor(pos) {
        this.clicked = (evt) => {
            for (let menuview of this.menuviews) {
                let menu_style = menuview.getItems().get();
                if (evt.target === menuview.getButton()) {
                    if (menu_style.style.display === 'none') {
                        menu_style.style.display = 'block';
                    }
                    else {
                        menu_style.style.display = 'none';
                    }
                }
                else {
                    menu_style.style.display = 'none';
                }
            }
        };
        this.menubar_div = document.createElement("div");
        this.menubar_div.style.position = "absolute";
        this.menubar_div.style.width = pos.width;
        this.menubar_div.style.height = pos.height;
        this.menubar_div.style.display = "flex";
        this.menubar_div.style.borderBottom = "solid #C0C0C0";
        this.menubar_div.setAttribute('id', 'menubar');
        this.menus = MenuApi.getMenus();
        this.menuviews = [];
        this.create();
    }
    get() {
        return this.menubar_div;
    }
    create() {
        for (let menuele of this.menus) {
            let menuItems = this.menus.find(i => {
                return i.menuId === menuele.menuId;
            });
            let menuview = new MenuView(menuele, menuItems);
            this.menubar_div.appendChild(menuview.get());
            menuview.getButton().addEventListener("click", this.clicked);
            this.menuviews.push(menuview);
        }
    }
}
//# sourceMappingURL=menubar.js.map