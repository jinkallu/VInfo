import { MainUI } from './mainui';
import { CategoryApi } from './Api/categoryApi';
import { VideoEditor } from './videoeditor';
/*export function init(){
    let body:HTMLBodyElement = document.body as HTMLBodyElement;
    let mainUI = new MainUI(body);
    mainUI.createUI();
}*/

export async function init(data: any) {
    if (data == "videoeditor"){
        let videoEditor = new VideoEditor();  
    }
    else{
        let body: HTMLBodyElement = document.body as HTMLBodyElement;
        body.style.width = "100%";
        body.style.height = "100%";
        body.style.background = "#FFFFFF";

        await CategoryApi.gettoolbox();
        let mainUI = new MainUI(body);
        mainUI.createUI(data);
    }
}

(<any>window).init = init;