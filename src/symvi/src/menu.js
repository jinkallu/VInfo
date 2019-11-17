"use strict";
exports.__esModule = true;
var Menu = /** @class */ (function () {
    function Menu(menu, menuitems) {
        var _this = this;
        this.toggleMenuItems = function () {
            if (_this.menu_item_elm === undefined) {
                //return;
            }
            console.log('Menu items ' + _this.menu_item_elm.length);
            console.log('hii');
            //if (this.menuitemElm.length < 1){
            //    return;
            //}
            if (_this.menu_item_elm[0].style.display === 'none') {
                for (var i = 0; i < _this.menu_item_elm.length; i++) {
                    _this.menu_item_elm[i].style.display = 'block';
                }
            }
            else {
                for (var i = 0; i < _this.menu_item_elm.length; i++) {
                    _this.menu_item_elm[i].style.display = 'none';
                }
            }
        };
        this.menu_div = document.createElement("div");
        this.menu_items = menuitems;
        this.button = undefined;
        this.menu_item_elm = new Array(menuitems.length);
        if (this.menu_items.length > 0) {
            this.button = document.createElement("button");
            this.button.innerHTML = menu;
            this.menu_div.appendChild(this.button);
            var menuItemsDiv = document.createElement("div");
            menuItemsDiv.style.background = "white";
            menuItemsDiv.setAttribute("z-index", "1");
            var tmp_div = [];
            for (var i = 0; i < this.menu_items.length; i++) {
                var elmA = document.createElement("a");
                //let menu_item_elm.push(elmA);
                elmA.href = this.menu_items[i];
                elmA.innerHTML = this.menu_items[i];
                elmA.style.display = 'none';
                menuItemsDiv.appendChild(elmA);
                tmp_div.push(elmA);
                console.log(tmp_div.length);
            }
            this.menu_div.appendChild(menuItemsDiv);
            this.menu_item_elm = tmp_div;
            console.log(this.menu_item_elm.length);
            this.button.addEventListener("click", this.toggleMenuItems);
        }
    }
    Menu.prototype.get = function () {
        return this.menu_div;
    };
    return Menu;
}());
exports.Menu = Menu;
