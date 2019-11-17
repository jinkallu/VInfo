import { Menu } from './menu.js';
var MenuBar = (function () {
    function MenuBar() {
        this.fileMenu = new Array(2);
        this.fileMenu[0] = new Menu('File', ['Open', 'Save', 'Save as']);
        this.fileMenu[1] = new Menu('Help', ['About']);
    }
    MenuBar.prototype.create = function (menuBarDiv) {
        var div = menuBarDiv;
        div.style.display = "flex";
        for (var i = 0; i < this.fileMenu.length; i++) {
            div.appendChild(this.fileMenu[i].get());
        }
    };
    return MenuBar;
}());
export { MenuBar };
//# sourceMappingURL=menubar.js.map