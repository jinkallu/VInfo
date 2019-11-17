"use strict";
exports.__esModule = true;
var menu_1 = require("./menu");
var MenuBar = /** @class */ (function () {
    function MenuBar() {
        this.fileMenu = new menu_1.Menu('File', ['Open', 'Save', 'Save as']);
    }
    MenuBar.prototype.create = function (menuBarDiv) {
        var div = menuBarDiv;
        div.style.display = "flex";
        div.appendChild(this.fileMenu.get());
        //this.body.innerHTML = Date();        
    };
    return MenuBar;
}());
exports.MenuBar = MenuBar;
