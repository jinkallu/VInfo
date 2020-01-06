import {MainUI} from './mainui';
/*export function init(){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    let mainUI = new MainUI(body);
    mainUI.createUI();
}*/

export function init(data: any){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.background = "#FFFFFF";
    
    let mainUI = new MainUI(body);
    mainUI.createUI(data);
}

(<any>window).init = init;