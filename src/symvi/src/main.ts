import {MainUI} from './mainui';
export function init(){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    let mainUI = new MainUI(body);
    mainUI.createUI();
}