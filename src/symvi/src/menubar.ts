// import { Menu } from './menu.js';
import { MenuApi } from './Api/menuApi';
import { Menu } from './models/menu';

export class MenuBar {
    menus: Menu[];
    constructor() {
        this.menus = MenuApi.getMenus();
    }

    create(menuBarDiv: HTMLDivElement) {
        let mainDiv = document.getElementById('menubar');
        for (let menuele of this.menus) {
            let menueleDiv = document.createElement('div');
            menueleDiv.setAttribute('class', 'dropdown');
            let menuBtn = document.createElement('div');
            menuBtn.setAttribute('class', 'dropbtn');
            menuBtn.textContent = menuele.menuId;
            menuBtn.style.height = '20px';
            menuBtn.style.padding = "2px";
            menueleDiv.setAttribute('id', menuele.menuId);
            let divContent = document.createElement('div');
            divContent.setAttribute('class', 'dropdown-content');
            menueleDiv.appendChild(menuBtn);
            menueleDiv.appendChild(divContent);
            let menuItems = this.menus.find(i => {
                return i.menuId === menuele.menuId;
            });
            for (let menuItem of menuItems.menuItems) {
                let aele = document.createElement('a');
                aele.setAttribute('href', '#');
                aele.innerText = menuItem;
                divContent.appendChild(aele);
            }
            mainDiv.appendChild(menueleDiv);
        }
    }
}

