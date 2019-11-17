import {MainUI} from './mainui.js';
export function init(){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    let mainUI = new MainUI(body);
    mainUI.createUI();
}