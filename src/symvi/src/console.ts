export class Console{
    console_div: HTMLDivElement;

    constructor(pos:any){
        this.console_div = document.createElement("div");
        this.console_div.style.position = "absolute";
        this.console_div.style.background = "white";
        this.console_div.style.top = pos.top;
        this.console_div.style.width = pos.width;
        this.console_div.style.left = pos.left;
        this.console_div.style.height = pos.height;
        this.console_div.setAttribute('id','console');
        this.console_div.innerHTML = "Console";
        this.console_div.style.overflowY = "scroll";
        this.console_div.style.borderTop = "solid #C0C0C0";
        this.console_div.style.borderTopWidth = "thin";
    }

    get(){
        return this.console_div;
    }

    setRight(right:number){
        let width = right - this.console_div.getBoundingClientRect().left;
        this.console_div.style.width = width + 'px';
    }
}