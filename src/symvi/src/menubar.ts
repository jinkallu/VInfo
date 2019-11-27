// import { Menu } from './menu.js';
import { MenuApi } from './Api/menuApi';
import { Menu } from './models/menu';

export class MenuBar {
    menubar_div:HTMLDivElement;
    menus: Menu[];

    constructor(width:any, height:any) {

        this.menubar_div = document.createElement("div");
        this.menubar_div.style.position = "absolute";
        this.menubar_div.style.width = width;
        this.menubar_div.style.height = height;
        this.menubar_div.style.background = " #404040";
        this.menubar_div.setAttribute('id','menubar');

        this.menus = MenuApi.getMenus();

        this.create();
    }
    
    get(){
        return this.menubar_div;
    }

    create() {
        for (let menuele of this.menus) {
            let menueleDiv = document.createElement('div');
            menueleDiv.setAttribute('class', 'dropdown');
            let menuBtn = document.createElement('div');
            menuBtn.setAttribute('class', 'dropbtn');
            menuBtn.textContent = menuele.menuId;
            menuBtn.style.height = '1rem';
            menuBtn.style.padding = "2px";
            menuBtn.style.background = "#404040";	
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
            this.menubar_div.appendChild(menueleDiv);
        }
    }
}

