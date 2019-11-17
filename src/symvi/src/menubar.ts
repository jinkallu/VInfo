import {Menu} from './menu';
export class MenuBar{
    fileMenu:Menu;

    constructor(){
        this.fileMenu = new Menu('File', ['Open', 'Save', 'Save as']);
    }

    create(menuBarDiv:HTMLDivElement){
        let div:HTMLDivElement = menuBarDiv;
        div.style.display = "flex";
        div.appendChild(this.fileMenu.get());
        //this.body.innerHTML = Date();        
    }
}


