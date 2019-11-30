import { MainUI } from './mainui';
function init() {
    let body = document.body;
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.background = "#E8E8E8";
    let mainUI = new MainUI(body);
    mainUI.createUI();
}
init();
//# sourceMappingURL=main.js.map