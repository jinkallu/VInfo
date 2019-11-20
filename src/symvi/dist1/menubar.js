import { Menu } from './menu.js';
export class MenuBar {
    constructor() {
        this.menuJson = [];
        this.fileMenu = new Array(2);
        this.fileMenu[0] = new Menu('File', ['Open', 'Save', 'Save as']);
        this.fileMenu[1] = new Menu('Help', ['About']);
    }
    create_old(menuBarDiv) {
        let div = menuBarDiv;
        div.style.display = "flex";
        for (let i = 0; i < this.fileMenu.length; i++) {
            div.appendChild(this.fileMenu[i].get());
        }
    }
    create(menuBarDiv) {
        let menuJson = [
            {
                id: "File",
                elem: ["Open", "close", "save"]
            }, {
                id: "Edit",
                elem: ["Cut", "Paste", "Undu"]
            }, {
                id: "View",
                elem: ["Toolbox", "next", "next"]
            }
        ];
        let mainDiv = document.getElementById('menubar');
        for (let menuele of menuJson) {
            let menueleDiv = document.createElement('div');
            menueleDiv.setAttribute('class', 'dropdown');
            let menuBtn = document.createElement('div');
            menuBtn.setAttribute('class', 'dropbtn');
            menuBtn.textContent = menuele.id;
            menuBtn.style.height = '20px';
            menuBtn.style.padding = "2px";
            menueleDiv.setAttribute('id', menuele.id);
            let divContent = document.createElement('div');
            divContent.setAttribute('class', 'dropdown-content');
            menueleDiv.appendChild(menuBtn);
            menueleDiv.appendChild(divContent);
            let menuItems = menuJson.find(i => {
                return i.id === menuele.id;
            });
            for (let menuItem of menuItems.elem) {
                let aele = document.createElement('a');
                aele.setAttribute('href', '#');
                aele.innerText = menuItem;
                divContent.appendChild(aele);
            }
            mainDiv.appendChild(menueleDiv);
        }
    }
}
//# sourceMappingURL=menubar.js.map