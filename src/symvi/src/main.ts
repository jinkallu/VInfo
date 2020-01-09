import { MainUI } from './mainui';
import { CategoryApi } from './Api/categoryApi';
/*export function init(){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    let mainUI = new MainUI(body);
    mainUI.createUI();
}*/

export async function init(data: any) {
    let body: HTMLBodyElement = document.body as HTMLBodyElement;
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.background = "#FFFFFF";

    await CategoryApi.gettoolbox();
    let mainUI = new MainUI(body);
    mainUI.createUI(data);

}

(<any>window).init = init;