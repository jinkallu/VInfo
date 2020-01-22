import { JSONRead } from './jsonread';

export class MenuItems{
    menu_items_div: HTMLDivElement;
    jsonRead: JSONRead;

    constructor(menu_items:any){
        this.menu_items_div = document.createElement('div');
        this.menu_items_div.style.position = "absolute";
        this.menu_items_div.style.minWidth = "10rem";
        this.menu_items_div.style.background = "#F5F5F5";
        this.menu_items_div.style.zIndex = '1';
        this.menu_items_div.style.display = 'flex';
        this.menu_items_div.style.flexDirection = "column";
        this.menu_items_div.style.display = 'none';
        this.menu_items_div.style.border = 'solid #A9A9A9';
        this.menu_items_div.style.borderWidth = 'thin';

        for (let menuItem of menu_items.menuItems) {
            let aele = document.createElement('a');
            aele.setAttribute('href', '#');
            aele.style.display = "block";
            aele.style.padding = "12px 16px";
            aele.style.textDecoration = 'none';
            aele.style.cursor = "default";

            aele.innerText = menuItem;
            this.menu_items_div.appendChild(aele);

            if(menuItem == "Open"){
                aele.addEventListener("click", this.open);
            }
            else if(menuItem == "Save"){
                aele.addEventListener("click", this.save);
            }
        }

        this.jsonRead = new JSONRead();
        this.menu_items_div.appendChild(this.jsonRead.get());
    }

    get(){
        return this.menu_items_div;
    }

    open = (evt:any) => {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.addEventListener("change", this.processOpen);
        // add onchange handler if you wish to get the file :)
        input.click();

        
        evt.preventDefault();
    } 

    save = (evt: any) => {
        console.log("Save");

        this.menu_items_div.dispatchEvent(new CustomEvent("fileSave", {
            bubbles: true,
            //detail: { file:  evt.target.files[0]}
        }));

        evt.preventDefault();
    }

    cloudSave = (evt: any) => {
        console.log("Save");

        this.menu_items_div.dispatchEvent(new CustomEvent("cloudSave", {
            bubbles: true,
            //detail: { file:  evt.target.files[0]}
        }));

        evt.preventDefault();
    }

    processOpen = (evt:any) => {
        if(evt.target.value == ""){
            return;
        }

        this.jsonRead.openFile(evt.target.files[0]);
/*
        console.log("File name ", evt.target.files[0]);
        this.menu_items_div.dispatchEvent(new CustomEvent("fileOpen", {
            bubbles: true,
            detail: { file:  evt.target.files[0]}
        }));
*/
    }
}