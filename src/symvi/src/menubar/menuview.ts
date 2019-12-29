import { MenuItems } from './menuitems'

export class MenuView{
    menu_div: HTMLDivElement;
    menu_items: MenuItems;
    menu_button: HTMLDivElement;

    constructor(menuele:any, menu_items:any){
        this.menu_div = document.createElement('div');
        this.menu_div.style.position = "relative";
        //this.menu_div.style.display = "inline-block";
        //this.menu_div.setAttribute('class', 'dropdown');

        this.menu_button = document.createElement('div');
        //menuBtn.setAttribute('class', 'dropbtn');
        this.menu_button.textContent = menuele.menuId;
        //menuBtn.style.height = '1rem';
        //this.menu_button.style.padding = "0.1rem";
        this.menu_button.style.paddingLeft = '0.5rem';
        this.menu_button.style.paddingRight = '0.5rem';

        this.menu_button.style.background = "#E8E8E8";
        this.menu_button.style.color = "black";	
        
        //this.menu_div.setAttribute('id', menuele.menuId);

        
        //let divContent = document.createElement('div');
        //divContent.style.display = "none";
        //divContent.setAttribute('class', 'dropdown-content');
        this.menu_div.appendChild(this.menu_button);

        this.menu_items = new MenuItems(menu_items);
        this.menu_div.appendChild(this.menu_items.get());

    }

    get(){
        return this.menu_div;
    }

    getButton(){
        return this.menu_button;
    }

    getItems(){
        return this.menu_items;
    }
}