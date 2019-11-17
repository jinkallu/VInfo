"use strict";
exports.__esModule = true;
var categoryApi_1 = require("./Api/categoryApi.js");
var ToolBox = /** @class */ (function () {
    function ToolBox() {
        this._categories = categoryApi_1.CategoryApi.getCategories();
        console.log(this._categories);
    }
    ToolBox.prototype.create = function (parentToolBox) {
        console.log('create called');
    };
    return ToolBox;
}());
exports.ToolBox = ToolBox;
