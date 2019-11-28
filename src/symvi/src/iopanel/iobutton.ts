export class IOButton{
    button_div: HTMLButtonElement;
    constructor(name:string){
        this.button_div = document.createElement("button");
        this.button_div.innerHTML = name;
    }

    get(){
        return this.button_div;
    }
}