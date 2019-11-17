"use strict";
exports.__esModule = true;
var menu_1 = require("./menu");
var MenuBar = /** @class */ (function () {
    function MenuBar() {
        this.fileMenu = new Array(2);
        this.fileMenu[0] = new menu_1.Menu('File', ['Open', 'Save', 'Save as']);
        this.fileMenu[1] = new menu_1.Menu('Help', ['About']);
    }
    MenuBar.prototype.create = function (menuBarDiv) {
        var div = menuBarDiv;
        div.style.display = "flex";
        for (var i = 0; i < this.fileMenu.length; i++) {
            div.appendChild(this.fileMenu[i].get());
        }
        //this.body.innerHTML = Date();        
    };
    return MenuBar;
}());
exports.MenuBar = MenuBar;
