<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import {Menu} from './menu';
export class MenuBar{
    fileMenu:Menu[];
=======
class MenuBar{
    fileMenu:Menu;
>>>>>>> parent of 60e3e10c... AB#30 added new menu Help
=======
class MenuBar{
    fileMenu:Menu;
>>>>>>> parent of 60e3e10c... AB#30 added new menu Help
=======
class MenuBar{
    fileMenu:Menu;
>>>>>>> parent of 60e3e10c... AB#30 added new menu Help
=======
class MenuBar{
    fileMenu:Menu;
>>>>>>> parent of 60e3e10c... AB#30 added new menu Help

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


