import {Menu} from './menu.js';
export class MenuBar{
    fileMenu:Menu[];

    constructor(){
        this.fileMenu = new Array(2);
        this.fileMenu[0] = new Menu('File', ['Open', 'Save', 'Save as']);
        this.fileMenu[1] = new Menu('Help', ['About']);
    }

    create(menuBarDiv:HTMLDivElement){
        let div:HTMLDivElement = menuBarDiv;
        div.style.display = "flex";
        for (let i = 0; i < this.fileMenu.length; i++){
            div.appendChild(this.fileMenu[i].get());
        }
        
        //this.body.innerHTML = Date();        
    }
}


