import { Menu } from './menu.js';
export class MenuBar {
    constructor() {
        this.fileMenu = new Menu('File', ['Open', 'Save', 'Save as']);
    }
    create(menuBarDiv) {
        let div = menuBarDiv;
        div.style.display = "flex";
        div.appendChild(this.fileMenu.get());
        //this.body.innerHTML = Date();        
    }
}
