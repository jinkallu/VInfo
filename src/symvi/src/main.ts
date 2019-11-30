import {MainUI} from './mainui';
/*export function init(){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    let mainUI = new MainUI(body);
    mainUI.createUI();
}*/

function init(){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.background = "#E8E8E8";
    
    let mainUI = new MainUI(body);
    mainUI.createUI();
}

init();
